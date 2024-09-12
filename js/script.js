        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        class Ball {
            constructor() {
                this.radius = Math.random() * 20 + 10;
                this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
                this.y = Math.random() * (canvas.height - this.radius * 2) + this.radius;
                this.dx = (Math.random() - 0.5) * 4;
                this.dy = (Math.random() - 0.5) * 4;
                this.color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                    this.dx = -this.dx;
                }
                if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                    this.dy = -this.dy;
                }

                this.x += this.dx;
                this.y += this.dy;

                this.draw();
            }
        }

        const ballCount = 20;
        let balls = [];

        for (let i = 0; i < ballCount; i++) {
            balls.push(new Ball());
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let ball of balls) {
                ball.update();
            }
        }

        animate();