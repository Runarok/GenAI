const grid = document.getElementById('grid');
const hueSlider = document.getElementById('hueSlider');
const colorLabel = document.getElementById('colorLabel');

function generateColors(hue) {
    grid.innerHTML = '';
    for (let i = 0; i < 400; i++) {
        const saturation = Math.floor((i % 20) * 5.25);
        const lightness = Math.floor(Math.floor(i / 20) * 5.25);
        const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        const hexColor = hslToHex(hue, saturation, lightness);
        const rgbColor = hslToRgb(hue, saturation, lightness);
        
        const colorBox = document.createElement('div');
        colorBox.className = 'color-box';
        colorBox.style.backgroundColor = color;

        colorBox.onclick = () => {
            navigator.clipboard.writeText(hexColor);
            colorLabel.textContent = `Hex Value: ${hexColor} | RGB: ${rgbColor}`;
        };

        grid.appendChild(colorBox);
    }
}

function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => {
        const k = (n + h / 30) % 12;
        return Math.round(255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))));
    };
    const r = f(0), g = f(8), b = f(4);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => {
        const k = (n + h / 30) % 12;
        return Math.round(255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))));
    };
    return `${f(0)}, ${f(8)}, ${f(4)}`;
}

hueSlider.addEventListener('input', () => {
    generateColors(hueSlider.value);
});

generateColors(0);
