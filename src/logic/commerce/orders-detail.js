export default {
    name: 'OrdersDetail',
    layout: 'admin',
    data() {
        return {
            orderId: this.getParam('id'),
            currentTab: 'info',
            order: null,
            orderItems: [],
            payment: {},
            refunds: [],
            timeline: [],
            buyerStats: {
                totalOrders: 0,
                totalSpent: '',
                avgOrder: ''
            }
        }
    },
    async mounted() {
        if (!this.orderId) {
            alert('주문 ID가 필요합니다.');
            this.navigateTo('/commerce/orders');
            return;
        }

        await this.loadOrder();
    },
    methods: {
        async loadOrder() {
            try {
                // API 호출 시뮬레이션
                // const response = await this.$api.get(`/api/commerce/orders/${this.orderId}`);
                // this.order = response.data;

                // 임시 데이터
                this.order = {
                    id: this.orderId,
                    orderNumber: 'ORD-2024-001234',
                    status: '결제완료',
                    orderDate: '2024-12-30 14:23:15',
                    totalAmount: '₩149,000',
                    subtotal: '₩198,000',
                    discount: '₩49,000',
                    couponDiscount: '₩0',
                    buyer: {
                        name: '홍길동',
                        email: 'hong@example.com',
                        phone: '010-1234-5678',
                        memberLevel: 'VIP'
                    }
                };

                this.orderItems = [
                    {
                        id: 1,
                        productName: 'React 완벽 가이드 + Vue.js 마스터 번들',
                        type: '번들',
                        courses: 'React 완벽 가이드, Vue.js 마스터 클래스',
                        price: '₩198,000',
                        salePrice: '₩149,000',
                        quantity: 1,
                        total: '₩149,000'
                    }
                ];

                this.payment = {
                    method: '신용카드',
                    status: '결제완료',
                    paidAt: '2024-12-30 14:23:18',
                    amount: '₩149,000',
                    cardInfo: 'KB국민카드 (**** **** **** 1234)',
                    transactionId: 'TXN20241230142318ABC123',
                    pgProvider: '토스페이먼츠',
                    approvalNumber: '12345678'
                };

                this.refunds = [];

                this.timeline = [
                    { status: '결제완료', timestamp: '2024-12-30 14:23:18', note: '신용카드 결제' },
                    { status: '주문확인', timestamp: '2024-12-30 14:23:15', note: '' },
                    { status: '주문생성', timestamp: '2024-12-30 14:22:45', note: '' }
                ];

                this.buyerStats = {
                    totalOrders: 15,
                    totalSpent: '₩2,350,000',
                    avgOrder: '₩156,667'
                };
            } catch (error) {
                alert('주문 정보를 불러오는데 실패했습니다.');
                console.error(error);
            }
        },

        getStatusClass(status) {
            const statusMap = {
                '결제완료': 'bg-success',
                '결제대기': 'bg-warning text-dark',
                '환불완료': 'bg-secondary',
                '취소': 'bg-danger'
            };
            return statusMap[status] || 'bg-secondary';
        },

        getTypeClass(type) {
            const typeMap = {
                '강좌': 'bg-primary',
                '번들': 'bg-info',
                '구독': 'bg-purple'
            };
            return typeMap[type] || 'bg-secondary';
        },

        getPaymentStatusClass(status) {
            const statusMap = {
                '결제완료': 'bg-success',
                '결제대기': 'bg-warning text-dark',
                '결제실패': 'bg-danger'
            };
            return statusMap[status] || 'bg-secondary';
        },

        getRefundStatusClass(status) {
            const statusMap = {
                '환불완료': 'bg-success',
                '환불처리중': 'bg-warning text-dark',
                '환불대기': 'bg-info'
            };
            return statusMap[status] || 'bg-secondary';
        },

        printOrder() {
            alert('인쇄 기능은 추후 구현 예정입니다.');
        },

        cancelOrder() {
            if (confirm('이 주문을 취소하시겠습니까?')) {
                alert('주문 취소 기능은 추후 구현 예정입니다.');
            }
        },

        processRefund() {
            if (confirm('환불 처리를 진행하시겠습니까?')) {
                alert('환불 처리 기능은 추후 구현 예정입니다.');
            }
        }
    }
}
