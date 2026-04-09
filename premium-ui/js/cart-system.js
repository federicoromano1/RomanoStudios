const CartSystem = {
    items: [],
    total: 0,
    init() {
        this.load();
        this.render();
        document.querySelectorAll('.rs-add-to-cart').forEach(btn => {
            btn.onclick = () => this.addItem({
                id: btn.dataset.id,
                name: btn.dataset.name,
                price: parseFloat(btn.dataset.price)
            });
        });
    },
    addItem(product) {
        const existing = this.items.find(item => item.id === product.id);
        if (existing) {
            existing.qty++;
        } else {
            this.items.push({ ...product, qty: 1 });
        }
        this.save();
        this.render();
        this.notify('Prodotto aggiunto al carrello');
    },
    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.save();
        this.render();
    },
    updateQty(id, delta) {
        const item = this.items.find(i => i.id === id);
        if (item) {
            item.qty += delta;
            if (item.qty <= 0) return this.removeItem(id);
            this.save();
            this.render();
        }
    },
    calculateTotal() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
        return this.total.toFixed(2);
    },
    save() {
        localStorage.setItem('rs_cart', JSON.stringify(this.items));
    },
    load() {
        const data = localStorage.getItem('rs_cart');
        if (data) this.items = JSON.parse(data);
    },
    render() {
        const container = document.getElementById('cart-display');
        if (!container) return;
        container.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <span>${item.name}</span>
                <div class="qty-ctrl">
                    <button onclick="CartSystem.updateQty('${item.id}', -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="CartSystem.updateQty('${item.id}', 1)">+</button>
                </div>
                <span>€${(item.price * item.qty).toFixed(2)}</span>
                <button onclick="CartSystem.removeItem('${item.id}')">×</button>
            </div>
        `).join('');
        document.getElementById('cart-total').innerText = `Total: €${this.calculateTotal()}`;
    },
    notify(msg) {
        console.log(`[RS-CART]: ${msg}`);
    }
};

CartSystem.init();
