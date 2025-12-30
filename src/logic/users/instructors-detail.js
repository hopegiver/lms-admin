export default {
    name: 'InstructorsDetail',
    layout: 'admin',
    data() {
        return {
            instructorId: this.getParam('id'),
            currentTab: 'info',
            instructor: null,
            activityLogs: [
                { date: '2024-12-30 10:30', action: '로그인', detail: 'IP: 192.168.1.1' },
                { date: '2024-12-30 09:15', action: '강좌 업데이트', detail: 'React 입문 - 새로운 강의 영상 추가' },
                { date: '2024-12-29 14:20', action: '강좌 개설', detail: 'TypeScript 마스터 강좌 개설' },
                { date: '2024-12-29 10:00', action: '로그인', detail: 'IP: 192.168.1.1' },
                { date: '2024-12-28 16:45', action: '수강생 피드백', detail: 'JavaScript 기초 강좌 - 5건의 질문에 답변' }
            ]
        }
    },
    async mounted() {
        if (!this.instructorId) {
            alert('강사 ID가 필요합니다.');
            this.navigateTo('/users/instructors');
            return;
        }

        await this.loadInstructor();
    },
    methods: {
        async loadInstructor() {
            try {
                // API 호출 시뮬레이션
                // const response = await this.$api.get(`/api/users/instructors/${this.instructorId}`);
                // this.instructor = response.data;

                // 임시 데이터
                this.instructor = {
                    id: this.instructorId,
                    name: '김강사',
                    email: 'kim.instructor@example.com',
                    phone: '010-9876-5432',
                    specialization: '웹 개발, React, JavaScript',
                    bio: '10년 경력의 풀스택 개발자이자 교육자입니다.\n웹 개발의 모든 것을 쉽고 재미있게 가르치는 것을 목표로 합니다.',
                    profileImage: null,
                    totalCourses: 5,
                    totalStudents: 1250,
                    avgRating: 4.8,
                    totalEarnings: '₩12,500,000',
                    earningsThisMonth: '3,200,000',
                    earningsLastMonth: '2,800,000',
                    earningsThisYear: '9,500,000',
                    status: 'active',
                    createdAt: '2024-01-15',
                    lastLogin: '2024-12-30',
                    courses: [
                        { id: 1, title: 'React 완벽 가이드', category: '웹 개발', students: 450, rating: 4.9, status: 'active', createdAt: '2024-02-01' },
                        { id: 2, title: 'JavaScript 기초부터 고급까지', category: '프로그래밍', students: 380, rating: 4.8, status: 'active', createdAt: '2024-03-15' },
                        { id: 3, title: 'TypeScript 마스터', category: '웹 개발', students: 220, rating: 4.7, status: 'active', createdAt: '2024-12-29' },
                        { id: 4, title: 'Node.js 백엔드 개발', category: '백엔드', students: 150, rating: 4.6, status: 'active', createdAt: '2024-06-10' },
                        { id: 5, title: '웹 성능 최적화', category: '웹 개발', students: 50, rating: 5.0, status: 'inactive', createdAt: '2024-11-01' }
                    ],
                    earningHistory: [
                        { id: 1, date: '2024-12-30', courseName: 'React 완벽 가이드', amount: '850,000', students: 15, status: '정산완료' },
                        { id: 2, date: '2024-12-29', courseName: 'JavaScript 기초부터 고급까지', amount: '640,000', students: 12, status: '정산완료' },
                        { id: 3, date: '2024-12-28', courseName: 'TypeScript 마스터', amount: '420,000', students: 8, status: '정산완료' },
                        { id: 4, date: '2024-12-27', courseName: 'Node.js 백엔드 개발', amount: '390,000', students: 7, status: '정산완료' },
                        { id: 5, date: '2024-12-26', courseName: 'React 완벽 가이드', amount: '900,000', students: 18, status: '정산완료' }
                    ]
                };
            } catch (error) {
                alert('강사 정보를 불러오는데 실패했습니다.');
                console.error(error);
            }
        },

        getStatusClass(status) {
            const classes = {
                'active': 'bg-success',
                'inactive': 'bg-secondary',
                'suspended': 'bg-danger'
            };
            return classes[status] || 'bg-secondary';
        },

        getStatusText(status) {
            const texts = {
                'active': '활성',
                'inactive': '비활성',
                'suspended': '정지'
            };
            return texts[status] || status;
        },

        edit() {
            alert('수정 기능은 추후 구현 예정입니다.');
            // this.navigateTo('/users/instructors/edit', { id: this.instructorId });
        },

        deleteInstructor() {
            if (confirm('이 강사를 삭제하시겠습니까?')) {
                alert('삭제 기능은 추후 구현 예정입니다.');
                // this.navigateTo('/users/instructors');
            }
        }
    }
}
