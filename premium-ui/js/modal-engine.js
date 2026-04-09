const openModal = id => document.getElementById(id).style.display = 'flex';
const closeModal = id => document.getElementById(id).style.display = 'none';

document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.onclick = () => openModal(trigger.getAttribute('data-modal'));
});

document.querySelectorAll('.rs-modal').forEach(modal => {
    modal.onclick = e => { if (e.target === modal) closeModal(modal.id); };
});

document.onkeydown = e => { if (e.key === "Escape") document.querySelectorAll('.rs-modal').forEach(m => closeModal(m.id)); };
