import React, { useEffect, useRef } from 'react';

const FireworksComponent = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w, h;

    const resizeReset = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const getRandomInt = (min, max) => Math.round(Math.random() * (max - min)) + min;
    const getRandomColor = () => `rgb(${getRandomInt(0, 255)},${getRandomInt(0, 255)},${getRandomInt(0, 255)})`;

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = getRandomInt(2, 4);
        this.speedX = getRandomInt(-5, 5);
        this.speedY = getRandomInt(-5, 5);
        this.color = color;
        this.life = 0;
        this.maxLife = 100;
      }

      draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life++;
      }

      isAlive() {
        return this.life < this.maxLife;
      }
    }

    const createFirework = (x, y) => {
      const color = getRandomColor();
      for (let i = 0; i < 100; i++) {
        particlesRef.current.push(new Particle(x, y, color));
      }
    };

    const animationLoop = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });

      particlesRef.current = particlesRef.current.filter(particle => particle.isAlive());

      requestAnimationFrame(animationLoop);
    };

    const init = () => {
      resizeReset();
      animationLoop();
    };

    window.addEventListener("resize", resizeReset);
    window.addEventListener("click", (e) => createFirework(e.clientX, e.clientY));

    init();

    return () => {
      window.removeEventListener("resize", resizeReset);
      window.removeEventListener("click", (e) => createFirework(e.clientX, e.clientY));
    };
  }, []);

  return (
    <canvas id="canvas" ref={canvasRef} style={{ pointerEvents: 'none' }}></canvas>
  );
};

export default FireworksComponent;
