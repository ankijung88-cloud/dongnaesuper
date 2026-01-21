import React, { createContext, useContext, useState } from 'react';

const translations = {
    kr: {
        title: "동네슈퍼",
        timedeal: "🔥 마감세일",
        all: "전체상품",
        addToCart: "장바구니 담기",
        home: "홈",
        owner: "점주용",
        cart: "장바구니"
    },
    en: {
        title: "Dongnae Super",
        timedeal: "🔥 Time Deal",
        all: "All Items",
        addToCart: "Add to Cart",
        home: "Home",
        owner: "Owner",
        cart: "Cart"
    },
    vn: {
        title: "Siêu thị khu phố",
        timedeal: "🔥 Giảm giá sốc",
        all: "Tất cả",
        addToCart: "Thêm vào giỏ",
        home: "Trang chủ",
        owner: "Chủ quán",
        cart: "Giỏ hàng"
    },
    cn: {
        title: "社区超市",
        timedeal: "🔥 限时特价",
        all: "全部商品",
        addToCart: "加入购物车",
        home: "首页",
        owner: "店主",
        cart: "购物车"
    },
    th: {
        title: "ซูเปอร์มาร์เก็ตแถวบ้าน",
        timedeal: "🔥 นาทีทอง",
        all: "สินค้าทั้งหมด",
        addToCart: "เพิ่มลงตะกร้า",
        home: "หน้าหลัก",
        owner: "เจ้าของร้าน",
        cart: "ตะกร้าสินค้า"
    }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState('kr');

    const t = (key) => {
        return translations[lang][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
