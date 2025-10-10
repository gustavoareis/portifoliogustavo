(() => {
  const container = document.querySelector(".background");
  if (!container) {
    return;
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  container.appendChild(canvas);

  const STAR_COUNT = 220;
  const stars = [];
  let width = 0;
  let height = 0;

  const randomBetween = (min, max) => Math.random() * (max - min) + min;

  const resetStar = (star, initial = false) => {
    star.radius = randomBetween(0.4, 2.2);
    star.speed = randomBetween(0.05, 0.18) + star.radius * 0.08;
    star.alpha = randomBetween(0.4, 1);
    star.y = randomBetween(0, height);
    star.x = initial
      ? randomBetween(0, width)
      : -star.radius - randomBetween(0, width * 0.1);
  };

  const createStars = () => {
    stars.length = 0;
    for (let i = 0; i < STAR_COUNT; i += 1) {
      const star = {};
      resetStar(star, true);
      stars.push(star);
    }
  };

  const resize = () => {
    const previousWidth = width || 1;
    const previousHeight = height || 1;

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    if (stars.length) {
      const xRatio = width / previousWidth;
      const yRatio = height / previousHeight;

      stars.forEach((star) => {
        star.x *= xRatio;
        star.y *= yRatio;
      });
    }
  };

  const drawStar = (star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
    ctx.fill();
  };

  const update = () => {
    ctx.clearRect(0, 0, width, height);

    stars.forEach((star) => {
      star.x += star.speed;
      if (star.x - star.radius > width) {
        resetStar(star);
      }
      drawStar(star);
    });

    requestAnimationFrame(update);
  };

  window.addEventListener("resize", () => {
    resize();
    if (!stars.length) {
      createStars();
    }
  });

  resize();
  createStars();
  update();
})();

