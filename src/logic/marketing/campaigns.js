export default {
    name: 'Campaigns',
    layout: 'admin',
    data() {
        return {
            searchQuery: '',
            filterStatus: '',
            filterChannel: '',
            campaigns: [
                {
                    id: 1,
                    name: '신규 강좌 출시 프로모션',
                    channel: 'email',
                    status: 'completed',
                    targetCount: 1250,
                    sentCount: 1250,
                    openRate: 45.2,
                    clickRate: 12.8,
                    scheduledAt: '2024-01-15 10:00',
                    completedAt: '2024-01-15 10:15',
                    createdBy: '마케팅팀'
                },
                {
                    id: 2,
                    name: '학습 독려 메시지',
                    channel: 'push',
                    status: 'completed',
                    targetCount: 3420,
                    sentCount: 3420,
                    openRate: 62.5,
                    clickRate: 31.2,
                    scheduledAt: '2024-01-14 09:00',
                    completedAt: '2024-01-14 09:05',
                    createdBy: '운영팀'
                },
                {
                    id: 3,
                    name: '얼리버드 할인 안내',
                    channel: 'sms',
                    status: 'scheduled',
                    targetCount: 856,
                    sentCount: 0,
                    openRate: 0,
                    clickRate: 0,
                    scheduledAt: '2024-01-20 14:00',
                    completedAt: null,
                    createdBy: '마케팅팀'
                },
                {
                    id: 4,
                    name: '수료 축하 메시지',
                    channel: 'email',
                    status: 'draft',
                    targetCount: 0,
                    sentCount: 0,
                    openRate: 0,
                    clickRate: 0,
                    scheduledAt: null,
                    completedAt: null,
                    createdBy: '운영팀'
                },
                {
                    id: 5,
                    name: '월간 뉴스레터',
                    channel: 'email',
                    status: 'sending',
                    targetCount: 5230,
                    sentCount: 3120,
                    openRate: 38.5,
                    clickRate: 9.2,
                    scheduledAt: '2024-01-16 08:00',
                    completedAt: null,
                    createdBy: '마케팅팀'
                }
            ]
        }
    },
    computed: {
        filteredCampaigns() {
            let result = this.campaigns;

            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                result = result.filter(c =>
                    c.name.toLowerCase().includes(query) ||
                    c.createdBy.toLowerCase().includes(query)
                );
            }

            if (this.filterStatus) {
                result = result.filter(c => c.status === this.filterStatus);
            }

            if (this.filterChannel) {
                result = result.filter(c => c.channel === this.filterChannel);
            }

            return result;
        },
        stats() {
            return {
                total: this.campaigns.length,
                draft: this.campaigns.filter(c => c.status === 'draft').length,
                scheduled: this.campaigns.filter(c => c.status === 'scheduled').length,
                sending: this.campaigns.filter(c => c.status === 'sending').length,
                completed: this.campaigns.filter(c => c.status === 'completed').length
            };
        }
    },
    methods: {
        getChannelIcon(channel) {
            const icons = {
                'email': '📧',
                'sms': '💬',
                'push': '🔔'
            };
            return icons[channel] || '📨';
        },
        getChannelLabel(channel) {
            const labels = {
                'email': '이메일',
                'sms': 'SMS',
                'push': '푸시'
            };
            return labels[channel] || channel;
        },
        getStatusBadgeClass(status) {
            const classes = {
                'draft': 'bg-secondary',
                'scheduled': 'bg-info',
                'sending': 'bg-warning',
                'completed': 'bg-success',
                'failed': 'bg-danger'
            };
            return classes[status] || 'bg-secondary';
        },
        getStatusLabel(status) {
            const labels = {
                'draft': '임시저장',
                'scheduled': '예약됨',
                'sending': '발송중',
                'completed': '완료',
                'failed': '실패'
            };
            return labels[status] || status;
        },
        createCampaign() {
            this.navigateTo('/marketing/campaigns-create');
        },
        viewDetail(campaign) {
            this.navigateTo('/marketing/campaigns-detail', { id: campaign.id });
        },
        duplicateCampaign(campaign) {
            if (confirm(`"${campaign.name}" 캠페인을 복제하시겠습니까?`)) {
                alert('캠페인이 복제되었습니다.');
            }
        },
        deleteCampaign(campaign) {
            if (confirm(`"${campaign.name}" 캠페인을 삭제하시겠습니까?`)) {
                const index = this.campaigns.indexOf(campaign);
                this.campaigns.splice(index, 1);
            }
        },
        resetFilters() {
            this.searchQuery = '';
            this.filterStatus = '';
            this.filterChannel = '';
        }
    }
}
