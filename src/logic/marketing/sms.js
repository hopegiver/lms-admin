export default {
    name: 'SmsSending',
    layout: 'admin',
    data() {
        return {
            smsForm: {
                title: '',
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
            senderNumbers: [
                { number: '1588-0000', name: 'LMS 고객센터', status: 'active' },
                { number: '1588-0001', name: 'LMS 마케팅', status: 'active' },
                { number: '02-1234-5678', name: 'LMS 본사', status: 'active' }
            ],
            showNumberModal: false,
            newNumber: {
                number: '',
                name: ''
            },
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
        },
        previewMessage() {
            if (!this.smsForm.message) return '';
            // 변수 치환 예시
            let message = this.smsForm.message;
            message = message.replace(/\{\{이름\}\}/g, '홍길동');
            message = message.replace(/\{\{강좌명\}\}/g, 'Vue.js 마스터 클래스');
            message = message.replace(/\{\{진도율\}\}/g, '75');
            message = message.replace(/\{\{남은일수\}\}/g, '5');
            return message;
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
            if (this.messageType === 'LMS' && !this.smsForm.title) {
                alert('LMS는 제목이 필수입니다.');
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

            if (confirm(`${this.targetCount}명에게 ${this.messageType}를 발송하시겠습니까?\n\n발송 방식: ${scheduleInfo}\n예상 비용: ₩${this.estimatedCost.toLocaleString()}`)) {
                console.log('SMS 발송:', this.smsForm);
                alert(`${this.messageType}가 발송되었습니다.`);
                this.navigateTo('/marketing/history');
            }
        },
        openNumberModal() {
            this.showNumberModal = true;
        },
        closeNumberModal() {
            this.showNumberModal = false;
            this.newNumber = { number: '', name: '' };
        },
        addNumber() {
            if (!this.newNumber.number) {
                alert('발신번호를 입력해주세요.');
                return;
            }
            if (!this.newNumber.name) {
                alert('번호 이름을 입력해주세요.');
                return;
            }

            this.senderNumbers.push({
                number: this.newNumber.number,
                name: this.newNumber.name,
                status: 'pending'
            });

            alert('발신번호가 등록되었습니다. 통신사 승인 후 사용 가능합니다.');
            this.closeNumberModal();
        },
        deleteSelectedNumber() {
            const selectedNumber = this.senderNumbers.find(num => num.number === this.smsForm.senderNumber);
            if (!selectedNumber) return;

            if (confirm(`${selectedNumber.number} (${selectedNumber.name})을 삭제하시겠습니까?`)) {
                const index = this.senderNumbers.indexOf(selectedNumber);
                this.senderNumbers.splice(index, 1);

                // 삭제 후 첫 번째 활성 번호로 변경
                const activeNumbers = this.senderNumbers.filter(n => n.status === 'active');
                this.smsForm.senderNumber = activeNumbers.length > 0 ? activeNumbers[0].number : '';
            }
        }
    }
}
