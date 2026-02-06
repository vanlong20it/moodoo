import { GoogleGenAI } from "@google/genai";
import { AnalyticsData } from "../types";

// Helper to get the API key safely
const getApiKey = (): string | undefined => {
  return process.env.API_KEY;
};

export const generateDashboardInsight = async (data: AnalyticsData[]): Promise<string> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    return "Vui lòng cấu hình API Key để sử dụng tính năng phân tích AI.";
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    Bạn là một chuyên gia tâm lý học đường và giáo dục mầm non.
    Dưới đây là dữ liệu cảm xúc của một lớp học trong 4 tuần qua (Tuần 1 đến Tuần 4):
    ${JSON.stringify(data)}
    
    Hãy phân tích xu hướng thay đổi cảm xúc của trẻ.
    1. Nhận xét về sự thay đổi của cảm xúc tích cực (Happy) và tiêu cực (Angry, Sad, Scared).
    2. Đưa ra 1 lời khuyên ngắn gọn (dưới 50 từ) cho giáo viên để duy trì hoặc cải thiện tình hình trong tuần tới.
    3. Trả lời bằng tiếng Việt, giọng văn khích lệ, chuyên nghiệp.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    return response.text || "Không thể tạo phân tích lúc này.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Đã xảy ra lỗi khi kết nối với AI chuyên gia.";
  }
};