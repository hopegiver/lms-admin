export default {
    name: 'GeneralSettings',
    layout: 'admin',
    data() {
        return {
            settings: {
                siteName: 'LMS Platform',
                siteUrl: 'https://lms.example.com',
                siteDescription: '전문가와 함께하는 온라인 학습 플랫폼',
                companyName: '주식회사 LMS',
                ceoName: '홍길동',
                businessNumber: '123-45-67890',
                salesNumber: '2024-서울강남-1234',
                address: '서울특별시 강남구 테헤란로 123, 4층',
                email: 'support@lms.example.com',
                phone: '02-1234-5678',
                supportHours: '평일 09:00 ~ 18:00',
                kakaoId: '@lms_support',
                defaultLanguage: 'ko',
                timezone: 'Asia/Seoul',
                dateFormat: 'YYYY-MM-DD',
                currency: 'KRW',
                isActive: true,
                allowSignup: true,
                maintenanceMode: false,
                lastSaved: '2024-12-19 14:30'
            }
        }
    },
    methods: {
        saveSettings() {
            this.settings.lastSaved = new Date().toLocaleString('ko-KR');
            alert('설정이 저장되었습니다.');
        }
    }
}
