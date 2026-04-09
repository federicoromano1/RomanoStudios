const playSound = (url) => {
    const audio = new Audio(url);
    audio.volume = 0.2;
    audio.play();
};

document.querySelectorAll('.rs-btn-audio').forEach(btn => {
    btn.addEventListener('mouseenter', () => playSound('https://www.soundjay.com/buttons/button-37.mp3'));
    btn.addEventListener('click', () => playSound('https://www.soundjay.com/buttons/button-09.mp3'));
});
