"use client";

import Link from "next/link";
import { Mail, Phone, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer id="footer" className="bg-slate-900 text-white py-16 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-bold text-lg mb-6">关于 CareVoyage</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">公司简介</Link></li>
              <li><Link href="/hospitals" className="hover:text-white transition-colors">合作医院</Link></li>
              <li><Link href="/process" className="hover:text-white transition-colors">服务流程</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">联系我们</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">合作医院</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><Link href="/hospitals/huaxi-tianfu" className="hover:text-white transition-colors">华西天府医院</Link></li>
              <li><Link href="/hospitals/cy-fuyi" className="hover:text-white transition-colors">重医附一院</Link></li>
              <li><Link href="/hospitals/cy-fuer" className="hover:text-white transition-colors">重医附二院</Link></li>
              <li><Link href="/hospitals/sc-tcm" className="hover:text-white transition-colors">四川省中医院</Link></li>
              <li><Link href="/hospitals/cq-tcm" className="hover:text-white transition-colors">重庆市中医院</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">旅游目的地</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><span className="hover:text-white transition-colors">成都</span></li>
              <li><span className="hover:text-white transition-colors">重庆</span></li>
              <li><span className="hover:text-white transition-colors">九寨沟</span></li>
              <li><span className="hover:text-white transition-colors">峨眉山</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">联系方式</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:hello@carevoyageglobal.com" className="hover:text-white transition-colors">hello@carevoyageglobal.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+862888888888" className="hover:text-white transition-colors">+86 28 8888 8888</a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>微信公众号: CareVoyage</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
          <p>© 2026 CareVoyage Global. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
