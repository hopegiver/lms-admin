export default {
    name: 'NotificationSettings',
    layout: 'admin',
    data() {
        return {
            settings: {
                emailEnabled: true,
                smsEnabled: true,
                pushEnabled: true,
                emailFromName: 'LMS Platform',
                emailFrom: 'noreply@lms.example.com',
                smtpHost: 'smtp.example.com',
                smtpPort: 587,
                smtpSecurity: 'tls',
                smtpUser: 'smtp_user',
                smtpPassword: '',
                smsProvider: 'aligo',
                smsFrom: '02-1234-5678',
                smsApiKey: '',
                smsApiSecret: ''
            },
            templates: [
                { id: 1, type: '회원가입', title: '회원가입을 환영합니다', email: true, sms: false, push: true },
                { id: 2, type: '결제완료', title: '결제가 완료되었습니다', email: true, sms: true, push: true },
                { id: 3, type: '수강시작', title: '수강이 시작되었습니다', email: true, sms: false, push: true },
                { id: 4, type: '수료안내', title: '축하합니다! 강좌를 수료하셨습니다', email: true, sms: false, push: true },
                { id: 5, type: '만료예정', title: '수강 기간이 곧 만료됩니다', email: true, sms: true, push: true },
                { id: 6, type: '환불완료', title: '환불이 완료되었습니다', email: true, sms: true, push: false },
                { id: 7, type: '비밀번호 재설정', title: '비밀번호 재설정 안내', email: true, sms: false, push: false },
                { id: 8, type: '문의답변', title: '문의하신 내용에 답변이 등록되었습니다', email: true, sms: false, push: true }
            ]
        }
    },
    methods: {
        saveSettings() {
            alert('알림 설정이 저장되었습니다.');
        },
        testEmail() {
            alert('테스트 이메일이 발송되었습니다.');
        },
        testSMS() {
            alert('테스트 SMS가 발송되었습니다.');
        },
        addTemplate() {
            alert('템플릿 추가 기능은 추후 구현 예정입니다.');
        },
        editTemplate(template) {
            alert(`${template.title} 템플릿 편집 기능은 추후 구현 예정입니다.`);
        }
    }
}
