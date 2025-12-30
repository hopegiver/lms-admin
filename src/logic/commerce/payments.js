export default {
    name: 'Payments',
    layout: 'admin',
    data() {
        return {
            activeTab: 'transactions',
            searchQuery: '',
            filters: { status: '', method: '', startDate: '', endDate: '' },
            stats: {
                monthlyPayments: '₩45,230,000',
                totalCount: '1,234',
                refundAmount: '₩2,340,000',
                refundRate: '5.2%',
                avgAmount: '₩156,000'
            },
            transactions: [
                { id: 1, paymentId: 'PAY-001', orderNo: 'ORD-2024121901', buyer: '김학습', amount: '₩149,000', method: 'card', status: 'success', paymentDate: '2024-12-19 14:32' },
                { id: 2, paymentId: 'PAY-002', orderNo: 'ORD-2024121902', buyer: '이개발', amount: '₩399,000', method: 'bank', status: 'pending', paymentDate: '2024-12-19 13:15' },
                { id: 3, paymentId: 'PAY-003', orderNo: 'ORD-2024121903', buyer: '박디자인', amount: '₩287,000', method: 'card', status: 'success', paymentDate: '2024-12-19 11:45' },
                { id: 4, paymentId: 'PAY-004', orderNo: 'ORD-2024121804', buyer: '최마케팅', amount: '₩89,000', method: 'phone', status: 'failed', paymentDate: '2024-12-18 16:20' },
                { id: 5, paymentId: 'PAY-005', orderNo: 'ORD-2024121805', buyer: '정클라우드', amount: '₩198,000', method: 'card', status: 'success', paymentDate: '2024-12-18 10:05' },
                { id: 6, paymentId: 'PAY-006', orderNo: 'ORD-2024121706', buyer: '한데이터', amount: '₩299,000', method: 'virtual', status: 'success', paymentDate: '2024-12-17 09:30' }
            ],
            refunds: [
                { id: 1, refundId: 'REF-001', orderNo: 'ORD-2024121804', buyer: '최마케팅', amount: '₩89,000', reason: '단순 변심', status: 'completed', requestDate: '2024-12-18', processDate: '2024-12-19' },
                { id: 2, refundId: 'REF-002', orderNo: 'ORD-2024121502', buyer: '송영상', amount: '₩149,000', reason: '콘텐츠 불만족', status: 'pending', requestDate: '2024-12-17', processDate: null },
                { id: 3, refundId: 'REF-003', orderNo: 'ORD-2024121203', buyer: '임강좌', amount: '₩299,000', reason: '중복 결제', status: 'completed', requestDate: '2024-12-15', processDate: '2024-12-15' }
            ],
            paymentMethodStats: [
                { name: '신용카드', icon: '💳', percentage: 68, amount: '₩30,756,400', count: 839, color: 'bg-primary' },
                { name: '계좌이체', icon: '🏦', percentage: 18, amount: '₩8,141,400', count: 222, color: 'bg-success' },
                { name: '가상계좌', icon: '📱', percentage: 9, amount: '₩4,070,700', count: 111, color: 'bg-warning' },
                { name: '휴대폰', icon: '📞', percentage: 5, amount: '₩2,261,500', count: 62, color: 'bg-info' }
            ]
        }
    },
    methods: {
        getMethodIcon(method) {
            return { 'card': '💳', 'bank': '🏦', 'virtual': '📱', 'phone': '📞' }[method] || '💳';
        },
        getMethodText(method) {
            return { 'card': '신용카드', 'bank': '계좌이체', 'virtual': '가상계좌', 'phone': '휴대폰' }[method] || method;
        },
        getStatusBadgeClass(status) {
            return { 'success': 'bg-success', 'failed': 'bg-danger', 'pending': 'bg-warning' }[status] || 'bg-secondary';
        },
        getStatusText(status) {
            return { 'success': '성공', 'failed': '실패', 'pending': '대기' }[status] || status;
        },
        resetFilters() {
            this.filters = { status: '', method: '', startDate: '', endDate: '' };
            this.searchQuery = '';
        },
        exportPayments() { alert('결제 내역 다운로드 기능은 추후 구현 예정입니다.'); },
        viewDetail(payment) {
            this.navigateTo('/commerce/payments-detail', {id: payment.id});
        },
        viewPaymentDetail(payment) {
            this.navigateTo('/commerce/payments-detail', {id: payment.id});
        }
    }
}
