class ToastManager {
    constructor() {
        this.container = document.createElement('div');
        this.container.id = 'rs-toast-container';
        document.body.appendChild(this.container);
        this.injectStyles();
    }

    show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `rs-toast rs-toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">${message}</div>
            <div class="toast-progress"></div>
        `;

        this.container.appendChild(toast);

        setTimeout(() => toast.classList.add('active'), 10);

        const timer = setTimeout(() => this.hide(toast), duration);

        toast.onclick = () => {
            clearTimeout(timer);
            this.hide(toast);
        };
    }

    hide(toast) {
        toast.classList.remove('active');
        toast.classList.add('exit');
        setTimeout(() => toast.remove(), 500);
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #rs-toast-container { position: fixed; bottom: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px; }
            .rs-toast { background: #111; color: #fff; padding: 15px 25px; border-radius: 12px; border-left: 4px solid #00ffcc; 
                        box-shadow: 0 10px 30px rgba(0,0,0,0.5); transform: translateX(120%); transition: 0.5s cubic-bezier(0.68, -0.55, 0.26, 1.55); cursor: pointer; }
            .rs-toast.active { transform: translateX(0); }
            .rs-toast.exit { opacity: 0; transform: scale(0.8); }
            .rs-toast-error { border-left-color: #ff4444; }
            .rs-toast-success { border-left-color: #00ffcc; }
            .toast-progress { height: 2px; background: rgba(255,255,255,0.2); margin-top: 10px; width: 100%; animation: toast-prog linear forwards; }
            @keyframes toast-prog { from { width: 100%; } to { width: 0%; } }
        `;
        document.head.appendChild(style);
    }
}

const toast = new ToastManager();
