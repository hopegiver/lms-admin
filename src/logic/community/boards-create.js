export default {
    name: 'BoardsCreate',
    layout: 'admin',
    data() {
        return {
            form: {
                title: '',
                boardType: '',
                status: 'active',
                description: '',
                readPermission: 'all',
                writePermission: 'member',
                categories: [],
                useComments: true,
                useAttachments: true,
                maxFileSize: 10
            },
            newCategory: ''
        }
    },
    methods: {
        validateForm() {
            if (!this.form.title) {
                alert('게시판 이름을 입력해주세요.');
                return false;
            }
            if (!this.form.boardType) {
                alert('게시판 유형을 선택해주세요.');
                return false;
            }
            return true;
        },

        addCategory() {
            if (this.newCategory.trim()) {
                if (!this.form.categories.includes(this.newCategory.trim())) {
                    this.form.categories.push(this.newCategory.trim());
                    this.newCategory = '';
                } else {
                    alert('이미 추가된 카테고리입니다.');
                }
            }
        },

        removeCategory(index) {
            this.form.categories.splice(index, 1);
        },

        async submit() {
            if (!this.validateForm()) return;

            if (confirm('게시판을 생성하시겠습니까?')) {
                try {
                    // API 호출 시뮬레이션
                    // const response = await this.$api.post('/api/community/boards', this.form);

                    alert('게시판이 생성되었습니다.');
                    this.navigateTo('/community/boards');
                } catch (error) {
                    alert('생성에 실패했습니다: ' + error.message);
                }
            }
        }
    },
    mounted() {
        // 쿼리 파라미터에서 데이터 로드
        const params = new URLSearchParams(window.location.search);
        if (params.get('type')) {
            this.form.boardType = params.get('type');
        }
    }
}
