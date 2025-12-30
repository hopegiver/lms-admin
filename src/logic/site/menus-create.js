export default {
    name: 'MenusCreate',
    layout: 'admin',
    data() {
        return {
            form: {
                name: '',
                location: '',
                description: '',
                status: 'active',
                items: []
            }
        }
    },
    methods: {
        validateForm() {
            if (!this.form.name) {
                alert('메뉴 이름을 입력해주세요.');
                return false;
            }
            if (!this.form.location) {
                alert('메뉴 위치를 선택해주세요.');
                return false;
            }
            if (this.form.items.length === 0) {
                alert('최소 1개 이상의 메뉴 항목을 추가해주세요.');
                return false;
            }
            // 메뉴 항목 검증
            for (let i = 0; i < this.form.items.length; i++) {
                const item = this.form.items[i];
                if (!item.label) {
                    alert(`${i + 1}번째 메뉴 항목의 이름을 입력해주세요.`);
                    return false;
                }
                if (!item.url) {
                    alert(`${i + 1}번째 메뉴 항목의 URL을 입력해주세요.`);
                    return false;
                }
            }
            return true;
        },

        addMenuItem() {
            this.form.items.push({
                label: '',
                url: '',
                target: '_self',
                depth: 0
            });
        },

        removeMenuItem(index) {
            if (confirm('이 메뉴 항목을 삭제하시겠습니까?')) {
                this.form.items.splice(index, 1);
            }
        },

        moveUp(index) {
            if (index > 0) {
                const item = this.form.items.splice(index, 1)[0];
                this.form.items.splice(index - 1, 0, item);
            }
        },

        moveDown(index) {
            if (index < this.form.items.length - 1) {
                const item = this.form.items.splice(index, 1)[0];
                this.form.items.splice(index + 1, 0, item);
            }
        },

        increaseDepth(index) {
            if (this.form.items[index].depth < 2) {
                this.form.items[index].depth++;
            }
        },

        decreaseDepth(index) {
            if (this.form.items[index].depth > 0) {
                this.form.items[index].depth--;
            }
        },

        addQuickMenu(type) {
            if (type === 'pages') {
                // 페이지 목록 선택 모달 (추후 구현)
                this.form.items.push({
                    label: '페이지 이름',
                    url: '/page-url',
                    target: '_self',
                    depth: 0
                });
            } else if (type === 'courses') {
                // 강좌 카테고리 선택 모달 (추후 구현)
                this.form.items.push({
                    label: '강좌',
                    url: '/courses',
                    target: '_self',
                    depth: 0
                });
            } else if (type === 'custom') {
                this.addMenuItem();
            }
        },

        async submit() {
            if (!this.validateForm()) return;

            if (confirm('메뉴를 생성하시겠습니까?')) {
                try {
                    // API 호출 시뮬레이션
                    // const response = await this.$api.post('/api/site/menus', this.form);

                    alert('메뉴가 생성되었습니다.');
                    this.navigateTo('/site/menus');
                } catch (error) {
                    alert('생성에 실패했습니다: ' + error.message);
                }
            }
        }
    },
    mounted() {
        // 쿼리 파라미터에서 데이터 로드
        const params = new URLSearchParams(window.location.search);
        if (params.get('location')) {
            this.form.location = params.get('location');
        }
    }
}
