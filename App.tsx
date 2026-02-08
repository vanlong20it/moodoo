import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import MiniApp from './components/MiniApp';
import Dashboard from './components/Dashboard';
import { QR_CONTEXTS } from './constants';
import { QrCode, BarChart2 } from 'lucide-react';

const Landing = () => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
    <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden">
      <div className="p-8 text-center">
        <h1 className="text-3xl font-extrabold text-indigo-900 mb-2">MOODOO</h1>
        <p className="text-slate-500 mb-8">Blended Learning Companion</p>
        
        <div className="space-y-6">
            <div className="text-left">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Simulate QR Scan (Student)</label>
                <div className="grid gap-3">
                    {QR_CONTEXTS.map(ctx => (
                        <Link 
                            key={ctx.id} 
                            to={`/app/${ctx.id}`}
                            className="flex items-center p-4 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 transition-all group"
                        >
                            <div className="bg-white p-2 rounded-lg text-indigo-600 shadow-sm mr-4 group-hover:scale-110 transition-transform">
                                <QrCode size={20} />
                            </div>
                            <div className="text-left">
                                <span className="block font-bold text-gray-800">{ctx.title}</span>
                                <span className="text-xs text-gray-500">{ctx.category}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
                 <Link 
                    to="/dashboard"
                    className="flex items-center justify-center w-full p-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                >
                    <BarChart2 className="mr-2" size={20} />
                    Open Teacher Dashboard
                </Link>
            </div>
        </div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app/:contextId" element={<MiniApp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </HashRouter>
  );
};

export default App;