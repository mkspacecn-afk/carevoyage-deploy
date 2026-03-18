'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Nav from '../../components/nav';
import Footer from '../../components/footer';
import { Building2, Leaf } from 'lucide-react';

const hospitals = [
  {
    id: 'huaxi-tianfu',
    name: '華西天府醫院',
    city: '成都',
    icon: '🏥',
    IconComponent: Building2,
    description: '國家級三甲醫院，華西醫院分院，擁有頂尖醫療設備和專家團隊。',
  },
  {
    id: 'cy-fuyi',
    name: '重醫附一院',
    city: '重慶',
    icon: '🏥',
    IconComponent: Building2,
    description: '重慶醫科大學附屬第一醫院，西南地區醫療中心，綜合實力雄厚。',
  },
  {
    id: 'cy-fuer',
    name: '重醫附二院',
    city: '重慶',
    icon: '🏥',
    IconComponent: Building2,
    description: '重慶醫科大學附屬第二醫院，百年名院，專科特色突出。',
  },
  {
    id: 'sc-tcm',
    name: '四川省中醫院',
    city: '成都',
    icon: '🌿',
    IconComponent: Leaf,
    description: '四川省中醫醫院，國家級重點中醫醫院，傳承中醫精華。',
  },
  {
    id: 'cq-tcm',
    name: '重慶市中醫院',
    city: '重慶',
    icon: '🌿',
    IconComponent: Leaf,
    description: '重慶市中醫院，中西醫結合，提供傳統中醫康養服務。',
  },
];

export default function HospitalsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-50/30 to-white">
      <Nav />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-slate-800 mb-4"
          >
            合作醫院
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto"
          >
            精選成渝地區頂級醫療機構，為您提供世界級醫療服務
          </motion.p>
        </div>
      </section>

      {/* Hospitals Grid */}
      <section className="pb-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hospitals.map((hospital, index) => (
              <motion.div
                key={hospital.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden group"
              >
                <div className="p-6">
                  {/* Icon Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${
                      hospital.icon === '🌿' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-teal-100 text-teal-600'
                    }`}>
                      <hospital.IconComponent className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{hospital.name}</h3>
                      <div className="flex items-center gap-1 text-slate-500 text-sm">
                        <span>📍</span>
                        <span>{hospital.city}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {hospital.description}
                  </p>

                  {/* Button */}
                  <Link
                    href={`/hospitals/${hospital.id}`}
                    className={`block w-full text-center py-3 rounded-xl font-medium transition-all duration-300 ${
                      hospital.icon === '🌿'
                        ? 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                        : 'bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200'
                    }`}
                  >
                    查看詳情
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
