window.onload = function() {
    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');
    resizeCanvas();

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // draw some circles that randomly walk around
    let circles = [];
    for (let i = 0; i < 100; i++) {
        circles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 20,
            dx: (Math.random() - 0.5) * 2,
            dy: (Math.random() - 0.5) * 2,
            color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`
        });
    }

    function drawCircles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        circles.forEach(circle => {
            circle.x += circle.dx;
            circle.y += circle.dy;

            if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0) {
                circle.dx = -circle.dx;
            }

            if (circle.y + circle.radius > canvas.height || circle.y - circle.radius < 0) {
                circle.dy = -circle.dy;
            }

            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = circle.color;
            ctx.fill();
        });

        requestAnimationFrame(drawCircles);
    }

    window.addEventListener('resize', resizeCanvas, false);
    drawCircles();
};
