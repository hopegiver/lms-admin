export default {
    name: 'MenusDetail',
    layout: 'admin',
    data() {
        return {
            currentTab: 'info',
            previewStyle: 'horizontal',
            menuId: null,
            menu: null
        }
    },
    methods: {
        getLocationText(location) {
            const locations = {
                'header': '헤더',
                'footer': '푸터',
                'sidebar': '사이드바',
                'mobile': '모바일'
            };
            return locations[location] || location;
        },

        async loadMenu() {
            try {
                // API 호출 시뮬레이션
                // const response = await this.$api.get(`/api/site/menus/${this.menuId}`);

                // 임시 데이터
                this.menu = {
                    id: this.menuId,
                    name: '메인 메뉴',
                    location: 'header',
                    description: '웹사이트 상단 메인 메뉴',
                    status: 'active',
                    author: '김관리자',
                    createdAt: '2024-01-10',
                    updatedAt: '2024-01-15 14:30',
                    totalItems: 8,
                    topLevelItems: 4,
                    maxDepth: 2,
                    items: [
                        { label: '홈', url: '/', target: '_self', depth: 0, active: true },
                        { label: '강좌', url: '/courses', target: '_self', depth: 0, active: true },
                        { label: '전체 강좌', url: '/courses/all', target: '_self', depth: 1, active: true },
                        { label: '인기 강좌', url: '/courses/popular', target: '_self', depth: 1, active: true },
                        { label: '회사 소개', url: '/about', target: '_self', depth: 0, active: true },
                        { label: '서비스', url: '/services', target: '_self', depth: 1, active: true },
                        { label: '팀 소개', url: '/team', target: '_self', depth: 1, active: true },
                        { label: '문의', url: '/contact', target: '_self', depth: 0, active: true }
                    ]
                };
            } catch (error) {
                alert('메뉴 정보를 불러오는데 실패했습니다: ' + error.message);
            }
        },

        getTopLevelItems() {
            if (!this.menu) return [];
            return this.menu.items.filter(item => item.depth === 0);
        },

        hasChildren(item) {
            if (!this.menu) return false;
            const index = this.menu.items.indexOf(item);
            if (index === -1) return false;

            // 다음 항목이 현재 항목보다 깊이가 깊으면 자식이 있음
            for (let i = index + 1; i < this.menu.items.length; i++) {
                if (this.menu.items[i].depth <= item.depth) break;
                if (this.menu.items[i].depth === item.depth + 1) return true;
            }
            return false;
        },

        getChildren(item) {
            if (!this.menu) return [];
            const index = this.menu.items.indexOf(item);
            if (index === -1) return [];

            const children = [];
            for (let i = index + 1; i < this.menu.items.length; i++) {
                if (this.menu.items[i].depth <= item.depth) break;
                if (this.menu.items[i].depth === item.depth + 1) {
                    children.push(this.menu.items[i]);
                }
            }
            return children;
        },

        edit() {
            this.navigateTo(`/site/menus/edit?id=${this.menuId}`);
        },

        async deleteMenu() {
            if (confirm('정말 삭제하시겠습니까?')) {
                try {
                    // API 호출 시뮬레이션
                    // await this.$api.delete(`/api/site/menus/${this.menuId}`);

                    alert('메뉴가 삭제되었습니다.');
                    this.navigateTo('/site/menus');
                } catch (error) {
                    alert('삭제에 실패했습니다: ' + error.message);
                }
            }
        }
    },
    mounted() {
        // 쿼리 파라미터에서 ID 추출
        const params = new URLSearchParams(window.location.search);
        this.menuId = params.get('id');

        if (!this.menuId) {
            alert('메뉴 ID가 없습니다.');
            this.navigateTo('/site/menus');
            return;
        }

        this.loadMenu();
    }
}
