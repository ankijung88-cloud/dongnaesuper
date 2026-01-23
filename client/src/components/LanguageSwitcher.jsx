import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher = () => {
    const { lang, setLang } = useLanguage();

    return (
        <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="language-select"
        >
            <option value="kr">🇰🇷 한국어</option>
            <option value="en">🇺🇸 English</option>
            <option value="vn">🇻🇳 Tiếng Việt</option>
            <option value="cn">🇨🇳 中文</option>
            <option value="th">🇹🇭 ภาษาไทย</option>
        </select>
    );
};

export default LanguageSwitcher;
