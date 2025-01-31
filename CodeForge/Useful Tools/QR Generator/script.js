$(document).ready(function() {
    $('#urlInput').on('input', function() {
        const url = $(this).val();
        const $qrcode = $('#qrcode');
        const $downloadBtn = $('#downloadBtn');

        if (url) {
            $qrcode.empty().qrcode(url);
            $qrcode.show();
            $downloadBtn.show();
        } else {
            $qrcode.hide();
            $downloadBtn.hide();
        }
    });

    $('#downloadBtn').on('click', function() {
        const canvas = $('#qrcode canvas')[0];
        const borderWidth = 5; // Width of the white border
        const newCanvas = document.createElement('canvas');
        const newContext = newCanvas.getContext('2d');

        // Set new canvas size
        newCanvas.width = canvas.width + borderWidth * 2; // Add border to width
        newCanvas.height = canvas.height + borderWidth * 2; // Add border to height

        // Fill the background with white
        newContext.fillStyle = 'white';
        newContext.fillRect(0, 0, newCanvas.width, newCanvas.height);

        // Draw the original QR code on top
        newContext.drawImage(canvas, borderWidth, borderWidth);

        // Create a link to download the new canvas as an image
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = newCanvas.toDataURL('image/png');
        link.click();
    });
});
