import React, { useState } from 'react';
import axios from 'axios';

const PosTerminal = () => {
    const [barcode, setBarcode] = useState('');
    const [log, setLog] = useState([]);
    const [lastItem, setLastItem] = useState(null);

    // Mock barcodes from posDb.js for easy testing
    const mockBarcodes = [
        { code: '8801043006093', name: '신라면' },
        { code: '8801094017200', name: '코카콜라' },
        { code: '8801111612933', name: '서울우유' },
        { code: '8801062320491', name: '초코파이' },
        { code: '8801056150011', name: '칠성사이다' }
    ];

    const handleScan = async (codeToScan) => {
        const code = codeToScan || barcode;
        if (!code) return;

        try {
            const res = await axios.post('/api/pos/scan', { barcode: code });
            const newItem = res.data.item;
            const action = res.data.action; // REGISTERED or UPDATED

            setLastItem(newItem);

            const logEntry = `[${new Date().toLocaleTimeString()}] ${newItem.name} (${code}) - ${action === 'REGISTERED' ? '✅ 앱 자동등록됨' : '🔄 정보 동기화됨'}`;
            setLog(prev => [logEntry, ...prev]);
            setBarcode(''); // Clear input
        } catch (err) {
            console.error(err);
            setLog(prev => [`[${new Date().toLocaleTimeString()}] ❌ 스캔 실패 (POS DB 없음)`, ...prev]);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'monospace' }}>
            <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>📟 가상 POS 터미널</h1>

            <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
                <h3>🔍 바코드 스캔 (시뮬레이션)</h3>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <input
                        type="text"
                        value={barcode}
                        onChange={(e) => setBarcode(e.target.value)}
                        placeholder="바코드 입력..."
                        style={{ flex: 1, padding: '10px', fontSize: '16px' }}
                        onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                    />
                    <button onClick={() => handleScan()} style={{ padding: '10px 20px', background: '#333', color: 'white' }}>스캔</button>
                </div>

                <div style={{ marginTop: '10px' }}>
                    <small>테스트용 단축키:</small>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '5px' }}>
                        {mockBarcodes.map(b => (
                            <button
                                key={b.code}
                                onClick={() => handleScan(b.code)}
                                style={{ fontSize: '12px', padding: '5px 8px', background: '#ddd', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                {b.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Display Screen */}
            <div style={{
                background: '#000',
                color: '#0f0',
                padding: '20px',
                borderRadius: '5px',
                minHeight: '200px',
                marginBottom: '20px'
            }}>
                {lastItem ? (
                    <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '1px dashed #0f0', paddingBottom: '10px' }}>
                        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{lastItem.name}</div>
                        <div style={{ fontSize: '30px', marginTop: '10px' }}>₩ {lastItem.price.toLocaleString()}</div>
                        <div style={{ marginTop: '5px' }}>바코드: {lastItem.barcode}</div>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', opacity: 0.5, padding: '20px' }}>
                        POS 대기중...
                    </div>
                )}

                <div style={{ height: '150px', overflowY: 'auto', borderTop: '1px solid #333', paddingTop: '10px' }}>
                    {log.map((l, i) => (
                        <div key={i} style={{ marginBottom: '5px' }}>{l}</div>
                    ))}
                </div>
            </div>

            <div style={{ textAlign: 'center' }}>
                <a href="/" style={{ color: 'blue' }}>🏠 동네슈퍼 앱으로 돌아가기</a>
            </div>
        </div>
    );
};

export default PosTerminal;
