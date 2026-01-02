export default {
    name: 'Courses',
    layout: 'admin',
    data() {
        return {
            searchQuery: '',
            filters: {
                status: '',
                category: '',
                instructor: ''
            },
            selectAll: false,
            selectedIds: [],
            currentPage: 1,
            pageSize: 10,
            totalCount: 89,
            categories: [
                { id: 1, name: '프로그래밍', parentId: null, sortOrder: 1 },
                { id: 2, name: '웹 개발', parentId: 1, sortOrder: 1 },
                { id: 3, name: '모바일 개발', parentId: 1, sortOrder: 2 },
                { id: 4, name: '백엔드', parentId: 1, sortOrder: 3 },
                { id: 5, name: '디자인', parentId: null, sortOrder: 2 },
                { id: 6, name: 'UI/UX', parentId: 5, sortOrder: 1 },
                { id: 7, name: '그래픽 디자인', parentId: 5, sortOrder: 2 },
                { id: 8, name: '마케팅', parentId: null, sortOrder: 3 },
                { id: 9, name: '디지털 마케팅', parentId: 8, sortOrder: 1 },
                { id: 10, name: '콘텐츠 마케팅', parentId: 8, sortOrder: 2 }
            ],
            instructors: [
                { id: 1, name: '김개발' },
                { id: 2, name: '이데이터' },
                { id: 3, name: '박자바' },
                { id: 4, name: '최클라우드' }
            ],
            courses: [
                { id: 1, title: 'React 완벽 가이드', category: '개발', instructor: '김개발', lessons: 45, duration: '12시간', students: 1250, rating: 4.9, price: '₩99,000', status: 'published' },
                { id: 2, title: 'Python 데이터 분석', category: '데이터', instructor: '이데이터', lessons: 38, duration: '10시간', students: 980, rating: 4.8, price: '₩120,000', status: 'published' },
                { id: 3, title: 'JavaScript ES6+', category: '개발', instructor: '박자바', lessons: 32, duration: '8시간', students: 856, rating: 4.7, price: '₩79,000', status: 'published' },
                { id: 4, title: 'AWS 클라우드 입문', category: '개발', instructor: '최클라우드', lessons: 28, duration: '7시간', students: 720, rating: 4.6, price: '₩89,000', status: 'published' },
                { id: 5, title: 'UX 디자인 원칙', category: '디자인', instructor: '정디자인', lessons: 24, duration: '6시간', students: 450, rating: 4.5, price: '₩69,000', status: 'draft' },
                { id: 6, title: '디지털 마케팅 전략', category: '마케팅', instructor: '한마케팅', lessons: 20, duration: '5시간', students: 320, rating: 4.4, price: '₩59,000', status: 'closed' }
            ]
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalCount / this.pageSize);
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
        getStatusClass(status) {
            return { 'published': 'bg-success', 'draft': 'bg-warning text-dark', 'closed': 'bg-secondary' }[status] || 'bg-secondary';
        },
        getStatusText(status) {
            return { 'published': '판매중', 'draft': '준비중', 'closed': '판매종료' }[status] || status;
        },
        toggleSelectAll() {
            this.selectedIds = this.selectAll ? this.courses.map(c => c.id) : [];
        },
        viewDetail(course) {
            this.navigateTo('/learning/courses-detail', { id: course.id });
        },
        openCreateWizard() { this.navigateTo('/learning/courses-create'); },
        openCategoryModal() { this.navigateTo('/learning/categories'); },
        getCategoryDisplayName(category) {
            if (category.parentId) {
                const parent = this.categories.find(c => c.id === category.parentId);
                return `  → ${category.name}`;
            }
            return category.name;
        },
        editCourse(course) { this.navigateTo('/learning/courses-detail', { id: course.id }); },
        manageCurriculum(course) { this.navigateTo('/learning/curriculum', { courseId: course.id }); },
        copyCourse(course) { alert(`${course.title} 복사 기능은 추후 구현 예정입니다.`); },
        previewCourse(course) { alert(`${course.title} 미리보기 기능은 추후 구현 예정입니다.`); },
        deleteCourse(course) { if (confirm(`${course.title}을(를) 삭제하시겠습니까?`)) alert('삭제 기능은 추후 구현 예정입니다.'); },
        exportData(type) { alert(`${type.toUpperCase()} 내보내기 기능은 추후 구현 예정입니다.`); },
        bulkAction(action) { alert(`${action} 일괄 처리 기능은 추후 구현 예정입니다.`); }
    }
}
