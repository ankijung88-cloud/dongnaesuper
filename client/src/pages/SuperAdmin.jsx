import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SuperAdmin = () => {
    const [stats, setStats] = useState({ totalUsers: 0, totalSales: 0, activeOrders: 0, salesByRegion: [] });
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

    const getFormattedDate = (daysAgo = 0) => {
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        return `${date.getMonth() + 1}/${date.getDate()}`;
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ color: '#673AB7' }}>👑 슈퍼 관리자 대시보드</h1>

            {/* Stats Cards */}
            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
                <div style={cardStyle}>
                    <h3>총 사용자</h3>
                    <p style={numberStyle}>{stats.totalUsers}</p>
                </div>
                <div style={cardStyle}>
                    <h3>총 수수료 (5%)</h3>
                    <p style={numberStyle}>{stats.totalSales.toLocaleString()} 원</p>
                </div>
                <div style={cardStyle}>
                    <h3>진행 중인 주문</h3>
                    <p style={numberStyle}>{orders.length}</p>
                </div>
                <div style={cardStyle}>
                    <h3>일일 방문자</h3>
                    <p style={numberStyle}>{stats.dailyVisitors}</p>
                </div>
            </div>

            {/* Sales by Region/Store */}
            <div style={{ ...sectionStyle, marginBottom: '20px' }}>
                <h2>지역별 점포 매출 현황</h2>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                        <thead>
                            <tr style={{ background: '#f5f5f5', textAlign: 'left' }}>
                                <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>지역</th>
                                <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>점포명</th>
                                <th style={{ padding: '10px', borderBottom: '2px solid #ddd', textAlign: 'center' }}>정산상태</th>
                                <th style={{ padding: '10px', borderBottom: '2px solid #ddd', textAlign: 'right', color: '#666' }}>
                                    전일매출액<br />
                                    <span style={{ fontSize: '11px' }}>{getFormattedDate(1)} (00:00~24:00)</span>
                                </th>
                                <th style={{ padding: '10px', borderBottom: '2px solid #ddd', textAlign: 'right', color: '#1976D2' }}>정산금액 (95%)</th>
                                <th style={{ padding: '10px', borderBottom: '2px solid #ddd', textAlign: 'right', color: '#d32f2f' }}>
                                    금일매출액<br />
                                    <span style={{ fontSize: '11px' }}>{getFormattedDate(0)} (00:00~현재)</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.salesByRegion && stats.salesByRegion.map((item, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '10px' }}>{item.region}</td>
                                    <td style={{ padding: '10px' }}>{item.store}</td>
                                    <td style={{ padding: '10px', textAlign: 'center' }}>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            color: item.settlementStatus ? '#2e7d32' : '#c62828',
                                            backgroundColor: item.settlementStatus ? '#e8f5e9' : '#ffebee'
                                        }}>
                                            {item.settlementStatus ? '정산완료' : '미완료'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '10px', textAlign: 'right', color: '#666' }}>
                                        {item.yesterdaySales.toLocaleString()} 원
                                    </td>
                                    <td style={{ padding: '10px', textAlign: 'right', fontWeight: 'bold', color: '#1976D2' }}>
                                        {item.settlementAmount ? item.settlementAmount.toLocaleString() : 0} 원
                                    </td>
                                    <td style={{ padding: '10px', textAlign: 'right', fontWeight: 'bold', color: '#d32f2f' }}>
                                        {item.todaySales.toLocaleString()} 원
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* Recent Orders */}
                <div style={sectionStyle}>
                    <h2>최근 주문 (배송 관리)</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f5f5f5', textAlign: 'left' }}>
                                <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>주문번호</th>
                                <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>결제금액</th>
                                <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>대체방법</th>
                                <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map(order => (
                                    <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '8px' }}>#{order.id}</td>
                                        <td style={{ padding: '8px' }}>{order.total.toLocaleString()} 원</td>
                                        <td style={{ padding: '8px' }}>
                                            <span style={{
                                                padding: '2px 6px',
                                                borderRadius: '4px',
                                                backgroundColor: order.substitutionPreference === 'CALL' ? '#FF9800' : '#4CAF50',
                                                color: 'white',
                                                fontSize: '12px'
                                            }}>
                                                {order.substitutionPreference}
                                            </span>
                                        </td>
                                        <td style={{ padding: '8px' }}>{order.status || '접수대기'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                                        최근 주문 내역이 없습니다.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* User Mgmt */}
                <div style={sectionStyle}>
                    <h2>사용자 관리</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f5f5f5', textAlign: 'left' }}>
                                <th style={{ padding: '8px' }}>이름</th>
                                <th style={{ padding: '8px' }}>역할</th>
                                <th style={{ padding: '8px' }}>가입일</th>
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
