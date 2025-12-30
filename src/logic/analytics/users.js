export default {
    name: 'analyticsUsers',
    layout: 'admin',
    data() {
        return {
            dateRange: '30days',

            // 핵심 사용자 지표
            userMetrics: {
                totalUsers: '12,450',
                usersChange: '+8.3',
                activeUsers: '8,234',
                activeChange: '+12.1',
                newUsers: '1,456',
                newChange: '+15.7',
                churnRate: '5.2%',
                churnChange: '-1.3'
            },

            // 사용자 증가 추이
            userGrowthData: [
                { month: '7월', total: 10200, new: 820, active: 6800 },
                { month: '8월', total: 10850, new: 890, active: 7200 },
                { month: '9월', total: 11320, new: 920, active: 7500 },
                { month: '10월', total: 11780, new: 1050, active: 7800 },
                { month: '11월', total: 12100, new: 1230, active: 8050 },
                { month: '12월', total: 12450, new: 1456, active: 8234 }
            ],

            // 사용자 유형별 분포
            userTypeDistribution: [
                { type: '학습자', count: 10234, percentage: 82.2 },
                { type: '강사', count: 1456, percentage: 11.7 },
                { type: '조직', count: 560, percentage: 4.5 },
                { type: '관리자', count: 200, percentage: 1.6 }
            ],

            // 연령대별 분포
            ageDistribution: [
                { range: '10대', count: 567, percentage: 4.6 },
                { range: '20대', count: 4823, percentage: 38.7 },
                { range: '30대', count: 4156, percentage: 33.4 },
                { range: '40대', count: 2134, percentage: 17.1 },
                { range: '50대 이상', count: 770, percentage: 6.2 }
            ],

            // 지역별 분포
            regionDistribution: [
                { region: '서울', count: 4234, percentage: 34.0 },
                { region: '경기', count: 3456, percentage: 27.8 },
                { region: '인천', count: 1234, percentage: 9.9 },
                { region: '부산', count: 987, percentage: 7.9 },
                { region: '대구', count: 756, percentage: 6.1 },
                { region: '기타', count: 1783, percentage: 14.3 }
            ],

            // 유입 경로
            acquisitionChannels: [
                { channel: '검색 엔진', users: 4234, percentage: 34.0, cost: 8500000 },
                { channel: '소셜 미디어', users: 3456, percentage: 27.8, cost: 12300000 },
                { channel: '직접 방문', users: 2134, percentage: 17.1, cost: 0 },
                { channel: '추천', users: 1567, percentage: 12.6, cost: 2500000 },
                { channel: '이메일', users: 1059, percentage: 8.5, cost: 1800000 }
            ],

            // 활성 사용자 추이 (DAU/WAU/MAU)
            activeUsersTrend: {
                dau: 2456,
                wau: 5234,
                mau: 8234,
                dauRate: 19.7,
                wauRate: 42.0,
                mauRate: 66.1
            },

            // 코호트 분석 (월별 유지율)
            cohortAnalysis: [
                { month: '7월', m0: 100, m1: 82, m2: 68, m3: 58, m4: 52, m5: 48 },
                { month: '8월', m0: 100, m1: 85, m2: 71, m3: 62, m4: 55, m5: 0 },
                { month: '9월', m0: 100, m1: 88, m2: 75, m3: 65, m4: 0, m5: 0 },
                { month: '10월', m0: 100, m1: 89, m2: 78, m3: 0, m4: 0, m5: 0 },
                { month: '11월', m0: 100, m1: 91, m2: 0, m3: 0, m4: 0, m5: 0 },
                { month: '12월', m0: 100, m1: 0, m2: 0, m3: 0, m4: 0, m5: 0 }
            ]
        }
    },
    computed: {
        maxGrowthValue() {
            return Math.max(...this.userGrowthData.map(d => d.total));
        }
    },
    methods: {
        changeDateRange(range) {
            this.dateRange = range;
            console.log('Date range changed to:', range);
        },

        getChartBarHeight(value) {
            return (value / this.maxGrowthValue * 100) + '%';
        },

        getCohortColor(value) {
            if (value === 0) return 'transparent';
            if (value >= 80) return 'bg-success';
            if (value >= 60) return 'bg-warning';
            return 'bg-danger';
        },

        formatNumber(num) {
            return new Intl.NumberFormat('ko-KR').format(num);
        },

        formatCurrency(num) {
            return '₩' + new Intl.NumberFormat('ko-KR').format(num);
        }
    }
}
