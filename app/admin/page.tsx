'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  category: string;
  originalPrice: number;
  currentPrice: number;
  days: number;
  description?: string;
  features: string[];
  active: boolean;
  createdAt: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  medical: '医疗产品',
  tourism: '旅游产品', 
  combo: '医疗+旅游套餐',
  service: '医疗+服务套餐'
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState('products');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: 'medical',
    originalPrice: '',
    currentPrice: '',
    days: '',
    description: '',
    active: true
  });

  // Load products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      } else {
        setError(data.error || 'Failed to load products');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      ...formData,
      originalPrice: parseFloat(formData.originalPrice) || 0,
      currentPrice: parseFloat(formData.currentPrice) || 0,
      days: parseInt(formData.days) || 0
    };

    try {
      const url = editingProduct ? '/api/products' : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';
      const body = editingProduct 
        ? { ...payload, id: editingProduct.id }
        : payload;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        setEditingProduct(null);
        resetForm();
        fetchProducts();
      } else {
        alert(data.error || 'Failed to save');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个产品吗？')) return;
    
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchProducts();
      } else {
        alert(data.error || 'Failed to delete');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'medical',
      originalPrice: '',
      currentPrice: '',
      days: '',
      description: '',
      active: true
    });
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      originalPrice: product.originalPrice.toString(),
      currentPrice: product.currentPrice.toString(),
      days: product.days.toString(),
      description: product.description || '',
      active: product.active
    });
    setShowModal(true);
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">加载中...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <Link href="/" className="flex items-center gap-3">
            <div className="text-3xl">🐼</div>
            <span className="text-xl font-bold text-teal-600">MediPanda</span>
          </Link>
        </div>
        
        <nav className="p-4">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left px-4 py-3 rounded-lg mb-2 ${activeTab === 'dashboard' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100'}`}
          >
            📊 总览
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full text-left px-4 py-3 rounded-lg mb-2 ${activeTab === 'products' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100'}`}
          >
            🏥 产品管理
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-4 py-3 rounded-lg mb-2 ${activeTab === 'orders' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100'}`}
          >
            📋 订单管理
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {activeTab === 'dashboard' && '总览'}
            {activeTab === 'products' && '产品管理'}
            {activeTab === 'orders' && '订单管理'}
          </h1>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-teal-600 hover:underline">
              🌐 访问前台
            </Link>
            <div className="text-sm text-gray-500">
              管理员
            </div>
          </div>
        </header>

        <div className="p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-gray-500 text-sm">总产品数</div>
                <div className="text-3xl font-bold">{products.length}</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-gray-500 text-sm">上架中</div>
                <div className="text-3xl font-bold text-green-600">
                  {products.filter(p => p.active).length}
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-gray-500 text-sm">已下架</div>
                <div className="text-3xl font-bold text-gray-400">
                  {products.filter(p => !p.active).length}
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-gray-500 text-sm">今日新增</div>
                <div className="text-3xl font-bold text-blue-600">
                  {products.filter(p => {
                    const today = new Date().toDateString();
                    const created = new Date(p.createdAt).toDateString();
                    return today === created;
                  }).length}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-lg font-bold">产品列表</h2>
                <button 
                  onClick={() => { resetForm(); setEditingProduct(null); setShowModal(true); }}
                  className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
                >
                  ➕ 添加产品
                </button>
              </div>
              
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">产品名称</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">类别</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">原价</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">现价</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">状态</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{product.name}</td>
                      <td className="px-6 py-4">{CATEGORY_LABELS[product.category] || product.category}</td>
                      <td className="px-6 py-4 text-gray-500">HK${product.originalPrice}</td>
                      <td className="px-6 py-4 text-teal-600 font-semibold">HK${product.currentPrice}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${product.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                          {product.active ? '上架中' : '已下架'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => openEditModal(product)}
                          className="text-blue-600 hover:underline mr-4"
                        >
                          编辑
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:underline"
                        >
                          删除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
              订单管理功能开发中...
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-bold">
                {editingProduct ? '编辑产品' : '添加产品'}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">产品名称</label>
                <input 
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">类别</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  <option value="medical">医疗产品</option>
                  <option value="tourism">旅游产品</option>
                  <option value="combo">医疗+旅游套餐</option>
                  <option value="service">医疗+服务套餐</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">原价 (HK$)</label>
                  <input 
                    type="number"
                    value={formData.originalPrice}
                    onChange={e => setFormData({...formData, originalPrice: e.target.value})}
                    className="w-full border rounded-lg px-4 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">现价 (HK$)</label>
                  <input 
                    type="number"
                    value={formData.currentPrice}
                    onChange={e => setFormData({...formData, currentPrice: e.target.value})}
                    className="w-full border rounded-lg px-4 py-2"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">天数</label>
                <input 
                  type="number"
                  value={formData.days}
                  onChange={e => setFormData({...formData, days: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">描述</label>
                <textarea 
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2 h-24"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox"
                  checked={formData.active}
                  onChange={e => setFormData({...formData, active: e.target.checked})}
                  id="active"
                />
                <label htmlFor="active">立即上架</label>
              </div>
              
              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border rounded-lg py-2 hover:bg-gray-50"
                >
                  取消
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-teal-600 text-white rounded-lg py-2 hover:bg-teal-700"
                >
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
