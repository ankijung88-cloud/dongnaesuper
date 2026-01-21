import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUserManage = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('/api/auth/users', {
                headers: { 'x-auth-token': token }
            });
            setUsers(res.data);
        } catch (err) {
            console.error(err);
            alert('Failed to fetch users');
        }
    };

    const handleCreateOwner = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/auth/create-owner', {
                name, email, password
            }, {
                headers: { 'x-auth-token': token }
            });

            alert('점주 계정이 생성되었습니다.');
            setName('');
            setEmail('');
            setPassword('');
            fetchUsers();
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.msg || '계정 생성 실패');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2>👥 사용자 관리 (슈퍼 관리자용)</h2>

            {/* Create Owner Form */}
            <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
                <h3 style={{ marginTop: 0 }}>🏪 새 점주 등록</h3>
                <form onSubmit={handleCreateOwner} style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <input
                        type="text"
                        placeholder="이름 (예: 홍길동)"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        style={{ padding: '8px' }}
                    />
                    <input
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        style={{ padding: '8px' }}
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        style={{ padding: '8px' }}
                    />
                    <button type="submit" style={{ padding: '8px 16px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        등록
                    </button>
                </form>
            </div>

            {/* User List */}
            <h3>등록된 사용자 목록</h3>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '8px', overflow: 'hidden' }}>
                    <thead>
                        <tr style={{ background: '#333', color: 'white' }}>
                            <th style={{ padding: '10px', textAlign: 'left' }}>ID</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>이름</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>이메일</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>권한</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>가입일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '10px' }}>{u.id}</td>
                                <td style={{ padding: '10px' }}>{u.name}</td>
                                <td style={{ padding: '10px' }}>{u.email}</td>
                                <td style={{ padding: '10px' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        background: u.role === 'admin' ? '#E91E63' : u.role === 'owner' ? '#2196F3' : '#9E9E9E',
                                        color: 'white'
                                    }}>
                                        {u.role === 'admin' ? '관리자' : u.role === 'owner' ? '점주' : '사용자'}
                                    </span>
                                </td>
                                <td style={{ padding: '10px' }}>{u.joinDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUserManage;
