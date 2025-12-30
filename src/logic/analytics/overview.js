export default {
    name: 'analyticsOverview',
    layout: 'admin',
    data() {
        return {
            dateRange: '7days',

            // 핵심 지표
            keyMetrics: {
                totalRevenue: '₩45,230,000',
                revenueChange: '+12.5',
                totalUsers: '12,450',
                usersChange: '+8.3',
                activeCourses: '156',
                coursesChange: '+5.2',
                completionRate: '68.5%',
                completionChange: '+3.1'
            },

            // 매출 추이 데이터
            revenueChartData: [
                { date: '12/23', amount: 3200000 },
                { date: '12/24', amount: 4100000 },
                { date: '12/25', amount: 5300000 },
                { date: '12/26', amount: 4800000 },
                { date: '12/27', amount: 6500000 },
                { date: '12/28', amount: 7200000 },
                { date: '12/29', amount: 8100000 }
            ],

            // 사용자 증가 추이
            userGrowthData: [
                { date: '12/23', users: 11800 },
                { date: '12/24', users: 11920 },
                { date: '12/25', users: 12050 },
                { date: '12/26', users: 12180 },
                { date: '12/27', users: 12290 },
                { date: '12/28', users: 12370 },
                { date: '12/29', users: 12450 }
            ],

            // 인기 강좌 TOP 5
            topCourses: [
                { id: 1, title: 'React 완벽 가이드', enrollments: 1234, revenue: '₩15,420,000', rating: 4.8 },
                { id: 2, title: 'Python 데이터 분석', enrollments: 987, revenue: '₩12,338,000', rating: 4.7 },
                { id: 3, title: 'JavaScript ES6+', enrollments: 856, revenue: '₩10,700,000', rating: 4.9 },
                { id: 4, title: 'AWS 클라우드 입문', enrollments: 745, revenue: '₩9,312,000', rating: 4.6 },
                { id: 5, title: 'Node.js 백엔드', enrollments: 623, revenue: '₩7,788,000', rating: 4.8 }
            ],

            // 최근 활동
            recentActivities: [
                { id: 1, type: 'enrollment', user: '김철수', course: 'React 완벽 가이드', time: '5분 전' },
                { id: 2, type: 'completion', user: '이영희', course: 'Python 데이터 분석', time: '12분 전' },
                { id: 3, type: 'payment', user: '박민수', amount: '₩125,000', time: '18분 전' },
                { id: 4, type: 'inquiry', user: '정지원', subject: '환불 요청', time: '25분 전' },
                { id: 5, type: 'enrollment', user: '최유진', course: 'JavaScript ES6+', time: '32분 전' },
                { id: 6, type: 'review', user: '강동욱', course: 'AWS 클라우드 입문', rating: 5, time: '41분 전' }
            ],

            // 실시간 접속자
            liveUsers: 247,

            // 오늘의 요약
            todaySummary: {
                newUsers: 124,
                newEnrollments: 367,
                completedCourses: 89,
                revenue: '₩8,100,000'
            }
        }
    },
    computed: {
        maxRevenueValue() {
            return Math.max(...this.revenueChartData.map(d => d.amount));
        }
    },
    methods: {
        changeDateRange(range) {
            this.dateRange = range;
            // 실제로는 API 호출하여 데이터 갱신
            console.log('Date range changed to:', range);
        },

        getActivityIcon(type) {
            const icons = {
                'enrollment': '✅',
                'completion': '🎓',
                'payment': '💳',
                'inquiry': '💬',
                'review': '⭐'
            };
            return icons[type] || '📌';
        },

        getActivityColor(type) {
            const colors = {
                'enrollment': 'success',
                'completion': 'primary',
                'payment': 'warning',
                'inquiry': 'info',
                'review': 'danger'
            };
            return colors[type] || 'secondary';
        },

        formatNumber(num) {
            return new Intl.NumberFormat('ko-KR').format(num);
        },

        getChartBarHeight(amount) {
            return (amount / this.maxRevenueValue * 100) + '%';
        }
    }
}
