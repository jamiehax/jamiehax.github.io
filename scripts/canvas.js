window.onload = function() {
    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');

    const numberOfLines = 25;
    const threshold = 150; 
    const movementFraction = 0.25;
    const interactionInterval = 1;
    const segmentLength = 3;
    const drawInterval = 1;
    const lineWidth = 4;

    let lines = [];
    let frameCount = 0;
    let allLinesFinished = false;

    function showPopup() {
        var popup = document.getElementById('bc-popup');
        popup.style.display = 'block';
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function initializeLines() {
        lines = [];
        for (let i = 0; i < numberOfLines; i++) {
            lines.push({
                segments: [{ x: 0, y: Math.random() * canvas.height }],
                finished: false
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
                    ctx.lineWidth = lineWidth;
                    ctx.stroke();

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

                if (lines.every(line => line.finished)) {
                    allLinesFinished = true;
                }

                if (frameCount % (interactionInterval * drawInterval) === 0) {
                    updateOpinions();
                }
            }

            if (!allLinesFinished) {
                requestAnimationFrame(animate);
            } else {
                showPopup();
            }
        }

        animate();
    }

    function updateOpinions() {
        const randomIndex1 = Math.floor(Math.random() * numberOfLines);
        const randomIndex2 = Math.floor(Math.random() * numberOfLines);

        if (randomIndex1 !== randomIndex2) {
            const agent1 = lines[randomIndex1];
            const agent2 = lines[randomIndex2];

            if (!agent1.finished && !agent2.finished) {
                const lastSegment1 = agent1.segments[agent1.segments.length - 1];
                const lastSegment2 = agent2.segments[agent2.segments.length - 1];

                if (Math.abs(lastSegment1.y - lastSegment2.y) <= threshold) {
                    const deltaY = (lastSegment2.y - lastSegment1.y) * movementFraction;

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

    const popup = document.getElementById("bc-popup");
    const popupContent = document.getElementById("popup-content");
    const popupContentExpanded = document.getElementById("popup-content-expanded");

    function expandPopup() {
        popup.classList.toggle("expanded");

        if (popup.classList.contains("expanded")) {
            popupContent.style.display = "none";
            popupContentExpanded.style.display = "block";
        } else {
            popupContent.style.display = "block";
            popupContentExpanded.style.display = "none";
        }
    }

    popup.addEventListener("click", expandPopup);

};
