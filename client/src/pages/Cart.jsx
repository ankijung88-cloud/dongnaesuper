import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Storage from '../utils/storage';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [subPref, setSubPref] = useState('CALL'); // Default: Call me
    const { t, lang } = useLanguage();
    const { user } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        loadCart();
        window.addEventListener('cart-updated', loadCart);

        // Initialize PortOne (Replace 'imp00000000' with your actual Merchant ID)
        if (window.IMP) {
            window.IMP.init('imp48016556'); // Example Test ID. User should update this.
        }

        return () => window.removeEventListener('cart-updated', loadCart);
    }, []);

    const loadCart = () => {
        const cart = Storage.getCart();
        const items = Object.values(cart);
        setCartItems(items);
        const t = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
        setTotal(t);
    };

    const [showPaymentModal, setShowPaymentModal] = useState(false);

    // Styles for Payment Buttons
    const paymentButtonStyle = {
        background: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        height: '100px',
        fontSize: '14px',
        fontWeight: 'bold'
    };
    const iconStyle = { width: '40px', height: '40px', objectFit: 'contain' };

    const openPaymentModal = () => {
        if (cartItems.length === 0) return alert(t('emptyCart'));
        setShowPaymentModal(true);
    };

    const proceedPayment = (selectedMethod) => {
        setShowPaymentModal(false);
        const { IMP } = window;
        if (!IMP) return alert("Payment SDK not loaded");

        // Map selection to PortOne PG
        let pgProvider = 'html5_inicis'; // Default Card
        if (selectedMethod === 'kakaopay') pgProvider = 'kakaopay';
        else if (selectedMethod === 'tosspay') pgProvider = 'tosspay';
        else if (selectedMethod === 'naverpay') pgProvider = 'naverpay';
        else if (selectedMethod === 'alipay') pgProvider = 'alipay';
        else if (selectedMethod === 'mobile') pgProvider = 'danal';

        const data = {
            pg: pgProvider,
            pay_method: selectedMethod === 'mobile' ? 'phone' : 'card',
            merchant_uid: `mid_${new Date().getTime()}`,
            name: cartItems.length > 1 ? `${cartItems[0].name} out of ${cartItems.length} items` : cartItems[0]?.name || 'Order',
            amount: total,
            buyer_name: 'Guest User',
            buyer_tel: '010-1234-5678',
            m_redirect_url: 'http://localhost:5173/payment/complete',
        };

        IMP.request_pay(data, callback);
    };

    const callback = (response) => {
        const { success, error_msg } = response;
        if (success) {
            alert('Payment Successful!');
            handleOrder();
        } else {
            alert(`Payment Failed: ${error_msg}`);
        }
    };

    const handleOrder = async () => {
        // ... (Existing order save logic)
        try {
            const orderData = {
                cartItems,
                total,
                userInfo: {
                    name: user ? user.name : 'Guest',
                    email: user ? user.email : null, // Important for filtering
                    id: user ? user.id : null
                },
                substitutionPreference: subPref
            };

            await axios.post('/api/orders', orderData);
            alert('주문이 완료되었습니다!');
            Storage.clearCart();
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('주문 저장 실패: ' + err.message);
        }
    };

    return (
        <div>
            <h2>{t('cartTitle')}</h2>
            {cartItems.length === 0 ? <p>{t('emptyCart')}</p> : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            {item.name_multiling?.[lang] || item.name} x {item.qty} = {item.price * item.qty} 원
                            <button
                                onClick={() => Storage.updateCart(item, 0, 'remove')}
                                style={{ marginLeft: '8px', border: 'none', background: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#ff4444', padding: '0 5px', lineHeight: '1', verticalAlign: 'middle' }}
                                aria-label="Remove item"
                            >
                                &times;
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <h3>{t('totalPrice')}: {total} 원</h3>

            <div style={{ border: '2px solid #ff9800', padding: '15px', marginTop: '20px', borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 10px 0' }}>{t('subTitle')}</h4>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0', cursor: 'pointer', fontSize: '16px' }}>
                    <input type="radio" name="sub" value="CALL" checked={subPref === 'CALL'} onChange={(e) => setSubPref(e.target.value)} style={{ transform: 'scale(1.2)', width: 'auto' }} />
                    {t('subCall')}
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0', cursor: 'pointer', fontSize: '16px' }}>
                    <input type="radio" name="sub" value="REPLACE" checked={subPref === 'REPLACE'} onChange={(e) => setSubPref(e.target.value)} style={{ transform: 'scale(1.2)', width: 'auto' }} />
                    {t('subReplace')}
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0', cursor: 'pointer', fontSize: '16px' }}>
                    <input type="radio" name="sub" value="REFUND" checked={subPref === 'REFUND'} onChange={(e) => setSubPref(e.target.value)} style={{ transform: 'scale(1.2)', width: 'auto' }} />
                    {t('subRefund')}
                </label>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                {/* Payment Selection Button */}
                <button
                    onClick={openPaymentModal}
                    style={{ padding: '15px 30px', fontSize: '18px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '8px' }}
                >
                    {t('checkout')}
                </button>

                <button
                    onClick={() => navigate('/')}
                    style={{ padding: '15px 30px', fontSize: '18px', backgroundColor: '#2196F3', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '8px' }}
                >
                    Add Items
                </button>
            </div>

            {/* Payment Modal */}
            {showPaymentModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
                }}>
                    <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', width: '90%', maxWidth: '500px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', position: 'relative' }}>
                        <button
                            onClick={() => setShowPaymentModal(false)}
                            style={{ position: 'absolute', top: '25px', right: '25px', border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#666', padding: 0, lineHeight: 1 }}
                        >
                            &times;
                        </button>

                        <h3 style={{ marginTop: 0, textAlign: 'center', marginBottom: '20px', fontSize: '1.5rem' }}>결제 수단 선택</h3>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                            {/* Credit Card */}
                            <button onClick={() => proceedPayment('card')} style={{ ...paymentButtonStyle, background: '#2C3E50', border: 'none' }}>
                                <span style={{ color: 'white' }}>신용/체크카드</span>
                            </button>

                            {/* KakaoPay */}
                            <button onClick={() => proceedPayment('kakaopay')} style={{ ...paymentButtonStyle, background: '#FFEB00', border: 'none' }}>
                                <span style={{ color: '#000000' }}>카카오페이</span>
                            </button>

                            {/* NaverPay */}
                            <button onClick={() => proceedPayment('naverpay')} style={{ ...paymentButtonStyle, background: '#03C75A', border: 'none' }}>
                                <span style={{ color: 'white' }}>네이버페이</span>
                            </button>

                            {/* TossPay */}
                            <button onClick={() => proceedPayment('tosspay')} style={{ ...paymentButtonStyle, background: '#F2F4F6', border: 'none' }}>
                                <span style={{ color: '#333' }}>토스페이</span>
                            </button>

                            {/* AliPay */}
                            <button onClick={() => proceedPayment('alipay')} style={{ ...paymentButtonStyle, background: '#1677FF', border: 'none' }}>
                                <span style={{ color: 'white' }}>알리페이</span>
                            </button>

                            {/* Mobile */}
                            <button onClick={() => proceedPayment('mobile')} style={{ ...paymentButtonStyle, background: '#FF9800', border: 'none' }}>
                                <span style={{ color: 'white' }}>휴대폰 결제</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
