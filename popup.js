document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('webcamVideo');
    const errorMessage = document.getElementById('errorMessage');

    // Create error message element if it doesn't exist
    if (!errorMessage) {
        const msg = document.createElement('div');
        msg.id = 'errorMessage';
        document.body.appendChild(msg);
    }

    // Attempt to access webcam
    function startWebcam() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                video.srcObject = stream;
                video.style.display = 'block';
                document.getElementById('errorMessage').textContent = '';
            })
            .catch((err) => {
                video.style.display = 'none';
                const errorMsg = document.getElementById('errorMessage');
                
                switch(err.name) {
                    case 'NotAllowedError':
                        errorMsg.textContent = 'Camera access was blocked. To use this extension:' + 
                            '\n1. Click the lock icon in the address bar' +
                            '\n2. Allow camera access' +
                            '\n3. Reload the extension';
                        break;
                    case 'NotFoundError':
                        errorMsg.textContent = 'No camera found. Please connect a camera.';
                        break;
                    default:
                        errorMsg.textContent = `Webcam error: ${err.message}`;
                }
                
                console.error("Webcam access error:", err);
            });
    }

    // Initial attempt to start webcam
    startWebcam();

    // Optional: Add a retry button
    const retryButton = document.createElement('button');
    retryButton.textContent = 'Retry Camera Access';
    retryButton.addEventListener('click', startWebcam);
    document.body.appendChild(retryButton);
});