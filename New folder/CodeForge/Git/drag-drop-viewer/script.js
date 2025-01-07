const dropArea = document.getElementById('drop-area');
const fileContent = document.getElementById('file-content');
const copyBtn = document.getElementById('copy-btn');
const fileInput = document.getElementById('file-input');
let currentFileContent = '';

// Prevent default behavior for drag and drop
dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('hover');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('hover');
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('hover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        readFile(file);
    }
});

// Allow the user to select a file from their system by clicking
dropArea.addEventListener('click', () => {
    fileInput.click(); // Trigger file input dialog
});

// When a file is selected via the file input
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        readFile(file);
    }
});

// Function to read the file and display its content
function readFile(file) {
    const reader = new FileReader();

    reader.onload = function(e) {
        currentFileContent = e.target.result;
        fileContent.textContent = currentFileContent;
        fileContent.style.display = 'block';  // Show the content area after a file is loaded
        copyBtn.style.display = 'block';  // Show the copy button
        copyBtn.disabled = false;  // Enable the copy button after file content is loaded
    };

    reader.onerror = function(e) {
        fileContent.textContent = 'Error reading the file.';
        copyBtn.disabled = true;  // Disable copy button if there's an error
    };

    // Read the file as text (for .txt, .md, etc.)
    reader.readAsText(file);
}

// Function to copy content to clipboard
function copyToClipboard() {
    navigator.clipboard.writeText(currentFileContent).then(() => {
        alert('Content copied to clipboard!');
    }).catch(err => {
        alert('Failed to copy: ' + err);
    });
}
