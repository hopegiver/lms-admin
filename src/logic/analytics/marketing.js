export default {
    name: 'analyticsMarketing',
    layout: 'admin',
    data() {
        return {
            campaigns: [
                { name: '신학기 특가', views: 12340, clicks: 2468, conversions: 234, spend: 5000000, revenue: 29250000, roi: 485 },
                { name: '블랙프라이데이', views: 18920, clicks: 3784, conversions: 378, spend: 8500000, revenue: 47250000, roi: 456 }
            ],
            emailCampaigns: [
                { subject: '주간 뉴스레터', sent: 10000, opened: 3500, clicked: 850, conversions: 85, openRate: 35.0, ctr: 24.3 },
                { subject: '신규 강좌 출시', sent: 8500, opened: 3400, clicked: 1020, conversions: 120, openRate: 40.0, ctr: 30.0 }
            ]
        }
    },
    methods: {
        formatNumber(num) { return new Intl.NumberFormat('ko-KR').format(num); },
        formatCurrency(num) { return '₩' + new Intl.NumberFormat('ko-KR').format(num); }
    }
}
