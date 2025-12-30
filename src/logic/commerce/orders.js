export default {
    name: 'Orders',
    layout: 'admin',
    data() {
        return {
            searchQuery: '',
            filters: { status: '', paymentMethod: '', startDate: '', endDate: '' },
            selectedOrder: null,
            stats: { today: 45, pending: 8, monthlyRevenue: '₩45,230,000', refundRequests: 3 },
            orders: [
                { id: 1, orderNo: 'ORD-2024121901', buyer: '김학습', email: 'kim@email.com', product: 'React 완벽 가이드 2024', additionalItems: 0, amount: '₩149,000', paymentMethod: 'card', status: 'completed', orderDate: '2024-12-19 14:32' },
                { id: 2, orderNo: 'ORD-2024121902', buyer: '이개발', email: 'lee@email.com', product: '프론트엔드 올인원 패키지', additionalItems: 0, amount: '₩399,000', paymentMethod: 'bank', status: 'pending', orderDate: '2024-12-19 13:15' },
                { id: 3, orderNo: 'ORD-2024121903', buyer: '박디자인', email: 'park@email.com', product: 'UI/UX 디자인 실무', additionalItems: 2, amount: '₩287,000', paymentMethod: 'card', status: 'completed', orderDate: '2024-12-19 11:45' },
                { id: 4, orderNo: 'ORD-2024121804', buyer: '최마케팅', email: 'choi@email.com', product: '디지털 마케팅 전략', additionalItems: 0, amount: '₩89,000', paymentMethod: 'phone', status: 'refunded', orderDate: '2024-12-18 16:20' },
                { id: 5, orderNo: 'ORD-2024121805', buyer: '정클라우드', email: 'jung@email.com', product: 'AWS 클라우드 입문', additionalItems: 1, amount: '₩198,000', paymentMethod: 'card', status: 'completed', orderDate: '2024-12-18 10:05' },
                { id: 6, orderNo: 'ORD-2024121706', buyer: '한데이터', email: 'han@email.com', product: '연간 구독권', additionalItems: 0, amount: '₩299,000', paymentMethod: 'card', status: 'completed', orderDate: '2024-12-17 09:30' },
                { id: 7, orderNo: 'ORD-2024121707', buyer: '오파이썬', email: 'oh@email.com', product: 'Python 데이터 분석 마스터', additionalItems: 0, amount: '₩129,000', paymentMethod: 'virtual', status: 'cancelled', orderDate: '2024-12-17 08:15' }
            ]
        }
    },
    methods: {
        getPaymentMethodText(method) {
            return { 'card': '신용카드', 'bank': '계좌이체', 'virtual': '가상계좌', 'phone': '휴대폰' }[method] || method;
        },
        getStatusBadgeClass(status) {
            return {
                'pending': 'bg-warning',
                'completed': 'bg-success',
                'cancelled': 'bg-secondary',
                'refunded': 'bg-danger'
            }[status] || 'bg-secondary';
        },
        getStatusText(status) {
            return { 'pending': '결제대기', 'completed': '결제완료', 'cancelled': '취소', 'refunded': '환불완료' }[status] || status;
        },
        resetFilters() {
            this.filters = { status: '', paymentMethod: '', startDate: '', endDate: '' };
            this.searchQuery = '';
        },
        viewDetail(order) {
            this.navigateTo('/commerce/orders-detail', {id: order.id});
        },
        openOrderDetail(order) {
            this.navigateTo('/commerce/orders-detail', {id: order.id});
        },
        exportOrders() { alert('엑셀 다운로드 기능은 추후 구현 예정입니다.'); },
        resendReceipt(order) { alert(`${order.orderNo} 영수증 재발송 기능은 추후 구현 예정입니다.`); },
        processRefund(order) {
            if (confirm(`${order.orderNo} 주문을 환불처리 하시겠습니까?`)) {
                alert('환불처리 기능은 추후 구현 예정입니다.');
            }
        }
    }
}
