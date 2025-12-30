export default {
    name: 'EnrollmentsDetail',
    layout: 'admin',
    data() {
        return {
            enrollmentId: this.getParam('id'),
            currentTab: 'info',
            enrollment: null,
            progressData: [],
            assessmentResults: []
        }
    },
    async mounted() {
        if (!this.enrollmentId) {
            alert('수강 ID가 필요합니다.');
            this.navigateTo('/learning/enrollments');
            return;
        }

        await this.loadEnrollment();
    },
    methods: {
        async loadEnrollment() {
            try {
                // API 호출 시뮬레이션
                // const response = await this.$api.get(`/api/learning/enrollments/${this.enrollmentId}`);
                // this.enrollment = response.data;

                // 임시 데이터
                this.enrollment = {
                    id: this.enrollmentId,
                    learnerName: '홍길동',
                    learnerEmail: 'hong@example.com',
                    learnerId: 1,
                    courseName: 'React 완벽 가이드',
                    courseId: 1,
                    enrollmentDate: '2024-12-01',
                    expiryDate: '2025-12-01',
                    status: 'active',
                    progress: 75,
                    completedLessons: 38,
                    totalLessons: 45,
                    studyTime: '18시간 30분',
                    lastStudyDate: '2024-12-28',
                    paymentStatus: 'completed',
                    paymentAmount: 79000,
                    paymentMethod: 'card',
                    paymentDate: '2024-12-01',
                    paymentInfo: '신한카드 1234-****-****-5678',
                    notes: '',
                    createdAt: '2024-12-01 14:30'
                };

                this.progressData = [
                    { id: 1, title: 'React 소개 및 환경 설정', duration: '15분', progress: 100, completed: true, lastStudied: '2024-12-02' },
                    { id: 2, title: 'JSX와 컴포넌트 기초', duration: '20분', progress: 100, completed: true, lastStudied: '2024-12-05' },
                    { id: 3, title: 'Props와 State', duration: '25분', progress: 100, completed: true, lastStudied: '2024-12-10' },
                    { id: 4, title: 'Hooks 완벽 가이드', duration: '40분', progress: 60, completed: false, lastStudied: '2024-12-28' },
                    { id: 5, title: '실전 프로젝트', duration: '60분', progress: 0, completed: false, lastStudied: null }
                ];

                this.assessmentResults = [
                    { id: 1, title: 'React 기초 평가', type: '시험', score: 95, passed: true, attemptDate: '2024-12-15' },
                    { id: 2, title: 'JSX 퀴즈', type: '퀴즈', score: 100, passed: true, attemptDate: '2024-12-10' },
                    { id: 3, title: 'Hooks 과제', type: '과제', score: 85, passed: true, attemptDate: '2024-12-25' }
                ];
            } catch (error) {
                alert('수강 정보를 불러오는데 실패했습니다.');
                console.error(error);
            }
        },

        getStatusClass(status) {
            return {
                'active': 'bg-success',
                'completed': 'bg-primary',
                'expired': 'bg-secondary',
                'cancelled': 'bg-danger'
            }[status] || 'bg-secondary';
        },

        getStatusText(status) {
            return {
                'active': '진행중',
                'completed': '완료',
                'expired': '만료',
                'cancelled': '취소'
            }[status] || status;
        },

        getPaymentStatusClass(status) {
            return {
                'completed': 'bg-success',
                'pending': 'bg-warning text-dark',
                'failed': 'bg-danger',
                'refunded': 'bg-secondary'
            }[status] || 'bg-secondary';
        },

        getPaymentStatusText(status) {
            return {
                'completed': '완료',
                'pending': '대기',
                'failed': '실패',
                'refunded': '환불'
            }[status] || status;
        },

        getPaymentMethodText(method) {
            return {
                'card': '카드',
                'transfer': '계좌이체',
                'virtual': '가상계좌',
                'free': '무료'
            }[method] || method;
        },

        edit() {
            alert('수정 기능은 추후 구현 예정입니다.');
        },

        deleteEnrollment() {
            if (confirm('이 수강을 삭제하시겠습니까?')) {
                alert('삭제 기능은 추후 구현 예정입니다.');
            }
        }
    }
}
