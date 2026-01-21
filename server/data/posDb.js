// Simulate a huge database of barcodes in the physical POS
const posInventory = [
    { barcode: '8801043006093', name: '농심 신라면 (5개입)', price: 3900, stock: 50, category: 'processed', image: '/uploads/shin.jpg' },
    { barcode: '8801094017200', name: '코카콜라 1.5L', price: 2300, stock: 100, category: 'beverage', image: '/uploads/coke.jpg' },
    { barcode: '8801111612933', name: '서울우유 1L', price: 2800, stock: 20, category: 'dairy', image: '/uploads/milk.jpg' },
    { barcode: '8801062320491', name: '오리온 초코파이 (12개입)', price: 4800, stock: 30, category: 'snack', image: '/uploads/chocopie.jpg' },
    { barcode: '8801056150011', name: '롯데 칠성사이다 1.5L', price: 2100, stock: 80, category: 'beverage', image: '/uploads/cider.jpg' }
];

module.exports = { posInventory };
