export default {
    name: 'Promotions',
    layout: 'admin',
    data() {
        return {
            activeTab: 'events',
            usageFilter: { type: '', startDate: '', endDate: '', query: '' },
            stats: { activeEvents: 3, issuedCoupons: '2,456', usageRate: '34.5%', totalDiscount: '₩8,920,000' },
            events: [
                { id: 1, name: '연말 특별 할인', description: '연말을 맞아 전 강좌 30% 할인', discount: '30%', target: '전체 강좌', period: '12/20 - 12/31', status: 'active', usedCount: 234 },
                { id: 2, name: '신규회원 웰컴 할인', description: '첫 구매 회원 20% 할인', discount: '20%', target: '신규회원', period: '상시', status: 'active', usedCount: 567 },
                { id: 3, name: '패키지 특가', description: '패키지 상품 40% 할인', discount: '40%', target: '패키지', period: '12/15 - 12/25', status: 'active', usedCount: 89 },
                { id: 4, name: '블랙프라이데이', description: '전 상품 50% 할인', discount: '50%', target: '전체', period: '11/24 - 11/27', status: 'ended', usedCount: 1234 }
            ],
            coupons: [
                { id: 1, code: 'WELCOME2024', name: '신규가입 환영 쿠폰', discount: '₩10,000', target: '신규회원', issued: 1000, used: 456, validPeriod: '2024-12-31', status: 'active' },
                { id: 2, code: 'NEWYEAR25', name: '새해 특별 쿠폰', discount: '25%', target: '전체회원', issued: 500, used: 123, validPeriod: '2025-01-31', status: 'active' },
                { id: 3, code: 'VIP30', name: 'VIP 전용 쿠폰', discount: '30%', target: 'VIP회원', issued: 100, used: 45, validPeriod: '2024-12-31', status: 'active' },
                { id: 4, code: 'SUMMER2024', name: '여름 할인 쿠폰', discount: '20%', target: '전체회원', issued: 2000, used: 1832, validPeriod: '2024-08-31', status: 'expired' }
            ],
            usageHistory: [
                { id: 1, type: 'coupon', promotionName: 'WELCOME2024', user: '김학습', orderNo: 'ORD-2024121901', discountAmount: '₩10,000', usedAt: '2024-12-19 14:32' },
                { id: 2, type: 'event', promotionName: '연말 특별 할인', user: '이개발', orderNo: 'ORD-2024121902', discountAmount: '₩119,700', usedAt: '2024-12-19 13:15' },
                { id: 3, type: 'coupon', promotionName: 'VIP30', user: '박디자인', orderNo: 'ORD-2024121903', discountAmount: '₩35,700', usedAt: '2024-12-19 11:45' },
                { id: 4, type: 'event', promotionName: '신규회원 웰컴 할인', user: '최마케팅', orderNo: 'ORD-2024121804', discountAmount: '₩17,800', usedAt: '2024-12-18 16:20' }
            ]
        }
    },
    methods: {
        getCouponStatusClass(status) {
            return { 'active': 'bg-success', 'expired': 'bg-secondary', 'paused': 'bg-warning' }[status] || 'bg-secondary';
        },
        getCouponStatusText(status) {
            return { 'active': '활성', 'expired': '만료', 'paused': '일시중지' }[status] || status;
        },
        openCouponModal() { alert('쿠폰 생성 모달은 추후 구현 예정입니다.'); },
        openEventModal() { alert('이벤트 생성 모달은 추후 구현 예정입니다.'); },
        editEvent(event) { alert(`${event.name} 수정 기능은 추후 구현 예정입니다.`); },
        duplicateEvent(event) { alert(`${event.name} 복제 기능은 추후 구현 예정입니다.`); },
        deleteEvent(event) {
            if (confirm(`${event.name} 이벤트를 삭제하시겠습니까?`)) {
                alert('삭제 기능은 추후 구현 예정입니다.');
            }
        },
        toggleEventStatus(event) {
            const action = event.status === 'active' ? '종료' : '활성화';
            if (confirm(`${event.name} 이벤트를 ${action}하시겠습니까?`)) {
                event.status = event.status === 'active' ? 'ended' : 'active';
            }
        },
        editCoupon(coupon) { alert(`${coupon.name} 수정 기능은 추후 구현 예정입니다.`); },
        issueCoupon(coupon) { alert(`${coupon.code} 쿠폰 발급 기능은 추후 구현 예정입니다.`); }
    }
}
