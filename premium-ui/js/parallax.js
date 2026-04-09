window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.rs-parallax').forEach(el => {
        const speed = el.getAttribute('data-speed') || 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});
