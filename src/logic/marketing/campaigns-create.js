export default {
    name: 'CampaignCreate',
    layout: 'admin',
    data() {
        return {
            campaign: {
                name: '',
                description: '',
                channel: 'email',
                scheduleType: 'now',
                scheduleDate: '',
                scheduleTime: ''
            }
        }
    },
    methods: {
        saveCampaign() {
            if (!this.campaign.name) {
                alert('캠페인명을 입력해주세요.');
                return;
            }

            if (!this.campaign.channel) {
                alert('발송 채널을 선택해주세요.');
                return;
            }

            // 채널에 따라 해당 발송 페이지로 이동
            const channelRoutes = {
                'email': '/marketing/email',
                'sms': '/marketing/sms',
                'kakao': '/marketing/kakao',
                'push': '/marketing/push'
            };

            const route = channelRoutes[this.campaign.channel];
            if (route) {
                // 캠페인 정보를 세션에 저장하고 발송 페이지로 이동
                console.log('캠페인 생성:', this.campaign);
                this.navigateTo(route);
            }
        },
        cancel() {
            if (confirm('작성중인 내용이 사라집니다. 취소하시겠습니까?')) {
                this.navigateTo('/marketing/campaigns');
            }
        },
        getChannelIcon(channel) {
            const icons = {
                'email': '📧',
                'sms': '💬',
                'kakao': '💛',
                'push': '🔔'
            };
            return icons[channel] || '📨';
        },
        getChannelName(channel) {
            const names = {
                'email': '이메일',
                'sms': 'SMS',
                'kakao': '알림톡',
                'push': '푸시'
            };
            return names[channel] || channel;
        }
    }
}
