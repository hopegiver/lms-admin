export default {
    name: 'Products',
    layout: 'admin',
    data() {
        return {
            activeTab: 'courses',
            searchQuery: '',
            sortBy: 'newest',
            filters: { status: '', category: '' },
            stats: { total: 156, active: 128, soldOut: 8, monthlyRevenue: '₩67,450,000' },
            categories: [
                { id: 1, name: '도서', parentId: null, sortOrder: 1 },
                { id: 2, name: 'IT/프로그래밍', parentId: 1, sortOrder: 1 },
                { id: 3, name: '경영/경제', parentId: 1, sortOrder: 2 },
                { id: 4, name: '굿즈', parentId: null, sortOrder: 2 },
                { id: 5, name: '의류', parentId: 4, sortOrder: 1 },
                { id: 6, name: '문구/잡화', parentId: 4, sortOrder: 2 },
                { id: 7, name: '전자기기', parentId: null, sortOrder: 3 },
                { id: 8, name: '태블릿/노트북', parentId: 7, sortOrder: 1 },
                { id: 9, name: '액세서리', parentId: 7, sortOrder: 2 }
            ],
            courseProducts: [
                { id: 1, type: 'course', name: 'React 완벽 가이드 2024', courseId: 1, category: '개발', originalPrice: '₩199,000', price: '₩149,000', sales: 1234, status: 'active' },
                { id: 2, type: 'course', name: 'Python 데이터 분석 마스터', courseId: 2, category: '개발', originalPrice: '₩179,000', price: '₩129,000', sales: 892, status: 'active' },
                { id: 3, type: 'course', name: 'UI/UX 디자인 실무', courseId: 3, category: '디자인', originalPrice: '₩159,000', price: '₩119,000', sales: 567, status: 'active' },
                { id: 4, type: 'course', name: 'AWS 클라우드 입문', courseId: 4, category: '개발', originalPrice: '₩149,000', price: '₩99,000', sales: 445, status: 'soldout' },
                { id: 5, type: 'course', name: '디지털 마케팅 전략', courseId: 5, category: '마케팅', originalPrice: '₩129,000', price: '₩89,000', sales: 334, status: 'inactive' }
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
            ],
            bookProducts: [
                { id: 301, type: 'book', name: '클린 코드', author: '로버트 C. 마틴', publisher: '인사이트', category: 'IT', originalPrice: '₩33,000', price: '₩29,700', sales: 456, stock: 50, status: 'active' },
                { id: 302, type: 'book', name: '이펙티브 자바', author: '조슈아 블로크', publisher: '인사이트', category: 'IT', originalPrice: '₩36,000', price: '₩32,400', sales: 389, stock: 30, status: 'active' },
                { id: 303, type: 'book', name: '리팩터링 2판', author: '마틴 파울러', publisher: '한빛미디어', category: 'IT', originalPrice: '₩38,000', price: '₩34,200', sales: 234, stock: 0, status: 'soldout' },
                { id: 304, type: 'book', name: '객체지향의 사실과 오해', author: '조영호', publisher: '위키북스', category: 'IT', originalPrice: '₩25,000', price: '₩22,500', sales: 567, stock: 120, status: 'active' },
                { id: 305, type: 'book', name: 'DDD Start!', author: '최범균', publisher: '지앤선', category: 'IT', originalPrice: '₩30,000', price: '₩27,000', sales: 298, stock: 45, status: 'active' }
            ],
            generalProducts: [
                { id: 401, type: 'general', name: 'LMS 로고 티셔츠', brand: 'LMS Store', category: '의류', originalPrice: '₩35,000', price: '₩29,000', sales: 123, stock: 200, status: 'active' },
                { id: 402, type: 'general', name: '개발자 머그컵', brand: 'LMS Store', category: '문구/잡화', originalPrice: '₩15,000', price: '₩12,000', sales: 345, stock: 150, status: 'active' },
                { id: 403, type: 'general', name: '코딩 스티커 세트', brand: 'LMS Store', category: '문구/잡화', originalPrice: '₩8,000', price: '₩6,000', sales: 678, stock: 500, status: 'active' },
                { id: 404, type: 'general', name: 'USB 메모리 32GB', brand: 'SanDisk', category: '전자기기', originalPrice: '₩20,000', price: '₩16,000', sales: 234, stock: 80, status: 'active' },
                { id: 405, type: 'general', name: '노트북 파우치', brand: 'LMS Store', category: '가방/케이스', originalPrice: '₩45,000', price: '₩39,000', sales: 156, stock: 0, status: 'soldout' }
            ]
        }
    },
    computed: {
        currentProducts() {
            if (this.activeTab === 'courses') return this.courseProducts;
            if (this.activeTab === 'packages') return this.packageProducts;
            if (this.activeTab === 'subscriptions') return this.subscriptionProducts;
            if (this.activeTab === 'books') return this.bookProducts;
            if (this.activeTab === 'general') return this.generalProducts;
            return this.courseProducts;
        },
        sortedCategories() {
            // 계층 구조를 유지하면서 선택상자용 리스트 생성
            const result = [];
            const parents = this.categories
                .filter(c => !c.parentId)
                .sort((a, b) => a.sortOrder - b.sortOrder);

            parents.forEach(parent => {
                result.push(parent);
                const children = this.categories
                    .filter(c => c.parentId === parent.id)
                    .sort((a, b) => a.sortOrder - b.sortOrder);
                children.forEach(child => {
                    result.push(child);
                });
            });

            return result;
        }
    },
    methods: {
        getProductIcon(type) {
            return { 'course': '📚', 'package': '📦', 'subscription': '🔄', 'book': '📖', 'general': '🛍️' }[type] || '📦';
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
        openCreateModal() {
            this.navigateTo('/commerce/products-create');
        },
        viewDetail(product) {
            this.navigateTo('/commerce/products-detail', {id: product.id});
        },
        openCategoryModal() { this.navigateTo('/commerce/product-categories'); },
        getCategoryDisplayName(category) {
            if (category.parentId) {
                return `  → ${category.name}`;
            }
            return category.name;
        },
        editProduct(product) {
            this.navigateTo('/commerce/products-detail', {id: product.id});
        },
        toggleStatus(product) {
            const newStatus = product.status === 'active' ? 'inactive' : 'active';
            if (confirm(`${product.name} 상품을 ${newStatus === 'active' ? '판매중' : '판매중지'}로 변경하시겠습니까?`)) {
                product.status = newStatus;
            }
        }
    }
}
