'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Nav from '../../components/nav';
import Footer from '../../components/footer';
import { MessageCircle, ClipboardList, Building2, Plane, CheckCircle, RefreshCw, Shield, Headphones, Clock } from 'lucide-react';

const steps = [
  {
    icon: MessageCircle,
    emoji: '💬',
    title: '在線咨詢',
    description: '通過網站或微信聯繫我們，說明您的醫療需求和偏好',
    detail: '24小時內響應',
  },
  {
    icon: ClipboardList,
    emoji: '📋',
    title: '方案定制',
    description: '醫療顧問根據您的情況，制定專屬醫療旅遊方案',
    detail: '個性化服務',
  },
  {
    icon: Building2,
    emoji: '🏥',
    title: '醫院預約',
    description: '協助預約專家門診、檢查或手術時間，確保順利就診',
    detail: '優先通道',
  },
  {
    icon: Plane,
    emoji: '✈️',
    title: '行程規劃',
    description: '安排機票、酒店、接送等行程細節，提供完整行程單',
    detail: '一站式服務',
  },
  {
    icon: CheckCircle,
    emoji: '✅',
    title: '服務執行',
    description: '專人全程陪同，協助翻譯、就診、繳費等事宜',
    detail: '專屬陪診',
  },
  {
    icon: RefreshCw,
    emoji: '🔄',
    title: '後續跟進',
    description: '回國後持續跟進治療效果，提供複診預約和報告翻譯',
    detail: '長期關懷',
  },
];

const guarantees = [
  {
    icon: Shield,
    title: '醫療質量保障',
    description: '所有合作醫院均為三甲醫院，醫生資質嚴格審核',
  },
  {
    icon: Headphones,
    title: '24/7 客服支持',
    description: '全程中英文客服支持，隨時解答您的疑問',
  },
  {
    icon: Clock,
    title: '準時高效',
    description: '承諾時間內完成預約，如延誤全額退款',
  },
];

export default function ProcessPage() {
  return (
    <main className="min-h-screen">
      <Nav />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-12 bg-gradient-to-b from-teal-50/50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-slate-800 mb-6"
          >
            服務流程
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-slate-600"
          >
            簡單六步，開啟您的醫療旅遊之旅
          </motion.p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-200 via-teal-400 to-teal-600 md:-translate-x-1/2"
            />

            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center gap-8 mb-12 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                    <div
                      className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow ${
                        isLeft ? 'md:ml-12' : 'md:mr-12'
                      }`}
                    >
                      <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:justify-end' : ''}`}>
                        <span className="text-2xl">{step.emoji}</span>
                        <h3 className="text-xl font-bold text-slate-800">{step.title}</h3>
                      </div>
                      <p className="text-slate-600 mb-2">{step.description}</p>
                      <span className={`inline-block text-sm font-medium text-teal-600 bg-teal-50 px-3 py-1 rounded-full ${
                        isLeft ? 'md:ml-auto' : ''
                      }`}>
                        {step.detail}
                      </span>
                    </div>
                  </div>

                  {/* Center Icon */}
                  <div className="absolute left-8 md:left-1/2 w-16 h-16 bg-white rounded-full shadow-lg border-4 border-teal-100 flex items-center justify-center z-10 md:-translate-x-1/2">
                    <span className="text-2xl font-bold text-teal-600">{index + 1}</span>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="flex-1 hidden md:block"
                />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Guarantees */}
      <section className="py-16 px-6 lg:px-12 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">服務保障</h2>
            <p className="text-slate-600">我們承諾為您提供安心、放心的醫療旅遊體驗</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {guarantees.map((guarantee, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center mx-auto mb-6"
                >
                  <guarantee.icon className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{guarantee.title}</h3>
                <p className="text-slate-600">{guarantee.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-3xl p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">準備開始您的醫療旅遊之旅？</h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              立即聯繫我們，獲取免費咨詢和個性化方案。我們的醫療顧問將在24小時內與您聯繫。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-teal-600 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                立即咨詢
              </Link>
              <a
                href="tel:+862888888888"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal-700 text-white rounded-xl font-semibold hover:bg-teal-800 transition-all"
              >
                撥打熱線
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
