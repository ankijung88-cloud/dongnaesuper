import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManage = () => {
    // Form State
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [isTimeDeal, setIsTimeDeal] = useState(false);
    const [file, setFile] = useState(null);

    // List State
    const [products, setProducts] = useState([]);
    const [selectedIds, setSelectedIds] = useState(new Set());

    // Category State
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [selectedSubCategory, setSelectedSubCategory] = useState('전체');

    // Derived Categories
    const categories = ['전체', ...new Set(products.map(p => p.category).filter(Boolean))];
    const subCategories = selectedCategory === '전체'
        ? []
        : ['전체', ...new Set(products.filter(p => p.category === selectedCategory).map(p => p.subCategory).filter(Boolean))];

    // Filtered Products
    const filteredProducts = products.filter(p => {
        if (selectedCategory !== '전체' && p.category !== selectedCategory) return false;
        if (selectedSubCategory !== '전체' && p.subCategory !== selectedSubCategory) return false;
        return true;
    });

    // Store Stats State

    // Store Stats State
    const [storeStats, setStoreStats] = useState({
        yesterdaySales: 0,
        settlementAmount: 0,
        settlementStatus: '미완료',
        todaySales: 0
    });

    useEffect(() => {
        fetchProducts();
        fetchStoreStats();
    }, []);

    const fetchStoreStats = async () => {
        try {
            const res = await axios.get('/api/orders/store-stats');
            setStoreStats(res.data);
        } catch (err) {
            console.error("Failed to fetch store stats", err);
        }
    };

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('/api/products', {
                headers: { 'x-auth-token': token }
            });
            setProducts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // 1. Size Limit Check (10MB) - Fail fast
            if (selectedFile.size > 10 * 1024 * 1024) {
                alert("❌ 이미지가 10MB를 초과합니다! 더 작은 파일을 선택해주세요.");
                e.target.value = null;
                setFile(null);
                return;
            }

            // 2. Auto-Resize Logic (Max 800px width/height)
            try {
                const resizedFile = await resizeImage(selectedFile, 800, 800);
                setFile(resizedFile);
            } catch (err) {
                console.error("Resize failed", err);
                // Fallback to original if resize fails
                setFile(selectedFile);
            }
        }
    };

    // Helper: Client-side Image Resizing
    const resizeImage = (file, maxWidth, maxHeight) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }

                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    canvas.toBlob((blob) => {
                        const resizedFile = new File([blob], file.name, {
                            type: file.type,
                            lastModified: Date.now(),
                        });
                        resolve(resizedFile);
                    }, file.type, 0.8); // 0.8 quality
                };
            };
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('isTimeDeal', isTimeDeal);
        if (file) formData.append('image', file);

        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': token
                }
            });
            alert('상품이 성공적으로 등록되었습니다!');
            // Reset
            setName('');
            setPrice('');
            setStock('');
            setFile(null);
            setIsTimeDeal(false);
            fetchProducts(); // Refresh list
        } catch (err) {
            console.error(err);
            alert('업로드 실패');
        }
    };

    const toggleSelect = (id) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    const handleDeleteSelected = async () => {
        if (selectedIds.size === 0) return;
        if (!window.confirm(`${selectedIds.size}개의 상품을 삭제하시겠습니까?`)) return;

        try {
            // Parallel delete requests (simplest for now)
            const token = localStorage.getItem('token');
            await Promise.all([...selectedIds].map(id => axios.delete(`/api/products/${id}`, {
                headers: { 'x-auth-token': token }
            })));
            alert('삭제되었습니다!');
            setSelectedIds(new Set());
            fetchProducts();
        } catch (err) {
            console.error(err);
            alert('삭제 실패');
        }
    };

    const handlePosSync = async () => {
        try {
            const res = await axios.post('/api/pos/sync');
            alert(`POS 동기화 완료! ${res.data.syncedDetails.newlyRegistered}개의 신상품이 등록되었습니다.`);
            fetchProducts();
        } catch (err) {
            console.error(err);
            alert('POS 동기화 실패');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <h2 style={{ margin: 0 }}>상품 등록 (점주용)</h2>
                <button
                    onClick={() => window.open('/pos', '_blank')}
                    style={{
                        padding: '8px 12px',
                        background: '#333',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '14px'
                    }}
                >
                    📟 가상 POS 터미널 열기
                </button>
            </div>

            {/* POS Integration Panel */}
            <div style={{ background: '#e3f2fd', borderRadius: '8px', marginBottom: '20px', padding: '15px', border: '1px solid #90caf9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h3 style={{ margin: '0 0 5px 0', color: '#1565c0' }}>📶 POS 시스템 연동</h3>
                        <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>
                            매장의 POS 데이터와 실시간으로 연동됩니다. 별도의 등록이 필요 없습니다.
                        </p>
                    </div>
                    <button
                        onClick={handlePosSync}
                        style={{
                            background: '#1565c0',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        POS 데이터 불러오기 (동기화)
                    </button>
                </div>
            </div>

            {/* Registration Form */}
            <details style={{ marginBottom: '20px' }}>
                <summary style={{ cursor: 'pointer', color: '#666', marginBottom: '10px' }}>수동 등록 (상품이 POS에 없는 경우)</summary>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', marginBottom: '40px' }}>
                    <input type="text" placeholder="상품명" value={name} onChange={e => setName(e.target.value)} required style={{ padding: '8px' }} />
                    <input type="number" placeholder="가격 (원)" value={price} onChange={e => setPrice(e.target.value)} required style={{ padding: '8px' }} />
                    <input type="number" placeholder="재고 수량" value={stock} onChange={e => setStock(e.target.value)} required style={{ padding: '8px' }} />

                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <input type="checkbox" checked={isTimeDeal} onChange={e => setIsTimeDeal(e.target.checked)} />
                        🔥 타임세일 상품인가요? (전단지 노출)
                    </label>

                    <input type="file" accept="image/*" onChange={handleFileChange} required />
                    <small style={{ color: 'red' }}>* 이미지당 최대 10MB</small>

                    <button type="submit" style={{ padding: '10px', backgroundColor: '#2196F3', color: 'white', border: 'none', cursor: 'pointer' }}>
                        상품 등록하기
                    </button>
                </form>
            </details>

            <hr />

            {/* Split Layout: Product Grid (Left) + Dashboard (Right) */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>

                <div style={{ flex: 3 }}>
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <h3 style={{ margin: 0 }}>재고 목록 ({filteredProducts.length})</h3>
                            {selectedIds.size > 0 && (
                                <button onClick={handleDeleteSelected} style={{ background: '#f44336', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer' }}>
                                    선택 삭제 ({selectedIds.size})
                                </button>
                            )}
                        </div>

                        {/* Large Category Tabs */}
                        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '5px', marginBottom: '10px' }}>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setSelectedCategory(cat);
                                        setSelectedSubCategory('전체');
                                    }}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: '20px',
                                        border: '1px solid #ddd',
                                        background: selectedCategory === cat ? '#2196F3' : 'white',
                                        color: selectedCategory === cat ? 'white' : '#666',
                                        cursor: 'pointer',
                                        whiteSpace: 'nowrap',
                                        fontWeight: selectedCategory === cat ? 'bold' : 'normal',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Sub Category Chips (Only if specific category selected) */}
                        {selectedCategory !== '전체' && (
                            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '5px' }}>
                                {subCategories.map(sub => (
                                    <button
                                        key={sub}
                                        onClick={() => setSelectedSubCategory(sub)}
                                        style={{
                                            padding: '6px 12px',
                                            borderRadius: '15px',
                                            border: '1px solid #eee',
                                            background: selectedSubCategory === sub ? '#e3f2fd' : '#f5f5f5',
                                            color: selectedSubCategory === sub ? '#1565c0' : '#888',
                                            fontSize: '13px',
                                            cursor: 'pointer',
                                            whiteSpace: 'nowrap',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        #{sub}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 6-Column Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(6, 1fr)',
                        gap: '10px',
                        width: '100%',
                    }}>
                        {filteredProducts.map(product => (
                            <div key={product.id} style={{
                                border: selectedIds.has(product.id) ? '2px solid #2196F3' : '1px solid #ddd',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                position: 'relative',
                                background: 'white',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                aspectRatio: '1/1.2',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <div style={{ position: 'absolute', top: '5px', left: '5px', zIndex: 10 }}>
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.has(product.id)}
                                        onChange={() => toggleSelect(product.id)}
                                        style={{ transform: 'scale(1.5)', cursor: 'pointer' }}
                                    />
                                </div>
                                <div style={{ flex: 1, overflow: 'hidden' }}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <div style={{ padding: '10px', fontSize: '12px', textAlign: 'center', background: '#fff', borderTop: '1px solid #eee' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '5px' }}>
                                        {product.name}
                                    </div>
                                    <div style={{ color: '#E91E63', fontWeight: 'bold', fontSize: '13px' }}>{product.price.toLocaleString()}원</div>
                                    <div style={{ color: '#888', marginTop: '3px' }}>재고: {product.stock}개</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: Store Dashboard Panel (Fixed Width) */}
                <div style={{
                    flex: 1,
                    minWidth: '300px',
                    position: 'sticky',
                    top: '20px'
                }}>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '1px solid #e0e0e0' }}>
                        <h3 style={{ marginTop: 0, borderBottom: '2px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>📊 내 점포 현황</h3>

                        <div style={{ marginBottom: '20px' }}>
                            <div style={{ color: '#666', fontSize: '14px', marginBottom: '5px' }}>전일 매출액 (00:00~24:00)</div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{storeStats.yesterdaySales.toLocaleString()} 원</div>
                        </div>

                        <div style={{ marginBottom: '20px', background: '#f5f5f5', padding: '15px', borderRadius: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <div style={{ color: '#1565c0', fontWeight: 'bold' }}>정산 예정 금액 (95%)</div>
                                <span style={{
                                    background: storeStats.settlementStatus === '정산완료' ? '#2e7d32' : '#c62828',
                                    color: 'white',
                                    padding: '2px 8px',
                                    borderRadius: '10px',
                                    fontSize: '12px'
                                }}>
                                    {storeStats.settlementStatus}
                                </span>
                            </div>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1565c0', textAlign: 'right' }}>
                                {storeStats.settlementAmount.toLocaleString()} 원
                            </div>
                        </div>

                        <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
                            <div style={{ color: '#d32f2f', fontSize: '14px', marginBottom: '5px' }}>금일 매출 현황 (00:00~현재)</div>
                            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#d32f2f' }}>{storeStats.todaySales.toLocaleString()} 원</div>
                            <div style={{ fontSize: '12px', color: '#888', marginTop: '5px' }}>* 실시간 POS 연동 집계중</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductManage;
