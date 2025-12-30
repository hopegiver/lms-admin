export default {
    name: 'CoursesCreate',
    layout: 'admin',
    data() {
        return {
            form: {
                title: '',
                category: '',
                instructor: '',
                description: '',
                level: 'beginner',
                lessons: '',
                duration: '',
                thumbnail: '',
                status: 'draft',
                publishDate: '',
                featured: false
            },
            categories: [
                { id: 1, name: '개발' },
                { id: 2, name: '디자인' },
                { id: 3, name: '마케팅' },
                { id: 4, name: '비즈니스' },
                { id: 5, name: '데이터' }
            ],
            instructors: [
                { id: 1, name: '김개발' },
                { id: 2, name: '이데이터' },
                { id: 3, name: '박자바' },
                { id: 4, name: '최클라우드' }
            ]
        }
    },
    methods: {
        validateForm() {
            if (!this.form.title) {
                alert('강좌명을 입력해주세요.');
                return false;
            }
            if (!this.form.category) {
                alert('카테고리를 선택해주세요.');
                return false;
            }
            if (!this.form.instructor) {
                alert('강사를 선택해주세요.');
                return false;
            }
            return true;
        },

        async submit() {
            if (!this.validateForm()) return;

            if (confirm('강좌를 생성하시겠습니까?')) {
                try {
                    // API 호출 시뮬레이션
                    // const response = await this.$api.post('/api/learning/courses', this.form);

                    alert('강좌가 생성되었습니다.');
                    this.navigateTo('/learning/courses');
                } catch (error) {
                    alert('생성에 실패했습니다: ' + error.message);
                }
            }
        },

        saveDraft() {
            alert('임시저장 기능은 추후 구현 예정입니다.');
        },

        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.form.thumbnail = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        }
    }
}
