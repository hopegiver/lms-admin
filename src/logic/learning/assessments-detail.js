export default {
    name: 'AssessmentsDetail',
    layout: 'admin',
    data() {
        return {
            assessmentId: this.getParam('id'),
            currentTab: 'info',
            assessment: null,
            questions: [],
            attempts: [],
            scoreDistribution: [],
            questionStats: []
        }
    },
    async mounted() {
        if (!this.assessmentId) {
            alert('평가 ID가 필요합니다.');
            this.navigateTo('/learning/assessments');
            return;
        }

        await this.loadAssessment();
    },
    methods: {
        async loadAssessment() {
            try {
                // API 호출 시뮬레이션
                // const response = await this.$api.get(`/api/learning/assessments/${this.assessmentId}`);
                // this.assessment = response.data;

                // 임시 데이터
                this.assessment = {
                    id: this.assessmentId,
                    title: 'React 기초 평가',
                    courseName: 'React 완벽 가이드',
                    courseId: 1,
                    type: 'exam',
                    description: 'React의 기본 개념을 평가하는 시험입니다.',
                    passingScore: 70,
                    timeLimit: 60,
                    totalPoints: 100,
                    status: 'active',
                    totalAttempts: 245,
                    avgScore: 82.5,
                    passRate: 78.4,
                    createdAt: '2024-11-20'
                };

                this.questions = [
                    { id: 1, text: 'React에서 상태(state)를 관리하는 Hook은?', type: 'multiple', options: 'useEffect\nuseState\nuseContext\nuseReducer', answer: 'useState', points: 10, difficulty: '쉬움' },
                    { id: 2, text: 'JSX는 JavaScript XML의 약자이다.', type: 'true_false', options: '', answer: '참', points: 10, difficulty: '쉬움' },
                    { id: 3, text: 'Virtual DOM의 장점을 설명하시오.', type: 'essay', options: '', answer: '성능 최적화 및 효율적인 렌더링', points: 20, difficulty: '중' },
                    { id: 4, text: 'useEffect Hook의 용도는?', type: 'multiple', options: '상태 관리\n사이드 이펙트 처리\n라우팅\n스타일링', answer: '사이드 이펙트 처리', points: 10, difficulty: '중' },
                    { id: 5, text: 'React 컴포넌트의 생명주기 메서드 3가지를 작성하시오.', type: 'short_answer', options: '', answer: 'componentDidMount, componentDidUpdate, componentWillUnmount', points: 15, difficulty: '어려움' }
                ];

                this.attempts = [
                    { id: 1, learnerName: '홍길동', email: 'hong@example.com', score: 95, duration: '45분', passed: true, attemptDate: '2024-12-28 14:30' },
                    { id: 2, learnerName: '김철수', email: 'kim@example.com', score: 85, duration: '52분', passed: true, attemptDate: '2024-12-27 10:15' },
                    { id: 3, learnerName: '이영희', email: 'lee@example.com', score: 65, duration: '58분', passed: false, attemptDate: '2024-12-26 16:20' },
                    { id: 4, learnerName: '박지민', email: 'park@example.com', score: 90, duration: '40분', passed: true, attemptDate: '2024-12-25 11:45' },
                    { id: 5, learnerName: '최민수', email: 'choi@example.com', score: 75, duration: '55분', passed: true, attemptDate: '2024-12-24 15:30' }
                ];

                this.scoreDistribution = [
                    { label: '90-100점', count: 58, percentage: 23.7 },
                    { label: '80-89점', count: 85, percentage: 34.7 },
                    { label: '70-79점', count: 49, percentage: 20.0 },
                    { label: '60-69점', count: 35, percentage: 14.3 },
                    { label: '60점 미만', count: 18, percentage: 7.3 }
                ];

                this.questionStats = [
                    { correctRate: 92.5 },
                    { correctRate: 88.3 },
                    { correctRate: 65.7 },
                    { correctRate: 78.9 },
                    { correctRate: 54.2 }
                ];
            } catch (error) {
                alert('평가 정보를 불러오는데 실패했습니다.');
                console.error(error);
            }
        },

        getStatusClass(status) {
            return { 'active': 'bg-success', 'draft': 'bg-warning text-dark', 'archived': 'bg-secondary' }[status] || 'bg-secondary';
        },

        getStatusText(status) {
            return { 'active': '활성', 'draft': '준비중', 'archived': '보관' }[status] || status;
        },

        getTypeText(type) {
            return {
                'exam': '시험',
                'quiz': '퀴즈',
                'assignment': '과제',
                'multiple': '객관식',
                'true_false': '참/거짓',
                'short_answer': '단답형',
                'essay': '서술형'
            }[type] || type;
        },

        edit() {
            alert('수정 기능은 추후 구현 예정입니다.');
        },

        deleteAssessment() {
            if (confirm('이 평가를 삭제하시겠습니까?')) {
                alert('삭제 기능은 추후 구현 예정입니다.');
            }
        },

        addQuestion() {
            alert('문제 추가 기능은 추후 구현 예정입니다.');
        },

        editQuestion(question) {
            alert(`${question.text} 수정 기능은 추후 구현 예정입니다.`);
        },

        deleteQuestion(question) {
            if (confirm('이 문제를 삭제하시겠습니까?')) {
                alert('삭제 기능은 추후 구현 예정입니다.');
            }
        },

        viewAttempt(attempt) {
            alert(`${attempt.learnerName}의 응시 내역 상세보기 기능은 추후 구현 예정입니다.`);
        }
    }
}
