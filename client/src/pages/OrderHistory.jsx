import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
    const { t, lang } = useLanguage();
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.email) {
            fetchOrders();
        }
    }, [user]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`/api/orders?email=${user.email}`);
            // Sort by latest first
            const sortedOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setOrders(sortedOrders);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'RECEIVED': return t('statusReceived'); // 주문접수
            case 'PREPARING': return t('statusPreparing'); // 상품준비중
            case 'DELIVERING': return t('statusDelivering'); // 배송중
            case 'COMPLETED': return t('statusCompleted'); // 배송완료
            default: return status;
        }
    };

    if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <h2>{t('orderHistory')}</h2>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', backgroundColor: 'white', fontSize: '14px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>{t('orderDate')}</th>
                            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>{t('all')}</th>
                            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'right' }}>{t('orderTotal')}</th>
                            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>{t('orderStatus')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="4" style={{ padding: '50px', textAlign: 'center', color: '#666', border: '1px solid #ddd' }}>
                                    <p style={{ marginBottom: '20px', fontSize: '1.2em' }}>{t('noOrders')}</p>
                                    <button
                                        onClick={() => navigate('/')}
                                        style={{ padding: '10px 20px', backgroundColor: '#FF9800', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                                    >
                                        {t('continueShopping')}
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            orders.map(order => (
                                <tr key={order.id} style={{ borderBottom: '1px solid #ddd' }}>
                                    <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                                        {new Date(order.createdAt).toLocaleDateString()} <br />
                                        <span style={{ color: '#888', fontSize: '0.9em' }}>{new Date(order.createdAt).toLocaleTimeString()}</span>
                                    </td>
                                    <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                                        {order.items.map(item => (
                                            <div key={item.id || item.name}>
                                                {item.name_multiling?.[lang] || item.name}
                                                <span style={{ color: '#888', marginLeft: '5px' }}>x {item.qty}</span>
                                            </div>
                                        ))}
                                    </td>
                                    <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>
                                        {order.total.toLocaleString()} 원
                                    </td>
                                    <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>
                                        <span style={{
                                            padding: '6px 12px',
                                            borderRadius: '20px',
                                            backgroundColor: order.status === 'COMPLETED' ? '#E8F5E9' : '#E3F2FD',
                                            color: order.status === 'COMPLETED' ? '#2E7D32' : '#1565C0',
                                            fontWeight: 'bold',
                                            fontSize: '0.85em',
                                            display: 'inline-block'
                                        }}>
                                            {getStatusLabel(order.status)}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderHistory;
