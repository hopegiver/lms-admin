export default {
    name: 'PagesDetail',
    layout: 'admin',
    data() {
        return {
            currentTab: 'info',
            contentView: 'preview',
            pageId: null,
            page: null,
            versionHistory: []
        }
    },
    computed: {
        pageUrl() {
            if (!this.page) return '';
            return `https://example.com/${this.page.slug}`;
        }
    },
    methods: {
        getStatusText(status) {
            const statuses = {
                'draft': '초안',
                'published': '게시됨',
                'private': '비공개'
            };
            return statuses[status] || status;
        },

        getStatusClass(status) {
            const classes = {
                'draft': 'bg-secondary',
                'published': 'bg-success',
                'private': 'bg-warning'
            };
            return classes[status] || 'bg-secondary';
        },

        getTemplateText(template) {
            const templates = {
                'default': '기본 템플릿',
                'full-width': '전체 너비',
                'sidebar': '사이드바 포함',
                'landing': '랜딩 페이지'
            };
            return templates[template] || template;
        },

        getSeoScoreClass(score) {
            if (score >= 80) return 'text-success';
            if (score >= 60) return 'text-warning';
            return 'text-danger';
        },

        async loadPage() {
            try {
                // API 호출 시뮬레이션
                // const response = await this.$api.get(`/api/site/pages/${this.pageId}`);

                // 임시 데이터
                this.page = {
                    id: this.pageId,
                    title: '서비스 소개',
                    slug: 'about-us',
                    status: 'published',
                    template: 'default',
                    parentPage: null,
                    content: '<h1>서비스 소개</h1>\n<p>저희 LMS 플랫폼은 최고의 학습 경험을 제공합니다.</p>\n<h2>주요 특징</h2>\n<ul>\n<li>다양한 강좌 제공</li>\n<li>전문 강사진</li>\n<li>편리한 학습 관리</li>\n</ul>',
                    metaTitle: 'LMS 플랫폼 서비스 소개 - 최고의 학습 경험',
                    metaDescription: '저희 LMS 플랫폼은 다양한 강좌와 전문 강사진을 통해 최고의 학습 경험을 제공합니다. 지금 바로 시작하세요.',
                    author: '김관리자',
                    lastEditor: '이개발',
                    createdAt: '2024-01-10 14:30',
                    updatedAt: '2024-01-15 16:20',
                    views: 1234,
                    avgDuration: '2분 30초',
                    bounceRate: '35%',
                    wordCount: 450,
                    readingTime: 2,
                    imageCount: 3,
                    seoScore: 85,
                    seoTips: [
                        '메타 설명을 더 구체적으로 작성하세요',
                        '이미지에 alt 속성을 추가하세요'
                    ]
                };

                this.loadVersionHistory();
            } catch (error) {
                alert('페이지 정보를 불러오는데 실패했습니다: ' + error.message);
            }
        },

        loadVersionHistory() {
            this.versionHistory = [
                {
                    id: 1,
                    version: '1.3',
                    description: 'SEO 메타 정보 업데이트',
                    author: '이개발',
                    createdAt: '2024-01-15 16:20'
                },
                {
                    id: 2,
                    version: '1.2',
                    description: '주요 특징 섹션 추가',
                    author: '김관리자',
                    createdAt: '2024-01-12 10:15'
                },
                {
                    id: 3,
                    version: '1.1',
                    description: '오타 수정 및 내용 보완',
                    author: '김관리자',
                    createdAt: '2024-01-11 09:30'
                },
                {
                    id: 4,
                    version: '1.0',
                    description: '페이지 최초 생성',
                    author: '김관리자',
                    createdAt: '2024-01-10 14:30'
                }
            ];
        },

        copyUrl() {
            navigator.clipboard.writeText(this.pageUrl).then(() => {
                alert('URL이 클립보드에 복사되었습니다.');
            }).catch(() => {
                alert('URL 복사에 실패했습니다.');
            });
        },

        preview() {
            window.open(this.pageUrl, '_blank');
        },

        edit() {
            this.navigateTo(`/site/pages/edit?id=${this.pageId}`);
        },

        async deletePage() {
            if (confirm('정말 삭제하시겠습니까?')) {
                try {
                    // API 호출 시뮬레이션
                    // await this.$api.delete(`/api/site/pages/${this.pageId}`);

                    alert('페이지가 삭제되었습니다.');
                    this.navigateTo('/site/pages');
                } catch (error) {
                    alert('삭제에 실패했습니다: ' + error.message);
                }
            }
        },

        viewVersion(version) {
            alert(`버전 ${version.version}을 확인합니다.`);
            // 실제 구현에서는 해당 버전의 내용을 표시
        },

        async restoreVersion(version) {
            if (confirm(`버전 ${version.version}으로 복원하시겠습니까?`)) {
                try {
                    // API 호출 시뮬레이션
                    // await this.$api.post(`/api/site/pages/${this.pageId}/restore`, { versionId: version.id });

                    alert('페이지가 복원되었습니다.');
                    this.loadPage();
                } catch (error) {
                    alert('복원에 실패했습니다: ' + error.message);
                }
            }
        }
    },
    mounted() {
        // 쿼리 파라미터에서 ID 추출
        const params = new URLSearchParams(window.location.search);
        this.pageId = params.get('id');

        if (!this.pageId) {
            alert('페이지 ID가 없습니다.');
            this.navigateTo('/site/pages');
            return;
        }

        this.loadPage();
    }
}
