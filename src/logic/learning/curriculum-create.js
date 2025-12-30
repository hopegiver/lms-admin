export default {
    name: 'CurriculumCreate',
    layout: 'admin',
    data() {
        return {
            form: {
                name: '',
                courseId: '',
                description: '',
                status: 'draft',
                lessons: []
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
            if (!this.form.name) {
                alert('커리큘럼명을 입력해주세요.');
                return false;
            }
            if (!this.form.courseId) {
                alert('강좌를 선택해주세요.');
                return false;
            }
            if (this.form.lessons.length === 0) {
                alert('최소 1개 이상의 차시를 추가해주세요.');
                return false;
            }
            for (let i = 0; i < this.form.lessons.length; i++) {
                if (!this.form.lessons[i].title) {
                    alert(`${i + 1}번째 차시의 제목을 입력해주세요.`);
                    return false;
                }
            }
            return true;
        },

        async submit() {
            if (!this.validateForm()) return;

            if (confirm('커리큘럼을 생성하시겠습니까?')) {
                try {
                    // API 호출 시뮬레이션
                    // const response = await this.$api.post('/api/learning/curriculum', this.form);

                    alert('커리큘럼이 생성되었습니다.');
                    this.navigateTo('/learning/curriculum');
                } catch (error) {
                    alert('생성에 실패했습니다: ' + error.message);
                }
            }
        },

        saveDraft() {
            if (!this.form.name) {
                alert('커리큘럼명을 입력해주세요.');
                return;
            }
            alert('임시저장되었습니다.');
        },

        addLesson() {
            this.form.lessons.push({
                title: '',
                duration: '',
                order: this.form.lessons.length + 1
            });
        },

        removeLesson(index) {
            if (confirm('이 차시를 삭제하시겠습니까?')) {
                this.form.lessons.splice(index, 1);
            }
        },

        calculateTotalDuration() {
            if (this.form.lessons.length === 0) return '-';

            let totalMinutes = 0;
            this.form.lessons.forEach(lesson => {
                if (lesson.duration) {
                    const match = lesson.duration.match(/(\d+)/);
                    if (match) {
                        totalMinutes += parseInt(match[1]);
                    }
                }
            });

            if (totalMinutes === 0) return '-';

            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;

            if (hours > 0) {
                return minutes > 0 ? `${hours}시간 ${minutes}분` : `${hours}시간`;
            }
            return `${minutes}분`;
        }
    }
}
