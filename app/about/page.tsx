'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Nav from '../../components/nav';
import Footer from '../../components/footer';
import { Building2, Users, Globe, Clock, Heart, Shield, Lightbulb, Award } from 'lucide-react';

const advantages = [
  {
    icon: '💰',
    title: '70%',
    subtitle: '價格優勢',
    description: '相比新加坡、歐美同類醫療服務，成本降低70%',
  },
  {
    icon: '⏱️',
    title: '1/3',
    subtitle: '時間高效',
    description: '預約到治療的等待時間僅為發達國家的三分之一',
  },
  {
    icon: '👥',
    title: '10萬+',
    subtitle: '服務客戶',
    description: '累計服務全球客戶超過10萬人次',
  },
  {
    icon: '🏥',
    title: '5家',
    subtitle: '合作醫院',
    description: '與成渝頂級醫療機構深度合作',
  },
];

const team = [
  {
    name: '張明華',
    role: '創始人 & CEO',
    description: '曾任跨國醫療集團高管，深耕醫療旅遊行業15年',
    icon: '👨‍💼',
  },
  {
    name: '李雪琴',
    role: '首席醫療官',
    description: '華西醫院博士，20年臨床經驗，專注國際醫療服務',
    icon: '👩‍⚕️',
  },
  {
    name: '王建國',
    role: '客戶總監',
    description: '資深客戶服務專家，曾服務高淨值客戶超5000人',
    icon: '👨‍💼',
  },
];

const values = [
  {
    icon: Shield,
    title: '專業可靠',
    description: '嚴選合作醫院，所有服務經過嚴格質量把控',
  },
  {
    icon: Heart,
    title: '客戶至上',
    description: '以客戶需求為中心，提供個性化醫療旅遊方案',
  },
  {
    icon: Globe,
    title: '全球視野',
    description: '連接中國優質醫療資源與全球客戶',
  },
  {
    icon: Lightbulb,
    title: '持續創新',
    description: '不斷優化服務流程，提升客戶體驗',
  },
];

const partnerHospitals = [
  { name: '華西天府醫院', city: '成都' },
  { name: '重醫附一院', city: '重慶' },
  { name: '重醫附二院', city: '重慶' },
  { name: '四川省中醫院', city: '成都' },
  { name: '重慶市中醫院', city: '重慶' },
];

export default function AboutPage() {
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
            關於 MediPanda
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-slate-600 mb-8"
          >
            連接全球客戶與中國頂級醫療資源的橋樑
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
            >
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-teal-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">我們的使命</h2>
              <p className="text-slate-600 leading-relaxed">
                讓全球客戶以合理的價格，享受中國頂級的醫療服務。我們致力於打破地域和語言的障礙，
                讓每一位客戶都能輕鬆獲得專業、可靠的醫療旅遊體驗。
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">我們的願景</h2>
              <p className="text-slate-600 leading-relaxed">
                成為全球領先的醫療旅遊服務平台，讓「成渝醫療」成為高品質、高性價比醫療服務的代名詞，
                推動中國醫療資源走向世界。
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Advantages */}
      <section className="py-16 px-6 lg:px-12 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">核心優勢</h2>
            <p className="text-slate-600">為什麼選擇 MediPanda</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{advantage.icon}</div>
                <h3 className="text-3xl font-bold text-teal-600 mb-1">{advantage.title}</h3>
                <p className="font-semibold text-slate-800 mb-2">{advantage.subtitle}</p>
                <p className="text-sm text-slate-600">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">創始團隊</h2>
            <p className="text-slate-600">專業背景，豐富經驗</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center text-3xl mx-auto mb-6"
                >
                  {member.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">{member.name}</h3>
                <p className="text-teal-600 font-medium mb-4">{member.role}</p>
                <p className="text-sm text-slate-600">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Hospitals */}
      <section className="py-16 px-6 lg:px-12 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">合作醫院</h2>
            <p className="text-slate-600">精選成渝頂級醫療機構</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {partnerHospitals.map((hospital, index) => (
              <Link
                key={index}
                href={`/hospitals/${['huaxi-tianfu', 'cy-fuyi', 'cy-fuer', 'sc-tcm', 'cq-tcm'][index]}`}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 text-center hover:shadow-md transition-all cursor-pointer"
                >
                  <Building2 className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-slate-800 text-sm mb-1">{hospital.name}</h4>
                  <p className="text-xs text-slate-500">{hospital.city}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">我們的價值觀</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-200"
                >
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{value.title}</h3>
                <p className="text-sm text-slate-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
