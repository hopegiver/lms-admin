export default {
    name: 'Learners',
    layout: 'admin',
    data() {
        return {
            searchQuery: '',
            filters: {
                status: '',
                organization: ''
            },
            selectAll: false,
            selectedIds: [],
            currentPage: 1,
            pageSize: 10,
            totalCount: 156,
            detailTab: 'info',
            selectedLearner: null,
            organizations: [
                { id: 1, name: '개발팀' },
                { id: 2, name: '마케팅팀' },
                { id: 3, name: '영업팀' },
                { id: 4, name: '인사팀' }
            ],
            learners: [
                {
                    id: 1,
                    name: '홍길동',
                    email: 'hong@example.com',
                    phone: '010-1234-5678',
                    organization: '개발팀',
                    enrolledCourses: 3,
                    status: 'active',
                    createdAt: '2024-12-01',
                    courses: [
                        { id: 1, title: 'React 입문', progress: 75 },
                        { id: 2, title: 'JavaScript 기초', progress: 100 },
                        { id: 3, title: 'TypeScript 마스터', progress: 30 }
                    ],
                    orders: [
                        { id: 1, product: 'React 입문', amount: '₩99,000', date: '2024-12-01', status: '완료' },
                        { id: 2, product: 'JavaScript 기초', amount: '₩79,000', date: '2024-11-15', status: '완료' }
                    ]
                },
                {
                    id: 2,
                    name: '김철수',
                    email: 'kim@example.com',
                    phone: '010-2345-6789',
                    organization: '마케팅팀',
                    enrolledCourses: 2,
                    status: 'active',
                    createdAt: '2024-11-28',
                    courses: [
                        { id: 1, title: 'Python 데이터분석', progress: 45 },
                        { id: 2, title: '마케팅 기초', progress: 60 }
                    ],
                    orders: [
                        { id: 1, product: 'Python 데이터분석', amount: '₩120,000', date: '2024-11-28', status: '완료' }
                    ]
                },
                {
                    id: 3,
                    name: '이영희',
                    email: 'lee@example.com',
                    phone: '010-3456-7890',
                    organization: '영업팀',
                    enrolledCourses: 1,
                    status: 'inactive',
                    createdAt: '2024-11-20',
                    courses: [
                        { id: 1, title: '세일즈 스킬', progress: 10 }
                    ],
                    orders: []
                },
                {
                    id: 4,
                    name: '박민수',
                    email: 'park@example.com',
                    phone: '010-4567-8901',
                    organization: '개발팀',
                    enrolledCourses: 4,
                    status: 'active',
                    createdAt: '2024-11-15',
                    courses: [
                        { id: 1, title: 'AWS 클라우드', progress: 90 },
                        { id: 2, title: 'Docker 기초', progress: 100 },
                        { id: 3, title: 'Kubernetes', progress: 55 },
                        { id: 4, title: 'CI/CD 파이프라인', progress: 20 }
                    ],
                    orders: [
                        { id: 1, product: 'DevOps 패키지', amount: '₩350,000', date: '2024-11-15', status: '완료' }
                    ]
                },
                {
                    id: 5,
                    name: '정수진',
                    email: 'jung@example.com',
                    phone: '010-5678-9012',
                    organization: '인사팀',
                    enrolledCourses: 2,
                    status: 'suspended',
                    createdAt: '2024-11-10',
                    courses: [
                        { id: 1, title: 'HR 관리', progress: 0 },
                        { id: 2, title: '리더십', progress: 0 }
                    ],
                    orders: []
                }
            ]
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalCount / this.pageSize);
        }
    },
    methods: {
        getStatusClass(status) {
            const classes = {
                'active': 'bg-success',
                'inactive': 'bg-secondary',
                'suspended': 'bg-danger'
            };
            return classes[status] || 'bg-secondary';
        },
        getStatusText(status) {
            const texts = {
                'active': '활성',
                'inactive': '비활성',
                'suspended': '정지'
            };
            return texts[status] || status;
        },
        toggleSelectAll() {
            if (this.selectAll) {
                this.selectedIds = this.learners.map(l => l.id);
            } else {
                this.selectedIds = [];
            }
        },
        viewDetail(learner) {
            this.selectedLearner = learner;
            this.detailTab = 'info';
            const offcanvas = new bootstrap.Offcanvas(document.getElementById('learnerDetailPanel'));
            offcanvas.show();
        },
        editLearner(learner) {
            alert(`${learner.name} 수정 기능은 추후 구현 예정입니다.`);
        },
        deleteLearner(learner) {
            if (confirm(`${learner.name}을(를) 삭제하시겠습니까?`)) {
                alert('삭제 기능은 추후 구현 예정입니다.');
            }
        },
        openCreateModal() {
            alert('학습자 등록 모달은 추후 구현 예정입니다.');
        },
        openImportModal() {
            alert('일괄 등록 모달은 추후 구현 예정입니다.');
        },
        exportData(type) {
            alert(`${type.toUpperCase()} 내보내기 기능은 추후 구현 예정입니다.`);
        },
        bulkAction(action) {
            alert(`${action} 일괄 처리 기능은 추후 구현 예정입니다.`);
        }
    }
}
