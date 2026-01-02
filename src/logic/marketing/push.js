export default {
    name: 'PushNotification',
    layout: 'admin',
    data() {
        return {
            pushForm: {
                campaignName: '',
                title: '',
                message: '',
                url: '',
                imageUrl: '',
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
            if (this.pushForm.targetType === 'all') {
                return 5230;
            } else if (this.pushForm.targetType === 'groups') {
                return this.pushForm.targetGroups.reduce((sum, groupId) => {
                    const group = this.availableGroups.find(g => g.id === groupId);
                    return sum + (group ? group.count : 0);
                }, 0);
            }
            return 0;
        },
        estimatedCost() {
            return this.targetCount * 5; // 푸시 1건당 5원
        }
    },
    methods: {
        sendPush() {
            if (!this.pushForm.campaignName) {
                alert('캠페인명을 입력해주세요.');
                return;
            }
            if (!this.pushForm.title || !this.pushForm.message) {
                alert('제목과 메시지를 입력해주세요.');
                return;
            }
            if (this.targetCount === 0) {
                alert('발송 대상을 선택해주세요.');
                return;
            }

            const scheduleInfo = this.pushForm.scheduleType === 'now'
                ? '즉시 발송'
                : `예약 발송 (${this.pushForm.scheduleDate} ${this.pushForm.scheduleTime})`;

            if (confirm(`${this.targetCount}명에게 푸시 알림을 발송하시겠습니까?\n\n발송 방식: ${scheduleInfo}\n예상 비용: ₩${this.estimatedCost.toLocaleString()}`)) {
                console.log('푸시 발송:', this.pushForm);
                alert('푸시 알림이 발송되었습니다.');
                this.navigateTo('/marketing/campaigns');
            }
        },
        saveDraft() {
            console.log('임시 저장:', this.pushForm);
            alert('임시저장되었습니다.');
        }
    }
}
