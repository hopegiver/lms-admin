export default {
    name: 'Affiliates',
    layout: 'admin',
    data() {
        return {
            activeTab: 'partners',
            commissionFilter: { type: '', status: '', startDate: '', endDate: '', query: '' },
            stats: { activePartners: 12, affiliateRevenue: '₩8,450,000', referralSignups: 234, paidCommission: '₩1,690,000' },
            partners: [
                { id: 1, name: '테크블로그', type: '미디어 파트너', commission: '15%', contractPeriod: '2024.01 - 2025.12', monthlyRevenue: '₩2,340,000', code: 'TECH2024', referrals: 156, status: 'active' },
                { id: 2, name: '개발자커뮤니티', type: '커뮤니티 파트너', commission: '12%', contractPeriod: '2024.03 - 2025.02', monthlyRevenue: '₩1,890,000', code: 'DEVCOM', referrals: 234, status: 'active' },
                { id: 3, name: '디자인매거진', type: '미디어 파트너', commission: '10%', contractPeriod: '2024.06 - 2025.05', monthlyRevenue: '₩980,000', code: 'DESIGN24', referrals: 89, status: 'active' },
                { id: 4, name: 'IT뉴스', type: '언론 파트너', commission: '8%', contractPeriod: '2024.01 - 2024.12', monthlyRevenue: '₩0', code: 'ITNEWS', referrals: 45, status: 'inactive' }
            ],
            topReferrers: [
                { id: 1, name: '김추천', email: 'kim@email.com', referrals: 45, earnings: '₩450,000', rank: 'Gold' },
                { id: 2, name: '이소개', email: 'lee@email.com', referrals: 32, earnings: '₩320,000', rank: 'Silver' },
                { id: 3, name: '박공유', email: 'park@email.com', referrals: 28, earnings: '₩280,000', rank: 'Silver' },
                { id: 4, name: '최홍보', email: 'choi@email.com', referrals: 15, earnings: '₩150,000', rank: 'Bronze' }
            ],
            referralProgram: {
                referrerReward: '구매금액의 10% 적립금',
                refereeReward: '첫 구매 10% 할인',
                minPurchase: '₩50,000 이상',
                validPeriod: '가입 후 30일'
            },
            commissions: [
                { id: 1, type: 'partner', source: '테크블로그', orderNo: 'ORD-2024121901', orderAmount: '₩149,000', commission: '₩22,350', status: 'pending', createdAt: '2024-12-19' },
                { id: 2, type: 'referral', source: '김추천', orderNo: 'ORD-2024121902', orderAmount: '₩399,000', commission: '₩39,900', status: 'pending', createdAt: '2024-12-19' },
                { id: 3, type: 'partner', source: '개발자커뮤니티', orderNo: 'ORD-2024121803', orderAmount: '₩287,000', commission: '₩34,440', status: 'paid', createdAt: '2024-12-18' },
                { id: 4, type: 'referral', source: '이소개', orderNo: 'ORD-2024121804', orderAmount: '₩89,000', commission: '₩8,900', status: 'paid', createdAt: '2024-12-18' }
            ]
        }
    },
    methods: {
        getRankBadgeClass(rank) {
            return { 'Gold': 'bg-warning', 'Silver': 'bg-secondary', 'Bronze': 'bg-orange' }[rank] || 'bg-light text-dark';
        },
        viewDetail(partner) {
            this.navigateTo('/commerce/affiliates-detail', {id: partner.id});
        },
        openPartnerModal() { alert('파트너 등록 모달은 추후 구현 예정입니다.'); },
        editPartner(partner) {
            this.navigateTo('/commerce/affiliates-detail', {id: partner.id});
        },
        viewPartnerStats(partner) { alert(`${partner.name} 통계 보기 기능은 추후 구현 예정입니다.`); },
        deactivatePartner(partner) {
            if (confirm(`${partner.name} 파트너를 비활성화하시겠습니까?`)) {
                partner.status = 'inactive';
            }
        },
        editReferralProgram() { alert('추천인 프로그램 설정 기능은 추후 구현 예정입니다.'); }
    }
}
