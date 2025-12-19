export default {
    name: 'IntegrationSettings',
    layout: 'admin',
    data() {
        return {
            integrations: {
                googleAnalytics: {
                    enabled: true,
                    trackingId: 'G-XXXXXXXXXX'
                },
                facebookPixel: {
                    enabled: false,
                    pixelId: ''
                },
                slack: {
                    enabled: true,
                    webhookUrl: 'https://hooks.slack.com/services/xxx/yyy/zzz'
                },
                awsS3: {
                    enabled: true,
                    bucket: 'lms-media-bucket',
                    region: 'ap-northeast-2',
                    accessKey: '',
                    secretKey: ''
                },
                vimeo: {
                    enabled: false,
                    accessToken: ''
                },
                zoom: {
                    enabled: false,
                    clientId: '',
                    clientSecret: ''
                }
            }
        }
    },
    methods: {
        saveIntegration(name) {
            alert(`${name} 연동 설정이 저장되었습니다.`);
        },
        testSlack() {
            alert('테스트 메시지가 Slack으로 전송되었습니다.');
        }
    }
}
