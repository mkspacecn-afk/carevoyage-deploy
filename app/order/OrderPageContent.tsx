'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import Nav from '../../components/nav';
import Footer from '../../components/footer';
import { 
  Check, 
  ChevronRight, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  MessageSquare,
  Shield,
  FileText,
  CheckCircle2,
  ArrowLeft,
  Home,
  ArrowRight,
  Loader2
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  currentPrice: number;
  originalPrice: number;
}

export default function OrderPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [orderNo, setOrderNo] = useState('');
  
  const productId = searchParams.get('productId');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    notes: ''
  });

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    } else {
      setLoading(false);
    }
  }, [productId]);

  const fetchProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();
      
      if (data.success) {
        setProduct(data.data);
      } else {
        setError(data.error || 'Failed to load product');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        router.push('/login?redirect=/order?productId=' + productId);
        return;
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId,
          contactName: formData.name,
          contactPhone: formData.phone,
          contactEmail: formData.email,
          expectedDate: formData.date,
          notes: formData.notes
        })
      });

      const data = await response.json();

      if (data.success) {
        setOrderNo(data.data.orderNo);
        setOrderComplete(true);
        setStep(3);
      } else {
        if (response.status === 401) {
          router.push('/login?redirect=/order?productId=' + productId);
        } else {
          setError(data.error || 'Failed to create order');
        }
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = (price: number) => {
    return price > 0 ? `¥${price.toLocaleString()}` : '¥面议';
  };

  const steps = [
    { id: 1, label: '填写信息', icon: FileText },
    { id: 2, label: '确认订单', icon: Shield },
    { id: 3, label: '完成', icon: CheckCircle2 },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F0FDFA] to-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  if (!productId || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F0FDFA] to-white">
        <Nav />
        <div className="pt-28 pb-16 px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-12 shadow-lg"
            >
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-slate-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">请选择产品</h2>
              <p className="text-slate-500 mb-8">您需要先选择一个产品才能进行预订</p>
              <Link
                href="/medical-tourism"
                className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition-colors"
              >
                浏览套餐
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0FDFA] to-white">
      <Nav />
      
      <div className="pt-28 pb-16 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Step Indicator */}
          <div className="mb-12">
            <div className="flex items-center justify-center">
              {steps.map((s, index) => (
                <div key={s.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        step >= s.id
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {step > s.id ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <s.icon className="w-6 h-6" />
                      )}
                    </div>
                    <span className={`mt-2 text-sm font-medium ${
                      step >= s.id ? 'text-teal-600' : 'text-slate-400'
                    }`}>
                      {s.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-24 h-1 mx-4 transition-all ${
                      step > s.id ? 'bg-teal-600' : 'bg-slate-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-center">
              {error}
            </div>
          )}

          {/* Content */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white rounded-3xl shadow-lg overflow-hidden"
              >
                <div className="p-8 lg:p-12">
                  <h2 className="text-2xl font-bold text-slate-900 mb-8">填写预订信息</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <User className="w-4 h-4" /> 姓名 *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                        placeholder="请输入您的姓名"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Phone className="w-4 h-4" /> 手机号码 *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                        placeholder="请输入手机号码"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Mail className="w-4 h-4" /> 电子邮箱
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                        placeholder="请输入电子邮箱"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Calendar className="w-4 h-4" /> 期望日期
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <MessageSquare className="w-4 h-4" /> 备注需求
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all resize-none"
                      placeholder="请描述您的特殊需求或健康状况（可选）"
                    />
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={() => setStep(2)}
                      disabled={!formData.name || !formData.phone}
                      className="px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-teal-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      下一步
                      <ChevronRight className="w-5 h-5 inline ml-2" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid lg:grid-cols-2 gap-8"
              >
                <div className="bg-white rounded-3xl shadow-lg p-8">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">订单摘要</h2>
                  
                  <div className="bg-gradient-to-br from-teal-50 to-white rounded-2xl p-6 mb-6">
                    <div className="text-sm text-slate-500 mb-2">产品名称</div>
                    <div className="text-lg font-semibold text-slate-900 mb-4">{product.name}</div>
                    
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-teal-600">{formatPrice(product.currentPrice)}</span>
                      {product.originalPrice > product.currentPrice && (
                        <span className="text-slate-400 line-through">{formatPrice(product.originalPrice)}</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between py-3 border-b border-slate-100">
                      <span className="text-slate-500">产品费用</span>
                      <span className="font-medium">{formatPrice(product.currentPrice)}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-slate-100">
                      <span className="text-slate-500">服务费</span>
                      <span className="font-medium">包含在内</span>
                    </div>
                    <div className="flex justify-between py-3 text-lg font-bold">
                      <span className="text-slate-900">总计</span>
                      <span className="text-teal-600">{formatPrice(product.currentPrice)}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-sm text-slate-500">
                    <Shield className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                    <p>预订后专属顾问将在24小时内与您联系确认详细安排。支持7天无理由退款。</p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-lg p-8">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">联系信息</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-500">姓名</div>
                        <div className="font-medium">{formData.name}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-500">手机</div>
                        <div className="font-medium">{formData.phone}</div>
                      </div>
                    </div>

                    {formData.email && (
                      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                          <Mail className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                          <div className="text-sm text-slate-500">邮箱</div>
                          <div className="font-medium">{formData.email}</div>
                        </div>
                      </div>
                    )}

                    {formData.date && (
                      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                          <div className="text-sm text-slate-500">期望日期</div>
                          <div className="font-medium">{formData.date}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 flex gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 px-6 py-4 border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5 inline mr-2" />
                      返回修改
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-teal-200 transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 inline mr-2 animate-spin" />
                          提交中...
                        </>
                      ) : (
                        '确认预订'
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && orderComplete && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl shadow-lg p-12 text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Check className="w-12 h-12 text-white" />
                </div>
                
                <h2 className="text-3xl font-bold text-slate-900 mb-4">预订成功！</h2>
                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                  感谢您选择CareVoyage！我们的专属顾问将在24小时内与您联系，确认详细安排。
                </p>

                <div className="bg-slate-50 rounded-2xl p-6 mb-8 max-w-md mx-auto text-left">
                  <div className="text-sm text-slate-500 mb-2">订单号</div>
                  <div className="font-semibold text-slate-900 mb-4">{orderNo}</div>
                  <div className="text-sm text-slate-500 mb-2">产品名称</div>
                  <div className="font-semibold text-slate-900 mb-1">{product.name}</div>
                  <div className="text-teal-600">{formatPrice(product.currentPrice)}</div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition-colors"
                  >
                    <Home className="w-5 h-5" />
                    返回首页
                  </Link>
                  <Link
                    href="/medical-tourism"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
                  >
                    浏览更多套餐
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </div>
  );
}
