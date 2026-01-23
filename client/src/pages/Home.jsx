import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Storage from '../utils/storage';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState('all'); // 'all' or 'timedeal'
    const { t, lang } = useLanguage();
    const { user } = useAuth();
    const [selectedCategory, setSelectedCategory] = useState(t('allCategories'));
    const [selectedSubCategory, setSelectedSubCategory] = useState(t('allCategories'));

    // Helpers for dynamic localization
    const getLocalName = (p) => p.name_multiling?.[lang] || p.name;
    const getLocalCategory = (p) => p.category_multiling?.[lang] || p.category;

    useEffect(() => {
        fetchProducts();
    }, [filter]);

    // Reset category selection when language changes
    useEffect(() => {
        setSelectedCategory(t('allCategories'));
        setSelectedSubCategory(t('allCategories'));
    }, [lang]);

    const fetchProducts = async () => {
        const url = filter === 'timedeal' ? '/api/products?type=timedeal' : '/api/products';
        try {
            const res = await axios.get(url);
            setProducts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const addToCart = (product) => {
        if (!user) {
            alert(t('loginRequired') || '로그인이 필요합니다.');
            return;
        }
        // Pass the full product, but Cart needs to handle localization too
        Storage.updateCart(product, 1, 'add');
        alert(`${getLocalName(product)} Added!`);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                <div className="header-left-section">
                    <h2 style={{ margin: 0, whiteSpace: 'nowrap' }}>{t('martSearch')}</h2>

                    {/* Unified Search Bar */}
                    <div className="search-bar-container">
                        <select style={{ border: 'none', outline: 'none', background: 'transparent', padding: '12px 5px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold', color: '#555' }}>
                            <option value="">{t('allRegions')}</option>
                            <option value="seoul">{t('seoul')}</option>
                            <option value="gyeonggi">{t('gyeonggi')}</option>
                            <option value="incheon">{t('incheon')}</option>
                            <option value="gangwon">{t('gangwon')}</option>
                            <option value="visiting">{t('visiting')}</option>
                            <option value="gwangju">{t('gwangju')}</option>
                            <option value="daegu">{t('daegu')}</option>
                            <option value="busan">{t('busan')}</option>
                            <option value="jeju">{t('jeju')}</option>
                        </select>
                        <div style={{ width: '1px', height: '24px', background: '#ddd', margin: '0 10px' }}></div>
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            className="search-input"
                        />
                    </div>
                </div>
                <div>
                    <button onClick={() => setFilter('all')} style={{ marginRight: '5px', borderRadius: '20px' }}>{t('all')}</button>
                    <button onClick={() => setFilter('timedeal')} style={{ backgroundColor: '#ff5722', color: 'white', borderRadius: '20px' }}>{t('timedeal')}</button>
                </div>
            </div>

            {/* Category Navigation (Horizontal Scroll) */}
            <div style={{ marginBottom: '15px' }}>
                {/* Large Category Tabs */}
                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '5px', marginBottom: '10px', scrollbarWidth: 'none' }}>
                    {[t('allCategories'), ...new Set(products.map(p => getLocalCategory(p)).filter(Boolean))].map(cat => (
                        <button
                            key={cat}
                            onClick={() => {
                                setSelectedCategory(cat);
                                setSelectedSubCategory(t('allCategories'));
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
                                transition: 'all 0.2s',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Sub Category Chips */}
                {selectedCategory !== t('allCategories') && (
                    <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '5px', scrollbarWidth: 'none' }}>
                        {[t('allCategories'), ...new Set(products
                            .filter(p => getLocalCategory(p) === selectedCategory)
                            .map(p => p.subCategory).filter(Boolean)
                        )].map(sub => (
                            <button
                                key={sub}
                                onClick={() => setSelectedSubCategory(sub)}
                                style={{
                                    padding: '6px 14px',
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

            <div className="product-list">
                {products
                    .filter(p => {
                        // 1. Time Deal Filter (Existing)
                        if (filter === 'timedeal' && !p.isTimeDeal) return false;
                        // 2. Category Filter (New - Localized)
                        if (selectedCategory !== t('allCategories') && getLocalCategory(p) !== selectedCategory) return false;
                        if (selectedSubCategory !== t('allCategories') && p.subCategory !== selectedSubCategory) return false;
                        return true;
                    })
                    .map(p => (
                        <div key={p.id} className="product-card">
                            {p.isTimeDeal && <span style={{ position: 'absolute', top: '5px', left: '5px', background: 'red', color: 'white', padding: '2px 5px', fontSize: '10px', borderRadius: '4px', zIndex: 1 }}>{t('timeDealLabel')}</span>}
                            <img src={p.image.startsWith('/') ? p.image : 'https://via.placeholder.com/150'} alt={getLocalName(p)} />

                            <div className="product-info">
                                <h4 className="product-name">{getLocalName(p)}</h4>
                                <p className="product-price">{p.price.toLocaleString()} 원</p>
                                {p.subCategory && <span style={{ fontSize: '11px', color: '#888', background: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>{p.subCategory}</span>}
                            </div>

                            <button
                                onClick={() => addToCart(p)}
                                className="add-to-cart-btn"
                            >
                                {t('addToCart')}
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Home;
