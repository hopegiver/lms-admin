export default {
    name: 'SmsSending',
    layout: 'admin',
    data() {
        return {
            smsForm: {
                campaignName: '',
                senderNumber: '1588-0000',
                message: '',
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
            ],
            messageLength: 0,
            messageByte: 0,
            messageType: 'SMS'
        }
    },
    computed: {
        targetCount() {
            if (this.smsForm.targetType === 'all') {
                return 5230;
            } else if (this.smsForm.targetType === 'groups') {
                return this.smsForm.targetGroups.reduce((sum, groupId) => {
                    const group = this.availableGroups.find(g => g.id === groupId);
                    return sum + (group ? group.count : 0);
                }, 0);
            }
            return 0;
        },
        estimatedCost() {
            const costPerSms = this.messageType === 'LMS' ? 30 : 20;
            return this.targetCount * costPerSms;
        },
        maxLength() {
            return this.messageType === 'LMS' ? 2000 : 90;
        }
    },
    watch: {
        'smsForm.message'(newVal) {
            this.messageLength = newVal.length;
            this.messageByte = this.calculateByte(newVal);

            if (this.messageByte > 90) {
                this.messageType = 'LMS';
            } else {
                this.messageType = 'SMS';
            }
        }
    },
    methods: {
        calculateByte(str) {
            let byte = 0;
            for (let i = 0; i < str.length; i++) {
                byte += str.charCodeAt(i) > 127 ? 2 : 1;
            }
            return byte;
        },
        insertVariable(variable) {
            this.smsForm.message += `{{${variable}}}`;
        },
        sendSms() {
            if (!this.smsForm.campaignName) {
                alert('캠페인명을 입력해주세요.');
                return;
            }
            if (!this.smsForm.message) {
                alert('메시지를 입력해주세요.');
                return;
            }
            if (this.targetCount === 0) {
                alert('발송 대상을 선택해주세요.');
                return;
            }

            const scheduleInfo = this.smsForm.scheduleType === 'now'
                ? '즉시 발송'
                : `예약 발송 (${this.smsForm.scheduleDate} ${this.smsForm.scheduleTime})`;

            if (confirm(`${this.targetCount}명에게 SMS를 발송하시겠습니까?\n\n발송 방식: ${scheduleInfo}\n메시지 타입: ${this.messageType}\n예상 비용: ₩${this.estimatedCost.toLocaleString()}`)) {
                console.log('SMS 발송:', this.smsForm);
                alert('SMS가 발송되었습니다.');
                this.navigateTo('/marketing/campaigns');
            }
        },
        saveDraft() {
            console.log('임시 저장:', this.smsForm);
            alert('임시저장되었습니다.');
        },
        getGroupName(groupId) {
            const group = this.availableGroups.find(g => g.id === groupId);
            return group ? group.name : '';
        }
    }
}
