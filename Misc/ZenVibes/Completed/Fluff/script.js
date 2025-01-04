// Function to create a fluffy cloud
function createCloud(x, y) {
    const cloud = document.createElement('div');
    cloud.className = 'cloud';
    const baseSize = Math.random() * 60 + 50; // Base size for cloud
    cloud.style.width = `${baseSize}px`;
    cloud.style.height = `${baseSize}px`;
    cloud.style.left = `${x}px`;
    cloud.style.top = `${y}px`;
    cloud.style.animation = `float ${Math.random() * 4 + 3}s ease-in-out infinite`;

    // Create layers for fluffy appearance
    for (let i = 0; i < 6; i++) {
        const layer = document.createElement('div');
        layer.className = 'cloud';
        const size = baseSize * (0.5 + Math.random() * 0.5);
        layer.style.width = `${size}px`;
        layer.style.height = `${size}px`;
        layer.style.left = `${Math.random() * 40 - 20}px`;
        layer.style.top = `${Math.random() * 30 - 15}px`;
        layer.style.opacity = 0.7;
        cloud.appendChild(layer);
    }

    document.querySelector('.sky').appendChild(cloud);

    // Add event listeners for interaction
    cloud.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        cloud.remove();
    });

    cloud.addEventListener('mousedown', (e) => {
        if (e.button === 1) {
            cloud.style.position = 'absolute';
            cloud.style.transition = 'none';
            const moveCloud = (event) => {
                cloud.style.left = `${event.pageX - baseSize / 2}px`;
                cloud.style.top = `${event.pageY - baseSize / 2}px`;
            };
            document.addEventListener('mousemove', moveCloud);
            document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', moveCloud);
                cloud.style.transition = '';
            }, { once: true });
        }
    });
}

// Create cloud on left click
document.addEventListener('click', (e) => {
    createCloud(e.pageX - 30, e.pageY - 30);
});

// Function to download the image
function download() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const sky = document.querySelector('.sky');
    const skyWidth = window.innerWidth;
    const skyHeight = window.innerHeight;
    canvas.width = skyWidth;
    canvas.height = skyHeight;

    // Draw the background gradient
    const gradient = context.createLinearGradient(0, 0, 0, skyHeight);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(0.5, '#A1C8E6');
    gradient.addColorStop(1, '#D0E4F2');
    context.fillStyle = gradient;
    context.fillRect(0, 0, skyWidth, skyHeight);

    // Draw the clouds
    const clouds = document.querySelectorAll('.cloud');
    clouds.forEach(cloud => {
        const rect = cloud.getBoundingClientRect();
        context.save();
        context.translate(rect.left, rect.top);
        context.globalAlpha = parseFloat(getComputedStyle(cloud).opacity);
        context.beginPath();
        context.arc(rect.width / 2, rect.height / 2, rect.width / 2, 0, Math.PI * 2);
        context.fillStyle = 'white';
        context.fill();
        context.restore();
    });

    // Create and trigger download
    canvas.toBlob((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'cloudy_sky.png';
        link.click();
    }, 'image/png');
}
