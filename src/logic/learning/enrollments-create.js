export default {
    name: 'EnrollmentsCreate',
    layout: 'admin',
    data() {
        return {
            form: {
                learnerId: '',
                courseId: '',
                enrollmentDate: new Date().toISOString().split('T')[0],
                expiryDate: '',
                paymentStatus: 'pending',
                paymentAmount: '',
                paymentMethod: '',
                paymentDate: '',
                notes: '',
                autoApprove: true,
                sendEmail: true
            },
            learners: [
                { id: 1, name: '홍길동', email: 'hong@example.com' },
                { id: 2, name: '김철수', email: 'kim@example.com' },
                { id: 3, name: '이영희', email: 'lee@example.com' },
                { id: 4, name: '박지민', email: 'park@example.com' },
                { id: 5, name: '최민수', email: 'choi@example.com' }
            ],
            courses: [
                { id: 1, title: 'React 완벽 가이드', price: 99000 },
                { id: 2, title: 'Vue.js 마스터클래스', price: 89000 },
                { id: 3, title: 'JavaScript ES6+', price: 79000 },
                { id: 4, title: 'Node.js 백엔드 개발', price: 99000 },
                { id: 5, title: 'Python Django 웹 개발', price: 89000 }
            ],
            learnerSearchKeyword: '',
            showLearnerDropdown: false,
            courseSearchKeyword: '',
            showCourseDropdown: false
        }
    },
    computed: {
        filteredLearners() {
            if (!this.learnerSearchKeyword) return this.learners;
            const keyword = this.learnerSearchKeyword.toLowerCase();
            return this.learners.filter(l =>
                l.name.toLowerCase().includes(keyword) ||
                l.email.toLowerCase().includes(keyword)
            );
        },
        filteredCourses() {
            if (!this.courseSearchKeyword) return this.courses;
            const keyword = this.courseSearchKeyword.toLowerCase();
            return this.courses.filter(c =>
                c.title.toLowerCase().includes(keyword)
            );
        },
        selectedLearner() {
            return this.learners.find(l => l.id === this.form.learnerId);
        },
        selectedCourse() {
            return this.courses.find(c => c.id === this.form.courseId);
        }
    },
    watch: {
        'form.courseId'(newValue) {
            if (newValue) {
                const course = this.getSelectedCourse();
                if (course && !this.form.paymentAmount) {
                    this.form.paymentAmount = course.price;
                }
            }
        }
    },
    methods: {
        selectLearner(learner) {
            this.form.learnerId = learner.id;
            this.learnerSearchKeyword = '';
            this.showLearnerDropdown = false;
        },

        clearLearner() {
            this.form.learnerId = '';
            this.learnerSearchKeyword = '';
        },

        selectCourse(course) {
            this.form.courseId = course.id;
            this.courseSearchKeyword = '';
            this.showCourseDropdown = false;
        },

        clearCourse() {
            this.form.courseId = '';
            this.courseSearchKeyword = '';
        },

        validateForm() {
            if (!this.form.learnerId) {
                alert('학습자를 선택해주세요.');
                return false;
            }
            if (!this.form.courseId) {
                alert('강좌를 선택해주세요.');
                return false;
            }
            if (!this.form.enrollmentDate) {
                alert('수강 시작일을 선택해주세요.');
                return false;
            }
            if (this.form.expiryDate && this.form.expiryDate < this.form.enrollmentDate) {
                alert('수강 종료일은 시작일보다 이후여야 합니다.');
                return false;
            }
            return true;
        },

        async submit() {
            if (!this.validateForm()) return;

            if (confirm('수강을 등록하시겠습니까?')) {
                try {
                    // API 호출 시뮬레이션
                    // const response = await this.$api.post('/api/learning/enrollments', this.form);

                    alert('수강이 등록되었습니다.');
                    this.navigateTo('/learning/enrollments');
                } catch (error) {
                    alert('등록에 실패했습니다: ' + error.message);
                }
            }
        },

        getSelectedCourse() {
            return this.courses.find(c => c.id === this.form.courseId);
        }
    }
}
