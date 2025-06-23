function addStars() {
    const background = document.querySelector('.background');
    const numberOfStars = 100;
    const starSpeed = 10;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = Math.random() * 100 + '%';
        star.style.left = Math.random() * 100 + '%';
        star.dataset.speed = Math.random() * starSpeed + 1;
        background.appendChild(star);
    }

    requestAnimationFrame(moveStars);
}

function moveStars() {
    const stars = document.querySelectorAll('.star');

    stars.forEach(star => {
        let speed = parseFloat(star.dataset.speed);
        let x = parseFloat(star.style.left);
        x -= speed / 999;

        if (x < -1) {
            x = 101;
        }

        star.style.left = x + '%';
    });

    requestAnimationFrame(moveStars);
}

addStars();