function fetchFavicon() {
    // Clear previous error or favicon
    document.getElementById('faviconImage').style.display = 'none';
    document.getElementById('error').style.display = 'none';
    document.getElementById('downloadBtn').style.display = 'none';
    
    const url = document.getElementById('urlInput').value.trim();

    if (url) {
        const faviconUrl = getFaviconUrl(url);
        fetch(faviconUrl)
            .then(response => {
                if (response.ok) {
                    document.getElementById('faviconImage').src = faviconUrl;
                    document.getElementById('faviconImage').style.display = 'block';
                    document.getElementById('downloadBtn').style.display = 'inline-block';
                } else {
                    showError('Favicon not found for the provided URL.');
                }
            })
            .catch(error => {
                showError('Error fetching favicon: ' + error.message);
            });
    } else {
        showError('Please enter a valid URL.');
    }
}

function getFaviconUrl(url) {
    // Attempt to build the favicon URL
    const urlObject = new URL(url);
    return `${urlObject.origin}/favicon.ico`; // Default location for favicon.ico
}

function showError(message) {
    document.getElementById('error').innerText = message;
    document.getElementById('error').style.display = 'block';
}

function downloadFavicon() {
    const faviconImage = document.getElementById('faviconImage');
    const imageUrl = faviconImage.src;
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = 'favicon.ico'; // Default filename for favicon
    a.click();
}
