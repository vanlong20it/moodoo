import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QR_CONTEXTS, MODULES, EMOTION_COLORS, EMOTION_LABELS_VI } from '../constants';
import { EmotionType } from '../types';
import EmotionCheckIn from './EmotionCheckIn';
import BreathingExercise from './BreathingExercise';
import TeacherGuide from './TeacherGuide';
import { saveCheckIn } from '../services/storageService';
import { CheckCircle2, Home } from 'lucide-react';

const MiniApp: React.FC = () => {
  const { contextId } = useParams();
  const navigate = useNavigate();
  
  // Find context or default to a generic one if missing
  const context = QR_CONTEXTS.find(c => c.id === contextId) || QR_CONTEXTS[0];

  const [step, setStep] = useState<'checkin' | 'breathing' | 'activity' | 'done'>('checkin');
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null);

  const handleEmotionSelect = (emotion: EmotionType) => {
    setSelectedEmotion(emotion);
    setStep('breathing');
  };

  const handleBreathingComplete = () => {
    setStep('activity');
  };

  const handleCompleteActivity = () => {
    // Save data when the user selects a final need or completes the activity
    if (selectedEmotion) {
        saveCheckIn(selectedEmotion);
    }
    setStep('done');
  };

  const currentModule = selectedEmotion ? MODULES[selectedEmotion] : MODULES[EmotionType.HAPPY];

  if (!context) return <div>Invalid QR Code</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative pb-safe">
        {/* Header */}
        <div className="bg-white p-4 shadow-sm flex items-center justify-between sticky top-0 z-10 pt-safe">
            <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{context.category}</span>
                <h1 className="text-lg font-bold text-gray-800 line-clamp-1">{context.title}</h1>
            </div>
            <button onClick={() => navigate('/')} className="text-gray-400 hover:text-gray-600 p-2">
                <Home size={20}/>
            </button>
        </div>

        {/* Content Area - Add padding bottom to account for TeacherGuide */}
        <div className={`flex-1 flex flex-col pt-6 px-4 ${selectedEmotion && step !== 'done' ? 'pb-40' : 'pb-8'}`}>
            
            {step === 'checkin' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <EmotionCheckIn onSelect={handleEmotionSelect} />
                </div>
            )}

            {step === 'breathing' && selectedEmotion && (
                <div className="animate-in zoom-in duration-500 flex flex-col items-center">
                    <h3 className="text-xl font-medium text-gray-700 mb-4 text-center">
                        Cùng hít thở để bình tĩnh nhé!
                    </h3>
                    <BreathingExercise 
                        secondsIn={currentModule.breathingConfig.secondsIn}
                        secondsHold={currentModule.breathingConfig.secondsHold}
                        secondsOut={currentModule.breathingConfig.secondsOut}
                        onComplete={handleBreathingComplete}
                    />
                    <button 
                        onClick={handleBreathingComplete} 
                        className="mt-8 text-sm text-gray-400 underline p-4"
                    >
                        Bỏ qua hít thở
                    </button>
                </div>
            )}

            {step === 'activity' && selectedEmotion && (
                 <div className="animate-in slide-in-from-right duration-500 max-w-md mx-auto w-full">
                    <div className={`p-6 rounded-2xl ${EMOTION_COLORS[selectedEmotion]} mb-6 text-center shadow-lg transition-all`}>
                        <h2 className="text-2xl font-bold mb-2">Hoạt Động Cân Bằng</h2>
                        <p className="text-lg opacity-95">{currentModule.activityShort}</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4">Con muốn gì lúc này?</h3>
                        <div className="space-y-3">
                            {['Một cái ôm', 'Uống nước', 'Ngồi yên một mình', 'Chơi tiếp'].map((need) => (
                                <button 
                                    key={need}
                                    onClick={handleCompleteActivity}
                                    className="w-full p-4 text-left rounded-xl bg-gray-50 hover:bg-indigo-50 border border-transparent hover:border-indigo-200 transition-colors font-medium text-gray-700"
                                >
                                    {need}
                                </button>
                            ))}
                        </div>
                    </div>
                 </div>
            )}

            {step === 'done' && (
                <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
                    <div className="bg-green-100 text-green-600 p-6 rounded-full mb-6">
                        <CheckCircle2 size={64} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Tuyệt vời!</h2>
                    <p className="text-gray-600 mb-8">Con đã làm rất tốt.</p>
                    <button 
                        onClick={() => navigate('/')}
                        className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-700 transition-colors"
                    >
                        Xong
                    </button>
                </div>
            )}
        </div>

        {/* Persistent Teacher/Parent Guide */}
        {selectedEmotion && step !== 'checkin' && step !== 'done' && (
            <TeacherGuide 
                script={currentModule.teacherScript} 
                role="teacher" 
            />
        )}
    </div>
  );
};

export default MiniApp;