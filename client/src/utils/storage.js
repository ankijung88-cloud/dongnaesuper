const Storage = {
    getMart: () => {
        const data = localStorage.getItem('selected_mart');
        return data ? JSON.parse(data) : null;
    },
    setMart: (mart) => {
        localStorage.setItem('selected_mart', JSON.stringify(mart));
    },
    getCart: () => {
        const data = localStorage.getItem('cart');
        return data ? JSON.parse(data) : {};
    },
    setCart: (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
    },
    updateCart: (product, qty, action = 'update') => {
        // product: { id, name, price, ... }
        const cart = Storage.getCart();
        const pid = String(product.id);

        if (action === 'add') {
            if (cart[pid]) {
                cart[pid].qty += qty;
            } else {
                cart[pid] = { ...product, qty };
            }
        } else if (action === 'remove') {
            delete cart[pid];
        } else if (action === 'update') {
            if (qty > 0) {
                if (cart[pid]) cart[pid].qty = qty;
            } else {
                delete cart[pid];
            }
        }

        Storage.setCart(cart);
        // Dispatch event for UI components to listen
        window.dispatchEvent(new Event('cart-updated'));
        return cart;
    },
    clearCart: () => {
        localStorage.removeItem('cart');
        window.dispatchEvent(new Event('cart-updated'));
    }
};

export default Storage;
