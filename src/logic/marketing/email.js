export default {
    name: 'EmailSending',
    layout: 'admin',
    data() {
        return {
            step: 1,
            emailForm: {
                campaignName: '',
                senderName: '',
                senderEmail: '',
                replyTo: '',
                subject: '',
                content: '',
                targetType: 'all',
                targetGroups: [],
                targetUsers: [],
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
            ],
            previewMode: false
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
            } else if (this.emailForm.targetType === 'custom') {
                return this.emailForm.targetUsers.length;
            }
            return 0;
        },
        estimatedCost() {
            // 이메일 1건당 10원 가정
            return this.targetCount * 10;
        },
        canProceedToStep2() {
            return this.emailForm.campaignName &&
                   this.emailForm.senderName &&
                   this.emailForm.senderEmail &&
                   this.targetCount > 0;
        },
        canProceedToStep3() {
            return this.emailForm.subject && this.emailForm.content;
        }
    },
    methods: {
        nextStep() {
            if (this.step === 1 && !this.canProceedToStep2) {
                alert('필수 항목을 모두 입력해주세요.');
                return;
            }
            if (this.step === 2 && !this.canProceedToStep3) {
                alert('제목과 내용을 입력해주세요.');
                return;
            }
            this.step++;
        },
        prevStep() {
            this.step--;
        },
        togglePreview() {
            this.previewMode = !this.previewMode;
        },
        sendEmail() {
            const scheduleInfo = this.emailForm.scheduleType === 'now'
                ? '즉시 발송'
                : `예약 발송 (${this.emailForm.scheduleDate} ${this.emailForm.scheduleTime})`;

            if (confirm(`${this.targetCount}명에게 이메일을 발송하시겠습니까?\n\n발송 방식: ${scheduleInfo}\n예상 비용: ₩${this.estimatedCost.toLocaleString()}`)) {
                console.log('이메일 발송:', this.emailForm);
                alert('이메일이 발송되었습니다.');
                this.navigateTo('/marketing/campaigns');
            }
        },
        saveDraft() {
            console.log('임시 저장:', this.emailForm);
            alert('임시저장되었습니다.');
        },
        insertVariable(variable) {
            this.emailForm.content += `{{${variable}}}`;
        },
        getGroupName(groupId) {
            const group = this.availableGroups.find(g => g.id === groupId);
            return group ? group.name : '';
        }
    }
}
