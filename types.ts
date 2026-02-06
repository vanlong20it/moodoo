export enum EmotionType {
  HAPPY = 'HAPPY',
  SAD = 'SAD',
  SCARED = 'SCARED',
  ANGRY = 'ANGRY',
  SURPRISED = 'SURPRISED'
}

export interface ActivityContext {
  id: string;
  title: string;
  category: string; // e.g., "School", "Home", "Playground"
  targetEmotion?: EmotionType; // If the QR is specifically for an emotion
}

export interface EmotionalState {
  emotion: EmotionType;
  intensity: number; // 1-5
  timestamp: number;
}

export interface TeacherScript {
  acknowledge: string;
  limit?: string;
  guide: string;
}

export interface LearningModule {
  id: string;
  emotion: EmotionType;
  breathingConfig: {
    secondsIn: number;
    secondsHold: number;
    secondsOut: number;
  };
  activityShort: string;
  teacherScript: TeacherScript;
}

export interface AnalyticsData {
  date: string;
  happy: number;
  sad: number;
  angry: number;
  scared: number;
  surprised: number;
  totalInteractions: number;
}