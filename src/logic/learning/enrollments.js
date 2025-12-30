export default {
    name: 'Enrollments',
    layout: 'admin',
    data() {
        return {
            activeTab: 'pending',
            searchQuery: '',
            filters: { course: '', status: '' },
            stats: { pending: 5, active: 1250, completed: 890, expired: 45 },
            courseList: ['React 완벽 가이드', 'Python 데이터 분석', 'JavaScript ES6+', 'AWS 클라우드 입문'],
            pendingRequests: [
                { id: 1, learner: '홍길동', email: 'hong@example.com', course: 'React 완벽 가이드', requestDate: '2024-12-19', paid: true },
                { id: 2, learner: '김철수', email: 'kim@example.com', course: 'Python 데이터 분석', requestDate: '2024-12-19', paid: true },
                { id: 3, learner: '이영희', email: 'lee@example.com', course: 'JavaScript ES6+', requestDate: '2024-12-18', paid: false },
                { id: 4, learner: '박민수', email: 'park@example.com', course: 'AWS 클라우드 입문', requestDate: '2024-12-18', paid: true },
                { id: 5, learner: '정수진', email: 'jung@example.com', course: 'React 완벽 가이드', requestDate: '2024-12-17', paid: false }
            ],
            enrollments: [
                { id: 1, learner: '홍길동', email: 'hong@example.com', course: 'React 완벽 가이드', progress: 75, startDate: '2024-11-01', endDate: '2025-01-31', status: 'active' },
                { id: 2, learner: '김철수', email: 'kim@example.com', course: 'Python 데이터 분석', progress: 100, startDate: '2024-10-15', endDate: '2024-12-15', status: 'completed' },
                { id: 3, learner: '이영희', email: 'lee@example.com', course: 'JavaScript ES6+', progress: 45, startDate: '2024-11-20', endDate: '2025-02-20', status: 'active' },
                { id: 4, learner: '박민수', email: 'park@example.com', course: 'AWS 클라우드 입문', progress: 30, startDate: '2024-09-01', endDate: '2024-11-30', status: 'expired' }
            ],
            vouchers: [
                { id: 1, code: 'REACT-2024-001', course: 'React 완벽 가이드', duration: '90일', issuedDate: '2024-12-01', expiryDate: '2024-12-31', used: false },
                { id: 2, code: 'PYTHON-2024-002', course: 'Python 데이터 분석', duration: '60일', issuedDate: '2024-12-01', expiryDate: '2024-12-31', used: true },
                { id: 3, code: 'JS-2024-003', course: 'JavaScript ES6+', duration: '90일', issuedDate: '2024-12-10', expiryDate: '2025-01-10', used: false }
            ]
        }
    },
    methods: {
        getEnrollStatusClass(status) {
            return { 'active': 'bg-primary', 'completed': 'bg-success', 'expired': 'bg-danger' }[status] || 'bg-secondary';
        },
        getEnrollStatusText(status) {
            return { 'active': '수강중', 'completed': '수료', 'expired': '만료' }[status] || status;
        },
        approve(req) { alert(`${req.learner}의 수강 신청을 승인합니다.`); },
        reject(req) { if (confirm(`${req.learner}의 수강 신청을 거절하시겠습니까?`)) alert('거절 처리되었습니다.'); },
        viewDetail(item) {
            this.navigateTo('/learning/enrollments-detail', {id: item.id});
        },
        openAssignModal() {
            this.navigateTo('/learning/enrollments-create');
        },
        openBulkAssign() { alert('일괄 배정 기능은 추후 구현 예정입니다.'); },
        extendPeriod(enroll) { alert(`${enroll.learner}의 수강 기간 연장 기능은 추후 구현 예정입니다.`); },
        resetProgress(enroll) { if (confirm('진도를 초기화하시겠습니까?')) alert('초기화되었습니다.'); },
        cancelEnroll(enroll) { if (confirm('수강을 취소하시겠습니까?')) alert('취소되었습니다.'); },
        createVoucher() { alert('수강권 발급 기능은 추후 구현 예정입니다.'); },
        deleteVoucher(voucher) { if (confirm('수강권을 삭제하시겠습니까?')) alert('삭제되었습니다.'); }
    }
}
