export default {
    name: 'CampaignDetail',
    layout: 'admin',
    data() {
        return {
            campaignId: null,
            campaign: null,
            loading: true,
            showDeleteModal: false,
            // 샘플 데이터 - 실제로는 API에서 가져옴
            sampleCampaigns: [
                {
                    id: 1,
                    name: '신규 강좌 출시 프로모션',
                    description: '2024년 1분기 신규 강좌 런칭 프로모션 캠페인',
                    channel: 'email',
                    status: 'completed',
                    targetType: 'groups',
                    targetGroups: ['VIP 회원', '신규 가입자'],
                    targetCount: 1250,
                    sentCount: 1250,
                    successCount: 1220,
                    failCount: 30,
                    openCount: 551,
                    clickCount: 156,
                    openRate: 45.2,
                    clickRate: 12.8,
                    content: {
                        subject: '[LMS] 2024 신규 강좌 특별 할인!',
                        senderName: 'LMS 마케팅팀',
                        senderEmail: 'marketing@lms.com',
                        body: '안녕하세요 {{이름}}님,\n\n2024년 신규 강좌가 출시되었습니다...'
                    },
                    scheduleType: 'schedule',
                    scheduledAt: '2024-01-15 10:00',
                    startedAt: '2024-01-15 10:00',
                    completedAt: '2024-01-15 10:15',
                    createdAt: '2024-01-14 15:30',
                    createdBy: '마케팅팀',
                    estimatedCost: 12500,
                    actualCost: 12200
                },
                {
                    id: 2,
                    name: '학습 독려 SMS',
                    description: '7일 이상 미접속 학습자 대상 학습 독려',
                    channel: 'sms',
                    status: 'sending',
                    targetType: 'groups',
                    targetGroups: ['휴면 회원 (30일 미접속)'],
                    targetCount: 892,
                    sentCount: 456,
                    successCount: 450,
                    failCount: 6,
                    openCount: 0,
                    clickCount: 0,
                    openRate: 0,
                    clickRate: 0,
                    content: {
                        message: '[LMS] {{이름}}님, 학습을 계속하세요! 진도율: {{진도율}}%'
                    },
                    scheduleType: 'now',
                    scheduledAt: null,
                    startedAt: '2024-01-16 14:30',
                    completedAt: null,
                    createdAt: '2024-01-16 14:25',
                    createdBy: '운영팀',
                    estimatedCost: 17840,
                    actualCost: 9120
                },
                {
                    id: 3,
                    name: '이벤트 참여 알림톡',
                    description: '2024 봄 학습 이벤트 참여 안내',
                    channel: 'kakao',
                    status: 'scheduled',
                    targetType: 'all',
                    targetGroups: [],
                    targetCount: 5230,
                    sentCount: 0,
                    successCount: 0,
                    failCount: 0,
                    openCount: 0,
                    clickCount: 0,
                    openRate: 0,
                    clickRate: 0,
                    content: {
                        templateCode: 'EVENT_INVITE',
                        templateName: '이벤트 초대',
                        variables: {
                            '이름': '홍길동',
                            '이벤트명': '2024 봄 학습 페스티벌',
                            '일시': '2024년 3월 1일 14:00',
                            '장소': '온라인 (ZOOM)'
                        }
                    },
                    scheduleType: 'schedule',
                    scheduledAt: '2024-02-28 09:00',
                    startedAt: null,
                    completedAt: null,
                    createdAt: '2024-01-16 11:20',
                    createdBy: '마케팅팀',
                    estimatedCost: 62760,
                    actualCost: 0
                }
            ],
            activityLog: []
        }
    },
    computed: {
        channelInfo() {
            const channels = {
                'email': { icon: '📧', name: '이메일', color: 'primary' },
                'sms': { icon: '💬', name: 'SMS', color: 'success' },
                'kakao': { icon: '💛', name: '알림톡', color: 'warning' },
                'push': { icon: '🔔', name: '푸시 알림', color: 'info' }
            };
            return channels[this.campaign?.channel] || channels['email'];
        },
        statusInfo() {
            const statuses = {
                'scheduled': { badge: 'bg-secondary', label: '예약됨', actions: ['pause', 'edit', 'delete'] },
                'sending': { badge: 'bg-primary', label: '발송중', actions: ['pause'] },
                'paused': { badge: 'bg-warning', label: '일시중지', actions: ['resume', 'delete'] },
                'completed': { badge: 'bg-success', label: '완료', actions: ['duplicate'] },
                'failed': { badge: 'bg-danger', label: '실패', actions: ['retry', 'delete'] }
            };
            return statuses[this.campaign?.status] || statuses['scheduled'];
        },
        progressPercentage() {
            if (!this.campaign || this.campaign.targetCount === 0) return 0;
            return Math.round((this.campaign.sentCount / this.campaign.targetCount) * 100);
        },
        successRate() {
            if (!this.campaign || this.campaign.sentCount === 0) return 0;
            return ((this.campaign.successCount / this.campaign.sentCount) * 100).toFixed(1);
        }
    },
    mounted() {
        // URL에서 캠페인 ID 가져오기 (실제로는 라우터에서 전달받음)
        this.campaignId = 1; // 예시로 1번 캠페인 로드
        this.loadCampaign();
    },
    methods: {
        loadCampaign() {
            this.loading = true;

            // 실제로는 API 호출
            setTimeout(() => {
                this.campaign = this.sampleCampaigns.find(c => c.id === this.campaignId);

                if (this.campaign) {
                    this.generateActivityLog();
                }

                this.loading = false;
            }, 500);
        },
        generateActivityLog() {
            this.activityLog = [];

            if (this.campaign.createdAt) {
                this.activityLog.push({
                    time: this.campaign.createdAt,
                    type: 'created',
                    message: `캠페인이 생성되었습니다. (작성자: ${this.campaign.createdBy})`
                });
            }

            if (this.campaign.scheduledAt && this.campaign.scheduleType === 'schedule') {
                this.activityLog.push({
                    time: this.campaign.scheduledAt,
                    type: 'scheduled',
                    message: `발송이 예약되었습니다.`
                });
            }

            if (this.campaign.startedAt) {
                this.activityLog.push({
                    time: this.campaign.startedAt,
                    type: 'started',
                    message: `발송이 시작되었습니다.`
                });
            }

            if (this.campaign.status === 'sending' && this.campaign.sentCount > 0) {
                this.activityLog.push({
                    time: new Date().toISOString().slice(0, 16).replace('T', ' '),
                    type: 'progress',
                    message: `${this.campaign.sentCount}/${this.campaign.targetCount}명에게 발송 완료 (${this.progressPercentage}%)`
                });
            }

            if (this.campaign.completedAt) {
                this.activityLog.push({
                    time: this.campaign.completedAt,
                    type: 'completed',
                    message: `발송이 완료되었습니다. (성공: ${this.campaign.successCount}, 실패: ${this.campaign.failCount})`
                });
            }

            // 최신순 정렬
            this.activityLog.sort((a, b) => new Date(b.time) - new Date(a.time));
        },
        canPerformAction(action) {
            return this.statusInfo.actions.includes(action);
        },
        pauseCampaign() {
            if (confirm('캠페인 발송을 일시중지하시겠습니까?')) {
                console.log('캠페인 일시중지:', this.campaignId);
                alert('캠페인이 일시중지되었습니다.');
                this.campaign.status = 'paused';
            }
        },
        resumeCampaign() {
            if (confirm('캠페인 발송을 재개하시겠습니까?')) {
                console.log('캠페인 재개:', this.campaignId);
                alert('캠페인 발송이 재개되었습니다.');
                this.campaign.status = 'sending';
            }
        },
        editCampaign() {
            // 캠페인 수정 페이지로 이동
            this.navigateTo(`/marketing/campaigns-edit?id=${this.campaignId}`);
        },
        duplicateCampaign() {
            if (confirm('이 캠페인을 복사하시겠습니까?')) {
                console.log('캠페인 복사:', this.campaignId);
                alert('캠페인이 복사되었습니다.');
                this.navigateTo('/marketing/campaigns');
            }
        },
        retryCampaign() {
            if (confirm('실패한 발송을 재시도하시겠습니까?')) {
                console.log('캠페인 재시도:', this.campaignId);
                alert('발송을 재시도합니다.');
                this.campaign.status = 'sending';
            }
        },
        confirmDelete() {
            this.showDeleteModal = true;
        },
        deleteCampaign() {
            console.log('캠페인 삭제:', this.campaignId);
            alert('캠페인이 삭제되었습니다.');
            this.showDeleteModal = false;
            this.navigateTo('/marketing/campaigns');
        },
        goBack() {
            this.navigateTo('/marketing/campaigns');
        },
        getActivityIcon(type) {
            const icons = {
                'created': '✨',
                'scheduled': '⏰',
                'started': '🚀',
                'progress': '📊',
                'completed': '✅',
                'paused': '⏸️',
                'resumed': '▶️',
                'failed': '❌'
            };
            return icons[type] || '📝';
        }
    }
}
