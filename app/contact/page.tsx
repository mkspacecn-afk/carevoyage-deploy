'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Nav from '../../components/nav';
import Footer from '../../components/footer';
import { Mail, Phone, MessageCircle, Clock, Send, ChevronDown, ChevronUp } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    label: '郵箱',
    value: 'hello@medipandachina.com',
    href: 'mailto:hello@medipandachina.com',
  },
  {
    icon: Phone,
    label: '電話',
    value: '+86 28 8888 8888',
    href: 'tel:+862888888888',
  },
  {
    icon: MessageCircle,
    label: '微信',
    value: 'MediPanda',
    href: '#',
  },
];

const serviceHours = [
  { day: '周一至周五', hours: '09:00 - 18:00' },
  { day: '周六', hours: '10:00 - 16:00' },
  { day: '周日', hours: '休息' },
];

const faqs = [
  {
    question: '如何預約醫療服務？',
    answer: '您可以通過網站表單、電話或微信聯繫我們。我們的醫療顧問將在24小時內與您聯繫，了解您的需求並提供個性化方案。',
  },
  {
    question: '醫療旅遊需要提前多久預約？',
    answer: '建議提前2-4周預約，以便我們為您安排最合適的專家和時間。緊急情況下，我們也可提供加急服務。',
  },
  {
    question: '服務費用包含哪些內容？',
    answer: '我們的服務費用包括：醫院預約、專業翻譯、全程陪診、行程規劃等。醫療費用根據實際治療情況單獨結算。',
  },
  {
    question: '是否提供醫療保險？',
    answer: '我們與多家國際保險公司合作，可為您推薦適合的醫療旅遊保險產品。具體請諮詢我們的客服人員。',
  },
  {
    question: '如何支付醫療費用？',
    answer: '我們支持多種支付方式：信用卡、銀行轉賬、支付寶、微信支付等。部分醫院也支持國際保險直付。',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: '', phone: '', email: '', message: '' });
    
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

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
            聯繫我們
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-slate-600"
          >
            我們隨時為您服務，解答您的任何疑問
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-6">發送咨詢</h2>
              
              {submitSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">發送成功！</h3>
                  <p className="text-green-600">我們的醫療顧問將在24小時內與您聯繫。</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      姓名 *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="請輸入您的姓名"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                      電話 *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="請輸入您的聯繫電話"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      郵箱
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="請輸入您的郵箱（選填）"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                      咨詢內容 *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                      placeholder="請描述您的醫療需求或問題"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
                        />
                        發送中...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        提交咨詢
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="block bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center"
                      >
                        <item.icon className="w-6 h-6 text-teal-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">{item.label}</p>
                        <p className="text-lg font-semibold text-slate-800">{item.value}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Service Hours */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="font-bold text-slate-800">服務時間</h3>
                </div>
                
                <div className="space-y-2">
                  {serviceHours.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-slate-600">{item.day}</span>
                      <span className="font-medium text-slate-800">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 lg:px-12 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">常見問題</h2>
            <p className="text-slate-600">FAQ</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-800 pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-5 pb-5"
                  >
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
