"use client";

import Link from "next/link";
import { useState } from "react";
import { Sparkles } from "lucide-react";

export default function Nav() {
  const [lang, setLang] = useState("zh-hant");
  const [langNotice, setLangNotice] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-teal-100/50 px-6 lg:px-12 py-4 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
          🐼
        </div>
        <span className="text-2xl font-bold text-teal-600">CareVoyage</span>
      </Link>
      
      <div className="hidden md:flex items-center gap-8 text-sm text-slate-600">
        <Link href="/medical-tourism" className="hover:text-teal-600 transition-colors">套餐</Link>
        <Link href="/medical-tourism?type=hot" className="hover:text-teal-600 transition-colors">爆款</Link>
        <Link href="/#calculator" className="hover:text-teal-600 transition-colors">计算器</Link>
        <Link href="/#footer" className="hover:text-teal-600 transition-colors">关于</Link>
      </div>

      <div className="flex items-center gap-3 relative">
        <a 
          href="https://www.carevoyageglobal.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 rounded-full text-sm font-medium border border-amber-200 hover:shadow-md transition-all"
        >
          <Sparkles className="w-4 h-4" /> 尊享服务
        </a>
        <Link 
          href="/login" 
          className="px-4 py-2 text-slate-600 hover:text-teal-600 text-sm transition-colors"
        >
          登录
        </Link>
        <Link 
          href="/register" 
          className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-teal-200 transition-all"
        >
          立即咨询
        </Link>
        <select 
          value={lang} 
          onChange={(e) => {
            setLang(e.target.value);
            if (e.target.value !== "zh-hant") {
              setLangNotice(true);
              setTimeout(() => setLangNotice(false), 2000);
            }
          }}
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-teal-500"
        >
          <option value="zh-hant">繁</option>
          <option value="zh-cn">简</option>
          <option value="en">EN</option>
          <option value="pt">PT</option>
          <option value="fr">FR</option>
          <option value="de">DE</option>
          <option value="it">IT</option>
          <option value="ja">JP</option>
          <option value="ms">MS</option>
          <option value="th">TH</option>
        </select>
        {langNotice && (
          <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-amber-100 text-amber-800 text-xs rounded-lg whitespace-nowrap z-50">
            即将上线
          </div>
        )}
      </div>
    </nav>
  );
}
