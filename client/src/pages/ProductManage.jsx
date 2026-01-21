import React, { useState } from 'react';
import axios from 'axios';

const ProductManage = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [isTimeDeal, setIsTimeDeal] = useState(false);
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // 10MB Limit Check
            if (selectedFile.size > 10 * 1024 * 1024) {
                alert("❌ Image exceeds 10MB limit! Please choose a smaller file.");
                e.target.value = null; // Reset input
                setFile(null);
                return;
            }
            setFile(selectedFile);
        }
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
            await axios.post('/api/products', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Product Registered Successfully!');
            // Reset form
            setName('');
            setPrice('');
            setStock('');
            setFile(null);
            setIsTimeDeal(false);
        } catch (err) {
            console.error(err);
            alert('Upload Failed');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Product Registration (Store Owner)</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
                <input type="text" placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} required />
                <input type="number" placeholder="Price (KRW)" value={price} onChange={e => setPrice(e.target.value)} required />
                <input type="number" placeholder="Stock Qty" value={stock} onChange={e => setStock(e.target.value)} required />

                <label>
                    <input type="checkbox" checked={isTimeDeal} onChange={e => setIsTimeDeal(e.target.checked)} />
                    🔥 Is Time Deal? (Digital Flyer)
                </label>

                <input type="file" accept="image/*" onChange={handleFileChange} required />
                <small style={{ color: 'red' }}>* Max 10MB per image</small>

                <button type="submit" style={{ padding: '10px', backgroundColor: '#2196F3', color: 'white', border: 'none' }}>
                    Register Product
                </button>
            </form>
        </div>
    );
};

export default ProductManage;
