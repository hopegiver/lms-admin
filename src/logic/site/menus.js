export default {
    name: 'Menus',
    layout: 'admin',
    data() {
        return {
            selectedMenu: null,
            menus: [
                {
                    id: 1, name: '메인 네비게이션', location: '상단 헤더', itemsCount: 5,
                    items: [
                        { id: 1, label: '홈', url: '/' },
                        { id: 2, label: '강좌', url: '/courses' },
                        { id: 3, label: '로드맵', url: '/roadmaps' },
                        { id: 4, label: '커뮤니티', url: '/community' },
                        { id: 5, label: '이벤트', url: '/events' }
                    ]
                },
                {
                    id: 2, name: '푸터 링크', location: '하단 푸터', itemsCount: 4,
                    items: [
                        { id: 1, label: '이용약관', url: '/terms' },
                        { id: 2, label: '개인정보처리방침', url: '/privacy' },
                        { id: 3, label: '고객센터', url: '/support' },
                        { id: 4, label: '회사소개', url: '/about' }
                    ]
                },
                {
                    id: 3, name: '사이드바 메뉴', location: '학습 페이지 사이드바', itemsCount: 3,
                    items: [
                        { id: 1, label: '내 강좌', url: '/my/courses' },
                        { id: 2, label: '학습 현황', url: '/my/progress' },
                        { id: 3, label: '수료증', url: '/my/certificates' }
                    ]
                },
                {
                    id: 4, name: '모바일 메뉴', location: '모바일 햄버거 메뉴', itemsCount: 6,
                    items: [
                        { id: 1, label: '홈', url: '/' },
                        { id: 2, label: '강좌', url: '/courses' },
                        { id: 3, label: '내 학습', url: '/my/courses' },
                        { id: 4, label: '커뮤니티', url: '/community' },
                        { id: 5, label: '고객센터', url: '/support' },
                        { id: 6, label: '로그인', url: '/login' }
                    ]
                }
            ]
        }
    },
    methods: {
        selectMenu(menu) {
            this.selectedMenu = menu;
        },
        viewDetail(menu) {
            this.navigateTo('/site/menus-detail', {id: menu.id});
        },
        openCreateMenuModal() {
            this.navigateTo('/site/menus-create');
        },
        addMenuItem() {
            const label = prompt('메뉴 항목 이름을 입력하세요:');
            if (label) {
                const url = prompt('URL을 입력하세요:');
                this.selectedMenu.items.push({
                    id: Date.now(),
                    label: label,
                    url: url || '#'
                });
                this.selectedMenu.itemsCount = this.selectedMenu.items.length;
            }
        },
        editMenuItem(item) {
            const label = prompt('메뉴 항목 이름:', item.label);
            if (label) {
                item.label = label;
                item.url = prompt('URL:', item.url) || item.url;
            }
        },
        removeMenuItem(index) {
            if (confirm('이 메뉴 항목을 삭제하시겠습니까?')) {
                this.selectedMenu.items.splice(index, 1);
                this.selectedMenu.itemsCount = this.selectedMenu.items.length;
            }
        },
        saveMenu() {
            alert('메뉴가 저장되었습니다.');
        }
    }
}
