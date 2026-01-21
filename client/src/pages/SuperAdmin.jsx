import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SuperAdmin = () => {
    const [stats, setStats] = useState({ totalUsers: 0, totalSales: 0, activeOrders: 0 });
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [statsRes, usersRes, ordersRes] = await Promise.all([
                axios.get('/api/admin/stats'),
                axios.get('/api/admin/users'),
                axios.get('/api/orders')
            ]);
            setStats(statsRes.data);
            setUsers(usersRes.data);
            setOrders(ordersRes.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ color: '#673AB7' }}>👑 Super Admin Dashboard</h1>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
                <div style={cardStyle}>
                    <h3>Total Users</h3>
                    <p style={numberStyle}>{stats.totalUsers}</p>
                </div>
                <div style={cardStyle}>
                    <h3>Total Sales</h3>
                    <p style={numberStyle}>{stats.totalSales.toLocaleString()} KRW</p>
                </div>
                <div style={cardStyle}>
                    <h3>Active Orders</h3>
                    <p style={numberStyle}>{orders.length}</p>
                </div>
                <div style={cardStyle}>
                    <h3>Daily Visitors</h3>
                    <p style={numberStyle}>{stats.dailyVisitors}</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* Recent Orders */}
                <div style={sectionStyle}>
                    <h2>Recent Orders (Logistics)</h2>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {orders.map(order => (
                            <li key={order.id} style={listItemStyle}>
                                <span>Order #{order.id}</span>
                                <span>{order.total.toLocaleString()} KRW</span>
                                <span style={{
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    backgroundColor: order.substitutionPreference === 'CALL' ? '#FF9800' : '#4CAF50',
                                    color: 'white',
                                    fontSize: '12px'
                                }}>
                                    Sub: {order.substitutionPreference}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* User Mgmt */}
                <div style={sectionStyle}>
                    <h2>User Management</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f5f5f5', textAlign: 'left' }}>
                                <th style={{ padding: '8px' }}>Name</th>
                                <th style={{ padding: '8px' }}>Role</th>
                                <th style={{ padding: '8px' }}>Join Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '8px' }}>{user.name}</td>
                                    <td style={{ padding: '8px' }}>{user.role}</td>
                                    <td style={{ padding: '8px' }}>{user.joinDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const cardStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center'
};

const numberStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    margin: '10px 0 0 0'
};

const sectionStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
};

const listItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #eee'
};

export default SuperAdmin;
