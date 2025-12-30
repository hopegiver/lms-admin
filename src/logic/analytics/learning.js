export default {
    name: 'analyticsLearning',
    layout: 'admin',
    data() {
        return {
            dateRange: '30days',
            selectedCourse: '',

            // 핵심 학습 지표
            learningMetrics: {
                totalEnrollments: '8,945',
                enrollmentsChange: '+15.2',
                avgCompletionRate: '68.5%',
                completionChange: '+3.1',
                avgLearningTime: '4.2시간',
                timeChange: '+0.8',
                certificateIssued: '1,234',
                certificateChange: '+12.3'
            },

            // 강좌별 완강률
            courseCompletionRates: [
                { course: 'React 완벽 가이드', enrollments: 1234, completions: 892, rate: 72.3, progress: 72.3 },
                { course: 'Python 데이터 분석', enrollments: 987, completions: 691, rate: 70.0, progress: 70.0 },
                { course: 'JavaScript ES6+', enrollments: 856, completions: 625, rate: 73.0, progress: 73.0 },
                { course: 'AWS 클라우드 입문', enrollments: 745, completions: 469, rate: 63.0, progress: 63.0 },
                { course: 'Node.js 백엔드', enrollments: 623, completions: 423, rate: 67.9, progress: 67.9 }
            ],

            // 시간대별 학습 패턴
            learningPatternByHour: [
                { hour: '00-02', count: 45 },
                { hour: '02-04', count: 23 },
                { hour: '04-06', count: 12 },
                { hour: '06-08', count: 89 },
                { hour: '08-10', count: 234 },
                { hour: '10-12', count: 345 },
                { hour: '12-14', count: 298 },
                { hour: '14-16', count: 412 },
                { hour: '16-18', count: 567 },
                { hour: '18-20', count: 623 },
                { hour: '20-22', count: 789 },
                { hour: '22-24', count: 456 }
            ],

            // 요일별 학습 패턴
            learningPatternByDay: [
                { day: '월', count: 1234, label: '월요일' },
                { day: '화', count: 1456, label: '화요일' },
                { day: '수', count: 1389, label: '수요일' },
                { day: '목', count: 1523, label: '목요일' },
                { day: '금', count: 1298, label: '금요일' },
                { day: '토', count: 987, label: '토요일' },
                { day: '일', count: 856, label: '일요일' }
            ],

            // 드롭아웃 분석 (진도율 구간별)
            dropoutAnalysis: [
                { range: '0-10%', count: 234, percentage: 15.2 },
                { range: '10-20%', count: 189, percentage: 12.3 },
                { range: '20-30%', count: 156, percentage: 10.1 },
                { range: '30-40%', count: 123, percentage: 8.0 },
                { range: '40-50%', count: 98, percentage: 6.4 },
                { range: '50-60%', count: 78, percentage: 5.1 },
                { range: '60-70%', count: 56, percentage: 3.6 },
                { range: '70-80%', count: 45, percentage: 2.9 },
                { range: '80-90%', count: 34, percentage: 2.2 },
                { range: '90-100%', count: 523, percentage: 34.2 }
            ],

            // 평균 학습 시간 (강좌별)
            avgLearningTimeData: [
                { course: 'React 완벽 가이드', time: 5.2 },
                { course: 'Python 데이터 분석', time: 4.8 },
                { course: 'JavaScript ES6+', time: 3.9 },
                { course: 'AWS 클라우드 입문', time: 6.1 },
                { course: 'Node.js 백엔드', time: 4.5 }
            ],

            courseList: ['전체', 'React 완벽 가이드', 'Python 데이터 분석', 'JavaScript ES6+', 'AWS 클라우드 입문']
        }
    },
    computed: {
        maxPatternValue() {
            return Math.max(...this.learningPatternByHour.map(d => d.count));
        },
        maxDayValue() {
            return Math.max(...this.learningPatternByDay.map(d => d.count));
        }
    },
    methods: {
        changeDateRange(range) {
            this.dateRange = range;
            console.log('Date range changed to:', range);
        },

        getPatternBarHeight(count) {
            return (count / this.maxPatternValue * 100) + '%';
        },

        getDayBarHeight(count) {
            return (count / this.maxDayValue * 100) + '%';
        },

        formatNumber(num) {
            return new Intl.NumberFormat('ko-KR').format(num);
        }
    }
}
