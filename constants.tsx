import { EmotionType, LearningModule, ActivityContext, AnalyticsData } from './types';
import { Smile, Frown, Zap, AlertCircle, Heart } from 'lucide-react';
import React from 'react';

// Color Palette
export const EMOTION_COLORS = {
  [EmotionType.HAPPY]: 'bg-yellow-400 text-yellow-900 border-yellow-500',
  [EmotionType.SAD]: 'bg-blue-400 text-blue-900 border-blue-500',
  [EmotionType.ANGRY]: 'bg-red-500 text-white border-red-700',
  [EmotionType.SCARED]: 'bg-purple-400 text-purple-900 border-purple-600',
  [EmotionType.SURPRISED]: 'bg-orange-400 text-orange-900 border-orange-600',
};

export const EMOTION_ICONS = {
  [EmotionType.HAPPY]: <Smile size={48} />,
  [EmotionType.SAD]: <Frown size={48} />,
  [EmotionType.ANGRY]: <Zap size={48} />,
  [EmotionType.SCARED]: <AlertCircle size={48} />,
  [EmotionType.SURPRISED]: <Heart size={48} />, // Using heart as placeholder for surprised/awe
};

export const EMOTION_LABELS_VI = {
  [EmotionType.HAPPY]: 'Vui Vẻ',
  [EmotionType.SAD]: 'Buồn Bã',
  [EmotionType.ANGRY]: 'Tức Giận',
  [EmotionType.SCARED]: 'Sợ Hãi',
  [EmotionType.SURPRISED]: 'Ngạc Nhiên',
};

// Mock Contexts (simulating QR Codes)
export const QR_CONTEXTS: ActivityContext[] = [
  { id: 'qr-001', title: 'Giành đồ chơi', category: 'Playground', targetEmotion: EmotionType.ANGRY },
  { id: 'qr-002', title: 'Ngày đầu đi học', category: 'School', targetEmotion: EmotionType.SCARED },
  { id: 'qr-003', title: 'Bị điểm kém', category: 'School', targetEmotion: EmotionType.SAD },
  { id: 'qr-004', title: 'Được khen ngợi', category: 'Home', targetEmotion: EmotionType.HAPPY },
];

// Content Modules
export const MODULES: Record<EmotionType, LearningModule> = {
  [EmotionType.ANGRY]: {
    id: 'mod-angry',
    emotion: EmotionType.ANGRY,
    breathingConfig: { secondsIn: 4, secondsHold: 2, secondsOut: 6 },
    activityShort: 'Nắm chặt tay rồi thả lỏng (3 lần)',
    teacherScript: {
      acknowledge: 'Cô thấy con đang rất giận vì bạn lấy đồ chơi.',
      limit: 'Nhưng chúng mình không được đánh bạn.',
      guide: 'Con hãy nói: "Tớ đang chơi, bạn chờ tớ nhé".',
    },
  },
  [EmotionType.SCARED]: {
    id: 'mod-scared',
    emotion: EmotionType.SCARED,
    breathingConfig: { secondsIn: 3, secondsHold: 0, secondsOut: 3 },
    activityShort: 'Tưởng tượng mình là chú rùa rụt cổ vào mai an toàn.',
    teacherScript: {
      acknowledge: 'Mẹ biết con đang lo lắng khi vào lớp mới.',
      limit: undefined,
      guide: 'Mình cùng hít thở sâu nhé, mẹ ở đây với con.',
    },
  },
  [EmotionType.SAD]: {
    id: 'mod-sad',
    emotion: EmotionType.SAD,
    breathingConfig: { secondsIn: 4, secondsHold: 0, secondsOut: 4 },
    activityShort: 'Ôm gấu bông thật chặt trong 10 giây.',
    teacherScript: {
      acknowledge: 'Con buồn vì bị mất món đồ yêu thích đúng không?',
      limit: undefined,
      guide: 'Con có muốn cô ôm con một cái không?',
    },
  },
  [EmotionType.HAPPY]: {
    id: 'mod-happy',
    emotion: EmotionType.HAPPY,
    breathingConfig: { secondsIn: 2, secondsHold: 0, secondsOut: 2 },
    activityShort: 'Nhảy múa theo điệu nhạc vui nhộn!',
    teacherScript: {
      acknowledge: 'Con đang rất vui vì làm được bài tập khó!',
      guide: 'Con hãy chia sẻ niềm vui này với bạn bên cạnh nhé.',
    },
  },
  [EmotionType.SURPRISED]: {
    id: 'mod-surprised',
    emotion: EmotionType.SURPRISED,
    breathingConfig: { secondsIn: 3, secondsHold: 1, secondsOut: 3 },
    activityShort: 'Mở to mắt nhìn xung quanh xem có gì mới.',
    teacherScript: {
      acknowledge: 'Ồ, điều này thật bất ngờ với con phải không?',
      guide: 'Chúng mình cùng khám phá xem nó hoạt động thế nào nhé.',
    },
  },
};

export const MOCK_ANALYTICS: AnalyticsData[] = [
  { date: 'Tuần 1', happy: 12, sad: 5, angry: 8, scared: 4, surprised: 2, totalInteractions: 31 },
  { date: 'Tuần 2', happy: 15, sad: 4, angry: 6, scared: 3, surprised: 3, totalInteractions: 31 },
  { date: 'Tuần 3', happy: 18, sad: 2, angry: 4, scared: 2, surprised: 4, totalInteractions: 30 },
  { date: 'Tuần 4', happy: 22, sad: 1, angry: 2, scared: 1, surprised: 5, totalInteractions: 31 },
];