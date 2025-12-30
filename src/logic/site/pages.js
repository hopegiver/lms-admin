export default {
    name: 'Pages',
    layout: 'admin',
    data() {
        return {
            searchQuery: '',
            filters: { status: '', type: '' },
            pages: [
                { id: 1, title: '홈페이지', description: '메인 랜딩 페이지', url: '/', type: 'landing', status: 'published', views: 15234, updatedAt: '2024-12-19' },
                { id: 2, title: '소개', description: '회사 소개 페이지', url: '/about', type: 'static', status: 'published', views: 3421, updatedAt: '2024-12-15' },
                { id: 3, title: '강좌 목록', description: '전체 강좌 리스트', url: '/courses', type: 'landing', status: 'published', views: 8923, updatedAt: '2024-12-18' },
                { id: 4, title: '이용약관', description: '서비스 이용약관', url: '/terms', type: 'policy', status: 'published', views: 892, updatedAt: '2024-11-01' },
                { id: 5, title: '개인정보처리방침', description: '개인정보 처리방침', url: '/privacy', type: 'policy', status: 'published', views: 743, updatedAt: '2024-11-01' },
                { id: 6, title: '2024 프로모션', description: '연말 할인 프로모션 페이지', url: '/promo/2024', type: 'landing', status: 'published', views: 2341, updatedAt: '2024-12-10' },
                { id: 7, title: '신규 강좌 소개 (임시)', description: '곧 출시될 강좌 소개', url: '/new-courses', type: 'landing', status: 'draft', views: 0, updatedAt: '2024-12-19' },
                { id: 8, title: '파트너십', description: '파트너십 안내', url: '/partnership', type: 'static', status: 'private', views: 45, updatedAt: '2024-12-05' }
            ]
        }
    },
    methods: {
        getTypeText(type) {
            return { 'static': '정적 페이지', 'landing': '랜딩 페이지', 'policy': '정책 페이지' }[type] || type;
        },
        getStatusBadgeClass(status) {
            return { 'published': 'bg-success', 'draft': 'bg-warning', 'private': 'bg-secondary' }[status] || 'bg-secondary';
        },
        getStatusText(status) {
            return { 'published': '공개', 'draft': '초안', 'private': '비공개' }[status] || status;
        },
        resetFilters() {
            this.filters = { status: '', type: '' };
            this.searchQuery = '';
        },
        openCreatePageModal() {
            this.navigateTo('/site/pages-create');
        },
        viewDetail(page) {
            this.navigateTo('/site/pages-detail', {id: page.id});
        },
        editPage(page) {
            this.navigateTo('/site/pages-detail', {id: page.id});
        },
        previewPage(page) {
            alert(`${page.url} 미리보기`);
        },
        duplicatePage(page) {
            alert(`${page.title} 복제 기능은 추후 구현 예정입니다.`);
        },
        deletePage(page) {
            if (confirm(`${page.title} 페이지를 삭제하시겠습니까?`)) {
                alert('삭제 기능은 추후 구현 예정입니다.');
            }
        }
    }
}
