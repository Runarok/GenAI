function domReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1000);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

domReady(function () {
    // QR code scan success callback
    function onScanSuccess(decodeText) {
        // Display the decoded URL
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `<a href="${decodeText}" target="_blank" style="color: #1d9bf0;">Decoded URL: ${decodeText}</a>`;

        // Show the copy button
        const copyButton = document.getElementById('copy-button');
        copyButton.style.display = 'inline-block';

        // Copy to clipboard functionality
        copyButton.onclick = function () {
            navigator.clipboard.writeText(decodeText).then(() => {
                alert("URL copied to clipboard!");
            }, (err) => {
                alert("Failed to copy: " + err);
            });
        };
    }

    // Initialize the camera scanner
    let htmlscanner = new Html5QrcodeScanner(
        "my-qr-reader", 
        { fps: 10, qrbox: 250 }
    );
    htmlscanner.render(onScanSuccess);

    // Handle file input for QR code scanning
    const fileInput = document.getElementById('qr-file-input');
    fileInput.addEventListener('change', function () {
        const file = fileInput.files[0];
        if (file) {
            scanFile(file);
        }
    });

    // Drag and drop functionality
    const dragDropArea = document.getElementById('drag-drop-area');
    dragDropArea.addEventListener('dragover', function (e) {
        e.preventDefault();
        dragDropArea.classList.add('dragover');
    });

    dragDropArea.addEventListener('dragleave', function () {
        dragDropArea.classList.remove('dragover');
    });

    dragDropArea.addEventListener('drop', function (e) {
        e.preventDefault();
        dragDropArea.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file) {
            scanFile(file);
        }
    });

    dragDropArea.addEventListener('click', function () {
        fileInput.click();
    });

    // Function to scan file using Html5Qrcode
    function scanFile(file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageData = e.target.result;

            // Scan the selected file
            Html5Qrcode.scanFile(imageData, true)
                .then(onScanSuccess)
                .catch(err => alert(`Failed to scan file: ${err}`));
        };
        reader.readAsDataURL(file);
    }
});
