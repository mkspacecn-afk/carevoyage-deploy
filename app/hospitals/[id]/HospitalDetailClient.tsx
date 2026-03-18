'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Nav from '../../../components/nav';
import Footer from '../../../components/footer';
import { Building2, Leaf, Star, MapPin, Phone, Clock, Calendar } from 'lucide-react';

const hospitalsData: Record<string, HospitalData> = {
  'huaxi-tianfu': {
    name: '華西天府醫院',
    city: '成都',
    icon: '🏥',
    rating: 4.9,
    reviews: 2847,
    type: 'modern',
    description: '華西天府醫院是四川大學華西醫院在天府新區建設的分院，是國家級三甲醫院。醫院佔地面積300畝，建築面積40萬平方米，設置床位2000張。醫院秉承「厚德精業、求實創新」的華西精神，依託華西醫院百年積澱的優質醫療資源，為患者提供與華西醫院同質化的醫療服務。',
    specialties: [
      { name: '精密體檢中心', description: '高端健康體檢，早期癌症篩查', price: '¥3,800起' },
      { name: '心血管中心', description: '心臟病診療、介入治療', price: '¥5,000起' },
      { name: '腫瘤中心', description: '腫瘤早期診斷、綜合治療', price: '¥8,000起' },
      { name: '骨科中心', description: '關節置換、脊柱手術', price: '¥15,000起' },
    ],
    address: '成都市天府新區天府大道南段',
    phone: '+86 28 8888 1001',
    hours: '周一至周日 08:00-17:30',
  },
  'cy-fuyi': {
    name: '重醫附一院',
    city: '重慶',
    icon: '🏥',
    rating: 4.8,
    reviews: 3256,
    type: 'modern',
    description: '重慶醫科大學附屬第一醫院始建於1957年，是重慶市規模最大的綜合性醫院，也是西南地區醫療、教學、科研中心之一。醫院現有床位3200餘張，年門診量超過300萬人次。醫院擁有國家臨床重點專科18個，在神經內科、心血管內科、呼吸內科等領域處於國內領先水平。',
    specialties: [
      { name: '神經內科', description: '腦血管疾病、神經系統疑難病', price: '¥2,500起' },
      { name: '生殖醫學中心', description: '試管嬰兒、輔助生殖技術', price: '¥30,000起' },
      { name: '整形外科', description: '美容整形、修復重建', price: '¥8,000起' },
      { name: '消化內科', description: '胃腸疾病、內鏡診療', price: '¥3,000起' },
    ],
    address: '重慶市渝中區友誼路1號',
    phone: '+86 23 6889 8888',
    hours: '周一至周五 08:00-17:00',
  },
  'cy-fuer': {
    name: '重醫附二院',
    city: '重慶',
    icon: '🏥',
    rating: 4.7,
    reviews: 1983,
    type: 'modern',
    description: '重慶醫科大學附屬第二醫院創建於1892年，前身為寬仁醫院，是重慶市歷史最悠久的醫院之一。醫院現有床位2500餘張，是國家首批三級甲等醫院。醫院在婦產科、肝膽外科、感染病科等專科領域具有顯著優勢，是西南地區重要的醫療中心。',
    specialties: [
      { name: '婦產科', description: '高危妊娠、婦科腫瘤', price: '¥5,000起' },
      { name: '肝膽外科', description: '肝臟疾病、膽道疾病手術', price: '¥12,000起' },
      { name: '感染病科', description: '肝炎、傳染病診療', price: '¥2,000起' },
      { name: '泌尿外科', description: '前列腺疾病、泌尿系統腫瘤', price: '¥8,000起' },
    ],
    address: '重慶市渝中區臨江路76號',
    phone: '+86 23 6369 3333',
    hours: '周一至周日 08:00-17:30',
  },
  'sc-tcm': {
    name: '四川省中醫院',
    city: '成都',
    icon: '🌿',
    rating: 4.8,
    reviews: 2156,
    type: 'tcm',
    description: '四川省中醫醫院（成都中醫藥大學附屬醫院）創建於1957年，是中國最早成立的四所中醫醫院之一，也是國家中醫藥傳承創新工程重點建設醫院。醫院現有床位2000餘張，擁有國醫大師、省名中醫等頂級中醫人才，在中醫內科、針灸、康復等領域享有盛譽。',
    specialties: [
      { name: '中醫內科', description: '中醫調理、慢性病治療', price: '¥200起' },
      { name: '針灸科', description: '針灸治療、疼痛管理', price: '¥150起' },
      { name: '康復醫學科', description: '中醫康復、運動損傷', price: '¥300起' },
      { name: '治未病中心', description: '中醫體質辨識、健康調理', price: '¥500起' },
    ],
    address: '成都市金牛區十二橋路39號',
    phone: '+86 28 8776 9999',
    hours: '周一至周五 08:00-17:30',
  },
  'cq-tcm': {
    name: '重慶市中醫院',
    city: '重慶',
    icon: '🌿',
    rating: 4.6,
    reviews: 1678,
    type: 'tcm',
    description: '重慶市中醫院是重慶市規模最大的綜合性中醫醫院，也是國家三級甲等中醫醫院。醫院堅持「中西醫並重」的發展理念，既傳承中醫精髓，又融合現代醫學技術。醫院在骨傷科、腫瘤科、治未病中心等領域形成特色優勢，深受患者信賴。',
    specialties: [
      { name: '骨傷科', description: '骨折、關節疾病中醫治療', price: '¥400起' },
      { name: '腫瘤科', description: '中醫腫瘤治療、術後調理', price: '¥800起' },
      { name: '皮膚科', description: '中醫皮膚病、美容養顏', price: '¥300起' },
      { name: '兒科', description: '小兒推拿、兒童體質調理', price: '¥200起' },
    ],
    address: '重慶市江北區盤溪七支路6號',
    phone: '+86 23 6766 5888',
    hours: '周一至周日 08:00-17:00',
  },
};

