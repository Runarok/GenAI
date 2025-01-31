let intervalId;

function startAutoCheck() {
    const url = document.getElementById('apiUrl').value;
    const responseArea = document.getElementById('responseArea');

    if (intervalId) {
        clearInterval(intervalId);
    }

    if (!url) {
        responseArea.textContent = 'Please enter an API URL.';
        return;
    }

    responseArea.textContent = 'Loading...';

    intervalId = setInterval(async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            responseArea.textContent = JSON.stringify(data, null, 2);
            responseArea.scrollTop = responseArea.scrollHeight;
        } catch (error) {
            responseArea.textContent = 'Error: ' + error.message;
        }
    }, 10000);
}
