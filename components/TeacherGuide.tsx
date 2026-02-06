import React, { useState } from 'react';
import { TeacherScript } from '../types';
import { ChevronUp, ChevronDown, MessageCircle } from 'lucide-react';

interface TeacherGuideProps {
  script: TeacherScript;
  role: 'teacher' | 'parent';
}

const TeacherGuide: React.FC<TeacherGuideProps> = ({ script, role }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white border-t-2 border-indigo-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] transition-transform duration-300 z-50 pb-safe ${isOpen ? 'translate-y-0' : 'translate-y-[calc(100%-3.5rem)]'}`}>
      {/* Toggle Handle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-indigo-50 hover:bg-indigo-100 h-12 flex items-center justify-center text-indigo-600 font-medium text-sm rounded-t-lg active:bg-indigo-200"
      >
        {isOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        <span className="ml-2">{role === 'parent' ? 'Gợi ý cho Ba Mẹ' : 'Gợi ý cho Cô'}</span>
      </button>

      {/* Content */}
      <div className="p-4 pb-4 max-w-md mx-auto space-y-4">
        <div className="flex items-start gap-3">
          <div className="bg-indigo-100 p-2 rounded-full text-indigo-600 mt-1 flex-shrink-0">
            <MessageCircle size={20} />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-800 text-sm mb-1 uppercase tracking-wide">Công Nhận</h4>
            <p className="text-gray-700 italic">"{script.acknowledge}"</p>
          </div>
        </div>

        {script.limit && (
           <div className="flex items-start gap-3">
           <div className="bg-red-100 p-2 rounded-full text-red-600 mt-1 flex-shrink-0">
             <span className="font-bold text-xs">STOP</span>
           </div>
           <div className="flex-1">
             <h4 className="font-bold text-gray-800 text-sm mb-1 uppercase tracking-wide">Giới Hạn</h4>
             <p className="text-gray-700 italic">"{script.limit}"</p>
           </div>
         </div>
        )}

        <div className="flex items-start gap-3">
          <div className="bg-green-100 p-2 rounded-full text-green-600 mt-1 flex-shrink-0">
            <span className="font-bold text-xs">GO</span>
          </div>
          <div className="flex-1">
             <h4 className="font-bold text-gray-800 text-sm mb-1 uppercase tracking-wide">Hướng Dẫn</h4>
             <p className="text-gray-700 italic">"{script.guide}"</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherGuide;