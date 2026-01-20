const App = {
    init: () => {
        // Common init checks
        App.updateCartCount();
        App.checkIOS();
    },

    formatCurrency: (amount) => {
        return amount.toLocaleString('ko-KR') + '원';
    },

    updateCartCount: () => {
        const cart = Storage.getCart();
        const count = Object.values(cart).reduce((a, b) => a + b, 0);
        const el = document.getElementById('cart-count');
        if (el) el.innerText = count > 0 ? count : '';
    },

    renderMarts: (containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (DATA.marts.length === 0) {
            container.innerHTML = '<div class="card">마트가 없습니다.</div>';
            return;
        }

        container.innerHTML = DATA.marts.map(mart => `
            <div class="card" onclick="App.selectMart(${mart.id})">
                <h3 style="color: var(--primary);">${mart.name}</h3>
                <p style="font-size: 0.9rem;">📍 ${mart.region} ${mart.address}</p>
                <p>📞 ${mart.phone}</p>
            </div>
        `).join('');
    },

    selectMart: (martId) => {
        const mart = DATA.marts.find(m => m.id === martId);
        if (mart) {
            Storage.setMart(mart);
            window.location.href = 'store.html';
        }
    },

    renderProducts: (containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        const cart = Storage.getCart();

        // Group by category
        const html = DATA.categories.map(cat => {
            const products = DATA.products.filter(p => p.category === cat.id);
            if (products.length === 0) return '';

            const productList = products.map(p => {
                const isChecked = cart[String(p.id)] ? 'checked' : '';
                return `
                <div class="card" style="display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center;">
                        <input type="checkbox" id="p-${p.id}" 
                            class="product-check" 
                            style="transform: scale(1.5); margin-right: 15px;"
                            onchange="App.toggleProduct(${p.id})"
                            ${isChecked}>
                        
                        <div>
                            <strong>${p.name}</strong>
                            <div style="color: var(--secondary); font-weight: bold;">${App.formatCurrency(p.price)}</div>
                            <small style="color: #888;">${p.description}</small>
                        </div>
                    </div>
                </div>`;
            }).join('');

            return `<h3 style="margin-top: 20px; border-bottom: 2px solid var(--secondary); display: inline-block;">${cat.name}</h3>
                    <div style="margin-top: 10px;">${productList}</div>`;
        }).join('');

        container.innerHTML = html;
    },

    toggleProduct: (productId) => {
        const cart = Storage.updateCart(productId, 1, 'toggle');
        App.updateCartCount();

        // Show Toast
        const t = document.getElementById('toast');
        if (t) {
            t.style.display = 'block';
            setTimeout(() => { t.style.display = 'none'; }, 2000);
        }
    },

    checkIOS: () => {
        const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator.standalone);

        if (isIos && !isInStandaloneMode) {
            if (!sessionStorage.getItem('iosPromptShown')) {
                const modal = document.getElementById('ios-install-modal');
                if (modal) modal.style.display = 'block';
                sessionStorage.setItem('iosPromptShown', 'true');
            }
        }
    }
};
