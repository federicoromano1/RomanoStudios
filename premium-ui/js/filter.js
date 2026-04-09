const FilterEngine = {
    data: [],
    container: document.querySelector('.rs-items-grid'),
    async init(url) {
        const res = await fetch(url);
        this.data = await res.json();
        this.setupListeners();
        this.render(this.data);
    },
    setupListeners() {
        const search = document.getElementById('rs-search');
        const filter = document.getElementById('rs-category');
        const sort = document.getElementById('rs-sort');

        const update = () => {
            let filtered = this.data.filter(item => {
                const matchesSearch = item.name.toLowerCase().includes(search.value.toLowerCase());
                const matchesCat = filter.value === 'all' || item.category === filter.value;
                return matchesSearch && matchesCat;
            });

            if (sort.value === 'price-asc') filtered.sort((a, b) => a.price - b.price);
            if (sort.value === 'price-desc') filtered.sort((a, b) => b.price - a.price);

            this.render(filtered);
        };

        search?.addEventListener('input', update);
        filter?.addEventListener('change', update);
        sort?.addEventListener('change', update);
    },
    render(items) {
        if (!this.container) return;
        this.container.innerHTML = items.length ? items.map(item => `
            <div class="rs-card" data-category="${item.category}">
                <img src="${item.img}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
                <div class="price">€${item.price}</div>
            </div>
        `).join('') : '<p class="no-results">Nessun risultato trovato.</p>';
    }
};