interface HospitalData {
  name: string;
  city: string;
  icon: string;
  rating: number;
  reviews: number;
  type: 'modern' | 'tcm';
  description: string;
  specialties: { name: string; description: string; price: string }[];
  address: string;
  phone: string;
  hours: string;
}

interface HospitalDetailClientProps {
  id: string;
}

export default function HospitalDetailClient({ id }: HospitalDetailClientProps) {
  const hospital = hospitalsData[id];

  if (!hospital) {
    return (
      <main className="min-h-screen">
        <Nav />
        <div className="pt-32 pb-20 px-6 text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">醫院未找到</h1>
          <Link href="/hospitals" className="text-teal-600 hover:underline">
            返回醫院列表
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const IconComponent = hospital.type === 'tcm' ? Leaf : Building2;
  const themeColor = hospital.type === 'tcm' ? 'green' : 'teal';

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Nav />

      {/* Hero Section */}
      <section className={`pt-28 pb-12 ${themeColor === 'teal' ? 'bg-teal-600' : 'bg-green-600'}`}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <Link 
            href="/hospitals" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <span>←</span> 返回醫院列表
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">{hospital.name}</h1>
                <div className="flex items-center gap-2 text-white/90">
                  <MapPin className="w-4 h-4" />
                  <span>{hospital.city}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-white font-semibold">{hospital.rating}</span>
              </div>
              <span className="text-white/70">({hospital.reviews} 條評價)</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
              >
                <h2 className="text-xl font-bold text-slate-800 mb-4">醫院介紹</h2>
                <p className="text-slate-600 leading-relaxed">{hospital.description}</p>
              </motion.div>

              {/* Specialties */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-xl font-bold text-slate-800 mb-4">特色科室</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {hospital.specialties.map((specialty, index) => (
                    <div 
                      key={index}
                      className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-semibold text-slate-800 mb-2">{specialty.name}</h3>
                      <p className="text-sm text-slate-600 mb-3">{specialty.description}</p>
                      <span className={`inline-block text-sm font-medium ${
                        themeColor === 'teal' ? 'text-teal-600' : 'text-green-600'
                      }`}>
                        {specialty.price}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
              >
                <h3 className="font-bold text-slate-800 mb-4">聯繫信息</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className={`w-5 h-5 mt-0.5 ${
                      themeColor === 'teal' ? 'text-teal-600' : 'text-green-600'
                    }`} />
                    <div>
                      <span className="block text-sm text-slate-500">地址</span>
                      <span className="text-slate-800">{hospital.address}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className={`w-5 h-5 mt-0.5 ${
                      themeColor === 'teal' ? 'text-teal-600' : 'text-green-600'
                    }`} />
                    <div>
                      <span className="block text-sm text-slate-500">電話</span>
                      <span className="text-slate-800">{hospital.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className={`w-5 h-5 mt-0.5 ${
                      themeColor === 'teal' ? 'text-teal-600' : 'text-green-600'
                    }`} />
                    <div>
                      <span className="block text-sm text-slate-500">營業時間</span>
                      <span className="text-slate-800">{hospital.hours}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* CTA Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className={`rounded-2xl p-6 ${
                  themeColor === 'teal' 
                    ? 'bg-gradient-to-br from-teal-500 to-teal-600' 
                    : 'bg-gradient-to-br from-green-500 to-green-600'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-6 h-6 text-white" />
                  <h3 className="font-bold text-white">預約服務</h3>
                </div>
                <p className="text-white/90 text-sm mb-6">
                  通過 MediPanda 預約，享受專屬陪診服務和優先就診通道
                </p>
                <Link
                  href="/contact"
                  className="block w-full text-center py-3 bg-white rounded-xl font-semibold transition-all hover:shadow-lg"
                  style={{ color: themeColor === 'teal' ? '#0d9488' : '#16a34a' }}
                >
                  立即預約
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
