export default {
    name: 'PagesCreate',
    layout: 'admin',
    data() {
        return {
            form: {
                title: '',
                slug: '',
                status: 'draft',
                content: '',
                metaTitle: '',
                metaDescription: '',
                template: 'default',
                parentPage: '',
                publishDate: ''
            },
            parentPages: [
                { id: 1, title: '회사 소개' },
                { id: 2, title: '서비스' },
                { id: 3, title: '지원' }
            ]
        }
    },
    computed: {
        previewUrl() {
            if (!this.form.slug) return 'https://example.com/';
            return `https://example.com/${this.form.slug}`;
        }
    },
    watch: {
        'form.title'(newVal) {
            // 제목 변경 시 자동으로 slug 생성 (비어있을 때만)
            if (!this.form.slug && newVal) {
                this.form.slug = this.generateSlug(newVal);
            }
        }
    },
    methods: {
        generateSlug(text) {
            // 간단한 slug 생성 (한글은 영문으로 변환 필요)
            return text
                .toLowerCase()
                .replace(/[^a-z0-9가-힣]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
        },

        validateSlug() {
            // slug 유효성 검사 (영문, 숫자, 하이픈만)
            this.form.slug = this.form.slug
                .toLowerCase()
                .replace(/[^a-z0-9-]/g, '')
                .replace(/-+/g, '-');
        },

        validateForm() {
            if (!this.form.title) {
                alert('페이지 제목을 입력해주세요.');
                return false;
            }
            if (!this.form.slug) {
                alert('URL Slug를 입력해주세요.');
                return false;
            }
            if (!/^[a-z0-9-]+$/.test(this.form.slug)) {
                alert('URL Slug는 영문 소문자, 숫자, 하이픈만 사용 가능합니다.');
                return false;
            }
            if (this.form.metaTitle && this.form.metaTitle.length > 60) {
                alert('메타 제목은 60자 이내로 입력해주세요.');
                return false;
            }
            if (this.form.metaDescription && this.form.metaDescription.length > 160) {
                alert('메타 설명은 160자 이내로 입력해주세요.');
                return false;
            }
            return true;
        },

        async submit() {
            if (!this.validateForm()) return;

            if (confirm('페이지를 생성하시겠습니까?')) {
                try {
                    // API 호출 시뮬레이션
                    // const response = await this.$api.post('/api/site/pages', this.form);

                    alert('페이지가 생성되었습니다.');
                    this.navigateTo('/site/pages');
                } catch (error) {
                    alert('생성에 실패했습니다: ' + error.message);
                }
            }
        },

        saveDraft() {
            this.form.status = 'draft';
            this.submit();
        }
    },
    mounted() {
        // 쿼리 파라미터에서 데이터 로드
        const params = new URLSearchParams(window.location.search);
        if (params.get('template')) {
            this.form.template = params.get('template');
        }
        if (params.get('parent')) {
            this.form.parentPage = params.get('parent');
        }
    }
}
