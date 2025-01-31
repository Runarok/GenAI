function navigate() {
  const url = document.getElementById('urlInput').value;
  const iframe = document.getElementById('webView');
  // Check if the URL starts with 'http' or 'https'
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    iframe.src = 'https://' + url;
  } else {
    iframe.src = url;
  }
}
