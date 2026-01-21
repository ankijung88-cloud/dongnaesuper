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
        if (cartItems.length === 0) return alert('장바구니가 비어있습니다');

        try {
            const orderData = {
                cartItems,
                total,
                userInfo: { name: 'Guest User' }, // Mock user
                substitutionPreference: subPref
            };

            await axios.post('/api/orders', orderData);
            alert('주문이 완료되었습니다!');
            Storage.clearCart();
        } catch (err) {
            console.error(err);
            alert('주문 실패');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>장바구니</h2>
            {cartItems.length === 0 ? <p>비어있음</p> : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            {item.name} x {item.qty} = {item.price * item.qty} 원
                            <button onClick={() => Storage.updateCart(item, 0, 'remove')}>X</button>
                        </li>
                    ))}
                </ul>
            )}
            <h3>총계: {total} 원</h3>

            <div style={{ border: '2px solid #ff9800', padding: '15px', marginTop: '20px', borderRadius: '8px' }}>
                <h4>⚠️ 품절 시 대체 방법 (필수 선택):</h4>
                <label style={{ display: 'block', margin: '5px 0' }}>
                    <input type="radio" name="sub" value="CALL" checked={subPref === 'CALL'} onChange={(e) => setSubPref(e.target.value)} />
                    📞 전화주세요
                </label>
                <label style={{ display: 'block', margin: '5px 0' }}>
                    <input type="radio" name="sub" value="REPLACE" checked={subPref === 'REPLACE'} onChange={(e) => setSubPref(e.target.value)} />
                    🔄 비슷한 상품으로 대체 (사장님 추천)
                </label>
                <label style={{ display: 'block', margin: '5px 0' }}>
                    <input type="radio" name="sub" value="REFUND" checked={subPref === 'REFUND'} onChange={(e) => setSubPref(e.target.value)} />
                    💰 해당 상품만 환불
                </label>
            </div>

            <button
                onClick={handleOrder}
                style={{ marginTop: '20px', padding: '15px 30px', fontSize: '18px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
            >
                주문하기
            </button>
        </div>
    );
};

export default Cart;
