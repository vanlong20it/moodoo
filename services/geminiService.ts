import { AnalyticsData, EmotionType } from "../types";
import { EMOTION_LABELS_VI } from "../constants";

/**
 * Generates insights based on local logic without external AI API.
 * Analyzes the latest data trends and dominant emotions.
 */
export const generateDashboardInsight = async (data: AnalyticsData[]): Promise<string> => {
  // Simulate a short delay for UX consistency (optional, can be removed)
  await new Promise(resolve => setTimeout(resolve, 500));

  if (!data || data.length === 0) {
    return "Chưa có đủ dữ liệu để phân tích. Hãy khuyến khích trẻ check-in cảm xúc thêm nhé.";
  }

  // Analyze the most recent period (or aggregate all if needed, here we take the last entry)
  // Assuming the last entry in the array is the most relevant/current "This Week"
  const currentData = data[data.length - 1];

  const total = currentData.totalInteractions;
  if (total < 3) {
    return "Dữ liệu tuần này còn ít. Hãy tiếp tục ghi nhận thêm cảm xúc của trẻ để có đánh giá chính xác hơn.";
  }

  // 1. Identify Dominant Emotion
  const emotions = [
    { type: EmotionType.HAPPY, count: currentData.happy, label: EMOTION_LABELS_VI[EmotionType.HAPPY] },
    { type: EmotionType.SAD, count: currentData.sad, label: EMOTION_LABELS_VI[EmotionType.SAD] },
    { type: EmotionType.ANGRY, count: currentData.angry, label: EMOTION_LABELS_VI[EmotionType.ANGRY] },
    { type: EmotionType.SCARED, count: currentData.scared, label: EMOTION_LABELS_VI[EmotionType.SCARED] },
    { type: EmotionType.SURPRISED, count: currentData.surprised, label: EMOTION_LABELS_VI[EmotionType.SURPRISED] },
  ];

  const dominant = emotions.reduce((prev, current) => (prev.count > current.count) ? prev : current);
  
  // 2. Calculate Sentiment Ratio
  const positiveCount = currentData.happy + currentData.surprised;
  const negativeCount = currentData.sad + currentData.angry + currentData.scared;
  const positiveRate = Math.round((positiveCount / total) * 100);

  // 3. Generate Advice based on Dominant Emotion
  let advice = "";

  switch (dominant.type) {
    case EmotionType.HAPPY:
      advice = "Lớp học đang tràn ngập năng lượng tích cực! Các con đang cảm thấy hứng khởi và an toàn. Hãy duy trì không khí này bằng các hoạt động nhóm sôi nổi hoặc trò chơi vận động.";
      break;
    case EmotionType.SAD:
      advice = "Có vẻ nhiều bạn nhỏ đang cảm thấy buồn bã hoặc tủi thân. Cô giáo hãy dành thêm thời gian trò chuyện riêng (1-1), vỗ về và tổ chức các hoạt động kể chuyện nhẹ nhàng để xoa dịu tâm lý các con.";
      break;
    case EmotionType.ANGRY:
      advice = "Mức độ căng thẳng đang tăng cao, có thể do tranh giành đồ chơi hoặc mâu thuẫn bạn bè. Hãy áp dụng 'Góc bình yên' và thực hiện bài tập hít thở tập thể trước khi bắt đầu hoạt động mới.";
      break;
    case EmotionType.SCARED:
      advice = "Các con đang có dấu hiệu lo lắng, bất an (có thể do môi trường mới hoặc thay đổi lịch trình). Hãy tăng cường sự vỗ về, đảm bảo lịch trình ổn định và tạo không gian an toàn cho trẻ.";
      break;
    case EmotionType.SURPRISED:
      advice = "Các con đang gặp nhiều điều mới lạ và bất ngờ. Đây là thời điểm vàng để giáo viên giới thiệu các bài học khám phá thế giới xung quanh nhằm kích thích trí tò mò.";
      break;
    default:
      advice = "Hãy tiếp tục theo dõi sát sao cảm xúc của trẻ.";
  }

  // 4. Construct Final Report
  return `
    📊 Tổng quan: Tuần này lớp đã có ${total} lượt chia sẻ cảm xúc. Tỉ lệ tích cực đạt ${positiveRate}%.
    
    🌟 Cảm xúc chủ đạo: ${dominant.label} (${dominant.count} lượt).
    
    💡 Lời khuyên sư phạm: ${advice}
  `.trim();
};