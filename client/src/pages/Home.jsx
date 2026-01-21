import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Storage from '../utils/storage';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState('all'); // 'all' or 'timedeal'
    const { t } = useLanguage();

    useEffect(() => {
        fetchProducts();
    }, [filter]);

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
        Storage.updateCart(product, 1, 'add');
        alert(`${product.name} Added!`);
    };

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h2>{t('title')}</h2>
                <div>
                    <button onClick={() => setFilter('all')} style={{ marginRight: '5px' }}>{t('all')}</button>
                    <button onClick={() => setFilter('timedeal')} style={{ backgroundColor: '#ff5722', color: 'white' }}>{t('timedeal')}</button>
                </div>
            </div>

            <div className="product-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {products.map(p => (
                    <div key={p.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', position: 'relative' }}>
                        {p.isTimeDeal && <span style={{ position: 'absolute', top: '5px', left: '5px', background: 'red', color: 'white', padding: '2px 5px', fontSize: '10px', borderRadius: '4px' }}>TIME DEAL</span>}
                        <img src={p.image.startsWith('/') ? p.image : 'https://via.placeholder.com/150'} alt={p.name} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px' }} />
                        <h4 style={{ margin: '5px 0' }}>{p.name}</h4>
                        <p style={{ margin: '5px 0', fontWeight: 'bold' }}>{p.price} KRW</p>
                        <button
                            onClick={() => addToCart(p)}
                            style={{ width: '100%', padding: '8px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}
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
