'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Nav from '../../../components/nav';
import Footer from '../../../components/footer';
import { 
  Heart, 
  Share2, 
  Star, 
  Check, 
  MapPin, 
  Calendar, 
  Clock,
  Shield,
  Phone,
  ChevronRight,
  Loader2
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  originalPrice: number;
  currentPrice: number;
  days: number;
  description: string;
  features: string[];
  includes: string[];
  schedule: string[];
  hospital?: {
    id: string;
    name: string;
    city: string;
  };
}

const categoryLabels: Record<string, string> = {
  tourism: '医疗+旅游',
  service: '医疗+服务',
  medical: '医疗服务',
  combo: '组合套餐',
  custom: '自选配置'
};

const categoryColors: Record<string, string> = {
  tourism: 'bg-teal-100 text-teal-700',
  service: 'bg-blue-100 text-blue-700',
  medical: 'bg-green-100 text-green-700',
  combo: 'bg-purple-100 text-purple-700',
  custom: 'bg-orange-100 text-orange-700'
};

// Mock reviews for now - will be from API later
const mockReviews = [
  { name: '张先生', rating: 5, comment: '服务非常专业，体检报告很详细，导游也很贴心！', date: '2026-02-15' },
  { name: '李女士', rating: 5, comment: '第一次来成都，医疗和旅游结合得很好，推荐！', date: '2026-02-10' }
];

export default function ProductDetailClient({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
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

  const formatPrice = (price: number) => {
    return price > 0 ? `¥${price.toLocaleString()}` : '¥面议';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F0FDFA] to-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F0FDFA] to-white pt-28 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-12 shadow-lg">
            <p className="text-red-500 mb-4">{error || 'Product not found'}</p>
            <Link href="/medical-tourism" className="text-teal-600 hover:underline">
              Back to products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const includes = product.includes || [];
  const schedule = product.schedule || [];
  const features = product.features || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0FDFA] to-white">
      <Nav />
      
      <div className="pt-28 pb-16 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-teal-600">首页</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/medical-tourism" className="hover:text-teal-600">套餐</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gradient-to-br from-teal-100 via-teal-50 to-white rounded-3xl aspect-square flex items-center justify-center relative overflow-hidden">
                <div className="text-9xl opacity-20">🐼</div>
                <div className="absolute bottom-6 left-6 right-6 flex gap-3">
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isLiked ? 'bg-red-500 text-white' : 'bg-white/90 text-slate-600'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                  <button className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-slate-600">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right: Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col"
            >
              {/* Category Tag */}
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium w-fit mb-4 ${categoryColors[product.category] || 'bg-slate-100 text-slate-700'}`}>
                {categoryLabels[product.category] || product.category}
              </span>

              <h1 className="text-3xl font-bold text-slate-900 mb-4">{product.name}</h1>
              
              <p className="text-slate-600 mb-6 leading-relaxed">{product.description}</p>

              {/* Hospital Info */}
              {product.hospital && (
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{product.hospital.city} · {product.hospital.name}</span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-4xl font-bold text-teal-600">{formatPrice(product.currentPrice)}</span>
                {product.originalPrice > 0 && product.originalPrice > product.currentPrice && (
                  <span className="text-lg text-slate-400 line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>

              {/* Features */}
              {features.length > 0 && (
                <div className="space-y-3 mb-8">
                  {features.slice(0, 5).map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center">
                        <Check className="w-4 h-4 text-teal-600" />
                      </div>
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA Button */}
              <Link
                href={`/order?productId=${product.id}`}
                className="w-full py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold text-center hover:shadow-lg hover:shadow-teal-200 transition-all mb-8"
              >
                立即预订
              </Link>

              {/* Trust Badges */}
              <div className="flex gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-teal-500" />
                  <span>正规医疗机构</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-500" />
                  <span>48小时响应</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-teal-500" />
                  <span>专属客服</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="mt-16">
            <div className="border-b border-slate-200 mb-8">
              <div className="flex gap-8">
                {[
                  { id: 'overview', label: '概览' },
                  { id: 'details', label: '详情' },
                  { id: 'reviews', label: `评价 (${mockReviews.length})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-4 text-sm font-medium transition-colors relative ${
                      activeTab === tab.id
                        ? 'text-teal-600'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && (
                <div className="grid md:grid-cols-2 gap-8">
                  {includes.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-teal-500" /> 服务包含
                      </h3>
                      <ul className="space-y-3">
                        {includes.map((item, index) => (
                          <li key={index} className="flex items-start gap-3 text-slate-600">
                            <Check className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {schedule.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-teal-500" /> 行程安排
                      </h3>
                      <ul className="space-y-3">
                        {schedule.map((item, index) => (
                          <li key={index} className="text-slate-600">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'details' && (
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h3 className="font-semibold text-slate-900 mb-4">服务详情</h3>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-600 leading-relaxed mb-4">
                      {product.description}
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      本服务由CareVoyage与合作医疗机构联合提供。
                      所有医疗服务均由具备正规资质的三甲医院专业医护人员执行，确保服务质量与安全。
                      预订成功后，专属顾问将在24小时内与您联系，确认具体行程安排。
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {mockReviews.length > 0 ? (
                    mockReviews.map((review, index) => (
                      <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-medium">
                              {review.name[0]}
                            </div>
                            <div>
                              <div className="font-medium text-slate-900">{review.name}</div>
                              <div className="text-sm text-slate-400">{review.date}</div>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-slate-600">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-slate-400">
                      暂无评价，预订后成为第一个评价者！
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
