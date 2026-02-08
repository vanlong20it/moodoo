import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { EMOTION_COLORS } from '../constants';
import { AnalyticsData } from '../types';
import { BrainCircuit, Download, Users } from 'lucide-react';
import { generateDashboardInsight } from '../services/geminiService';
import { getAnalyticsData, exportToCSV } from '../services/storageService';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Load data on mount
  useEffect(() => {
    const storedData = getAnalyticsData();
    setData(storedData);
  }, []);

  const handleGenerateInsight = async () => {
    setLoading(true);
    setInsight(null);
    // Use the dynamic data for AI analysis
    const result = await generateDashboardInsight(data);
    setInsight(result);
    setLoading(false);
  };

  const handleExport = () => {
    exportToCSV();
  };

  // Calculate total interactions for the summary card
  const totalAllTime = data.reduce((acc, curr) => acc + curr.totalInteractions, 0);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">MOODOO Dashboard</h1>
            <p className="text-slate-500">Báo cáo hiệu quả & xu hướng cảm xúc lớp Mầm 1</p>
          </div>
          <div className="flex gap-3">
             <button 
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50 transition-colors shadow-sm active:scale-95 transform"
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
                            <BrainCircuit className="text-purple-600" />
                            Góc chuyên gia AI
                        </h3>
                        <p className="text-sm text-slate-500 mb-4">Phân tích xu hướng cảm xúc và gợi ý giải pháp sư phạm.</p>
                    </div>
                    <button 
                        onClick={handleGenerateInsight}
                        disabled={loading}
                        className="px-4 py-2 bg-purple-600 text-white text-sm font-bold rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
                    >
                        {loading ? 'Đang phân tích...' : 'Phân tích ngay'}
                    </button>
                 </div>
                 {insight && (
                     <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 text-slate-700 text-sm leading-relaxed animate-in fade-in">
                         {insight}
                     </div>
                 )}
            </div>
        </div>

        {/* Charts */}
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
                <h3 className="font-bold text-slate-800 mb-6">Phân Bố Cảm Xúc (Tổng quan)</h3>
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
      </div>
    </div>
  );
};

export default Dashboard;