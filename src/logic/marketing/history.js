export default {
    name: 'SendHistory',
    layout: 'admin',
    data() {
        return {
            searchQuery: '',
            filterChannel: '',
            filterStatus: '',
            history: [
                { id: 1, campaignName: '신규 강좌 출시 프로모션', channel: 'email', targetCount: 1250, sentCount: 1250, successCount: 1248, failCount: 2, openCount: 565, clickCount: 160, sentAt: '2024-01-15 10:15', status: 'completed' },
                { id: 2, campaignName: '학습 독려 메시지', channel: 'push', targetCount: 3420, sentCount: 3420, successCount: 3418, failCount: 2, openCount: 2136, clickCount: 1067, sentAt: '2024-01-14 09:05', status: 'completed' },
                { id: 3, campaignName: '주간 뉴스레터', channel: 'email', targetCount: 5230, sentCount: 5230, successCount: 5215, failCount: 15, openCount: 2008, clickCount: 481, sentAt: '2024-01-13 08:30', status: 'completed' },
                { id: 4, campaignName: '수강 완료 축하', channel: 'sms', targetCount: 145, sentCount: 145, successCount: 145, failCount: 0, openCount: 0, clickCount: 0, sentAt: '2024-01-12 14:20', status: 'completed' },
                { id: 5, campaignName: '월간 리포트', channel: 'email', targetCount: 892, sentCount: 450, successCount: 448, failCount: 2, openCount: 0, clickCount: 0, sentAt: '2024-01-16 10:00', status: 'sending' }
            ]
        }
    },
    computed: {
        filteredHistory() {
            let result = this.history;

            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                result = result.filter(h => h.campaignName.toLowerCase().includes(query));
            }

            if (this.filterChannel) {
                result = result.filter(h => h.channel === this.filterChannel);
            }

            if (this.filterStatus) {
                result = result.filter(h => h.status === this.filterStatus);
            }

            return result;
        }
    },
    methods: {
        getChannelIcon(channel) {
            const icons = { 'email': '📧', 'sms': '💬', 'kakao': '💛', 'push': '🔔' };
            return icons[channel] || '📨';
        },
        getChannelLabel(channel) {
            const labels = { 'email': '이메일', 'sms': 'SMS', 'kakao': '알림톡', 'push': '푸시' };
            return labels[channel] || channel;
        },
        getStatusBadgeClass(status) {
            const classes = { 'sending': 'bg-warning', 'completed': 'bg-success', 'failed': 'bg-danger' };
            return classes[status] || 'bg-secondary';
        },
        getStatusLabel(status) {
            const labels = { 'sending': '발송중', 'completed': '완료', 'failed': '실패' };
            return labels[status] || status;
        },
        viewDetail(item) {
            this.navigateTo('/marketing/history-detail', { id: item.id });
        },
        resetFilters() {
            this.searchQuery = '';
            this.filterChannel = '';
            this.filterStatus = '';
        }
    }
}
