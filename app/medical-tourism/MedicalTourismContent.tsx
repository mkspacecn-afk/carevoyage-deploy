'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Nav from '../../components/nav';
import Footer from '../../components/footer';
import { 
  Plane, 
  Stethoscope, 
  Settings, 
  Check, 
  Star, 
  Heart,
  Sparkles,
  MapPin
} from 'lucide-react';

const packages = [
  {
    id: 'tourism',
    icon: Plane,
    name: '医疗+旅游',
    subtitle: '一站式医疗旅游体验',
    price: '¥18,888',
    unit: '起',
    popular: true,
    features: [
      '三甲医院VIP通道',
      '五星酒店住宿3晚',
      '专属医疗翻译陪同',
      '成都/重庆市区游览',
      '接送机服务',
      '术后随访1年'
    ],
    color: 'from-teal-500 to-teal-600'
  },
  {
    id: 'service',
    icon: Stethoscope,
    name: '医疗+服务',
    subtitle: '专业医疗服务套餐',
    price: '¥8,888',
    unit: '起',
    popular: false,
    features: [
      '专家门诊预约',
      '全程陪诊服务',
      '检查报告翻译',
      '用药指导',
      '复诊提醒服务',
      '健康档案管理'
    ],
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'custom',
    icon: Settings,
    name: '自选配置',
    subtitle: '灵活定制您的需求',
    price: '¥4,888',
    unit: '起',
    popular: false,
    features: [
      '按需选择服务项目',
      '自由搭配医院',
      '灵活安排时间',
      '个性化行程',
      '无隐形消费',
      '7×24小时客服'
    ],
    color: 'from-purple-500 to-purple-600'
  }
];

const hotProducts = [
  { id: 1, category: 'tourism', name: '华西体检+成都5日游', price: '¥25,888', originalPrice: '¥32,000', image: 'bg-gradient-to-br from-teal-100 to-teal-200', tag: '热销' },
  { id: 2, category: 'tourism', name: '重医附一院手术+重庆游', price: '¥38,888', originalPrice: '¥48,000', image: 'bg-gradient-to-br from-blue-100 to-blue-200', tag: '推荐' },
  { id: 3, category: 'tourism', name: '中医调理+九寨沟之旅', price: '¥22,888', originalPrice: '¥28,000', image: 'bg-gradient-to-br from-green-100 to-green-200', tag: '限量' },
  { id: 4, category: 'tourism', name: '口腔治疗+成都美食游', price: '¥15,888', originalPrice: '¥19,800', image: 'bg-gradient-to-br from-orange-100 to-orange-200', tag: '爆款' },
  { id: 5, category: 'service', name: '华西专家特需门诊', price: '¥2,888', originalPrice: '¥3,500', image: 'bg-gradient-to-br from-red-100 to-red-200', tag: '热销' },
  { id: 6, category: 'service', name: '全程陪诊尊享版', price: '¥1,688', originalPrice: '¥2,200', image: 'bg-gradient-to-br from-purple-100 to-purple-200', tag: '推荐' },
  { id: 7, category: 'service', name: '海外报告翻译认证', price: '¥888', originalPrice: '¥1,200', image: 'bg-gradient-to-br from-indigo-100 to-indigo-200', tag: '必备' },
  { id: 8, category: 'service', name: '家庭医生年卡', price: '¥5,888', originalPrice: '¥8,000', image: 'bg-gradient-to-br from-pink-100 to-pink-200', tag: '超值' },
];

export default function MedicalTourismContent() {
  const searchParams = useSearchParams();
  const [activeType, setActiveType] = useState('all');
  
  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'tourism' || type === 'service' || type === 'custom' || type === 'hot') {
      setActiveType(type);
    }
  }, [searchParams]);

  const filteredProducts = activeType === 'all' 
    ? hotProducts 
    : activeType === 'hot'
    ? hotProducts.filter(p => ['热销', '爆款'].includes(p.tag))
    : hotProducts.filter(p => p.category === activeType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0FDFA] to-white">
      <Nav />
      
      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              选择您的<span className="text-teal-600">医疗旅程</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              华西医院与重医顶级资源，搭配成渝特色旅游，享受高性价比的医疗服务
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                  pkg.popular ? 'ring-2 ring-teal-500 scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-1 rounded-bl-xl text-sm font-medium flex items-center gap-1">
                    <Star className="w-4 h-4" /> 最受欢迎
                  </div>
                )}
                
                <div className="p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pkg.color} flex items-center justify-center mb-6`}>
                    <pkg.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{pkg.name}</h3>
                  <p className="text-slate-500 mb-6">{pkg.subtitle}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-teal-600">{pkg.price}</span>
                    <span className="text-slate-400">{pkg.unit}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-600">
                        <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/medical-tourism?type=${pkg.id}`}
                    className={`block w-full py-4 rounded-xl font-medium text-center transition-all ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:shadow-lg hover:shadow-teal-200'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    查看详情
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 md:mb-0">
              {activeType === 'hot' ? '🔥 爆款产品' : 
               activeType === 'tourism' ? '✈️ 医疗+旅游套餐' :
               activeType === 'service' ? '🏥 医疗+服务套餐' :
               activeType === 'custom' ? '⚙️ 自选配置方案' : '🔥 爆款产品'}
            </h2>
            
            <div className="flex gap-2 flex-wrap">
              {[
                { id: 'all', label: '全部' },
                { id: 'hot', label: '爆款' },
                { id: 'tourism', label: '医疗+旅游' },
                { id: 'service', label: '医疗+服务' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveType(tab.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeType === tab.id
                      ? 'bg-teal-600 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
              >
                <div className={`h-48 ${product.image} flex items-center justify-center relative`}>
                  <div className="text-6xl opacity-30">🐼</div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-slate-700">
                    {product.tag}
                  </div>
                  <button className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-bold text-teal-600">{product.price}</span>
                    <span className="text-sm text-slate-400 line-through">{product.originalPrice}</span>
                  </div>
                  <Link
                    href={`/product/${product.id}`}
                    className="block w-full py-3 bg-slate-100 text-slate-700 rounded-xl text-center font-medium group-hover:bg-teal-600 group-hover:text-white transition-all"
                  >
                    查看详情
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="calculator" className="py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-3xl p-12 text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">需要个性化方案？</h2>
            <p className="text-teal-100 mb-8 max-w-xl mx-auto">
              我们的医疗顾问将根据您的需求，为您定制专属的医疗旅游方案
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#calculator"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-teal-600 rounded-xl font-semibold hover:bg-teal-50 transition-colors"
              >
                <Sparkles className="w-5 h-5" />
                费用计算器
              </Link>
              <Link
                href="https://www.carevoyageglobal.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-400 transition-colors border border-teal-400"
              >
                <MapPin className="w-5 h-5" />
                访问 CareVoyage
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
