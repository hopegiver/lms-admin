export default {
    name: 'analyticsContent',
    layout: 'admin',
    data() {
        return {
            contentStats: [
                { type: '동영상', count: 1234, size: '256 GB', views: 45230 },
                { type: '문서', count: 567, size: '12 GB', views: 12340 },
                { type: '이미지', count: 890, size: '8 GB', views: 8950 }
            ],
            topContents: [
                { title: 'React 컴포넌트 기초.mp4', views: 3456, completionRate: 85.2, avgWatchTime: '12:30' },
                { title: 'Python 데이터분석 실습.mp4', views: 2890, completionRate: 78.5, avgWatchTime: '18:45' }
            ]
        }
    },
    methods: {
        formatNumber(num) { return new Intl.NumberFormat('ko-KR').format(num); }
    }
}
