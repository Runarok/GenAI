const htmlInput = document.getElementById('html-input');
const outputFrame = document.getElementById('output');
const toggleButton = document.getElementById('toggle-button');
const inputArea = document.getElementById('input-area');
const outputArea = document.getElementById('output-area');

// Initialize the iframe with a gray background
const outputDoc = outputFrame.contentDocument || outputFrame.contentWindow.document;
outputDoc.open();
outputDoc.write('<html><body style="background-color: gray;"></body></html>');
outputDoc.close();

htmlInput.addEventListener('input', () => {
    const content = htmlInput.value;
    const outputDoc = outputFrame.contentDocument || outputFrame.contentWindow.document;
    outputDoc.open();
    outputDoc.write(content);
    outputDoc.close();
});

toggleButton.addEventListener('click', () => {
    if (inputArea.style.maxWidth === '0px' || inputArea.style.maxWidth === '') {
        inputArea.style.maxWidth = '50%';
        inputArea.style.opacity = '1';
        outputArea.style.width = '50%';
    } else {
        inputArea.style.maxWidth = '0px';
        inputArea.style.opacity = '0';
        outputArea.style.width = '100%';
    }
});
