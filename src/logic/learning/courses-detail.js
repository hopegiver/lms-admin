export default {
    name: 'CoursesDetail',
    layout: 'admin',
    data() {
        return {
            courseId: this.getParam('id'),
            currentTab: 'info',
            course: null,
            curriculum: [],
            students: [],
            reviews: []
        }
    },
    async mounted() {
        if (!this.courseId) {
            alert('강좌 ID가 필요합니다.');
            this.navigateTo('/learning/courses');
            return;
        }

        await this.loadCourse();
    },
    methods: {
        async loadCourse() {
            try {
                // API 호출 시뮬레이션
                // const response = await this.$api.get(`/api/learning/courses/${this.courseId}`);
                // this.course = response.data;

                // 임시 데이터
                this.course = {
                    id: this.courseId,
                    title: 'React 완벽 가이드',
                    category: '개발',
                    instructor: '김개발',
                    level: 'intermediate',
                    lessons: 45,
                    duration: '12시간',
                    students: 1250,
                    rating: 4.9,
                    reviewCount: 342,
                    price: '₩99,000',
                    salePrice: '₩79,000',
                    status: 'published',
                    description: 'React를 처음 시작하는 분들을 위한 완벽한 가이드입니다. 기초부터 고급 개념까지 단계별로 학습합니다.',
                    thumbnail: 'https://via.placeholder.com/800x400?text=React+Course'
                };

                this.curriculum = [
                    { id: 1, title: 'React 소개 및 환경 설정', duration: '15분' },
                    { id: 2, title: 'JSX와 컴포넌트 기초', duration: '20분' },
                    { id: 3, title: 'Props와 State', duration: '25분' },
                    { id: 4, title: 'Hooks 완벽 가이드', duration: '40분' },
                    { id: 5, title: '실전 프로젝트', duration: '60분' }
                ];

                this.students = [
                    { id: 1, name: '홍길동', email: 'hong@example.com', progress: 75, enrolledAt: '2024-12-01' },
                    { id: 2, name: '김철수', email: 'kim@example.com', progress: 100, enrolledAt: '2024-11-28' },
                    { id: 3, name: '이영희', email: 'lee@example.com', progress: 45, enrolledAt: '2024-12-15' }
                ];

                this.reviews = [
                    { id: 1, author: '홍길동', rating: 5, content: '정말 좋은 강의입니다!', date: '2024-12-20' },
                    { id: 2, author: '김철수', rating: 4, content: '설명이 자세해서 좋아요.', date: '2024-12-18' },
                    { id: 3, author: '이영희', rating: 5, content: '초보자도 따라하기 쉬워요.', date: '2024-12-15' }
                ];
            } catch (error) {
                alert('강좌 정보를 불러오는데 실패했습니다.');
                console.error(error);
            }
        },

        getStatusClass(status) {
            return { 'published': 'bg-success', 'draft': 'bg-warning text-dark', 'closed': 'bg-secondary' }[status] || 'bg-secondary';
        },

        getStatusText(status) {
            return { 'published': '판매중', 'draft': '준비중', 'closed': '판매종료' }[status] || status;
        },

        getLevelText(level) {
            return { 'beginner': '초급', 'intermediate': '중급', 'advanced': '고급' }[level] || level;
        },

        preview() {
            alert('미리보기 기능은 추후 구현 예정입니다.');
        },

        edit() {
            alert('수정 기능은 추후 구현 예정입니다.');
        },

        deleteCourse() {
            if (confirm('이 강좌를 삭제하시겠습니까?')) {
                alert('삭제 기능은 추후 구현 예정입니다.');
            }
        },

        addLesson() {
            alert('차시 추가 기능은 추후 구현 예정입니다.');
        },

        editLesson(lesson) {
            alert(`${lesson.title} 수정 기능은 추후 구현 예정입니다.`);
        },

        deleteLesson(lesson) {
            if (confirm(`${lesson.title}을(를) 삭제하시겠습니까?`)) {
                alert('삭제 기능은 추후 구현 예정입니다.');
            }
        }
    }
}
