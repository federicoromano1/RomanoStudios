document.querySelectorAll('.rs-form').forEach(form => {
    form.onsubmit = e => {
        e.preventDefault();
        let valid = true;
        form.querySelectorAll('input[required]').forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('rs-shake');
                setTimeout(() => input.classList.remove('rs-shake'), 500);
                valid = false;
            }
        });
        if (valid) {
            const btn = form.querySelector('button');
            btn.innerText = 'INVIATO!';
            btn.style.background = '#00ffcc';
            form.reset();
        }
    };
});
