// analysis/index.js
import { analyzeMonthly } from './monthlyAnalyzer.js';
import { getMonthlyInsights } from './monthlyInsight.js';

/**
 * ฟังก์ชันหลักที่รวบรวมการคำนวณและการวิเคราะห์เข้าด้วยกัน
 */
export function getFullMonthlyReport(filtered, conf) {
    // 1. ส่งข้อมูลไปคำนวณตัวเลขดิบ
    const stats = analyzeMonthly(filtered, conf);
    
    // 2. นำตัวเลขที่ได้มาวิเคราะห์หา Insight (คำแนะนำ)
    const insights = getMonthlyInsights(stats);
    
    // 3. ส่งข้อมูลทั้งหมดกลับไปให้หน้าจอ UI
    return { ...stats, insights };
}
