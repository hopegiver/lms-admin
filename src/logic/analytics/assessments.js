export default {
    name: 'analyticsAssessments',
    layout: 'admin',
    data() {
        return {
            assessmentStats: [
                { name: 'React 중간고사', attempts: 1234, avgScore: 82.5, passRate: 85.2, retakeRate: 12.3 },
                { name: 'Python 기말고사', attempts: 987, avgScore: 78.3, passRate: 78.5, retakeRate: 15.7 }
            ],
            questionAnalysis: [
                { question: '1번: React Hook 개념', correctRate: 92.3, difficulty: '쉬움' },
                { question: '2번: useEffect 활용', correctRate: 68.5, difficulty: '보통' },
                { question: '3번: Context API', correctRate: 45.2, difficulty: '어려움' }
            ]
        }
    },
    methods: {
        formatNumber(num) { return new Intl.NumberFormat('ko-KR').format(num); }
    }
}
