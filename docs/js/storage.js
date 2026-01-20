const Storage = {
    getMart: () => {
        return JSON.parse(localStorage.getItem('selected_mart'));
    },
    setMart: (mart) => {
        localStorage.setItem('selected_mart', JSON.stringify(mart));
    },
    getCart: () => {
        return JSON.parse(localStorage.getItem('cart')) || {};
    },
    setCart: (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
    },
    updateCart: (productId, qty, action = 'update') => {
        const cart = Storage.getCart();
        const pid = String(productId);

        if (action === 'add') {
            cart[pid] = (cart[pid] || 0) + qty;
        } else if (action === 'toggle') {
            if (cart[pid]) delete cart[pid];
            else cart[pid] = 1;
        } else if (action === 'remove') {
            delete cart[pid];
        } else if (action === 'update') {
            if (qty > 0) cart[pid] = qty;
            else delete cart[pid];
        }

        Storage.setCart(cart);
        return cart;
    },
    getOrders: () => {
        return JSON.parse(localStorage.getItem('orders')) || [];
    },
    addOrder: (order) => {
        const orders = Storage.getOrders();
        orders.unshift(order); // Add to top
        localStorage.setItem('orders', JSON.stringify(orders));
    }
};
