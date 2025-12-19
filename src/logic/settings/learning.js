export default {
    name: 'LearningSettings',
    layout: 'admin',
    data() {
        return {
            settings: {
                defaultEnrollmentDays: 365,
                allowExtension: 'paid',
                maxExtensions: 3,
                extensionDays: 30,
                completionThreshold: 80,
                videoCompletionThreshold: 90,
                sequentialLearning: false,
                allowSeek: true,
                allowSpeedControl: true,
                enableCertificate: true,
                certificateType: 'auto',
                certificateValidity: 'unlimited',
                defaultQuality: 'auto',
                autoplay: 'off',
                showSubtitles: false,
                continuePlaying: true
            }
        }
    },
    methods: {
        saveSettings() {
            alert('학습 설정이 저장되었습니다.');
        }
    }
}
