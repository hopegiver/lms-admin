export default {
    name: 'Assessments',
    layout: 'admin',
    data() {
        return {
            activeTab: 'exams',
            questionSearch: '',
            questionFilters: { category: '', type: '' },
            questionCategories: ['React', 'JavaScript', 'Python', 'AWS', '데이터분석'],
            exams: [
                { id: 1, title: 'React 기초 테스트', type: '객관식', course: 'React 완벽 가이드', questions: 20, timeLimit: '30분', submissions: 450, avgScore: 82, active: true },
                { id: 2, title: 'JavaScript 중간고사', type: '혼합형', course: 'JavaScript ES6+', questions: 30, timeLimit: '60분', submissions: 320, avgScore: 75, active: true },
                { id: 3, title: 'Python 퀴즈', type: '객관식', course: 'Python 데이터 분석', questions: 15, timeLimit: '20분', submissions: 280, avgScore: 88, active: true },
                { id: 4, title: 'AWS 자격증 모의고사', type: '객관식', course: 'AWS 클라우드 입문', questions: 50, timeLimit: '90분', submissions: 150, avgScore: 70, active: false }
            ],
            assignments: [
                { id: 1, title: 'React 컴포넌트 만들기', course: 'React 완벽 가이드', dueDate: '2024-12-25', submitted: 38, total: 45, pendingGrade: 12, status: '진행중' },
                { id: 2, title: '데이터 시각화 프로젝트', course: 'Python 데이터 분석', dueDate: '2024-12-20', submitted: 25, total: 30, pendingGrade: 25, status: '채점중' },
                { id: 3, title: 'REST API 구현', course: 'JavaScript ES6+', dueDate: '2024-12-15', submitted: 28, total: 28, pendingGrade: 0, status: '완료' }
            ],
            questions: [
                { id: 1, question: 'React에서 상태 관리를 위해 사용하는 Hook은?', category: 'React', type: 'multiple', difficulty: 'easy', usageCount: 15 },
                { id: 2, question: 'JavaScript의 let과 const의 차이점을 설명하시오.', category: 'JavaScript', type: 'short', difficulty: 'medium', usageCount: 22 },
                { id: 3, question: 'Python에서 리스트와 튜플의 차이점은?', category: 'Python', type: 'essay', difficulty: 'easy', usageCount: 18 },
                { id: 4, question: 'AWS S3는 객체 스토리지 서비스이다.', category: 'AWS', type: 'truefalse', difficulty: 'easy', usageCount: 30 },
                { id: 5, question: '비동기 프로그래밍에서 Promise와 async/await의 관계를 설명하시오.', category: 'JavaScript', type: 'essay', difficulty: 'hard', usageCount: 8 }
            ]
        }
    },
    methods: {
        getAssignmentStatusClass(status) {
            return { '진행중': 'bg-primary', '채점중': 'bg-warning text-dark', '완료': 'bg-success' }[status] || 'bg-secondary';
        },
        getQuestionTypeText(type) {
            return { 'multiple': '객관식', 'short': '단답형', 'essay': '서술형', 'truefalse': 'O/X' }[type] || type;
        },
        getDifficultyClass(diff) {
            return { 'easy': 'bg-success', 'medium': 'bg-warning text-dark', 'hard': 'bg-danger' }[diff] || 'bg-secondary';
        },
        getDifficultyText(diff) {
            return { 'easy': '쉬움', 'medium': '보통', 'hard': '어려움' }[diff] || diff;
        },
        openCreateModal() { alert(`${this.activeTab === 'exams' ? '시험' : this.activeTab === 'assignments' ? '과제' : '문제'} 생성 모달은 추후 구현 예정입니다.`); },
        editExam(exam) { alert(`${exam.title} 수정 기능은 추후 구현 예정입니다.`); },
        viewResults(exam) { alert(`${exam.title} 결과 보기 기능은 추후 구현 예정입니다.`); },
        duplicateExam(exam) { alert('복사 기능은 추후 구현 예정입니다.'); },
        deleteExam(exam) { if (confirm('삭제하시겠습니까?')) alert('삭제되었습니다.'); },
        editAssignment(a) { alert(`${a.title} 수정 기능은 추후 구현 예정입니다.`); },
        gradeAssignment(a) { alert('채점 기능은 추후 구현 예정입니다.'); },
        viewSubmissions(a) { alert('제출물 보기 기능은 추후 구현 예정입니다.'); },
        deleteAssignment(a) { if (confirm('삭제하시겠습니까?')) alert('삭제되었습니다.'); },
        editQuestion(q) { alert('문제 수정 기능은 추후 구현 예정입니다.'); },
        previewQuestion(q) { alert('문제 미리보기 기능은 추후 구현 예정입니다.'); },
        deleteQuestion(q) { if (confirm('삭제하시겠습니까?')) alert('삭제되었습니다.'); }
    }
}
