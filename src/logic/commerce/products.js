export default {
    name: 'Products',
    layout: 'admin',
    data() {
        return {
            activeTab: 'courses',
            searchQuery: '',
            sortBy: 'newest',
            filters: { status: '', category: '' },
            stats: { total: 89, active: 72, soldOut: 5, monthlyRevenue: '₩45,230,000' },
            categories: ['개발', '디자인', '마케팅', '비즈니스', '자격증'],
            courseProducts: [
                { id: 1, type: 'course', name: 'React 완벽 가이드 2024', instructor: '김리액트', category: '개발', originalPrice: '₩199,000', price: '₩149,000', sales: 1234, status: 'active' },
                { id: 2, type: 'course', name: 'Python 데이터 분석 마스터', instructor: '이파이썬', category: '개발', originalPrice: '₩179,000', price: '₩129,000', sales: 892, status: 'active' },
                { id: 3, type: 'course', name: 'UI/UX 디자인 실무', instructor: '박디자인', category: '디자인', originalPrice: '₩159,000', price: '₩119,000', sales: 567, status: 'active' },
                { id: 4, type: 'course', name: 'AWS 클라우드 입문', instructor: '최클라우드', category: '개발', originalPrice: '₩149,000', price: '₩99,000', sales: 445, status: 'soldout' },
                { id: 5, type: 'course', name: '디지털 마케팅 전략', instructor: '정마케팅', category: '마케팅', originalPrice: '₩129,000', price: '₩89,000', sales: 334, status: 'inactive' }
            ],
            packageProducts: [
                { id: 101, type: 'package', name: '프론트엔드 올인원 패키지', courses: 5, category: '개발', originalPrice: '₩599,000', price: '₩399,000', sales: 234, status: 'active' },
                { id: 102, type: 'package', name: '백엔드 마스터 패키지', courses: 4, category: '개발', originalPrice: '₩499,000', price: '₩349,000', sales: 178, status: 'active' },
                { id: 103, type: 'package', name: '디자인 입문 패키지', courses: 3, category: '디자인', originalPrice: '₩299,000', price: '₩199,000', sales: 145, status: 'active' }
            ],
            subscriptionProducts: [
                { id: 201, type: 'subscription', name: '월간 구독권', courses: 89, category: '전체', originalPrice: '₩49,000', price: '₩39,000', sales: 567, status: 'active' },
                { id: 202, type: 'subscription', name: '연간 구독권', courses: 89, category: '전체', originalPrice: '₩468,000', price: '₩299,000', sales: 234, status: 'active' },
                { id: 203, type: 'subscription', name: '팀 구독권 (5인)', courses: 89, category: '전체', originalPrice: '₩199,000', price: '₩149,000', sales: 89, status: 'active' }
            ]
        }
    },
    computed: {
        currentProducts() {
            if (this.activeTab === 'courses') return this.courseProducts;
            if (this.activeTab === 'packages') return this.packageProducts;
            return this.subscriptionProducts;
        }
    },
    methods: {
        getProductIcon(type) {
            return { 'course': '📚', 'package': '📦', 'subscription': '🔄' }[type] || '📦';
        },
        getStatusBadgeClass(status) {
            return {
                'active': 'bg-success',
                'inactive': 'bg-secondary',
                'soldout': 'bg-danger'
            }[status] || 'bg-secondary';
        },
        getStatusText(status) {
            return { 'active': '판매중', 'inactive': '판매중지', 'soldout': '품절' }[status] || status;
        },
        resetFilters() {
            this.filters = { status: '', category: '' };
            this.searchQuery = '';
            this.sortBy = 'newest';
        },
        openCreateModal() { alert('상품 등록 모달은 추후 구현 예정입니다.'); },
        openCategoryModal() { alert('카테고리 관리 모달은 추후 구현 예정입니다.'); },
        editProduct(product) { alert(`${product.name} 수정 기능은 추후 구현 예정입니다.`); },
        toggleStatus(product) {
            const newStatus = product.status === 'active' ? 'inactive' : 'active';
            if (confirm(`${product.name} 상품을 ${newStatus === 'active' ? '판매중' : '판매중지'}로 변경하시겠습니까?`)) {
                product.status = newStatus;
            }
        }
    }
}
