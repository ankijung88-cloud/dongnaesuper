import React, { createContext, useContext, useState } from 'react';

const translations = {
    kr: {
        // Navbar
        title: "동네슈퍼",
        logout: "로그아웃",
        login: "로그인",
        signup: "회원가입",
        owner: "점주용",
        cart: "장바구니",
        // Home
        martSearch: "마트검색",
        allRegions: "전체 지역",
        searchPlaceholder: "📍 마트명 검색",
        timedeal: "🔥 마감세일",
        all: "전체상품",
        addToCart: "장바구니 담기",
        timeDealLabel: "타임세일",
        allCategories: "전체",
        // Regions
        seoul: "서울",
        gyeonggi: "경기",
        incheon: "인천",
        gangwon: "강원",
        visiting: "대전/세종/충청",
        gwangju: "광주/전라",
        daegu: "대구/경북",
        busan: "부산/울산/경남",
        jeju: "제주",
        // Login & Signup
        loginTitle: "로그인",
        signupTitle: "회원가입",
        emailPlaceholder: "이메일",
        passwordPlaceholder: "비밀번호",
        namePlaceholder: "이름",
        noAccount: "계정이 없으신가요?",
        hasAccount: "이미 계정이 있으신가요?",
        roleLabel: "역할 (Role):",
        roleUser: "일반 사용자 (고객)",
        roleOwner: "점주 (Store Owner)",
        roleAdmin: "슈퍼 관리자 (Super Admin)",
        // Cart
        cartTitle: "장바구니",
        emptyCart: "장바구니가 비어있습니다.",
        totalPrice: "총 결제금액",
        checkout: "결제하기",
        clearCart: "비우기",
        subTitle: "⚠️ 품절 시 대체 방법 (필수 선택):",
        subCall: "📞 전화주세요",
        subReplace: "🔄 비슷한 상품으로 대체 (사장님 추천)",
        subRefund: "💰 해당 상품만 환불"
    },
    en: {
        // Navbar
        title: "Dongnae Super",
        logout: "Logout",
        login: "Login",
        signup: "Sign Up",
        owner: "Owner",
        cart: "Cart",
        // Home
        martSearch: "Find Mart",
        allRegions: "All Regions",
        searchPlaceholder: "📍 Search Mart",
        timedeal: "🔥 Time Deal",
        all: "All Items",
        addToCart: "Add to Cart",
        timeDealLabel: "Time Deal",
        allCategories: "All",
        // Regions
        seoul: "Seoul",
        gyeonggi: "Gyeonggi",
        incheon: "Incheon",
        gangwon: "Gangwon",
        visiting: "Daejeon/Sejong/Chungcheong",
        gwangju: "Gwangju/Jeolla",
        daegu: "Daegu/Gyeongbuk",
        busan: "Busan/Ulsan/Gyeongnam",
        jeju: "Jeju",
        // Login & Signup
        loginTitle: "Login",
        signupTitle: "Sign Up",
        emailPlaceholder: "Email",
        passwordPlaceholder: "Password",
        namePlaceholder: "Name",
        noAccount: "Don't have an account?",
        hasAccount: "Already have an account?",
        roleLabel: "Role:",
        roleUser: "Customer",
        roleOwner: "Store Owner",
        roleAdmin: "Super Admin",
        // Cart
        cartTitle: "Shopping Cart",
        emptyCart: "Your cart is empty.",
        totalPrice: "Total Price",
        checkout: "Checkout",
        clearCart: "Clear",
        subTitle: "⚠️ If Out of Stock:",
        subCall: "📞 Call me",
        subReplace: "🔄 Sub with similar item",
        subRefund: "💰 Refund item"
    },
    cn: {
        // Navbar
        title: "社区超市",
        logout: "退出登录",
        login: "登录",
        signup: "注册",
        owner: "店主版",
        cart: "购物车",
        // Home
        martSearch: "搜索超市",
        allRegions: "所有地区",
        searchPlaceholder: "📍 搜索超市",
        timedeal: "🔥 限时特价",
        all: "全部商品",
        addToCart: "加入购物车",
        timeDealLabel: "限时特价",
        allCategories: "全部",
        // Regions
        seoul: "首尔",
        gyeonggi: "京畿道",
        incheon: "仁川",
        gangwon: "江原道",
        visiting: "大田/世宗/忠清",
        gwangju: "光州/全罗",
        daegu: "大邱/庆北",
        busan: "釜山/蔚山/庆南",
        jeju: "济州",
        // Login & Signup
        loginTitle: "登录",
        signupTitle: "注册",
        emailPlaceholder: "邮箱",
        passwordPlaceholder: "密码",
        namePlaceholder: "姓名",
        noAccount: "没有账号？",
        hasAccount: "已有账号？",
        roleLabel: "角色:",
        roleUser: "普通用户",
        roleOwner: "店主",
        roleAdmin: "超级管理员",
        // Cart
        cartTitle: "购物车",
        emptyCart: "购物车为空",
        totalPrice: "总金额",
        checkout: "结账",
        clearCart: "清空",
        subTitle: "⚠️ 缺货时处理:",
        subCall: "📞 给我打电话",
        subReplace: "🔄 用相似商品替换",
        subRefund: "💰 仅退款该商品"
    },
    vn: {
        // Navbar
        title: "Siêu thị khu phố",
        logout: "Đăng xuất",
        login: "Đăng nhập",
        signup: "Đăng ký",
        owner: "Chủ quán",
        cart: "Giỏ hàng",
        // Home
        martSearch: "Tìm siêu thị",
        allRegions: "Tất cả khu vực",
        searchPlaceholder: "📍 Tìm tên siêu thị",
        timedeal: "🔥 Giảm giá sốc",
        all: "Tất cả",
        addToCart: "Thêm vào giỏ",
        timeDealLabel: "Giảm giá",
        allCategories: "Tất cả",
        // Regions
        seoul: "Seoul",
        gyeonggi: "Gyeonggi",
        incheon: "Incheon",
        gangwon: "Gangwon",
        visiting: "Daejeon/Sejong/Chungcheong",
        gwangju: "Gwangju/Jeolla",
        daegu: "Daegu/Gyeongbuk",
        busan: "Busan/Ulsan/Gyeongnam",
        jeju: "Jeju",
        // Login & Signup
        loginTitle: "Đăng nhập",
        signupTitle: "Đăng ký",
        emailPlaceholder: "Email",
        passwordPlaceholder: "Mật khẩu",
        namePlaceholder: "Tên",
        noAccount: "Bạn chưa có tài khoản?",
        hasAccount: "Bạn đã có tài khoản?",
        roleLabel: "Vai trò:",
        roleUser: "Khách hàng",
        roleOwner: "Chủ cửa hàng",
        roleAdmin: "Quản trị viên",
        // Cart
        cartTitle: "Giỏ hàng",
        emptyCart: "Giỏ hàng trống.",
        totalPrice: "Tổng tiền",
        checkout: "Thanh toán",
        clearCart: "Xóa",
        subTitle: "⚠️ Nếu hết hàng:",
        subCall: "📞 Gọi cho tôi",
        subReplace: "🔄 Thay thế tương tự",
        subRefund: "💰 Hoàn tiền"
    },
    th: {
        // Navbar
        title: "ซูเปอร์มาร์เก็ตแถวบ้าน",
        logout: "ออกจากระบบ",
        login: "เข้าสู่ระบบ",
        signup: "สมัครสมาชิก",
        owner: "เจ้าของร้าน",
        cart: "ตะกร้าสินค้า",
        // Home
        martSearch: "ค้นหาร้านค้า",
        allRegions: "ทุกพื้นที่",
        searchPlaceholder: "📍 ค้นหาร้านค้า",
        timedeal: "🔥 นาทีทอง",
        all: "สินค้าทั้งหมด",
        addToCart: "เพิ่มลงตะกร้า",
        timeDealLabel: "นาทีทอง",
        allCategories: "ทั้งหมด",
        // Regions
        seoul: "โซล",
        gyeonggi: "คยองกี",
        incheon: "อินชอน",
        gangwon: "คังวอน",
        visiting: "แทจอน/เซจง/ชุงนัม",
        gwangju: "ควางจู/ชอลลา",
        daegu: "แทกู/คยองบุก",
        busan: "ปูซาน/อุลซาน/คยองนัม",
        jeju: "เชจู",
        // Login & Signup
        loginTitle: "เข้าสู่ระบบ",
        signupTitle: "สมัครสมาชิก",
        emailPlaceholder: "อีเมล",
        passwordPlaceholder: "รหัสผ่าน",
        namePlaceholder: "ชื่อ",
        noAccount: "ยังไม่มีบัญชี?",
        hasAccount: "มีบัญชีอยู่แล้ว?",
        roleLabel: "บทบาท:",
        roleUser: "ลูกค้าทั่วไป",
        roleOwner: "เจ้าของร้าน",
        roleAdmin: "ผู้ดูแลระบบ",
        // Cart
        cartTitle: "ตะกร้าสินค้า",
        emptyCart: "ตะกร้าสินค้าว่างเปล่า",
        totalPrice: "ราคารวม",
        checkout: "ชำระเงิน",
        clearCart: "ล้างตะกร้า",
        subTitle: "⚠️ หากสินค้าหมด:",
        subCall: "📞 โทรหาฉัน",
        subReplace: "🔄 เปลี่ยนเป็นสินค้าใกล้เคียง",
        subRefund: "💰 คืนเงิน"
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
