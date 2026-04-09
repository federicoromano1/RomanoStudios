const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
document.querySelectorAll("[data-hacker]").forEach(el => {
    el.onmouseover = event => {
        let iteration = 0;
        const interval = setInterval(() => {
            event.target.innerText = event.target.innerText
                .split("")
                .map((l, i) => i < iteration ? event.target.dataset.value[i] : letters[Math.floor(Math.random() * 42)])
                .join("");
            if (iteration >= event.target.dataset.value.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30);
    };
});

document.querySelectorAll(".rs-magnetic").forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.addEventListener("mouseleave", () => {
        btn.style.transform = `translate(0px, 0px)`;
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("rs-reveal-visible");
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(".rs-reveal").forEach(el => observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

const cursor = document.createElement("div");
cursor.classList.add("rs-custom-cursor");
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});
