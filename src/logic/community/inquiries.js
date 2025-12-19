export default {
    name: 'Inquiries',
    layout: 'admin',
    data() {
        return {
            searchQuery: '',
            replyContent: '',
            filters: { status: '', category: '', priority: '' },
            selectedInquiry: null,
            stats: {
                total: 234,
                pending: 12,
                today: 8,
                avgResponseTime: '2.5시간'
            },
            inquiries: [
                { id: 1, title: '결제 오류가 발생했습니다', preview: '강좌 구매 중 결제가 완료되지 않았는데 금액이 빠져나갔습니다...', category: 'payment', author: '김학습', email: 'kim@email.com', priority: 'high', status: 'pending', createdAt: '2024-12-19 14:32', content: '강좌 구매 중 결제가 완료되지 않았는데 금액이 빠져나갔습니다. 확인 부탁드립니다. 결제 시도 시간: 14:25', reply: null, replyDate: null },
                { id: 2, title: '강좌 재생이 안됩니다', preview: 'React 강좌 3번 영상이 재생되지 않습니다...', category: 'tech', author: '이개발', email: 'lee@email.com', priority: 'high', status: 'pending', createdAt: '2024-12-19 13:15', content: 'React 강좌 3번 영상이 재생되지 않습니다. 다른 영상은 잘 되는데 3번만 안됩니다.', reply: null, replyDate: null },
                { id: 3, title: '환불 요청드립니다', preview: '강좌가 생각했던 내용과 달라서 환불을 요청드립니다...', category: 'payment', author: '박환불', email: 'park@email.com', priority: 'normal', status: 'answered', createdAt: '2024-12-19 11:45', content: '강좌가 생각했던 내용과 달라서 환불을 요청드립니다. 아직 10% 밖에 수강하지 않았습니다.', reply: '안녕하세요. 환불 규정에 따라 처리해드리겠습니다. 3-5영업일 내 환불 완료됩니다.', replyDate: '2024-12-19 12:30' },
                { id: 4, title: '비밀번호 변경이 안됩니다', preview: '비밀번호 변경 시 오류가 발생합니다...', category: 'account', author: '최계정', email: 'choi@email.com', priority: 'normal', status: 'pending', createdAt: '2024-12-19 10:20', content: '비밀번호 변경 시 "잘못된 요청입니다" 오류가 발생합니다.', reply: null, replyDate: null },
                { id: 5, title: '수강 기간 연장 문의', preview: '수강 기간이 곧 만료되는데 연장이 가능한가요?', category: 'course', author: '정연장', email: 'jung@email.com', priority: 'low', status: 'answered', createdAt: '2024-12-18 16:45', content: '수강 기간이 곧 만료되는데 연장이 가능한가요? 아직 50%밖에 수강하지 못했습니다.', reply: '안녕하세요. 특별히 30일 연장해드렸습니다. 즐거운 학습 되세요!', replyDate: '2024-12-18 17:30' },
                { id: 6, title: '영수증 발급 요청', preview: '연말정산을 위해 영수증 발급이 필요합니다...', category: 'etc', author: '한영수', email: 'han@email.com', priority: 'low', status: 'closed', createdAt: '2024-12-18 09:30', content: '연말정산을 위해 영수증 발급이 필요합니다. PDF로 발급 부탁드립니다.', reply: '영수증을 이메일로 발송해드렸습니다. 확인 부탁드립니다.', replyDate: '2024-12-18 10:15' }
            ]
        }
    },
    methods: {
        getPriorityBadgeClass(priority) {
            return { 'high': 'bg-danger', 'normal': 'bg-warning', 'low': 'bg-secondary' }[priority] || 'bg-secondary';
        },
        getPriorityText(priority) {
            return { 'high': '긴급', 'normal': '일반', 'low': '낮음' }[priority] || priority;
        },
        getStatusBadgeClass(status) {
            return { 'pending': 'bg-warning', 'answered': 'bg-success', 'closed': 'bg-secondary' }[status] || 'bg-secondary';
        },
        getStatusText(status) {
            return { 'pending': '답변대기', 'answered': '답변완료', 'closed': '종료' }[status] || status;
        },
        getCategoryText(category) {
            return { 'payment': '결제/환불', 'course': '강좌문의', 'tech': '기술지원', 'account': '계정문의', 'etc': '기타' }[category] || category;
        },
        resetFilters() {
            this.filters = { status: '', category: '', priority: '' };
            this.searchQuery = '';
        },
        openInquiryDetail(inquiry) {
            this.selectedInquiry = inquiry;
            this.replyContent = '';
            const offcanvas = new bootstrap.Offcanvas(document.getElementById('inquiryDetailPanel'));
            offcanvas.show();
        },
        replyInquiry(inquiry) {
            this.openInquiryDetail(inquiry);
        },
        submitReply() {
            if (this.replyContent.trim()) {
                this.selectedInquiry.reply = this.replyContent;
                this.selectedInquiry.replyDate = new Date().toLocaleString('ko-KR');
                this.selectedInquiry.status = 'answered';
                alert('답변이 등록되었습니다.');
            }
        },
        closeInquiry(inquiry) {
            if (confirm('문의를 종료하시겠습니까?')) {
                inquiry.status = 'closed';
            }
        },
        exportInquiries() {
            alert('내보내기 기능은 추후 구현 예정입니다.');
        }
    }
}
