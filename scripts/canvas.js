window.onload = function() {
    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // initialize line starting place
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let dx = (Math.random() - 0.5) * 10; // Random horizontal speed
    let dy = (Math.random() - 0.5) * 10; // Random vertical speed

    // draw a line that randomly walks around
    function drawLine() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.moveTo(x, y);

        // Update the position
        x += dx;
        y += dy;

        // Check for canvas boundaries
        if (x > canvas.width || x < 0) {
            dx = -dx;
        }
        if (y > canvas.height || y < 0) {
            dy = -dy;
        }

        // Draw a line to the new position
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
        ctx.lineWidth = 10;
        ctx.stroke();

        requestAnimationFrame(drawLine);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, false);
    // drawLine();
};
