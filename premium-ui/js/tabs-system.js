document.querySelectorAll('.rs-tab-btn').forEach(btn => {
    btn.onclick = () => {
        const parent = btn.parentElement.parentElement;
        const target = btn.getAttribute('data-tab');
        
        parent.querySelectorAll('.rs-tab-btn').forEach(b => b.classList.remove('active'));
        parent.querySelectorAll('.rs-tab-content').forEach(c => c.style.display = 'none');
        
        btn.classList.add('active');
        parent.querySelector(`#${target}`).style.display = 'block';
    };
});
