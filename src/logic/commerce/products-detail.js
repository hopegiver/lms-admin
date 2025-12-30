export default {
    name: 'ProductsDetail',
    layout: 'admin',
    data() {
        return {
            productId: this.getParam('id'),
            currentTab: 'info',
            product: null,
            courses: [],
            recentOrders: [],
            reviews: [],
            salesStats: {
                today: 0,
                week: 0,
                month: 0,
                total: 0
            },
            ratingDistribution: {
                5: 0,
                4: 0,
                3: 0,
                2: 0,
                1: 0
            }
        }
    },
    async mounted() {
        if (!this.productId) {
            alert('상품 ID가 필요합니다.');
            this.navigateTo('/commerce/products');
            return;
        }

        await this.loadProduct();
    },
    methods: {
        async loadProduct() {
            try {
                // API 호출 시뮬레이션
                // const response = await this.$api.get(`/api/commerce/products/${this.productId}`);
                // this.product = response.data;

                // 임시 데이터
                this.product = {
                    id: this.productId,
                    name: 'React 완벽 가이드 + Vue.js 마스터 번들',
                    type: 'bundle',
                    status: 'active',
                    description: 'React와 Vue.js를 한 번에 배울 수 있는 최고의 번들 상품입니다.',
                    price: '₩198,000',
                    salePrice: '₩149,000',
                    discountRate: 25,
                    totalSales: 1250,
                    totalRevenue: '₩186,250,000',
                    rating: 4.8,
                    reviewCount: 342,
                    monthlySales: 89,
                    conversionRate: 12.5,
                    createdAt: '2024-11-15',
                    thumbnail: 'https://via.placeholder.com/800x400?text=Bundle+Product'
                };

                this.courses = [
                    { id: 1, name: 'React 완벽 가이드', instructor: '김개발', lessons: 45, students: 1850, rating: 4.9, status: 'active' },
                    { id: 2, name: 'Vue.js 마스터 클래스', instructor: '이프론트', lessons: 38, students: 1420, rating: 4.7, status: 'active' }
                ];

                this.salesStats = {
                    today: 12,
                    week: 89,
                    month: 385,
                    total: 1250
                };

                this.recentOrders = [
                    { id: 1, orderNumber: 'ORD-2024-001234', buyer: '홍길동', amount: '₩149,000', paymentMethod: '신용카드', orderDate: '2024-12-30 14:23', status: '결제완료' },
                    { id: 2, orderNumber: 'ORD-2024-001233', buyer: '김철수', amount: '₩149,000', paymentMethod: '카카오페이', orderDate: '2024-12-30 11:45', status: '결제완료' },
                    { id: 3, orderNumber: 'ORD-2024-001232', buyer: '이영희', amount: '₩149,000', paymentMethod: '신용카드', orderDate: '2024-12-29 18:20', status: '결제완료' },
                    { id: 4, orderNumber: 'ORD-2024-001231', buyer: '박민수', amount: '₩149,000', paymentMethod: '토스페이', orderDate: '2024-12-29 15:10', status: '환불완료' }
                ];

                this.reviews = [
                    { id: 1, author: '홍길동', rating: 5, content: '두 프레임워크를 한 번에 배울 수 있어서 정말 좋습니다!', date: '2024-12-28' },
                    { id: 2, author: '김철수', rating: 5, content: '가격 대비 훌륭한 강의입니다. 강력 추천합니다.', date: '2024-12-25' },
                    { id: 3, author: '이영희', rating: 4, content: '설명이 자세하고 따라하기 쉬워요.', date: '2024-12-20' },
                    { id: 4, author: '박민수', rating: 5, content: '초보자도 이해하기 쉽게 설명해주십니다.', date: '2024-12-18' }
                ];

                this.ratingDistribution = {
                    5: 280,
                    4: 45,
                    3: 12,
                    2: 3,
                    1: 2
                };
            } catch (error) {
                alert('상품 정보를 불러오는데 실패했습니다.');
                console.error(error);
            }
        },

        getStatusClass(status) {
            return { 'active': 'bg-success', 'draft': 'bg-warning text-dark', 'inactive': 'bg-secondary' }[status] || 'bg-secondary';
        },

        getStatusText(status) {
            return { 'active': '판매중', 'draft': '준비중', 'inactive': '판매종료' }[status] || status;
        },

        getTypeClass(type) {
            return { 'course': 'bg-primary', 'bundle': 'bg-info', 'subscription': 'bg-purple' }[type] || 'bg-secondary';
        },

        getTypeText(type) {
            return { 'course': '강좌', 'bundle': '번들', 'subscription': '구독' }[type] || type;
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

        getRatingPercentage(star) {
            const total = Object.values(this.ratingDistribution).reduce((a, b) => a + b, 0);
            if (total === 0) return 0;
            return (this.ratingDistribution[star] / total * 100).toFixed(0);
        },

        getRatingCount(star) {
            return this.ratingDistribution[star] || 0;
        },

        edit() {
            alert('수정 기능은 추후 구현 예정입니다.');
        },

        deleteProduct() {
            if (confirm('이 상품을 삭제하시겠습니까?')) {
                alert('삭제 기능은 추후 구현 예정입니다.');
            }
        }
    }
}
