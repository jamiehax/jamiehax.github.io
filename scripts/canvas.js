window.onload = function() {
    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');

    const numberOfLines = 15;
    const threshold = 150; 
    const movementFraction = 0.15;
    const interactionInterval = 1;
    const segmentLength = 5;
    const drawInterval = 2;

    let lines = [];
    let frameCount = 0;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function initializeLines() {
        lines = [];
        for (let i = 0; i < numberOfLines; i++) {
            lines.push({
                segments: [{ x: 0, y: Math.random() * canvas.height }],
                finished: false // Add a finished flag to each line
            });
        }
    }

    function animateLines() {
        function animate() {
            frameCount++;

            if (frameCount % drawInterval === 0) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                lines.forEach(line => {
                    ctx.beginPath();
                    ctx.moveTo(line.segments[0].x, line.segments[0].y);

                    for (let i = 1; i < line.segments.length; i++) {
                        ctx.lineTo(line.segments[i].x, line.segments[i].y);
                    }

                    ctx.strokeStyle = 'rgba(225, 225, 255, 0.8)';
                    ctx.lineWidth = 5;
                    ctx.stroke();

                    // Add new segment if the last segment has moved far enough
                    const lastSegment = line.segments[line.segments.length - 1];
                    if (lastSegment.x < canvas.width) {
                        line.segments.push({
                            x: lastSegment.x + segmentLength,
                            y: lastSegment.y
                        });
                    } else {
                        line.finished = true;
                    }

                });

                if (frameCount % (interactionInterval * drawInterval) === 0) {
                    updateOpinions();
                }
            }

            requestAnimationFrame(animate);
        }

        animate();
    }

    function updateOpinions() {
        const randomIndex1 = Math.floor(Math.random() * numberOfLines);
        const randomIndex2 = Math.floor(Math.random() * numberOfLines);

        if (randomIndex1 !== randomIndex2) {
            const agent1 = lines[randomIndex1];
            const agent2 = lines[randomIndex2];

            // Only interact if both agents haven't finished
            if (!agent1.finished && !agent2.finished) {
                const lastSegment1 = agent1.segments[agent1.segments.length - 1];
                const lastSegment2 = agent2.segments[agent2.segments.length - 1];

                if (Math.abs(lastSegment1.y - lastSegment2.y) <= threshold) {
                    const deltaY = (lastSegment2.y - lastSegment1.y) * movementFraction;

                    // Update the last segment of each line
                    agent1.segments[agent1.segments.length - 1].y += deltaY;
                    agent2.segments[agent2.segments.length - 1].y -= deltaY;
                }
            }
        }
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    initializeLines();
    animateLines();
};
