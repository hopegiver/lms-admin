export default {
    name: 'analyticsRealtime',
    layout: 'admin',
    data() {
        return {
            liveUsers: 247,
            recentOrders: [
                { id: 1, user: '김철수', product: 'React 완벽 가이드', amount: 125000, time: '방금 전' },
                { id: 2, user: '이영희', product: 'Python 데이터 분석', amount: 125000, time: '1분 전' }
            ],
            activeLearners: [
                { user: '박민수', course: 'JavaScript ES6+', progress: 45, time: '5분 전' },
                { user: '정지원', course: 'AWS 클라우드', progress: 78, time: '8분 전' }
            ],
            todayStats: {
                revenue: '₩8,100,000',
                orders: 67,
                newUsers: 124,
                activeUsers: 247
            }
        }
    },
    mounted() {
        // 실시간 업데이트 시뮬레이션
        this.updateInterval = setInterval(() => {
            this.liveUsers = Math.floor(Math.random() * 50) + 220;
        }, 5000);
    },
    beforeDestroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    },
    methods: {
        formatNumber(num) { return new Intl.NumberFormat('ko-KR').format(num); },
        formatCurrency(num) { return '₩' + new Intl.NumberFormat('ko-KR').format(num); }
    }
}
