export default {
    name: 'AssessmentsCreate',
    layout: 'admin',
    data() {
        return {
            form: {
                title: '',
                courseId: '',
                type: '',
                description: '',
                passingScore: 70,
                timeLimit: 60,
                status: 'draft',
                questions: []
            },
            courses: [
                { id: 1, title: 'React 완벽 가이드' },
                { id: 2, title: 'Vue.js 마스터클래스' },
                { id: 3, title: 'JavaScript ES6+' },
                { id: 4, title: 'Node.js 백엔드 개발' },
                { id: 5, title: 'Python Django 웹 개발' }
            ]
        }
    },
    methods: {
        validateForm() {
            if (!this.form.title) {
                alert('평가 제목을 입력해주세요.');
                return false;
            }
            if (!this.form.courseId) {
                alert('강좌를 선택해주세요.');
                return false;
            }
            if (!this.form.type) {
                alert('평가 유형을 선택해주세요.');
                return false;
            }
            if (!this.form.passingScore || this.form.passingScore < 0 || this.form.passingScore > 100) {
                alert('합격 점수를 0~100 사이로 입력해주세요.');
                return false;
            }
            if (this.form.questions.length === 0) {
                alert('최소 1개 이상의 문제를 추가해주세요.');
                return false;
            }
            for (let i = 0; i < this.form.questions.length; i++) {
                const q = this.form.questions[i];
                if (!q.text) {
                    alert(`${i + 1}번 문제의 내용을 입력해주세요.`);
                    return false;
                }
                if (!q.answer) {
                    alert(`${i + 1}번 문제의 정답을 입력해주세요.`);
                    return false;
                }
                if (!q.points || q.points <= 0) {
                    alert(`${i + 1}번 문제의 배점을 입력해주세요.`);
                    return false;
                }
            }
            return true;
        },

        async submit() {
            if (!this.validateForm()) return;

            if (confirm('평가를 생성하시겠습니까?')) {
                try {
                    // API 호출 시뮬레이션
                    // const response = await this.$api.post('/api/learning/assessments', this.form);

                    alert('평가가 생성되었습니다.');
                    this.navigateTo('/learning/assessments');
                } catch (error) {
                    alert('생성에 실패했습니다: ' + error.message);
                }
            }
        },

        saveDraft() {
            if (!this.form.title) {
                alert('평가 제목을 입력해주세요.');
                return;
            }
            alert('임시저장되었습니다.');
        },

        addQuestion() {
            this.form.questions.push({
                text: '',
                type: 'multiple',
                options: '',
                answer: '',
                points: 10
            });
        },

        removeQuestion(index) {
            if (confirm('이 문제를 삭제하시겠습니까?')) {
                this.form.questions.splice(index, 1);
            }
        },

        calculateTotalPoints() {
            return this.form.questions.reduce((sum, q) => {
                return sum + (parseInt(q.points) || 0);
            }, 0);
        }
    }
}
