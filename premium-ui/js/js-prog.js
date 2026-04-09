document.querySelectorAll('.rs-counter').forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / 100;
        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target;
        }
    };
    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) updateCount();
    }, { threshold: 1 });
    observer.observe(counter);
});

document.querySelectorAll('.rs-tilt').forEach(el => {
    el.addEventListener('mousemove', e => {
        let rect = el.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        let dx = (x - rect.width / 2) / (rect.width / 2);
        let dy = (y - rect.height / 2) / (rect.height / 2);
        el.style.transform = `perspective(1000px) rotateX(${-dy * 15}deg) rotateY(${dx * 15}deg)`;
    });
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
});

document.querySelectorAll('.rs-copy').forEach(btn => {
    btn.onclick = () => {
        const text = btn.getAttribute('data-copy');
        navigator.clipboard.writeText(text);
        const originalText = btn.innerText;
        btn.innerText = 'COPIATO!';
        setTimeout(() => btn.innerText = originalText, 2000);
    };
});

document.querySelectorAll('.rs-typewriter').forEach(el => {
    const text = el.getAttribute('data-text');
    let i = 0;
    const typing = setInterval(() => {
        el.innerText += text[i];
        i++;
        if (i >= text.length) clearInterval(typing);
    }, 100);
});

document.querySelector('.rs-theme-toggle')?.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

document.addEventListener('mousedown', e => {
    const ripple = document.createElement('div');
    ripple.className = 'rs-click-ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
});
