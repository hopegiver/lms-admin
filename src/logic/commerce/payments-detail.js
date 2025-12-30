export default {
    name: 'PaymentsDetail',
    layout: 'admin',
    data() {
        return {
            paymentId: this.getParam('id'),
            currentTab: 'payment',
            payment: null,
            order: {},
            orderItems: [],
            transactions: [],
            refunds: [],
            refundForm: {
                amount: '',
                reason: '',
                note: ''
            }
        }
    },
    async mounted() {
        if (!this.paymentId) {
            alert('결제 ID가 필요합니다.');
            this.navigateTo('/commerce/payments');
            return;
        }

        await this.loadPayment();
    },
    methods: {
        async loadPayment() {
            try {
                // API 호출 시뮬레이션
                // const response = await this.$api.get(`/api/commerce/payments/${this.paymentId}`);
                // this.payment = response.data;

                // 임시 데이터
                this.payment = {
                    id: this.paymentId,
                    transactionId: 'TXN20241230142318ABC123',
                    status: '결제완료',
                    method: '신용카드',
                    amount: '₩149,000',
                    paidAt: '2024-12-30 14:23:18',
                    pgProvider: '토스페이먼츠',
                    cardInfo: 'KB국민카드 (**** **** **** 1234)',
                    approvalNumber: '12345678',
                    installment: '일시불',
                    receiptUrl: 'https://example.com/receipt',
                    subtotal: '₩198,000',
                    discount: '₩49,000',
                    couponDiscount: '₩0',
                    feeRate: 3.3,
                    feeAmount: '₩4,917',
                    netAmount: '₩144,083',
                    buyer: {
                        name: '홍길동',
                        email: 'hong@example.com',
                        phone: '010-1234-5678',
                        memberLevel: 'VIP'
                    }
                };

                this.order = {
                    id: 1,
                    orderNumber: 'ORD-2024-001234',
                    status: '결제완료',
                    orderDate: '2024-12-30 14:23:15',
                    totalAmount: '₩149,000'
                };

                this.orderItems = [
                    {
                        id: 1,
                        productName: 'React 완벽 가이드 + Vue.js 마스터 번들',
                        type: '번들',
                        price: '₩149,000',
                        quantity: 1,
                        total: '₩149,000'
                    }
                ];

                this.transactions = [
                    { type: '결제 승인', status: '성공', amount: '₩149,000', timestamp: '2024-12-30 14:23:18', note: '신용카드 결제 승인' },
                    { type: '결제 요청', status: '처리중', amount: '₩149,000', timestamp: '2024-12-30 14:23:15', note: 'PG사 결제 요청' },
                    { type: '결제 시작', status: '대기', amount: '₩149,000', timestamp: '2024-12-30 14:22:45', note: '사용자 결제 시도' }
                ];

                this.refunds = [];
            } catch (error) {
                alert('결제 정보를 불러오는데 실패했습니다.');
                console.error(error);
            }
        },

        getStatusClass(status) {
            const statusMap = {
                '결제완료': 'bg-success',
                '결제대기': 'bg-warning text-dark',
                '결제실패': 'bg-danger',
                '환불완료': 'bg-secondary'
            };
            return statusMap[status] || 'bg-secondary';
        },

        getOrderStatusClass(status) {
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

        getTransactionStatusClass(status) {
            const statusMap = {
                '성공': 'bg-success',
                '처리중': 'bg-warning text-dark',
                '대기': 'bg-info',
                '실패': 'bg-danger'
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

        getRefundReasonText(reason) {
            const reasonMap = {
                'customer_request': '고객 요청',
                'defective': '상품 불량',
                'wrong_order': '주문 오류',
                'other': '기타'
            };
            return reasonMap[reason] || reason;
        },

        validateRefundForm() {
            if (!this.refundForm.amount) {
                alert('환불 금액을 입력해주세요.');
                return false;
            }
            if (!this.refundForm.reason) {
                alert('환불 사유를 선택해주세요.');
                return false;
            }
            const maxAmount = parseInt(this.payment.amount.replace(/[^0-9]/g, ''));
            const refundAmount = parseInt(this.refundForm.amount);
            if (refundAmount > maxAmount) {
                alert('환불 금액이 결제 금액을 초과할 수 없습니다.');
                return false;
            }
            return true;
        },

        submitRefund() {
            if (!this.validateRefundForm()) return;

            if (confirm(`₩${this.refundForm.amount}을(를) 환불 처리하시겠습니까?`)) {
                alert('환불 처리 기능은 추후 구현 예정입니다.');
                // 환불 처리 후 폼 초기화
                // this.refundForm = { amount: '', reason: '', note: '' };
            }
        },

        printReceipt() {
            if (this.payment.receiptUrl) {
                window.open(this.payment.receiptUrl, '_blank');
            } else {
                alert('영수증 출력 기능은 추후 구현 예정입니다.');
            }
        },

        processRefund() {
            this.currentTab = 'refunds';
        }
    }
}
