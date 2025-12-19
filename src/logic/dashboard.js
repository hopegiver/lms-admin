export default {
    name: 'Dashboard',
    layout: 'admin',
    data() {
        return {
            learningPeriod: 'week',
            salesPeriod: 'week',
            kpiCards: [
                {
                    title: '총 사용자',
                    value: '12,456',
                    change: '12% 증가',
                    changeType: 'up',
                    icon: '👥',
                    bgColor: '#e3f2fd'
                },
                {
                    title: '활성 강좌',
                    value: '89',
                    change: '5개 신규',
                    changeType: 'up',
                    icon: '📚',
                    bgColor: '#e8f5e9'
                },
                {
                    title: '이번 달 매출',
                    value: '₩12.5M',
                    change: '8% 증가',
                    changeType: 'up',
                    icon: '💰',
                    bgColor: '#fff3e0'
                },
                {
                    title: '수료율',
                    value: '78%',
                    change: '3% 하락',
                    changeType: 'down',
                    icon: '🎓',
                    bgColor: '#fce4ec'
                }
            ],
            todayTasks: [
                { title: '수강 신청 승인 대기', count: 5, icon: '✅', urgent: true },
                { title: '미답변 문의', count: 12, icon: '💬', urgent: true },
                { title: '환불 요청', count: 3, icon: '💸', urgent: true },
                { title: '신규 수강 후기', count: 8, icon: '⭐', urgent: false },
                { title: '강좌 검수 대기', count: 2, icon: '📋', urgent: false }
            ],
            recentActivities: [
                { id: 1, icon: '👤', message: '새로운 학습자가 가입했습니다', user: '홍길동', time: '5분 전' },
                { id: 2, icon: '🛒', message: 'React 입문 강좌가 구매되었습니다', user: '김철수', time: '12분 전' },
                { id: 3, icon: '✅', message: 'Python 기초 강좌를 수료했습니다', user: '이영희', time: '25분 전' },
                { id: 4, icon: '💬', message: '새로운 1:1 문의가 등록되었습니다', user: '박민수', time: '1시간 전' },
                { id: 5, icon: '📚', message: '새 강좌가 등록되었습니다', user: '관리자', time: '2시간 전' }
            ],
            popularCourses: [
                { id: 1, title: 'React 완벽 가이드', instructor: '김개발', students: 1250, rating: 4.9 },
                { id: 2, title: 'Python 데이터 분석', instructor: '이데이터', students: 980, rating: 4.8 },
                { id: 3, title: 'JavaScript ES6+', instructor: '박자바', students: 856, rating: 4.7 },
                { id: 4, title: 'AWS 클라우드 입문', instructor: '최클라우드', students: 720, rating: 4.6 }
            ],
            recentOrders: [
                { id: 'ORD-2024001', product: 'React 완벽 가이드', amount: '₩99,000', status: '완료' },
                { id: 'ORD-2024002', product: 'Python 패키지', amount: '₩150,000', status: '완료' },
                { id: 'ORD-2024003', product: 'JavaScript ES6+', amount: '₩79,000', status: '환불요청' },
                { id: 'ORD-2024004', product: 'AWS 클라우드 입문', amount: '₩120,000', status: '결제대기' }
            ]
        }
    },
    methods: {
        openModal(type) {
            alert(`${type} 모달을 여는 기능은 추후 구현 예정입니다.`);
        },
        getStatusClass(status) {
            const classes = {
                '완료': 'bg-success',
                '결제대기': 'bg-warning text-dark',
                '환불요청': 'bg-danger',
                '처리중': 'bg-info'
            };
            return classes[status] || 'bg-secondary';
        }
    }
}
