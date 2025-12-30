export default {
    name: 'analyticsRevenue',
    layout: 'admin',
    data() {
        return {
            dateRange: '30days',
            selectedProduct: '',

            // 핵심 매출 지표
            revenueMetrics: {
                totalRevenue: '₩125,430,000',
                revenueChange: '+18.5',
                avgOrderValue: '₩145,000',
                aovChange: '+5.2',
                conversionRate: '3.8%',
                conversionChange: '+0.5',
                refundRate: '2.1%',
                refundChange: '-0.3'
            },

            // 월별 매출 추이
            monthlyRevenue: [
                { month: '7월', revenue: 98000000, orders: 680 },
                { month: '8월', revenue: 105000000, orders: 720 },
                { month: '9월', revenue: 112000000, orders: 765 },
                { month: '10월', revenue: 119000000, orders: 810 },
                { month: '11월', revenue: 123000000, orders: 845 },
                { month: '12월', revenue: 125430000, orders: 867 }
            ],

            // 상품별 매출
            productRevenue: [
                { product: 'React 완벽 가이드', sales: 1234, revenue: 15420000, avgPrice: 125000, share: 12.3 },
                { product: 'Python 데이터 분석', sales: 987, revenue: 12338000, avgPrice: 125000, share: 9.8 },
                { product: 'JavaScript ES6+', sales: 856, revenue: 10700000, avgPrice: 125000, share: 8.5 },
                { product: 'AWS 클라우드 입문', sales: 745, revenue: 9312000, avgPrice: 125000, share: 7.4 },
                { product: 'Node.js 백엔드', sales: 623, revenue: 7788000, avgPrice: 125000, share: 6.2 }
            ],

            // 결제 수단별 분석
            paymentMethods: [
                { method: '신용카드', count: 1234, revenue: 154250000, percentage: 45.2 },
                { method: '계좌이체', count: 856, revenue: 107000000, percentage: 31.4 },
                { method: '간편결제', count: 623, revenue: 77875000, percentage: 22.8 },
                { method: '기타', count: 34, revenue: 4250000, percentage: 0.6 }
            ],

            // 환불 분석
            refundAnalysis: [
                { reason: '단순 변심', count: 45, amount: 5625000, percentage: 42.3 },
                { reason: '강좌 내용 불만족', count: 28, amount: 3500000, percentage: 26.4 },
                { reason: '시간 부족', count: 18, amount: 2250000, percentage: 16.9 },
                { reason: '중복 구매', count: 12, amount: 1500000, percentage: 11.3 },
                { reason: '기타', count: 3, amount: 375000, percentage: 3.1 }
            ],

            // 프로모션별 전환율
            promotionConversion: [
                { name: '신학기 특가', views: 12340, clicks: 2468, conversions: 234, revenue: 29250000, roi: 485 },
                { name: '블랙프라이데이', views: 18920, clicks: 3784, conversions: 378, revenue: 47250000, roi: 542 },
                { name: '연말 감사 세일', views: 9560, clicks: 1912, conversions: 189, revenue: 23625000, roi: 423 },
                { name: '추천인 이벤트', views: 6720, clicks: 1344, conversions: 121, revenue: 15125000, roi: 356 }
            ],

            // 정산 현황
            settlementStatus: {
                pending: '₩12,340,000',
                processing: '₩8,560,000',
                completed: '₩98,430,000',
                totalInstructors: 45
            },

            productList: ['전체', 'React 완벽 가이드', 'Python 데이터 분석', 'JavaScript ES6+', 'AWS 클라우드 입문']
        }
    },
    computed: {
        maxRevenueValue() {
            return Math.max(...this.monthlyRevenue.map(d => d.revenue));
        },
        totalSales() {
            return this.productRevenue.reduce((sum, p) => sum + p.sales, 0);
        },
        totalRevenue() {
            return this.productRevenue.reduce((sum, p) => sum + p.revenue, 0);
        }
    },
    methods: {
        changeDateRange(range) {
            this.dateRange = range;
            console.log('Date range changed to:', range);
        },

        getChartBarHeight(revenue) {
            return (revenue / this.maxRevenueValue * 100) + '%';
        },

        formatCurrency(num) {
            return '₩' + new Intl.NumberFormat('ko-KR').format(num);
        },

        formatNumber(num) {
            return new Intl.NumberFormat('ko-KR').format(num);
        }
    }
}
