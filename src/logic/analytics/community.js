export default {
    name: 'analyticsCommunity',
    layout: 'admin',
    data() {
        return {
            boardStats: [
                { board: '공지사항', posts: 123, comments: 456, views: 12340 },
                { board: '자유게시판', posts: 2340, comments: 5670, views: 45230 },
                { board: 'Q&A', posts: 1890, comments: 4560, views: 38920 }
            ],
            inquiryStats: {
                total: 1234,
                pending: 45,
                processing: 89,
                completed: 1100,
                avgResponseTime: '2.3시간'
            }
        }
    },
    methods: {
        formatNumber(num) { return new Intl.NumberFormat('ko-KR').format(num); }
    }
}
