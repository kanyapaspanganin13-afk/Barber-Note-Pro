export function analyzeMonthly(filtered, conf) {
    const haircutList = ["แฟชั่น","สกินเฟด","เปิดข้าง","รองทรง","ตำรวจ/ทหาร","ทรงนักเรียน","แก้ผม","โกนผม","เด็ก"];
    const serviceList = ["โกนหนวด","กันหน้า","สระผม","ย้อมผม"];
    
    let res = {
        monthTotal: 0, monthBarber: 0, monthCount: 0,
        hairStats: {}, serviceStats: {},
        offDays: 0, workDays: 0, zeroCustomerDays: 0,
        barberOver: 0, barberUnder: 0, barberFromGuarantee: 0, guaranteeDays: 0,
        guarValue: Number(conf.guar) || 0
    };

    filtered.forEach(day => {
        if (day.off) { res.offDays++; return; }
        res.workDays++;
        
        const real = Number(day.barber) || 0;
        if (!(day.details && day.details.length > 0)) res.zeroCustomerDays++;

        // คำนวณประกันรายวัน
        if (day.useGuarantee === true) {
            res.barberFromGuarantee += (res.guarValue || real);
            res.guaranteeDays++;
        } else if (real > res.guarValue) {
            res.barberOver += real;
        } else if (real > 0) {
            res.barberUnder += real;
            res.guaranteeDays++;
        }

        res.monthTotal += Number(day.total) || 0;
        res.monthBarber += real;

        // นับสถิติทรงผมและบริการ
        (day.details || []).forEach(d => {
            let countedHair = false;
            (d.svcs || []).forEach(s => {
                if (!s) return;
                s = s.trim();
                if (haircutList.includes(s)) {
                    res.hairStats[s] = (res.hairStats[s] || 0) + 1;
                    if (!countedHair) { res.monthCount++; countedHair = true; }
                } else if (serviceList.includes(s)) {
                    res.serviceStats[s] = (res.serviceStats[s] || 0) + 1;
                }
            });
        });
    });

    res.monthShop = res.monthTotal - res.monthBarber;
    res.avgCustomerPerDay = res.workDays > 0 ? (res.monthCount / res.workDays) : 0;
    
    return res;
}
