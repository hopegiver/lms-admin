export default {
    name: 'CurriculumDetail',
    layout: 'admin',
    data() {
        return {
            curriculumId: this.getParam('id'),
            currentTab: 'info',
            curriculum: null,
            lessons: [],
            studentProgress: []
        }
    },
    async mounted() {
        if (!this.curriculumId) {
            alert('커리큘럼 ID가 필요합니다.');
            this.navigateTo('/learning/curriculum');
            return;
        }

        await this.loadCurriculum();
    },
    methods: {
        async loadCurriculum() {
            try {
                // API 호출 시뮬레이션
                // const response = await this.$api.get(`/api/learning/curriculum/${this.curriculumId}`);
                // this.curriculum = response.data;

                // 임시 데이터
                this.curriculum = {
                    id: this.curriculumId,
                    name: 'React 기초 과정',
                    courseName: 'React 완벽 가이드',
                    courseId: 1,
                    description: 'React의 기본 개념부터 실전 활용까지 학습하는 커리큘럼입니다.',
                    status: 'active',
                    totalLessons: 5,
                    totalDuration: '2시간 40분',
                    students: 850,
                    avgProgress: 68,
                    completionRate: 42,
                    createdAt: '2024-11-15'
                };

                this.lessons = [
                    { id: 1, title: 'React 소개 및 환경 설정', duration: '15분', contentId: 101, order: 1 },
                    { id: 2, title: 'JSX와 컴포넌트 기초', duration: '20분', contentId: 102, order: 2 },
                    { id: 3, title: 'Props와 State', duration: '25분', contentId: 103, order: 3 },
                    { id: 4, title: 'Hooks 완벽 가이드', duration: '40분', contentId: null, order: 4 },
                    { id: 5, title: '실전 프로젝트', duration: '60분', contentId: 105, order: 5 }
                ];

                this.studentProgress = [
                    { id: 1, name: '홍길동', email: 'hong@example.com', progress: 80, completedLessons: 4, lastStudyDate: '2024-12-28' },
                    { id: 2, name: '김철수', email: 'kim@example.com', progress: 100, completedLessons: 5, lastStudyDate: '2024-12-25' },
                    { id: 3, name: '이영희', email: 'lee@example.com', progress: 60, completedLessons: 3, lastStudyDate: '2024-12-27' },
                    { id: 4, name: '박지민', email: 'park@example.com', progress: 40, completedLessons: 2, lastStudyDate: '2024-12-29' },
                    { id: 5, name: '최민수', email: 'choi@example.com', progress: 20, completedLessons: 1, lastStudyDate: '2024-12-20' }
                ];
            } catch (error) {
                alert('커리큘럼 정보를 불러오는데 실패했습니다.');
                console.error(error);
            }
        },

        getStatusClass(status) {
            return { 'active': 'bg-success', 'draft': 'bg-warning text-dark', 'archived': 'bg-secondary' }[status] || 'bg-secondary';
        },

        getStatusText(status) {
            return { 'active': '활성', 'draft': '준비중', 'archived': '보관' }[status] || status;
        },

        edit() {
            alert('수정 기능은 추후 구현 예정입니다.');
        },

        deleteCurriculum() {
            if (confirm('이 커리큘럼을 삭제하시겠습니까?')) {
                alert('삭제 기능은 추후 구현 예정입니다.');
            }
        },

        addLesson() {
            alert('차시 추가 기능은 추후 구현 예정입니다.');
        },

        viewLesson(lesson) {
            alert(`${lesson.title} 상세보기 기능은 추후 구현 예정입니다.`);
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
