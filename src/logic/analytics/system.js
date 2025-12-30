export default {
    name: 'analyticsSystem',
    layout: 'admin',
    data() {
        return {
            serverMetrics: {
                cpu: 45.2,
                memory: 68.5,
                disk: 52.3,
                network: 34.7
            },
            apiPerformance: [
                { endpoint: '/api/courses', avgTime: 125, requests: 15234, errors: 12 },
                { endpoint: '/api/users', avgTime: 89, requests: 12450, errors: 8 },
                { endpoint: '/api/orders', avgTime: 156, requests: 8934, errors: 15 }
            ],
            errorLogs: [
                { time: '14:23:45', level: 'ERROR', message: 'Database connection timeout', count: 3 },
                { time: '14:18:32', level: 'WARNING', message: 'High memory usage detected', count: 1 }
            ],
            browserStats: [
                { browser: 'Chrome', users: 8234, percentage: 66.1 },
                { browser: 'Safari', users: 2456, percentage: 19.7 },
                { browser: 'Firefox', users: 1234, percentage: 9.9 },
                { browser: 'Edge', users: 526, percentage: 4.2 }
            ]
        }
    },
    methods: {
        formatNumber(num) { return new Intl.NumberFormat('ko-KR').format(num); },
        getStatusColor(value) {
            if (value < 50) return 'success';
            if (value < 80) return 'warning';
            return 'danger';
        }
    }
}
