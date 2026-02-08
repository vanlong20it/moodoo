import { AnalyticsData, EmotionType } from '../types';
import { MOCK_ANALYTICS } from '../constants';

const STORAGE_KEY = 'MOODOO_ANALYTICS';

/**
 * Initialize data in localStorage if empty
 */
const initData = (): AnalyticsData[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // Seed with mock data if empty
  localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_ANALYTICS));
  return MOCK_ANALYTICS;
};

/**
 * Get all analytics data
 */
export const getAnalyticsData = (): AnalyticsData[] => {
  return initData();
};

/**
 * Save a new interaction
 */
export const saveCheckIn = (emotion: EmotionType) => {
  const data = initData();
  const currentLabel = 'Tuần này'; // Simulating grouping by current week/period
  
  let currentPeriod = data.find(d => d.date === currentLabel);

  if (!currentPeriod) {
    // Create new period if not exists
    currentPeriod = {
      date: currentLabel,
      happy: 0,
      sad: 0,
      angry: 0,
      scared: 0,
      surprised: 0,
      totalInteractions: 0
    };
    data.push(currentPeriod);
  }

  // Update counts
  switch (emotion) {
    case EmotionType.HAPPY: currentPeriod.happy++; break;
    case EmotionType.SAD: currentPeriod.sad++; break;
    case EmotionType.ANGRY: currentPeriod.angry++; break;
    case EmotionType.SCARED: currentPeriod.scared++; break;
    case EmotionType.SURPRISED: currentPeriod.surprised++; break;
  }
  currentPeriod.totalInteractions++;

  // Save back to storage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

/**
 * Export data to CSV
 */
export const exportToCSV = () => {
  const data = getAnalyticsData();
  
  // Define headers
  const headers = ['Thời gian', 'Vui vẻ', 'Buồn bã', 'Tức giận', 'Sợ hãi', 'Ngạc nhiên', 'Tổng tương tác'];
  
  // Map data to rows
  const rows = data.map(item => [
    item.date,
    item.happy,
    item.sad,
    item.angry,
    item.scared,
    item.surprised,
    item.totalInteractions
  ]);

  // Combine header and rows
  const csvContent = [
    headers.join(','), 
    ...rows.map(row => row.join(','))
  ].join('\n');

  // Create blob and download link
  const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' }); // Add BOM for Excel support
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `moodoo_baocao_${new Date().toISOString().slice(0,10)}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};