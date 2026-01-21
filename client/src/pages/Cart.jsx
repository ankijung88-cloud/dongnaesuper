import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Storage from '../utils/storage';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [subPref, setSubPref] = useState('CALL'); // Default: Call me

    useEffect(() => {
        loadCart();
        window.addEventListener('cart-updated', loadCart);
        return () => window.removeEventListener('cart-updated', loadCart);
    }, []);

    const loadCart = () => {
        const cart = Storage.getCart();
        const items = Object.values(cart);
        setCartItems(items);
        const t = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
        setTotal(t);
    };

    const handleOrder = async () => {
        if (cartItems.length === 0) return alert('Cart is empty');

        try {
            const orderData = {
                cartItems,
                total,
                userInfo: { name: 'Guest User' }, // Mock user
                substitutionPreference: subPref
            };

            await axios.post('/api/orders', orderData);
            alert('Order Placed Successfully!');
            Storage.clearCart();
        } catch (err) {
            console.error(err);
            alert('Order Failed');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? <p>Empty</p> : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            {item.name} x {item.qty} = {item.price * item.qty} KRW
                            <button onClick={() => Storage.updateCart(item, 0, 'remove')}>X</button>
                        </li>
                    ))}
                </ul>
            )}
            <h3>Total: {total} KRW</h3>

            <div style={{ border: '2px solid #ff9800', padding: '15px', marginTop: '20px', borderRadius: '8px' }}>
                <h4>⚠️ If an item is sold out (POS Mismatch):</h4>
                <label style={{ display: 'block', margin: '5px 0' }}>
                    <input type="radio" name="sub" value="CALL" checked={subPref === 'CALL'} onChange={(e) => setSubPref(e.target.value)} />
                    📞 Please Call Me
                </label>
                <label style={{ display: 'block', margin: '5px 0' }}>
                    <input type="radio" name="sub" value="REPLACE" checked={subPref === 'REPLACE'} onChange={(e) => setSubPref(e.target.value)} />
                    🔄 Replace with similar item (Owner's Pick)
                </label>
                <label style={{ display: 'block', margin: '5px 0' }}>
                    <input type="radio" name="sub" value="REFUND" checked={subPref === 'REFUND'} onChange={(e) => setSubPref(e.target.value)} />
                    💰 Refund that item only
                </label>
            </div>

            <button
                onClick={handleOrder}
                style={{ marginTop: '20px', padding: '15px 30px', fontSize: '18px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
            >
                Place Order
            </button>
        </div>
    );
};

export default Cart;
