const seedProducts = [
    // 1. 신선식품 (Fresh Food) - 짧은 유통기한, 냉장
    { ownerId: 2, id: 101, name: '혜자로운 도시락', price: 5500, stock: 10, category: '신선식품', subCategory: '도시락', detailCategory: '한식', image: '/uploads/dosirak.png' },
    { ownerId: 2, id: 102, name: '삼각김밥 (참치마요)', price: 1200, stock: 15, category: '신선식품', subCategory: '김밥/주먹밥', detailCategory: '삼각김밥', image: '/uploads/gimbap.png' },
    { ownerId: 2, id: 103, name: '인가샌드위치', price: 2500, stock: 12, category: '신선식품', subCategory: '샌드위치/버거', detailCategory: '샌드위치', image: '/uploads/sandwich.png' },
    { ownerId: 2, id: 104, name: '훈제란 2입', price: 2000, stock: 30, category: '신선식품', subCategory: '간편식', detailCategory: '가공란', image: '/uploads/egg.png' },

    // 2. 가공식품 (Processed Food) - 라면, 통조림
    { ownerId: 2, id: 201, name: '농심 신라면 컵', price: 1150, stock: 50, category: '가공식품', subCategory: '라면', detailCategory: '컵라면', image: '/uploads/shin_cup.png' },
    { ownerId: 2, id: 202, name: '삼양 불닭볶음면 컵', price: 1600, stock: 40, category: '가공식품', subCategory: '라면', detailCategory: '컵라면', image: '/uploads/buldak_cup.png' },
    { ownerId: 2, id: 203, name: '햇반 210g', price: 2100, stock: 45, category: '가공식품', subCategory: '즉석밥/죽', detailCategory: '즉석밥', image: '/uploads/hetbahn.png' },
    { ownerId: 2, id: 204, name: '스팸 클래식 200g', price: 4500, stock: 20, category: '가공식품', subCategory: '통조림', detailCategory: '햄', image: '/uploads/spam.png' },

    // 3. 과자/간식 (Snack)
    { ownerId: 2, id: 301, name: '농심 새우깡', price: 1500, stock: 30, category: '과자류', subCategory: '스낵', detailCategory: '봉지과자', image: '/uploads/shrimp_cracker.png' },
    { ownerId: 2, id: 302, name: '오리온 포카칩', price: 1700, stock: 25, category: '과자류', subCategory: '스낵', detailCategory: '봉지과자', image: '/uploads/pochachip.png' },
    { ownerId: 2, id: 303, name: '롯데 빼빼로', price: 1700, stock: 40, category: '과자류', subCategory: '비스킷/초콜릿', detailCategory: '비스킷', image: '/uploads/pepero.png' },
    { ownerId: 2, id: 304, name: '해태 홈런볼', price: 2000, stock: 20, category: '과자류', subCategory: '비스킷/초콜릿', detailCategory: '비스킷', image: '/uploads/homerunball.png' },
    { ownerId: 2, id: 305, name: '오리온 초코파이 12입', price: 4800, stock: 15, category: '과자류', subCategory: '파이/빵', detailCategory: '파이', image: '/uploads/chocopie.png' },

    // 4. 음료 (Beverage)
    { ownerId: 2, id: 401, name: '코카콜라 250ml', price: 1500, stock: 50, category: '음료', subCategory: '탄산', detailCategory: '콜라', image: '/uploads/cola.png' },
    { ownerId: 2, id: 402, name: '칠성사이다 250ml', price: 1400, stock: 45, category: '음료', subCategory: '탄산', detailCategory: '사이다', image: '/uploads/cider.png' },
    { ownerId: 2, id: 403, name: '제주삼다수 500ml', price: 950, stock: 100, category: '음료', subCategory: '생수', detailCategory: '생수', image: '/uploads/water.png' },
    { ownerId: 2, id: 404, name: '서울우유 200ml', price: 1100, stock: 20, category: '음료', subCategory: '유제품', detailCategory: '우유', image: '/uploads/milk.png' },
    { ownerId: 2, id: 405, name: '맥심 T.OP 아메리카노', price: 2200, stock: 40, category: '음료', subCategory: '커피', detailCategory: '캔커피', image: '/uploads/top_coffee.png' },

    // 5. 아이스크림 (Ice Cream) - New Standard Category
    { ownerId: 2, id: 501, name: '메로나', price: 1200, stock: 50, category: '아이스크림', subCategory: '바', detailCategory: '바', image: '/uploads/melona.png' },
    { ownerId: 2, id: 502, name: '월드콘', price: 2000, stock: 30, category: '아이스크림', subCategory: '콘', detailCategory: '콘', image: '/uploads/worldcone.png' },
    { ownerId: 2, id: 503, name: '투게더 바닐라', price: 7000, stock: 10, category: '아이스크림', subCategory: '파인트/컵', detailCategory: '홈류', image: '/uploads/together.png' },

    // 6. 주류 (Alcohol)
    { ownerId: 2, id: 601, name: '참이슬 후레쉬', price: 1900, stock: 60, category: '주류', subCategory: '소주', detailCategory: '소주', image: '/uploads/soju.png' },
    { ownerId: 2, id: 602, name: '카스 프레시 500ml', price: 2800, stock: 50, category: '주류', subCategory: '맥주', detailCategory: '국산맥주', image: '/uploads/cass.png' },
    { ownerId: 2, id: 603, name: '테라 500ml', price: 2800, stock: 50, category: '주류', subCategory: '맥주', detailCategory: '국산맥주', image: '/uploads/terra.png' },
    { ownerId: 2, id: 604, name: '장수막걸리', price: 1600, stock: 30, category: '주류', subCategory: '전통주', detailCategory: '막걸리', image: '/uploads/makgeolli.png' },

    // 7. 생활/잡화 (Household)
    { ownerId: 2, id: 701, name: '크리넥스 여행용 티슈', price: 1000, stock: 30, category: '생활용품', subCategory: '위생용품', detailCategory: '휴지', image: '/uploads/tissue.png' },
    { ownerId: 2, id: 702, name: '좋은느낌 생리대 중형', price: 5500, stock: 20, category: '생활용품', subCategory: '위생용품', detailCategory: '생리대', image: '/uploads/pad.png' },
    { ownerId: 2, id: 703, name: '모나미 볼펜', price: 500, stock: 100, category: '생활용품', subCategory: '문구/잡화', detailCategory: '필기구', image: '/uploads/pen.png' },
    { ownerId: 2, id: 704, name: 'DURACEL 건전지 AA', price: 3000, stock: 25, category: '생활용품', subCategory: '전기용품', detailCategory: '건전지', image: '/uploads/battery.png' },
    { ownerId: 2, id: 705, name: '니베아 립밤', price: 4500, stock: 20, category: '생활용품', subCategory: '의약외품', detailCategory: '립케어', image: '/uploads/lipbalm.png' },

    // 8. 담배 (Tobacco)
    { ownerId: 2, id: 801, name: '말보로 골드', price: 4500, stock: 30, category: '담배', subCategory: '수입담배', detailCategory: '일반', image: '/uploads/marlboro.png' },
    { ownerId: 2, id: 802, name: '에쎄 프라임', price: 4500, stock: 30, category: '담배', subCategory: '국산담배', detailCategory: '슬림', image: '/uploads/esse.png' },
];

module.exports = seedProducts;
