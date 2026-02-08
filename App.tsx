import React from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import MiniApp from "./components/MiniApp";
import Dashboard from "./components/Dashboard";
import { QR_CONTEXTS } from "./constants";
import { QrCode, BarChart2, ShieldCheck, User } from "lucide-react";
import Banner from "./images/banner.jpg";

const Landing = () => (
  <div
    className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4"
    style={{
      backgroundImage: `url(${Banner})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="max-w-2xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Student Zone */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col">
        <div className="p-6 bg-indigo-600 text-white">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <User size={24} />
            Dành cho Bé
          </h2>
          <p className="text-indigo-200 text-sm mt-1">
            Mô phỏng quét mã QR tại các trạm
          </p>
        </div>
        <div className="p-6 space-y-3 flex-1">
          {QR_CONTEXTS.map((ctx) => (
            <Link
              key={ctx.id}
              to={`/app/${ctx.id}`}
              className="flex items-center p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 transition-all group"
            >
              <div className="bg-white p-2 rounded-lg text-indigo-600 shadow-sm mr-3 group-hover:scale-110 transition-transform">
                <QrCode size={18} />
              </div>
              <div className="text-left">
                <span className="block font-bold text-slate-700 text-sm">
                  {ctx.title}
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  {ctx.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Teacher Zone */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col">
        <div className="p-6 bg-emerald-600 text-white">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShieldCheck size={24} />
            Dành cho Cô & Mẹ
          </h2>
          <p className="text-emerald-200 text-sm mt-1">
            Theo dõi và phân tích dữ liệu
          </p>
        </div>
        <div className="p-6 flex-1 flex flex-col justify-center items-center text-center space-y-6">
          <div className="bg-emerald-50 p-4 rounded-full text-emerald-600">
            <BarChart2 size={48} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Dashboard Quản Lý
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Xem thống kê cảm xúc của trẻ và nhận gợi ý từ AI chuyên gia.
            </p>
            <Link
              to="/dashboard"
              className="flex items-center justify-center w-full px-6 py-3 rounded-full bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
            >
              Mở Dashboard
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
