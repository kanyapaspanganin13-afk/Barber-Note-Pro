import { analyzeMonthly } from './monthlyAnalyzer.js';
import { getMonthlyInsights } from './monthlyInsight.js';

// ฟังก์ชันนี้จะเป็นตัวกลางที่ปลอดภัย 100% ไม่ใช้ eval
export function getFullMonthlyReport(filtered, conf) {
    try {
        const stats = analyzeMonthly(filtered, conf);
        const insights = getMonthlyInsights(stats);
        return { ...stats, insights };
    } catch (error) {
        console.error("การวิเคราะห์ผิดพลาด:", error);
        return null;
    }
}
