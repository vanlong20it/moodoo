import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { AnalyticsData } from '../types';
import { Lightbulb, Download, Users, Home, Trash2, BarChart2 } from 'lucide-react';
import { generateDashboardInsight } from '../services/geminiService';
import { getAnalyticsData, exportToCSV, clearData } from '../services/storageService';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const storedData = getAnalyticsData();
    setData(storedData);
  };

  const handleGenerateInsight = async () => {
    if (data.length === 0) return;
    setLoading(true);
    setInsight(null);
    // Use the offline logic
    const result = await generateDashboardInsight(data);
    setInsight(result);
    setLoading(false);
  };

  const handleExport = () => {
    exportToCSV();
  };

  const handleReset = () => {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ dữ liệu không?")) {
        clearData();
        loadData();
        setInsight(null);
    }
  };

  // Calculate total interactions for the summary card
  const totalAllTime = data.reduce((acc, curr) => acc + curr.totalInteractions, 0);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
                onClick={() => navigate('/')}
                className="bg-white p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm"
                title="Trở về trang chủ"
            >
                <Home size={24} />
            </button>
            <div>
                <h1 className="text-3xl font-bold text-slate-800">MOODOO Dashboard</h1>
                <p className="text-slate-500">Báo cáo hiệu quả & xu hướng cảm xúc</p>
            </div>
          </div>
          <div className="flex gap-3">
             {data.length > 0 && (
                <button 
                    onClick={handleReset}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-red-600 font-medium hover:bg-red-100 transition-colors shadow-sm"
                >
                    <Trash2 size={18} />
                    <span className="hidden md:inline">Xóa dữ liệu</span>
                </button>
             )}
             <button 
                onClick={handleExport}
                disabled={data.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50 transition-colors shadow-sm active:scale-95 transform disabled:opacity-50 disabled:cursor-not-allowed"
             >
                <Download size={18} />
                Xuất Báo Cáo
             </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Tổng tương tác</p>
                        <h3 className="text-2xl font-bold text-slate-800">{totalAllTime}</h3>
                        <span className="text-xs text-green-600 font-medium">Dữ liệu thời gian thực</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 col-span-1 md:col-span-2">
                 <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                            <Lightbulb className="text-yellow-500" />
                            Phân tích số liệu
                        </h3>
                        <p className="text-sm text-slate-500 mb-4">Tổng hợp xu hướng và đưa ra lời khuyên sư phạm.</p>
                    </div>
                    <button 
                        onClick={handleGenerateInsight}
                        disabled={loading || data.length === 0}
                        className="px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Đang xử lý...' : 'Phân tích ngay'}
                    </button>
                 </div>
                 {insight && (
                     <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 text-slate-700 text-sm leading-relaxed animate-in fade-in whitespace-pre-line">
                         {insight}
                     </div>
                 )}
            </div>
        </div>

        {/* Empty State or Charts */}
        {data.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl shadow-sm border border-dashed border-slate-300 flex flex-col items-center justify-center text-center">
                <div className="bg-slate-50 p-6 rounded-full mb-4">
                    <BarChart2 size={48} className="text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-700 mb-2">Chưa có dữ liệu cảm xúc</h3>
                <p className="text-slate-500 max-w-md mb-8">
                    Hệ thống chưa ghi nhận lượt tương tác nào. Hãy quét mã QR hoặc truy cập ứng dụng để bắt đầu ghi nhận cảm xúc.
                </p>
                <button 
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors shadow-lg"
                >
                    Quay về Trang Chủ
                </button>
            </div>
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Trend Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-slate-800 mb-6">Xu Hướng Cảm Xúc</h3>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}} />
                                <Legend />
                                <Line type="monotone" dataKey="happy" stroke="#fbbf24" strokeWidth={3} name="Vui" dot={{r: 4}} />
                                <Line type="monotone" dataKey="angry" stroke="#ef4444" strokeWidth={3} name="Giận" dot={{r: 4}} />
                                <Line type="monotone" dataKey="sad" stroke="#60a5fa" strokeWidth={3} name="Buồn" dot={{r: 4}} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Distribution Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-slate-800 mb-6">Phân Bố Cảm Xúc</h3>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                                <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}}/>
                                <Legend />
                                <Bar dataKey="happy" fill="#fbbf24" name="Vui" stackId="a" radius={[0, 0, 4, 4]} />
                                <Bar dataKey="angry" fill="#ef4444" name="Giận" stackId="a" />
                                <Bar dataKey="scared" fill="#c084fc" name="Sợ" stackId="a" />
                                <Bar dataKey="surprised" fill="#fb923c" name="Ngạc nhiên" stackId="a" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;