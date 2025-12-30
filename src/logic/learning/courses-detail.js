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
            reviews: [],
            lessonFormVisible: false,
            lessonFormMode: 'add', // 'add' or 'edit'
            lessonForm: {
                id: null,
                title: '',
                duration: '',
                type: 'video',
                isPublic: 'true',
                description: '',
                contentUrl: '',
                isFree: false
            }
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
                    { id: 1, title: 'React 소개 및 환경 설정', duration: '15분', type: 'video', isPublic: true, description: 'React의 기본 개념과 개발 환경 설정', contentUrl: 'https://example.com/video1.mp4', isFree: true },
                    { id: 2, title: 'JSX와 컴포넌트 기초', duration: '20분', type: 'video', isPublic: true, description: 'JSX 문법과 컴포넌트 작성법', contentUrl: 'https://example.com/video2.mp4', isFree: false },
                    { id: 3, title: 'Props와 State', duration: '25분', type: 'video', isPublic: true, description: '데이터 전달과 상태 관리', contentUrl: 'https://example.com/video3.mp4', isFree: false },
                    { id: 4, title: 'Hooks 완벽 가이드', duration: '40분', type: 'video', isPublic: true, description: 'useState, useEffect 등 주요 Hooks', contentUrl: 'https://example.com/video4.mp4', isFree: false },
                    { id: 5, title: '실전 프로젝트', duration: '60분', type: 'assignment', isPublic: true, description: '배운 내용을 활용한 프로젝트 구현', contentUrl: 'https://example.com/assignment1', isFree: false }
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

        // 커리큘럼 관리 메서드
        showAddLessonForm() {
            this.lessonFormMode = 'add';
            this.lessonForm = {
                id: null,
                title: '',
                duration: '',
                type: 'video',
                isPublic: 'true',
                description: '',
                contentUrl: '',
                isFree: false
            };
            this.lessonFormVisible = true;
        },

        editLesson(lesson) {
            this.lessonFormMode = 'edit';
            this.lessonForm = {
                id: lesson.id,
                title: lesson.title,
                duration: lesson.duration,
                type: lesson.type || 'video',
                isPublic: lesson.isPublic ? 'true' : 'false',
                description: lesson.description || '',
                contentUrl: lesson.contentUrl || '',
                isFree: lesson.isFree || false
            };
            this.lessonFormVisible = true;
        },

        cancelLessonForm() {
            this.lessonFormVisible = false;
            this.lessonForm = {
                id: null,
                title: '',
                duration: '',
                type: 'video',
                isPublic: 'true',
                description: '',
                contentUrl: '',
                isFree: false
            };
        },

        saveLessonForm() {
            if (!this.lessonForm.title) {
                alert('차시명을 입력해주세요.');
                return;
            }
            if (!this.lessonForm.duration) {
                alert('소요시간을 입력해주세요.');
                return;
            }

            if (this.lessonFormMode === 'add') {
                // 새 차시 추가
                const newId = Math.max(...this.curriculum.map(l => l.id), 0) + 1;
                this.curriculum.push({
                    id: newId,
                    title: this.lessonForm.title,
                    duration: this.lessonForm.duration,
                    type: this.lessonForm.type,
                    isPublic: this.lessonForm.isPublic === 'true',
                    description: this.lessonForm.description,
                    contentUrl: this.lessonForm.contentUrl,
                    isFree: this.lessonForm.isFree
                });
                alert('차시가 추가되었습니다.');
            } else {
                // 기존 차시 수정
                const index = this.curriculum.findIndex(l => l.id === this.lessonForm.id);
                if (index !== -1) {
                    this.curriculum[index] = {
                        id: this.lessonForm.id,
                        title: this.lessonForm.title,
                        duration: this.lessonForm.duration,
                        type: this.lessonForm.type,
                        isPublic: this.lessonForm.isPublic === 'true',
                        description: this.lessonForm.description,
                        contentUrl: this.lessonForm.contentUrl,
                        isFree: this.lessonForm.isFree
                    };
                    alert('차시가 수정되었습니다.');
                }
            }

            this.cancelLessonForm();
        },

        deleteLesson(lesson) {
            if (confirm(`${lesson.title}을(를) 삭제하시겠습니까?`)) {
                const index = this.curriculum.findIndex(l => l.id === lesson.id);
                if (index !== -1) {
                    this.curriculum.splice(index, 1);
                    alert('차시가 삭제되었습니다.');
                }
            }
        },

        moveLessonUp(index) {
            if (index > 0) {
                const temp = this.curriculum[index];
                this.curriculum[index] = this.curriculum[index - 1];
                this.curriculum[index - 1] = temp;
                // Vue 반응성을 위한 배열 재할당
                this.curriculum = [...this.curriculum];
            }
        },

        moveLessonDown(index) {
            if (index < this.curriculum.length - 1) {
                const temp = this.curriculum[index];
                this.curriculum[index] = this.curriculum[index + 1];
                this.curriculum[index + 1] = temp;
                // Vue 반응성을 위한 배열 재할당
                this.curriculum = [...this.curriculum];
            }
        },

        previewLesson(lesson) {
            if (lesson.contentUrl) {
                window.open(lesson.contentUrl, '_blank');
            } else {
                alert('콘텐츠 URL이 설정되지 않았습니다.');
            }
        },

        getTotalDuration() {
            // 간단한 시간 합산 (분 단위로 계산)
            let totalMinutes = 0;
            this.curriculum.forEach(lesson => {
                const match = lesson.duration.match(/(\d+)분/);
                if (match) {
                    totalMinutes += parseInt(match[1]);
                }
            });
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            if (hours > 0) {
                return `${hours}시간 ${minutes}분`;
            } else {
                return `${minutes}분`;
            }
        },

        getPublicLessonsCount() {
            return this.curriculum.filter(l => l.isPublic).length;
        },

        getFreeLessonsCount() {
            return this.curriculum.filter(l => l.isFree).length;
        }
    }
}
