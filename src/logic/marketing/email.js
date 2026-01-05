export default {
    name: 'EmailSending',
    layout: 'admin',
    data() {
        return {
            emailForm: {
                subject: '',
                senderName: 'LMS',
                senderEmail: 'noreply@lms.com',
                replyTo: '',
                content: '',
                targetType: 'all',
                targetGroups: [],
                scheduleType: 'now',
                scheduleDate: '',
                scheduleTime: ''
            },
            availableGroups: [
                { id: 1, name: '전체 학습자', count: 5230 },
                { id: 2, name: 'VIP 회원', count: 245 },
                { id: 3, name: '신규 가입자 (7일 이내)', count: 128 },
                { id: 4, name: '휴면 회원 (30일 미접속)', count: 892 },
                { id: 5, name: '수강 완료자', count: 1456 },
                { id: 6, name: '기업 회원', count: 678 }
            ]
        }
    },
    computed: {
        targetCount() {
            if (this.emailForm.targetType === 'all') {
                return 5230;
            } else if (this.emailForm.targetType === 'groups') {
                return this.emailForm.targetGroups.reduce((sum, groupId) => {
                    const group = this.availableGroups.find(g => g.id === groupId);
                    return sum + (group ? group.count : 0);
                }, 0);
            }
            return 0;
        },
        estimatedCost() {
            return this.targetCount * 10; // 이메일 1건당 10원
        },
        previewContent() {
            if (!this.emailForm.content) return '';
            // 변수 치환 예시
            let content = this.emailForm.content;
            content = content.replace(/\{\{이름\}\}/g, '홍길동');
            content = content.replace(/\{\{이메일\}\}/g, 'hong@example.com');
            content = content.replace(/\{\{강좌명\}\}/g, 'Vue.js 마스터 클래스');
            content = content.replace(/\{\{진도율\}\}/g, '75');
            return content;
        }
    },
    methods: {
        sendEmail() {
            if (!this.emailForm.subject) {
                alert('제목을 입력해주세요.');
                return;
            }
            if (!this.emailForm.content) {
                alert('내용을 입력해주세요.');
                return;
            }
            if (this.targetCount === 0) {
                alert('발송 대상을 선택해주세요.');
                return;
            }

            const scheduleInfo = this.emailForm.scheduleType === 'now'
                ? '즉시 발송'
                : `예약 발송 (${this.emailForm.scheduleDate} ${this.emailForm.scheduleTime})`;

            if (confirm(`${this.targetCount}명에게 이메일을 발송하시겠습니까?\n\n발송 방식: ${scheduleInfo}\n예상 비용: ₩${this.estimatedCost.toLocaleString()}`)) {
                console.log('이메일 발송:', this.emailForm);
                alert('이메일이 발송되었습니다.');
                this.navigateTo('/marketing/history');
            }
        },
        insertVariable(variable) {
            this.emailForm.content += `{{${variable}}}`;
        }
    }
}
