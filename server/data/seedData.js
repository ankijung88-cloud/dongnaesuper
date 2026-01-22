const seedProducts = [
    // 1. 신선식품 (Fresh Food)
    {
        ownerId: 2, id: 101, name: '혜자로운 도시락', price: 5500, stock: 10, category: '신선식품', subCategory: '도시락', image: '/uploads/dosirak.png',
        name_multiling: { kr: '혜자로운 도시락', en: 'Hyeja Lunchbox', cn: '惠慈便当', vn: 'Cơm hộp Hyeja', th: 'ข้าวกล่องฮเยจา' },
        category_multiling: { kr: '신선식품', en: 'Fresh Food', cn: '生鲜食品', vn: 'Thực phẩm tươi', th: 'อาหารสด' }
    },
    {
        ownerId: 2, id: 102, name: '삼각김밥 (참치마요)', price: 1200, stock: 15, category: '신선식품', subCategory: '김밥/주먹밥', image: '/uploads/gimbap.png',
        name_multiling: { kr: '삼각김밥 (참치마요)', en: 'Tuna Mayo Triangle Kimbap', cn: '金枪鱼蛋黄酱三角饭团', vn: 'Cơm nắm cá ngừ mayo', th: 'คิมบับสามเหลี่ยมทูน่ามายองเนส' },
        category_multiling: { kr: '신선식품', en: 'Fresh Food', cn: '生鲜食品', vn: 'Thực phẩm tươi', th: 'อาหารสด' }
    },
    {
        ownerId: 2, id: 103, name: '인가샌드위치', price: 2500, stock: 12, category: '신선식품', subCategory: '샌드위치/버거', image: '/uploads/sandwich.png',
        name_multiling: { kr: '인가샌드위치', en: 'Inkigayo Sandwich', cn: '人气歌谣三明治', vn: 'Bánh mì Inkigayo', th: 'แซนด์วิชอินกิกาโย' },
        category_multiling: { kr: '신선식품', en: 'Fresh Food', cn: '生鲜食品', vn: 'Thực phẩm tươi', th: 'อาหารสด' }
    },
    {
        ownerId: 2, id: 104, name: '훈제란 2입', price: 2000, stock: 30, category: '신선식품', subCategory: '간편식', image: '/uploads/egg.png',
        name_multiling: { kr: '훈제란 2입', en: 'Smoked Eggs (2pcs)', cn: '熏蛋 (2个)', vn: 'Trứng hun khói (2 quả)', th: 'ไข่รมควัน (2 ฟอง)' },
        category_multiling: { kr: '신선식품', en: 'Fresh Food', cn: '生鲜食品', vn: 'Thực phẩm tươi', th: 'อาหารสด' }
    },

    // 2. 가공식품 (Processed Food)
    {
        ownerId: 2, id: 201, name: '농심 신라면 컵', price: 1150, stock: 50, category: '가공식품', subCategory: '라면', image: '/uploads/shin_cup.png',
        name_multiling: { kr: '농심 신라면 컵', en: 'Nongshim Shin Ramyun Cup', cn: '农心辛拉面杯面', vn: 'Mì ly Shin Nongshim', th: 'บะหมี่ถ้วยชินราเมียน' },
        category_multiling: { kr: '가공식품', en: 'Processed Food', cn: '加工食品', vn: 'Thực phẩm chế biến', th: 'อาหารแปรรูป' }
    },
    {
        ownerId: 2, id: 202, name: '삼양 불닭볶음면 컵', price: 1600, stock: 40, category: '가공식품', subCategory: '라면', image: '/uploads/buldak_cup.png',
        name_multiling: { kr: '삼양 불닭볶음면 컵', en: 'Samyang Buldak Ramen Cup', cn: '三养火鸡面杯面', vn: 'Mì ly gà cay Samyang', th: 'บะหมี่ถ้วยบุลดัก' },
        category_multiling: { kr: '가공식품', en: 'Processed Food', cn: '加工食品', vn: 'Thực phẩm chế biến', th: 'อาหารแปรรูป' }
    },
    {
        ownerId: 2, id: 203, name: '햇반 210g', price: 2100, stock: 45, category: '가공식품', subCategory: '즉석밥/죽', image: '/uploads/hetbahn.png',
        name_multiling: { kr: '햇반 210g', en: 'Hetbahn Instant Rice 210g', cn: '嗨饭方便米饭 210g', vn: 'Cơm ăn liền Hetbahn 210g', th: 'ข้าวสวยพร้อมทาน Hetbahn 210g' },
        category_multiling: { kr: '가공식품', en: 'Processed Food', cn: '加工食品', vn: 'Thực phẩm chế biến', th: 'อาหารแปรรูป' }
    },
    {
        ownerId: 2, id: 204, name: '스팸 클래식 200g', price: 4500, stock: 20, category: '가공식품', subCategory: '통조림', image: '/uploads/spam.png',
        name_multiling: { kr: '스팸 클래식 200g', en: 'Spam Classic 200g', cn: '世邦午餐肉 200g', vn: 'Thịt hộp Spam Classic 200g', th: 'สแปมคลาสสิก 200g' },
        category_multiling: { kr: '가공식품', en: 'Processed Food', cn: '加工食品', vn: 'Thực phẩm chế biến', th: 'อาหารแปรรูป' }
    },

    // 3. 과자/간식 (Snacks)
    {
        ownerId: 2, id: 301, name: '농심 새우깡', price: 1500, stock: 30, category: '과자류', subCategory: '스낵', image: '/uploads/shrimp_cracker.png',
        name_multiling: { kr: '농심 새우깡', en: 'Nongshim Shrimp Crackers', cn: '农心鲜虾条', vn: 'Bim bim tôm Nongshim', th: 'ข้าวเกรียบกุ้งนงชิม' },
        category_multiling: { kr: '과자류', en: 'Snacks', cn: '零食', vn: 'Đồ ăn nhẹ', th: 'ขนมขบเคี้ยว' }
    },
    {
        ownerId: 2, id: 302, name: '오리온 포카칩', price: 1700, stock: 25, category: '과자류', subCategory: '스낵', image: '/uploads/pochachip.png',
        name_multiling: { kr: '오리온 포카칩', en: 'Orion Poka Chip', cn: '好丽友薯片', vn: 'Khoai tây chiên Poka Chip', th: 'มันฝรั่งทอดโพคาชิพ' },
        category_multiling: { kr: '과자류', en: 'Snacks', cn: '零食', vn: 'Đồ ăn nhẹ', th: 'ขนมขบเคี้ยว' }
    },
    {
        ownerId: 2, id: 303, name: '롯데 빼빼로', price: 1700, stock: 40, category: '과자류', subCategory: '비스킷/초콜릿', image: '/uploads/pepero.png',
        name_multiling: { kr: '롯데 빼빼로', en: 'Lotte Pepero', cn: '乐天巧克力棒', vn: 'Lotte Pepero', th: 'ล็อตเต้ เปเปโร่' },
        category_multiling: { kr: '과자류', en: 'Snacks', cn: '零食', vn: 'Đồ ăn nhẹ', th: 'ขนมขบเคี้ยว' }
    },
    {
        ownerId: 2, id: 304, name: '해태 홈런볼', price: 2000, stock: 20, category: '과자류', subCategory: '비스킷/초콜릿', image: '/uploads/homerunball.png',
        name_multiling: { kr: '해태 홈런볼', en: 'Haitai Homerun Ball', cn: '海太本垒打球', vn: 'Bánh Homerun Ball', th: 'โฮมรันบอล' },
        category_multiling: { kr: '과자류', en: 'Snacks', cn: '零食', vn: 'Đồ ăn nhẹ', th: 'ขนมขบเคี้ยว' }
    },
    {
        ownerId: 2, id: 305, name: '오리온 초코파이 12입', price: 4800, stock: 15, category: '과자류', subCategory: '파이/빵', image: '/uploads/chocopie.png',
        name_multiling: { kr: '오리온 초코파이 12입', en: 'Orion Choco Pie (12pcs)', cn: '好丽友巧克力派 (12个)', vn: 'Bánh Choco Pie Orion (12 cái)', th: 'โอริออน ช็อกโกพาย (12 ชิ้น)' },
        category_multiling: { kr: '과자류', en: 'Snacks', cn: '零食', vn: 'Đồ ăn nhẹ', th: 'ขนมขบเคี้ยว' }
    },

    // 4. 음료 (Beverages)
    {
        ownerId: 2, id: 401, name: '코카콜라 250ml', price: 1500, stock: 50, category: '음료', subCategory: '탄산', image: '/uploads/cola.png',
        name_multiling: { kr: '코카콜라 250ml', en: 'Coca-Cola 250ml', cn: '可口可乐 250ml', vn: 'Coca-Cola 250ml', th: 'โคคาโคล่า 250มล.' },
        category_multiling: { kr: '음료', en: 'Beverages', cn: '饮料', vn: 'Đồ uống', th: 'เครื่องดื่ม' }
    },
    {
        ownerId: 2, id: 402, name: '칠성사이다 250ml', price: 1400, stock: 45, category: '음료', subCategory: '탄산', image: '/uploads/cider.png',
        name_multiling: { kr: '칠성사이다 250ml', en: 'Chilsung Cider 250ml', cn: '七星雪碧 250ml', vn: 'Chilsung Cider 250ml', th: 'ชิลซองไซเดอร์ 250มล.' },
        category_multiling: { kr: '음료', en: 'Beverages', cn: '饮料', vn: 'Đồ uống', th: 'เครื่องดื่ม' }
    },
    {
        ownerId: 2, id: 403, name: '제주삼다수 500ml', price: 950, stock: 100, category: '음료', subCategory: '생수', image: '/uploads/water.png',
        name_multiling: { kr: '제주삼다수 500ml', en: 'Jeju Samdasoo 500ml', cn: '济州三多水 500ml', vn: 'Nước khoáng Jeju 500ml', th: 'น้ำแร่เชจู 500มล.' },
        category_multiling: { kr: '음료', en: 'Beverages', cn: '饮料', vn: 'Đồ uống', th: 'เครื่องดื่ม' }
    },
    {
        ownerId: 2, id: 404, name: '서울우유 200ml', price: 1100, stock: 20, category: '음료', subCategory: '유제품', image: '/uploads/milk.png',
        name_multiling: { kr: '서울우유 200ml', en: 'Seoul Milk 200ml', cn: '首尔牛奶 200ml', vn: 'Sữa Seoul 200ml', th: 'นมโซล 200มล.' },
        category_multiling: { kr: '음료', en: 'Beverages', cn: '饮料', vn: 'Đồ uống', th: 'เครื่องดื่ม' }
    },
    {
        ownerId: 2, id: 405, name: '맥심 T.OP 아메리카노', price: 2200, stock: 40, category: '음료', subCategory: '커피', image: '/uploads/top_coffee.png',
        name_multiling: { kr: '맥심 T.OP 아메리카노', en: 'Maxim T.OP Americano', cn: '麦馨 T.OP 美式咖啡', vn: 'Cà phê Maxim T.OP', th: 'กาแฟ Maxim T.OP' },
        category_multiling: { kr: '음료', en: 'Beverages', cn: '饮料', vn: 'Đồ uống', th: 'เครื่องดื่ม' }
    },

    // 5. 아이스크림 (Ice Cream)
    {
        ownerId: 2, id: 501, name: '메로나', price: 1200, stock: 50, category: '아이스크림', subCategory: '바', image: '/uploads/melona.png',
        name_multiling: { kr: '메로나', en: 'Melona', cn: '梅罗娜', vn: 'Kem Melona', th: 'เมโลน่า' },
        category_multiling: { kr: '아이스크림', en: 'Ice Cream', cn: '冰淇淋', vn: 'Kem', th: 'ไอศกรีม' }
    },
    {
        ownerId: 2, id: 502, name: '월드콘', price: 2000, stock: 30, category: '아이스크림', subCategory: '콘', image: '/uploads/worldcone.png',
        name_multiling: { kr: '월드콘', en: 'World Cone', cn: '世界杯甜筒', vn: 'Kem ốc quế World Cone', th: 'เวิลด์โคน' },
        category_multiling: { kr: '아이스크림', en: 'Ice Cream', cn: '冰淇淋', vn: 'Kem', th: 'ไอศกรีม' }
    },
    {
        ownerId: 2, id: 503, name: '투게더 바닐라', price: 7000, stock: 10, category: '아이스크림', subCategory: '파인트/컵', image: '/uploads/together.png',
        name_multiling: { kr: '투게더 바닐라', en: 'Together Vanilla', cn: 'Together 香草冰淇淋', vn: 'Kem Together Vanilla', th: 'ไอศกรีมทูเก็ตเตอร์' },
        category_multiling: { kr: '아이스크림', en: 'Ice Cream', cn: '冰淇淋', vn: 'Kem', th: 'ไอศกรีม' }
    },

    // 6. 주류 (Alcohol)
    {
        ownerId: 2, id: 601, name: '참이슬 후레쉬', price: 1900, stock: 60, category: '주류', subCategory: '소주', image: '/uploads/soju.png',
        name_multiling: { kr: '참이슬 후레쉬', en: 'Chamisul Fresh', cn: '真露 Fresh', vn: 'Rượu soju Chamisul', th: 'ชามิซุล เฟรช' },
        category_multiling: { kr: '주류', en: 'Alcohol', cn: '酒类', vn: 'Đồ uống có cồn', th: 'เครื่องดื่มแอลกอฮอล์' }
    },
    {
        ownerId: 2, id: 602, name: '카스 프레시 500ml', price: 2800, stock: 50, category: '주류', subCategory: '맥주', image: '/uploads/cass.png',
        name_multiling: { kr: '카스 프레시 500ml', en: 'Cass Fresh 500ml', cn: '凯狮啤酒 500ml', vn: 'Bia Cass Fresh 500ml', th: 'เบียร์ Cass 500มล.' },
        category_multiling: { kr: '주류', en: 'Alcohol', cn: '酒类', vn: 'Đồ uống có cồn', th: 'เครื่องดื่มแอลกอฮอล์' }
    },
    {
        ownerId: 2, id: 603, name: '테라 500ml', price: 2800, stock: 50, category: '주류', subCategory: '맥주', image: '/uploads/terra.png',
        name_multiling: { kr: '테라 500ml', en: 'Terra 500ml', cn: 'Terra 啤酒 500ml', vn: 'Bia Terra 500ml', th: 'เบียร์ Terra 500มล.' },
        category_multiling: { kr: '주류', en: 'Alcohol', cn: '酒类', vn: 'Đồ uống có cồn', th: 'เครื่องดื่มแอลกอฮอล์' }
    },
    {
        ownerId: 2, id: 604, name: '장수막걸리', price: 1600, stock: 30, category: '주류', subCategory: '전통주', image: '/uploads/makgeolli.png',
        name_multiling: { kr: '장수막걸리', en: 'Jangsu Makgeolli', cn: '长寿米酒', vn: 'Rượu gạo Jangsu', th: 'มักกอลลี' },
        category_multiling: { kr: '주류', en: 'Alcohol', cn: '酒类', vn: 'Đồ uống có cồn', th: 'เครื่องดื่มแอลกอฮอล์' }
    },

    // 7. 생활/잡화 (Household)
    {
        ownerId: 2, id: 701, name: '크리넥스 여행용 티슈', price: 1000, stock: 30, category: '생활용품', subCategory: '위생용품', image: '/uploads/tissue.png',
        name_multiling: { kr: '크리넥스 여행용 티슈', en: 'Kleenex Pocket Tissue', cn: '舒洁袖珍纸巾', vn: 'Khăn giấy bỏ túi Kleenex', th: 'ทิชชู่พกพาคลีเน็กซ์' },
        category_multiling: { kr: '생활용품', en: 'Household', cn: '生活用品', vn: 'Đồ gia dụng', th: 'ของใช้ในบ้าน' }
    },
    {
        ownerId: 2, id: 702, name: '좋은느낌 생리대 중형', price: 5500, stock: 20, category: '생활용품', subCategory: '위생용품', image: '/uploads/pad.png',
        name_multiling: { kr: '좋은느낌 생리대 중형', en: 'Good Feel Pads (Medium)', cn: '好感卫生巾 (中型)', vn: 'Băng vệ sinh Good Feel', th: 'ผ้าอนามัย Good Feel' },
        category_multiling: { kr: '생활용품', en: 'Household', cn: '生活用品', vn: 'Đồ gia dụng', th: 'ของใช้ในบ้าน' }
    },
    {
        ownerId: 2, id: 703, name: '모나미 볼펜', price: 500, stock: 100, category: '생활용품', subCategory: '문구/잡화', image: '/uploads/pen.png',
        name_multiling: { kr: '모나미 볼펜', en: 'Monami Ballpoint Pen', cn: '慕那美圆珠笔', vn: 'Bút bi Monami', th: 'ปากกาลูกลื่นโมนาลี' },
        category_multiling: { kr: '생활용품', en: 'Household', cn: '生活用品', vn: 'Đồ gia dụng', th: 'ของใช้ในบ้าน' }
    },
    {
        ownerId: 2, id: 704, name: 'DURACEL 건전지 AA', price: 3000, stock: 25, category: '생활용품', subCategory: '전기용품', image: '/uploads/battery.png',
        name_multiling: { kr: 'DURACEL 건전지 AA', en: 'Duracell AA Batteries', cn: '金霸王 AA 电池', vn: 'Pin Duracell AA', th: 'ถ่านดูราเซลล์ AA' },
        category_multiling: { kr: '생활용품', en: 'Household', cn: '生活用品', vn: 'Đồ gia dụng', th: 'ของใช้ในบ้าน' }
    },
    {
        ownerId: 2, id: 705, name: '니베아 립밤', price: 4500, stock: 20, category: '생활용품', subCategory: '의약외품', image: '/uploads/lipbalm.png',
        name_multiling: { kr: '니베아 립밤', en: 'Nivea Lip Balm', cn: '妮维雅润唇膏', vn: 'Son dưỡng môi Nivea', th: 'ลิปบาล์มนีเวีย' },
        category_multiling: { kr: '생활용품', en: 'Household', cn: '生活用品', vn: 'Đồ gia dụng', th: 'ของใช้ในบ้าน' }
    },

    // 8. 담배 (Tobacco)
    {
        ownerId: 2, id: 801, name: '말보로 골드', price: 4500, stock: 30, category: '담배', subCategory: '수입담배', image: '/uploads/marlboro.png',
        name_multiling: { kr: '말보로 골드', en: 'Marlboro Gold', cn: '万宝路金', vn: 'Marlboro Gold', th: 'มาร์ลโบโร โกลด์' },
        category_multiling: { kr: '담배', en: 'Tobacco', cn: '烟草', vn: 'Thuốc lá', th: 'ยาสูบ' }
    },
    {
        ownerId: 2, id: 802, name: '에쎄 프라임', price: 4500, stock: 30, category: '담배', subCategory: '국산담배', image: '/uploads/esse.png',
        name_multiling: { kr: '에쎄 프라임', en: 'Esse Prime', cn: '爱喜 Prime', vn: 'Esse Prime', th: 'เอสเซ่ ไพรม์' },
        category_multiling: { kr: '담배', en: 'Tobacco', cn: '烟草', vn: 'Thuốc lá', th: 'ยาสูบ' }
    }
];

module.exports = seedProducts;
