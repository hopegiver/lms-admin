export default {
    name: 'CoursesDetail',
    layout: 'admin',
    data() {
        return {
            courseId: this.getParam('id'),
            currentTab: 'info',
            course: null,
            sections: [],
            students: [],
            reviews: [],
            sectionFormVisible: false,
            sectionFormMode: 'add', // 'add' or 'edit'
            sectionForm: {
                id: null,
                title: '',
                description: '',
                order: 0
            },
            lessonFormVisible: false,
            lessonFormMode: 'add', // 'add' or 'edit'
            currentSectionId: null,
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
                    status: 'published',
                    description: 'React를 처음 시작하는 분들을 위한 완벽한 가이드입니다. 기초부터 고급 개념까지 단계별로 학습합니다.',
                    thumbnail: 'https://via.placeholder.com/800x400?text=React+Course'
                };

                this.sections = [
                    {
                        id: 1,
                        title: 'React 시작하기',
                        description: 'React의 기본 개념과 개발 환경 설정',
                        order: 1,
                        lessons: [
                            { id: 1, title: 'React 소개 및 환경 설정', duration: '15분', type: 'video', isPublic: true, description: 'React의 기본 개념과 개발 환경 설정', contentUrl: 'https://example.com/video1.mp4', isFree: true },
                            { id: 2, title: 'JSX와 컴포넌트 기초', duration: '20분', type: 'video', isPublic: true, description: 'JSX 문법과 컴포넌트 작성법', contentUrl: 'https://example.com/video2.mp4', isFree: false }
                        ]
                    },
                    {
                        id: 2,
                        title: 'React 핵심 개념',
                        description: '데이터 관리와 컴포넌트 통신',
                        order: 2,
                        lessons: [
                            { id: 3, title: 'Props와 State', duration: '25분', type: 'video', isPublic: true, description: '데이터 전달과 상태 관리', contentUrl: 'https://example.com/video3.mp4', isFree: false },
                            { id: 4, title: 'Hooks 완벽 가이드', duration: '40분', type: 'video', isPublic: true, description: 'useState, useEffect 등 주요 Hooks', contentUrl: 'https://example.com/video4.mp4', isFree: false }
                        ]
                    },
                    {
                        id: 3,
                        title: '실전 프로젝트',
                        description: '배운 내용을 활용한 실전 개발',
                        order: 3,
                        lessons: [
                            { id: 5, title: '프로젝트 구현', duration: '60분', type: 'assignment', isPublic: true, description: '배운 내용을 활용한 프로젝트 구현', contentUrl: 'https://example.com/assignment1', isFree: false }
                        ]
                    }
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

        // 섹션 관리 메서드
        showAddSectionForm() {
            this.sectionFormMode = 'add';
            this.sectionForm = {
                id: null,
                title: '',
                description: '',
                order: this.sections.length + 1
            };
            this.sectionFormVisible = true;
        },

        editSection(section) {
            this.sectionFormMode = 'edit';
            this.sectionForm = {
                id: section.id,
                title: section.title,
                description: section.description || '',
                order: section.order
            };
            this.sectionFormVisible = true;
        },

        cancelSectionForm() {
            this.sectionFormVisible = false;
            this.sectionForm = {
                id: null,
                title: '',
                description: '',
                order: 0
            };
        },

        saveSectionForm() {
            if (!this.sectionForm.title) {
                alert('섹션명을 입력해주세요.');
                return;
            }

            if (this.sectionFormMode === 'add') {
                // 새 섹션 추가
                const newId = Math.max(...this.sections.map(s => s.id), 0) + 1;
                this.sections.push({
                    id: newId,
                    title: this.sectionForm.title,
                    description: this.sectionForm.description,
                    order: this.sectionForm.order,
                    lessons: []
                });
                alert('섹션이 추가되었습니다.');
            } else {
                // 기존 섹션 수정
                const index = this.sections.findIndex(s => s.id === this.sectionForm.id);
                if (index !== -1) {
                    this.sections[index].title = this.sectionForm.title;
                    this.sections[index].description = this.sectionForm.description;
                    this.sections[index].order = this.sectionForm.order;
                    alert('섹션이 수정되었습니다.');
                }
            }

            this.cancelSectionForm();
        },

        deleteSection(section) {
            if (section.lessons && section.lessons.length > 0) {
                if (!confirm(`${section.title} 섹션에 ${section.lessons.length}개의 차시가 있습니다. 정말 삭제하시겠습니까?`)) {
                    return;
                }
            } else {
                if (!confirm(`${section.title} 섹션을 삭제하시겠습니까?`)) {
                    return;
                }
            }

            const index = this.sections.findIndex(s => s.id === section.id);
            if (index !== -1) {
                this.sections.splice(index, 1);
                alert('섹션이 삭제되었습니다.');
            }
        },

        moveSectionUp(index) {
            if (index > 0) {
                const temp = this.sections[index];
                this.sections[index] = this.sections[index - 1];
                this.sections[index - 1] = temp;
                // 순서 업데이트
                this.sections[index].order = index + 1;
                this.sections[index - 1].order = index;
                // Vue 반응성을 위한 배열 재할당
                this.sections = [...this.sections];
            }
        },

        moveSectionDown(index) {
            if (index < this.sections.length - 1) {
                const temp = this.sections[index];
                this.sections[index] = this.sections[index + 1];
                this.sections[index + 1] = temp;
                // 순서 업데이트
                this.sections[index].order = index + 1;
                this.sections[index + 1].order = index + 2;
                // Vue 반응성을 위한 배열 재할당
                this.sections = [...this.sections];
            }
        },

        // 커리큘럼 관리 메서드
        showAddLessonForm(sectionId) {
            this.currentSectionId = sectionId;
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

        editLesson(sectionId, lesson) {
            this.currentSectionId = sectionId;
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

            const section = this.sections.find(s => s.id === this.currentSectionId);
            if (!section) {
                alert('섹션을 찾을 수 없습니다.');
                return;
            }

            if (this.lessonFormMode === 'add') {
                // 새 차시 추가 - 모든 섹션의 모든 레슨에서 최대 ID 찾기
                let maxId = 0;
                this.sections.forEach(s => {
                    if (s.lessons && s.lessons.length > 0) {
                        const sectionMaxId = Math.max(...s.lessons.map(l => l.id));
                        if (sectionMaxId > maxId) maxId = sectionMaxId;
                    }
                });
                const newId = maxId + 1;

                section.lessons.push({
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
                const index = section.lessons.findIndex(l => l.id === this.lessonForm.id);
                if (index !== -1) {
                    section.lessons[index] = {
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

            // Vue 반응성을 위한 배열 재할당
            this.sections = [...this.sections];
            this.cancelLessonForm();
        },

        deleteLesson(sectionId, lesson) {
            if (confirm(`${lesson.title}을(를) 삭제하시겠습니까?`)) {
                const section = this.sections.find(s => s.id === sectionId);
                if (section) {
                    const index = section.lessons.findIndex(l => l.id === lesson.id);
                    if (index !== -1) {
                        section.lessons.splice(index, 1);
                        // Vue 반응성을 위한 배열 재할당
                        this.sections = [...this.sections];
                        alert('차시가 삭제되었습니다.');
                    }
                }
            }
        },

        moveLessonUp(sectionId, lessonIndex) {
            const section = this.sections.find(s => s.id === sectionId);
            if (section && lessonIndex > 0) {
                const temp = section.lessons[lessonIndex];
                section.lessons[lessonIndex] = section.lessons[lessonIndex - 1];
                section.lessons[lessonIndex - 1] = temp;
                // Vue 반응성을 위한 배열 재할당
                this.sections = [...this.sections];
            }
        },

        moveLessonDown(sectionId, lessonIndex) {
            const section = this.sections.find(s => s.id === sectionId);
            if (section && lessonIndex < section.lessons.length - 1) {
                const temp = section.lessons[lessonIndex];
                section.lessons[lessonIndex] = section.lessons[lessonIndex + 1];
                section.lessons[lessonIndex + 1] = temp;
                // Vue 반응성을 위한 배열 재할당
                this.sections = [...this.sections];
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
            this.sections.forEach(section => {
                if (section.lessons) {
                    section.lessons.forEach(lesson => {
                        const match = lesson.duration.match(/(\d+)분/);
                        if (match) {
                            totalMinutes += parseInt(match[1]);
                        }
                    });
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
            let count = 0;
            this.sections.forEach(section => {
                if (section.lessons) {
                    count += section.lessons.filter(l => l.isPublic).length;
                }
            });
            return count;
        },

        getFreeLessonsCount() {
            let count = 0;
            this.sections.forEach(section => {
                if (section.lessons) {
                    count += section.lessons.filter(l => l.isFree).length;
                }
            });
            return count;
        },

        getTotalLessonsCount() {
            let count = 0;
            this.sections.forEach(section => {
                if (section.lessons) {
                    count += section.lessons.length;
                }
            });
            return count;
        },

        getSectionDuration(section) {
            let totalMinutes = 0;
            if (section.lessons) {
                section.lessons.forEach(lesson => {
                    const match = lesson.duration.match(/(\d+)분/);
                    if (match) {
                        totalMinutes += parseInt(match[1]);
                    }
                });
            }
            return `${totalMinutes}분`;
        }
    }
}
