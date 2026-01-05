export default {
    name: 'learningPaths',
    data() {
        return {
            paths: [],
            stats: {
                total: 0,
                active: 0,
                enrollments: 0,
                completed: 0
            },
            filters: {
                search: '',
                status: '',
                category: '',
                level: ''
            },
            currentPage: 1,
            itemsPerPage: 9
        }
    },
    computed: {
        filteredPaths() {
            let filtered = this.paths;

            // 검색 필터
            if (this.filters.search) {
                const search = this.filters.search.toLowerCase();
                filtered = filtered.filter(path =>
                    path.title.toLowerCase().includes(search) ||
                    path.description.toLowerCase().includes(search)
                );
            }

            // 상태 필터
            if (this.filters.status) {
                filtered = filtered.filter(path => path.status === this.filters.status);
            }

            // 카테고리 필터
            if (this.filters.category) {
                filtered = filtered.filter(path => path.category === this.filters.category);
            }

            // 난이도 필터
            if (this.filters.level) {
                filtered = filtered.filter(path => path.level === this.filters.level);
            }

            // 페이지네이션
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return filtered.slice(start, end);
        },
        totalPages() {
            let filtered = this.paths;
            if (this.filters.search) {
                const search = this.filters.search.toLowerCase();
                filtered = filtered.filter(path =>
                    path.title.toLowerCase().includes(search) ||
                    path.description.toLowerCase().includes(search)
                );
            }
            if (this.filters.status) {
                filtered = filtered.filter(path => path.status === this.filters.status);
            }
            if (this.filters.category) {
                filtered = filtered.filter(path => path.category === this.filters.category);
            }
            if (this.filters.level) {
                filtered = filtered.filter(path => path.level === this.filters.level);
            }
            return Math.ceil(filtered.length / this.itemsPerPage);
        }
    },
    mounted() {
        this.loadPaths();
    },
    methods: {
        loadPaths() {
            // 실제로는 API에서 데이터를 가져옴
            // 여기서는 목 데이터 사용
            this.paths = [
                {
                    id: 1,
                    title: '풀스택 웹 개발자 양성과정',
                    description: 'HTML, CSS, JavaScript부터 React, Node.js까지 완벽 마스터',
                    category: 'programming',
                    level: 'beginner',
                    status: 'active',
                    courseCount: 8,
                    estimatedHours: 120,
                    enrollmentCount: 245,
                    completionRate: 68,
                    rating: 4.8,
                    reviewCount: 89,
                    createdAt: '2024-01-15'
                },
                {
                    id: 2,
                    title: 'AI/ML 엔지니어 트랙',
                    description: '머신러닝 기초부터 딥러닝, 실전 프로젝트까지',
                    category: 'programming',
                    level: 'intermediate',
                    status: 'active',
                    courseCount: 12,
                    estimatedHours: 180,
                    enrollmentCount: 178,
                    completionRate: 52,
                    rating: 4.9,
                    reviewCount: 67,
                    createdAt: '2024-02-01'
                },
                {
                    id: 3,
                    title: 'UX/UI 디자이너 마스터',
                    description: '사용자 경험 설계부터 비주얼 디자인, 프로토타이핑까지',
                    category: 'design',
                    level: 'beginner',
                    status: 'active',
                    courseCount: 6,
                    estimatedHours: 90,
                    enrollmentCount: 312,
                    completionRate: 74,
                    rating: 4.7,
                    reviewCount: 125,
                    createdAt: '2024-01-20'
                },
                {
                    id: 4,
                    title: '데이터 사이언티스트 양성',
                    description: '통계, Python, SQL부터 데이터 분석 실무까지',
                    category: 'programming',
                    level: 'intermediate',
                    status: 'active',
                    courseCount: 10,
                    estimatedHours: 150,
                    enrollmentCount: 198,
                    completionRate: 61,
                    rating: 4.6,
                    reviewCount: 78,
                    createdAt: '2024-02-10'
                },
                {
                    id: 5,
                    title: '디지털 마케팅 전문가',
                    description: 'SEO, SNS 마케팅, 구글 애즈, 데이터 분석까지',
                    category: 'marketing',
                    level: 'beginner',
                    status: 'active',
                    courseCount: 7,
                    estimatedHours: 100,
                    enrollmentCount: 267,
                    completionRate: 71,
                    rating: 4.5,
                    reviewCount: 94,
                    createdAt: '2024-01-25'
                },
                {
                    id: 6,
                    title: '클라우드 아키텍트 트랙',
                    description: 'AWS, Azure, GCP 클라우드 인프라 설계 및 운영',
                    category: 'programming',
                    level: 'advanced',
                    status: 'draft',
                    courseCount: 9,
                    estimatedHours: 140,
                    enrollmentCount: 0,
                    completionRate: 0,
                    rating: 0,
                    reviewCount: 0,
                    createdAt: '2024-03-01'
                },
                {
                    id: 7,
                    title: '비즈니스 영어 완성',
                    description: '기초 문법부터 비즈니스 회화, 프레젠테이션까지',
                    category: 'language',
                    level: 'beginner',
                    status: 'active',
                    courseCount: 5,
                    estimatedHours: 80,
                    enrollmentCount: 189,
                    completionRate: 65,
                    rating: 4.4,
                    reviewCount: 56,
                    createdAt: '2024-02-15'
                },
                {
                    id: 8,
                    title: 'MBA 핵심 과정',
                    description: '경영전략, 재무, 마케팅, 리더십 핵심 이론',
                    category: 'business',
                    level: 'intermediate',
                    status: 'active',
                    courseCount: 11,
                    estimatedHours: 160,
                    enrollmentCount: 156,
                    completionRate: 58,
                    rating: 4.7,
                    reviewCount: 62,
                    createdAt: '2024-01-30'
                }
            ];

            // 통계 계산
            this.updateStats();
        },
        updateStats() {
            this.stats.total = this.paths.length;
            this.stats.active = this.paths.filter(p => p.status === 'active').length;
            this.stats.enrollments = this.paths.reduce((sum, p) => sum + p.enrollmentCount, 0);
            this.stats.completed = Math.round(
                this.paths.reduce((sum, p) => sum + (p.enrollmentCount * p.completionRate / 100), 0)
            );
        },
        getCategoryLabel(category) {
            const labels = {
                programming: '프로그래밍',
                design: '디자인',
                business: '비즈니스',
                marketing: '마케팅',
                language: '언어'
            };
            return labels[category] || category;
        },
        getLevelLabel(level) {
            const labels = {
                beginner: '초급',
                intermediate: '중급',
                advanced: '고급'
            };
            return labels[level] || level;
        },
        getStatusLabel(status) {
            const labels = {
                active: '활성',
                draft: '준비중',
                archived: '보관'
            };
            return labels[status] || status;
        },
        getStatusBadgeClass(status) {
            const classes = {
                active: 'bg-success',
                draft: 'bg-warning',
                archived: 'bg-secondary'
            };
            return classes[status] || 'bg-secondary';
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('ko-KR');
        },
        resetFilters() {
            this.filters = {
                search: '',
                status: '',
                category: '',
                level: ''
            };
            this.currentPage = 1;
        },
        editPath(id) {
            this.navigateTo('/learning/learning-paths-edit?id=' + id);
        },
        duplicatePath(id) {
            if (confirm('이 학습경로를 복제하시겠습니까?')) {
                const original = this.paths.find(p => p.id === id);
                const duplicate = {
                    ...original,
                    id: this.paths.length + 1,
                    title: original.title + ' (복사본)',
                    status: 'draft',
                    enrollmentCount: 0,
                    completionRate: 0,
                    rating: 0,
                    reviewCount: 0,
                    createdAt: new Date().toISOString().split('T')[0]
                };
                this.paths.push(duplicate);
                this.updateStats();
                alert('학습경로가 복제되었습니다.');
            }
        },
        deletePath(id) {
            const path = this.paths.find(p => p.id === id);
            if (confirm(`"${path.title}" 학습경로를 삭제하시겠습니까?\n\n이 작업은 되돌릴 수 없습니다.`)) {
                this.paths = this.paths.filter(p => p.id !== id);
                this.updateStats();
                alert('학습경로가 삭제되었습니다.');
            }
        }
    }
}
