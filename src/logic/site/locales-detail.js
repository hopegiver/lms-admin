export default {
    name: 'LocalesDetail',
    layout: 'admin',
    data() {
        return {
            currentTab: 'info',
            localeId: null,
            locale: null,
            usageFiles: []
        }
    },
    methods: {
        getCategoryText(category) {
            const categories = {
                'common': '공통',
                'menu': '메뉴',
                'button': '버튼',
                'message': '메시지',
                'error': '에러',
                'validation': '유효성 검사'
            };
            return categories[category] || category;
        },

        getLanguageName(lang) {
            const languages = {
                'ko': '한국어',
                'en': 'English',
                'ja': '日本語',
                'zh': '中文'
            };
            return languages[lang] || lang;
        },

        getLanguageBadgeClass(lang) {
            if (lang === 'ko') return 'bg-primary';
            return 'bg-secondary';
        },

        getTotalUsage() {
            return this.usageFiles.reduce((sum, file) => sum + file.count, 0);
        },

        async loadLocale() {
            try {
                // API 호출 시뮬레이션
                // const response = await this.$api.get(`/api/site/locales/${this.localeId}`);

                // 임시 데이터
                this.locale = {
                    id: this.localeId,
                    key: 'menu.home',
                    category: 'menu',
                    description: '홈 메뉴 항목',
                    status: 'active',
                    translations: {
                        ko: '홈',
                        en: 'Home',
                        ja: 'ホーム',
                        zh: '首页'
                    },
                    locations: ['홈페이지', '헤더 메뉴', '푸터'],
                    translationCount: 4,
                    completeness: 100,
                    author: '김관리자',
                    createdAt: '2024-01-10',
                    updatedAt: '2024-01-15 14:30'
                };

                this.loadUsageFiles();
            } catch (error) {
                alert('번역 정보를 불러오는데 실패했습니다: ' + error.message);
            }
        },

        loadUsageFiles() {
            this.usageFiles = [
                {
                    file: 'src/views/layout/header.html',
                    count: 3,
                    lastUsed: '2024-01-15'
                },
                {
                    file: 'src/views/layout/footer.html',
                    count: 2,
                    lastUsed: '2024-01-14'
                },
                {
                    file: 'src/views/home.html',
                    count: 1,
                    lastUsed: '2024-01-12'
                }
            ];
        },

        edit() {
            this.navigateTo(`/site/locales/edit?id=${this.localeId}`);
        },

        async deleteLocale() {
            if (this.usageFiles.length > 0) {
                const confirmed = confirm(
                    `이 번역은 ${this.usageFiles.length}개 파일에서 사용 중입니다.\n정말 삭제하시겠습니까?`
                );
                if (!confirmed) return;
            } else {
                if (!confirm('정말 삭제하시겠습니까?')) return;
            }

            try {
                // API 호출 시뮬레이션
                // await this.$api.delete(`/api/site/locales/${this.localeId}`);

                alert('번역이 삭제되었습니다.');
                this.navigateTo('/site/locales');
            } catch (error) {
                alert('삭제에 실패했습니다: ' + error.message);
            }
        }
    },
    mounted() {
        // 쿼리 파라미터에서 ID 추출
        const params = new URLSearchParams(window.location.search);
        this.localeId = params.get('id');

        if (!this.localeId) {
            alert('번역 ID가 없습니다.');
            this.navigateTo('/site/locales');
            return;
        }

        this.loadLocale();
    }
}
