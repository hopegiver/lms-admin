export default {
    name: 'PromotionsDetail',
    layout: 'admin',
    data() {
        return {
            promotionId: this.getParam('id'),
            currentTab: 'info',
            promotion: null,
            targetProducts: [],
            usageHistory: [],
            stats: {
                today: 0,
                week: 0,
                month: 0,
                total: 0
            },
            hourlyStats: []
        }
    },
    async mounted() {
        if (!this.promotionId) {
            alert('프로모션 ID가 필요합니다.');
            this.navigateTo('/commerce/promotions');
            return;
        }

        await this.loadPromotion();
    },
    methods: {
        async loadPromotion() {
            try {
                // API 호출 시뮬레이션
                // const response = await this.$api.get(`/api/commerce/promotions/${this.promotionId}`);
                // this.promotion = response.data;

                // 임시 데이터
                this.promotion = {
                    id: this.promotionId,
                    name: '신규 회원 할인 이벤트',
                    type: 'coupon',
                    status: 'active',
                    description: '신규 회원을 위한 특별 할인 쿠폰입니다.',
                    discountType: 'percentage',
                    discountValue: 30,
                    maxDiscountAmount: '₩50,000',
                    minPurchaseAmount: '₩100,000',
                    couponCode: 'WELCOME2024',
                    issueLimit: 1000,
                    targetType: 'specific',
                    startDate: '2024-12-01 00:00:00',
                    endDate: '2024-12-31 23:59:59',
                    usageLimit: 1000,
                    perUserLimit: 1,
                    usageCount: 385,
                    totalDiscountAmount: '₩15,400,000',
                    totalRevenue: '₩45,850,000',
                    avgDiscount: '₩40,000',
                    conversionRate: 15.4
                };

                this.targetProducts = [
                    { id: 1, name: 'React 완벽 가이드', type: '강좌', price: '₩99,000', salePrice: '₩69,300', sales: 150, status: 'active' },
                    { id: 2, name: 'Vue.js 마스터 클래스', type: '강좌', price: '₩89,000', salePrice: '₩62,300', sales: 120, status: 'active' },
                    { id: 3, name: 'React + Vue.js 번들', type: '번들', price: '₩149,000', salePrice: '₩104,300', sales: 115, status: 'active' }
                ];

                this.usageHistory = [
                    { id: 1, orderId: 1, orderNumber: 'ORD-2024-001234', userName: '홍길동', productName: 'React 완벽 가이드', originalPrice: '₩99,000', discountAmount: '₩29,700', finalPrice: '₩69,300', usedAt: '2024-12-30 14:23' },
                    { id: 2, orderId: 2, orderNumber: 'ORD-2024-001233', userName: '김철수', productName: 'Vue.js 마스터 클래스', originalPrice: '₩89,000', discountAmount: '₩26,700', finalPrice: '₩62,300', usedAt: '2024-12-30 11:45' },
                    { id: 3, orderId: 3, orderNumber: 'ORD-2024-001232', userName: '이영희', productName: 'React + Vue.js 번들', originalPrice: '₩149,000', discountAmount: '₩44,700', finalPrice: '₩104,300', usedAt: '2024-12-29 18:20' },
                    { id: 4, orderId: 4, orderNumber: 'ORD-2024-001231', userName: '박민수', productName: 'React 완벽 가이드', originalPrice: '₩99,000', discountAmount: '₩29,700', finalPrice: '₩69,300', usedAt: '2024-12-29 15:10' }
                ];

                this.stats = {
                    today: 12,
                    week: 89,
                    month: 385,
                    total: 385
                };

                this.hourlyStats = [
                    { hour: '00:00 - 06:00', count: 15, amount: '₩600,000', percentage: 4 },
                    { hour: '06:00 - 12:00', count: 95, amount: '₩3,800,000', percentage: 25 },
                    { hour: '12:00 - 18:00', count: 180, amount: '₩7,200,000', percentage: 47 },
                    { hour: '18:00 - 24:00', count: 95, amount: '₩3,800,000', percentage: 24 }
                ];
            } catch (error) {
                alert('프로모션 정보를 불러오는데 실패했습니다.');
                console.error(error);
            }
        },

        getStatusClass(status) {
            return { 'active': 'bg-success', 'draft': 'bg-warning text-dark', 'inactive': 'bg-secondary' }[status] || 'bg-secondary';
        },

        getStatusText(status) {
            return { 'active': '진행중', 'draft': '준비중', 'inactive': '종료' }[status] || status;
        },

        getTypeClass(type) {
            return { 'discount': 'bg-primary', 'coupon': 'bg-info', 'bundle': 'bg-purple' }[type] || 'bg-secondary';
        },

        getTypeText(type) {
            return { 'discount': '할인', 'coupon': '쿠폰', 'bundle': '번들' }[type] || type;
        },

        getProductTypeClass(type) {
            return { '강좌': 'bg-primary', '번들': 'bg-info', '구독': 'bg-purple' }[type] || 'bg-secondary';
        },

        getUsagePercentage() {
            if (!this.promotion.usageLimit) return 0;
            return Math.round((this.promotion.usageCount / this.promotion.usageLimit) * 100);
        },

        getRemainingDays() {
            const endDate = new Date(this.promotion.endDate);
            const today = new Date();
            const diff = endDate - today;
            const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
            return days > 0 ? days : 0;
        },

        edit() {
            alert('수정 기능은 추후 구현 예정입니다.');
        },

        deletePromotion() {
            if (confirm('이 프로모션을 삭제하시겠습니까?')) {
                alert('삭제 기능은 추후 구현 예정입니다.');
            }
        }
    }
}
