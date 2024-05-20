import React, { useEffect, useRef } from 'react';

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const ballsRef = useRef([]);
  const mouseRef = useRef({ x: undefined, y: undefined });
  const rgb = [
    "rgb(26,188,156)",
    "rgb(46,204,113)",
    "rgb(52,152,219)",
    "rgb(155,89,182)",
    "rgb(241,196,15)",
    "rgb(230,126,34)",
    "rgb(231,76,68)",
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w, h;

    const resizeReset = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const easeOutQuart = (x) => 1 - Math.pow(1 - x, 4);

    class Ball {
      constructor() {
        this.start = {
          x: mouseRef.current.x + getRandomInt(-20, 20),
          y: mouseRef.current.y + getRandomInt(-20, 20),
          size: getRandomInt(30, 40)
        };
        this.end = {
          x: this.start.x + getRandomInt(-300, 300),
          y: this.start.y + getRandomInt(-300, 300),
        };
        this.x = this.start.x;
        this.y = this.start.y;
        this.size = this.start.size;
        this.style = rgb[getRandomInt(0, rgb.length - 1)];
        this.time = 0;
        this.ttl = 120;
      }

      draw(ctx) {
        ctx.fillStyle = this.style;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        if (this.time <= this.ttl) {
          let progress = 1 - (this.ttl - this.time) / this.ttl;
          this.size = this.start.size * (1 - easeOutQuart(progress));
          this.x = this.x + (this.end.x - this.x) * 0.01;
          this.y = this.y + (this.end.y - this.y) * 0.01;
        }
        this.time++;
      }
    }

    const animationLoop = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      ballsRef.current.forEach(ball => {
        ball.update();
        ball.draw(ctx);
      });

      ballsRef.current = ballsRef.current.filter(ball => ball.time <= ball.ttl);

      requestAnimationFrame(animationLoop);
    };

    const mousemove = (e) => {
      mouseRef.current = { x: e.x, y: e.y };
      for (let i = 0; i < 3; i++) {
        ballsRef.current.push(new Ball());
      }
    };

    const mouseOut = () => {
      mouseRef.current = { x: undefined, y: undefined };
    };

    const getRandomInt = (min, max) => Math.round(Math.random() * (max - min)) + min;

    const init = () => {
      resizeReset();
      animationLoop();
    };

    window.addEventListener("resize", resizeReset);
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseout", mouseOut);

    init();

    return () => {
      window.removeEventListener("resize", resizeReset);
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseout", mouseOut);
    };
  }, [rgb]);

  return (
    <canvas id="canvas" ref={canvasRef}></canvas>
  );
};

export default CanvasComponent;
