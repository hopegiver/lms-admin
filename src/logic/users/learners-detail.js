export default {
    name: 'LearnersDetail',
    layout: 'admin',
    data() {
        return {
            learnerId: this.getParam('id'),
            currentTab: 'info',
            learner: null,
            activityLogs: [
                { date: '2024-12-30 10:30', action: '로그인', detail: 'IP: 192.168.1.1' },
                { date: '2024-12-30 09:15', action: '강좌 수강', detail: 'React 입문 - 3강 시청' },
                { date: '2024-12-29 14:20', action: '강좌 등록', detail: 'TypeScript 마스터 강좌 등록' },
                { date: '2024-12-29 10:00', action: '로그인', detail: 'IP: 192.168.1.1' },
                { date: '2024-12-28 16:45', action: '강좌 완료', detail: 'JavaScript 기초 강좌 완료' }
            ]
        }
    },
    computed: {
        completedCourses() {
            if (!this.learner?.courses) return 0;
            return this.learner.courses.filter(c => c.progress === 100).length;
        },
        avgProgress() {
            if (!this.learner?.courses || this.learner.courses.length === 0) return 0;
            const total = this.learner.courses.reduce((sum, c) => sum + c.progress, 0);
            return Math.round(total / this.learner.courses.length);
        }
    },
    async mounted() {
        if (!this.learnerId) {
            alert('학습자 ID가 필요합니다.');
            this.navigateTo('/users/learners');
            return;
        }

        await this.loadLearner();
    },
    methods: {
        async loadLearner() {
            try {
                // API 호출 시뮬레이션
                // const response = await this.$api.get(`/api/users/learners/${this.learnerId}`);
                // this.learner = response.data;

                // 임시 데이터
                this.learner = {
                    id: this.learnerId,
                    name: '홍길동',
                    email: 'hong@example.com',
                    phone: '010-1234-5678',
                    organization: '개발팀',
                    enrolledCourses: 3,
                    status: 'active',
                    createdAt: '2024-12-01',
                    birthdate: '1990-01-15',
                    gender: 'male',
                    address: '서울시 강남구 테헤란로 123',
                    memo: '열정적인 학습자입니다.',
                    courses: [
                        { id: 1, title: 'React 입문', progress: 75, startDate: '2024-12-01', completionDate: null },
                        { id: 2, title: 'JavaScript 기초', progress: 100, startDate: '2024-11-15', completionDate: '2024-12-28' },
                        { id: 3, title: 'TypeScript 마스터', progress: 30, startDate: '2024-12-29', completionDate: null }
                    ],
                    orders: [
                        { id: 1001, product: 'React 입문', amount: '₩99,000', date: '2024-12-01', status: '완료' },
                        { id: 1002, product: 'JavaScript 기초', amount: '₩79,000', date: '2024-11-15', status: '완료' },
                        { id: 1003, product: 'TypeScript 마스터', amount: '₩120,000', date: '2024-12-29', status: '완료' }
                    ]
                };
            } catch (error) {
                alert('학습자 정보를 불러오는데 실패했습니다.');
                console.error(error);
            }
        },

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

        getGenderText(gender) {
            const texts = {
                'male': '남성',
                'female': '여성',
                'other': '기타'
            };
            return texts[gender] || '-';
        },

        edit() {
            alert('수정 기능은 추후 구현 예정입니다.');
            // this.navigateTo('/users/learners/edit', { id: this.learnerId });
        },

        deleteLearner() {
            if (confirm('이 학습자를 삭제하시겠습니까?')) {
                alert('삭제 기능은 추후 구현 예정입니다.');
                // this.navigateTo('/users/learners');
            }
        }
    }
}
