export default {
    name: 'Settlements',
    layout: 'admin',
    data() {
        return {
            activeTab: 'pending',
            completedFilter: { instructor: '', month: '' },
            stats: {
                monthlyRevenue: '₩45,230,000',
                pendingSettlement: '₩12,450,000',
                completedSettlement: '₩32,780,000',
                platformFee: '₩9,046,000'
            },
            instructorList: ['김리액트', '이파이썬', '박디자인', '최클라우드', '정마케팅'],
            pendingList: [
                { id: 1, instructor: '김리액트', email: 'react@example.com', period: '2024년 12월', revenue: '₩5,960,000', fee: '₩1,192,000', settlement: '₩4,768,000' },
                { id: 2, instructor: '이파이썬', email: 'python@example.com', period: '2024년 12월', revenue: '₩3,570,000', fee: '₩714,000', settlement: '₩2,856,000' },
                { id: 3, instructor: '박디자인', email: 'design@example.com', period: '2024년 12월', revenue: '₩2,380,000', fee: '₩476,000', settlement: '₩1,904,000' },
                { id: 4, instructor: '최클라우드', email: 'cloud@example.com', period: '2024년 12월', revenue: '₩1,990,000', fee: '₩398,000', settlement: '₩1,592,000' }
            ],
            completedList: [
                { id: 1, settlementNo: 'SET-202411-001', instructor: '김리액트', period: '2024년 11월', amount: '₩4,520,000', bank: '국민은행', account: '***-***-1234', settledDate: '2024-12-05' },
                { id: 2, settlementNo: 'SET-202411-002', instructor: '이파이썬', period: '2024년 11월', amount: '₩2,680,000', bank: '신한은행', account: '***-***-5678', settledDate: '2024-12-05' },
                { id: 3, settlementNo: 'SET-202411-003', instructor: '박디자인', period: '2024년 11월', amount: '₩1,840,000', bank: '우리은행', account: '***-***-9012', settledDate: '2024-12-05' },
                { id: 4, settlementNo: 'SET-202410-001', instructor: '김리액트', period: '2024년 10월', amount: '₩4,120,000', bank: '국민은행', account: '***-***-1234', settledDate: '2024-11-05' }
            ],
            instructorStats: [
                { id: 1, name: '김리액트', courses: 5, totalRevenue: '₩52.3M', settled: '₩47.5M', pending: '₩4.8M' },
                { id: 2, name: '이파이썬', courses: 4, totalRevenue: '₩38.7M', settled: '₩35.8M', pending: '₩2.9M' },
                { id: 3, name: '박디자인', courses: 3, totalRevenue: '₩24.5M', settled: '₩22.6M', pending: '₩1.9M' },
                { id: 4, name: '최클라우드', courses: 2, totalRevenue: '₩18.2M', settled: '₩16.6M', pending: '₩1.6M' },
                { id: 5, name: '정마케팅', courses: 2, totalRevenue: '₩12.8M', settled: '₩11.9M', pending: '₩0.9M' }
            ]
        }
    },
    methods: {
        processSettlement() {
            if (confirm('선택한 정산을 처리하시겠습니까?')) {
                alert('일괄 정산 기능은 추후 구현 예정입니다.');
            }
        },
        processOne(item) {
            if (confirm(`${item.instructor} 강사에게 ${item.settlement}을 정산하시겠습니까?`)) {
                alert('정산 처리 기능은 추후 구현 예정입니다.');
            }
        },
        exportSettlements() { alert('정산 내역 다운로드 기능은 추후 구현 예정입니다.'); },
        viewDetail(item) { alert(`${item.settlementNo} 상세 보기 기능은 추후 구현 예정입니다.`); },
        viewInstructorDetail(instructor) { alert(`${instructor.name} 상세 보기 기능은 추후 구현 예정입니다.`); },
        editCommission(instructor) { alert(`${instructor.name} 수수료 설정 기능은 추후 구현 예정입니다.`); }
    }
}
