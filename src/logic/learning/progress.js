export default {
    name: 'Progress',
    layout: 'admin',
    data() {
        return {
            activeTab: 'progress',
            searchQuery: '',
            filters: { course: '', progressRange: '', date: '', completionStatus: '' },
            courseList: ['React 완벽 가이드', 'Python 데이터 분석', 'JavaScript ES6+', 'AWS 클라우드 입문'],
            progressList: [
                { id: 1, learner: '홍길동', email: 'hong@example.com', course: 'React 완벽 가이드', progress: 75, completedLessons: 34, totalLessons: 45, studyTime: '8시간 30분', lastStudyDate: '2024-12-19' },
                { id: 2, learner: '김철수', email: 'kim@example.com', course: 'Python 데이터 분석', progress: 100, completedLessons: 38, totalLessons: 38, studyTime: '12시간', lastStudyDate: '2024-12-18' },
                { id: 3, learner: '이영희', email: 'lee@example.com', course: 'JavaScript ES6+', progress: 45, completedLessons: 14, totalLessons: 32, studyTime: '4시간', lastStudyDate: '2024-12-17' },
                { id: 4, learner: '박민수', email: 'park@example.com', course: 'AWS 클라우드 입문', progress: 20, completedLessons: 6, totalLessons: 28, studyTime: '2시간', lastStudyDate: '2024-12-10' }
            ],
            gradeList: [
                { id: 1, learner: '홍길동', course: 'React 완벽 가이드', examScore: 85, assignmentScore: 90, attendanceScore: 95, totalScore: 88, grade: 'A' },
                { id: 2, learner: '김철수', course: 'Python 데이터 분석', examScore: 92, assignmentScore: 88, attendanceScore: 100, totalScore: 92, grade: 'A+' },
                { id: 3, learner: '이영희', course: 'JavaScript ES6+', examScore: 70, assignmentScore: 75, attendanceScore: 80, totalScore: 73, grade: 'B' },
                { id: 4, learner: '박민수', course: 'AWS 클라우드 입문', examScore: 55, assignmentScore: 60, attendanceScore: 70, totalScore: 58, grade: 'C' }
            ],
            attendanceList: [
                { id: 1, learner: '홍길동', course: 'React 완벽 가이드', present: 28, late: 2, absent: 0, rate: 97 },
                { id: 2, learner: '김철수', course: 'Python 데이터 분석', present: 30, late: 0, absent: 0, rate: 100 },
                { id: 3, learner: '이영희', course: 'JavaScript ES6+', present: 20, late: 5, absent: 3, rate: 80 },
                { id: 4, learner: '박민수', course: 'AWS 클라우드 입문', present: 15, late: 3, absent: 5, rate: 70 }
            ],
            completionList: [
                { id: 1, learner: '홍길동', course: 'React 완벽 가이드', progress: 100, totalScore: 88, status: 'completed', completionDate: '2024-12-15' },
                { id: 2, learner: '김철수', course: 'Python 데이터 분석', progress: 100, totalScore: 92, status: 'completed', completionDate: '2024-12-18' },
                { id: 3, learner: '이영희', course: 'JavaScript ES6+', progress: 85, totalScore: 73, status: 'pending', completionDate: null },
                { id: 4, learner: '박민수', course: 'AWS 클라우드 입문', progress: 45, totalScore: 58, status: 'failed', completionDate: null }
            ]
        }
    },
    methods: {
        getProgressColor(progress) {
            if (progress >= 75) return 'bg-success';
            if (progress >= 50) return 'bg-primary';
            if (progress >= 25) return 'bg-warning';
            return 'bg-danger';
        },
        getGradeClass(grade) {
            if (grade.includes('A')) return 'bg-success';
            if (grade === 'B') return 'bg-primary';
            if (grade === 'C') return 'bg-warning text-dark';
            return 'bg-danger';
        },
        getCompletionClass(status) {
            return { 'completed': 'bg-success', 'pending': 'bg-warning text-dark', 'failed': 'bg-danger' }[status] || 'bg-secondary';
        },
        getCompletionText(status) {
            return { 'completed': '수료', 'pending': '수료 예정', 'failed': '미수료' }[status] || status;
        },
        viewDetail(item) {
            this.navigateTo('/learning/progress-detail', {id: item.id});
        },
        editAttendance(att) { alert(`${att.learner}의 출석 수정 기능은 추후 구현 예정입니다.`); },
        issueCertificate(comp) { alert(`${comp.learner}의 수료증 발급 기능은 추후 구현 예정입니다.`); },
        exportReport() { alert('리포트 내보내기 기능은 추후 구현 예정입니다.'); }
    }
}
