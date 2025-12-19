export default {
    name: 'Curriculum',
    layout: 'admin',
    data() {
        return {
            courseSearch: '',
            selectedCourse: null,
            courses: [
                { id: 1, title: 'React 완벽 가이드', sections: 5, lessons: 45, status: 'published' },
                { id: 2, title: 'Python 데이터 분석', sections: 4, lessons: 38, status: 'published' },
                { id: 3, title: 'JavaScript ES6+', sections: 4, lessons: 32, status: 'published' },
                { id: 4, title: 'AWS 클라우드 입문', sections: 3, lessons: 28, status: 'draft' },
                { id: 5, title: 'UX 디자인 원칙', sections: 3, lessons: 24, status: 'draft' }
            ],
            curriculum: []
        }
    },
    computed: {
        filteredCourses() {
            if (!this.courseSearch) return this.courses;
            return this.courses.filter(c => c.title.toLowerCase().includes(this.courseSearch.toLowerCase()));
        }
    },
    mounted() {
        const courseId = this.getParam('courseId');
        if (courseId) {
            const course = this.courses.find(c => c.id == courseId);
            if (course) this.selectCourse(course);
        }
    },
    methods: {
        selectCourse(course) {
            this.selectedCourse = course;
            this.curriculum = [
                {
                    id: 1, title: '섹션 1: 시작하기', expanded: true,
                    lessons: [
                        { id: 1, title: '강좌 소개', type: 'video', duration: '5:30', preview: true },
                        { id: 2, title: '개발환경 설정', type: 'video', duration: '12:00', preview: true },
                        { id: 3, title: '첫 번째 프로젝트', type: 'video', duration: '18:00', preview: false }
                    ]
                },
                {
                    id: 2, title: '섹션 2: 기초 개념', expanded: true,
                    lessons: [
                        { id: 4, title: '핵심 개념 이해', type: 'video', duration: '25:00', preview: false },
                        { id: 5, title: '실습 자료', type: 'document', duration: '10분', preview: false },
                        { id: 6, title: '퀴즈: 기초 개념', type: 'quiz', duration: '15분', preview: false }
                    ]
                },
                {
                    id: 3, title: '섹션 3: 심화 학습', expanded: false,
                    lessons: [
                        { id: 7, title: '고급 기능', type: 'video', duration: '30:00', preview: false },
                        { id: 8, title: '프로젝트 실습', type: 'video', duration: '45:00', preview: false }
                    ]
                }
            ];
        },
        toggleSection(section) { section.expanded = !section.expanded; },
        getLessonIcon(type) {
            return { 'video': '🎬', 'document': '📄', 'quiz': '📝', 'assignment': '✍️' }[type] || '📄';
        },
        getTotalLessons() {
            return this.curriculum.reduce((sum, s) => sum + s.lessons.length, 0);
        },
        getTotalDuration() {
            return '약 12시간';
        },
        addSection() {
            this.curriculum.push({
                id: Date.now(), title: '새 섹션', expanded: true, lessons: []
            });
        },
        deleteSection(section) {
            if (confirm('이 섹션을 삭제하시겠습니까?')) {
                this.curriculum = this.curriculum.filter(s => s.id !== section.id);
            }
        },
        addLesson(section) {
            section.lessons.push({
                id: Date.now(), title: '새 차시', type: 'video', duration: '0:00', preview: false
            });
        },
        editLesson(lesson) { alert(`${lesson.title} 수정 기능은 추후 구현 예정입니다.`); },
        uploadContent(lesson) { alert('콘텐츠 업로드 기능은 추후 구현 예정입니다.'); },
        deleteLesson(section, lesson) {
            if (confirm('이 차시를 삭제하시겠습니까?')) {
                section.lessons = section.lessons.filter(l => l.id !== lesson.id);
            }
        },
        importScorm() { alert('SCORM/xAPI 가져오기 기능은 추후 구현 예정입니다.'); },
        previewCurriculum() { alert('커리큘럼 미리보기 기능은 추후 구현 예정입니다.'); },
        saveCurriculum() { alert('커리큘럼이 저장되었습니다. (실제 저장은 추후 구현)'); }
    }
}
