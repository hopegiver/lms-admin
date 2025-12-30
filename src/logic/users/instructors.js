export default {
    name: 'Instructors',
    layout: 'admin',
    data() {
        return {
            searchQuery: '',
            filters: {
                status: ''
            },
            selectedInstructor: null,
            instructors: [
                {
                    id: 1,
                    name: '김개발',
                    email: 'kim.dev@example.com',
                    status: 'active',
                    courseCount: 5,
                    studentCount: 1250,
                    rating: 4.9,
                    monthlyRevenue: '₩2,500,000',
                    totalRevenue: '₩45,000,000',
                    courses: [
                        { id: 1, title: 'React 완벽 가이드', students: 450, revenue: '₩1,200,000' },
                        { id: 2, title: 'JavaScript ES6+', students: 380, revenue: '₩800,000' },
                        { id: 3, title: 'TypeScript 마스터', students: 220, revenue: '₩500,000' }
                    ]
                },
                {
                    id: 2,
                    name: '이데이터',
                    email: 'lee.data@example.com',
                    status: 'active',
                    courseCount: 3,
                    studentCount: 980,
                    rating: 4.8,
                    monthlyRevenue: '₩1,800,000',
                    totalRevenue: '₩32,000,000',
                    courses: [
                        { id: 1, title: 'Python 데이터 분석', students: 520, revenue: '₩1,100,000' },
                        { id: 2, title: '머신러닝 기초', students: 280, revenue: '₩500,000' },
                        { id: 3, title: 'SQL 마스터', students: 180, revenue: '₩200,000' }
                    ]
                },
                {
                    id: 3,
                    name: '박자바',
                    email: 'park.java@example.com',
                    status: 'active',
                    courseCount: 4,
                    studentCount: 856,
                    rating: 4.7,
                    monthlyRevenue: '₩1,500,000',
                    totalRevenue: '₩28,000,000',
                    courses: [
                        { id: 1, title: 'Java 기초', students: 320, revenue: '₩600,000' },
                        { id: 2, title: 'Spring Boot', students: 280, revenue: '₩550,000' },
                        { id: 3, title: 'JPA 실전', students: 156, revenue: '₩350,000' }
                    ]
                },
                {
                    id: 4,
                    name: '최클라우드',
                    email: 'choi.cloud@example.com',
                    status: 'active',
                    courseCount: 3,
                    studentCount: 720,
                    rating: 4.6,
                    monthlyRevenue: '₩1,200,000',
                    totalRevenue: '₩22,000,000',
                    courses: [
                        { id: 1, title: 'AWS 클라우드 입문', students: 380, revenue: '₩700,000' },
                        { id: 2, title: 'Docker & Kubernetes', students: 220, revenue: '₩350,000' },
                        { id: 3, title: 'CI/CD 파이프라인', students: 120, revenue: '₩150,000' }
                    ]
                },
                {
                    id: 5,
                    name: '정디자인',
                    email: 'jung.design@example.com',
                    status: 'inactive',
                    courseCount: 2,
                    studentCount: 450,
                    rating: 4.5,
                    monthlyRevenue: '₩0',
                    totalRevenue: '₩15,000,000',
                    courses: [
                        { id: 1, title: 'UX 디자인 원칙', students: 280, revenue: '₩0' },
                        { id: 2, title: 'Figma 마스터', students: 170, revenue: '₩0' }
                    ]
                },
                {
                    id: 6,
                    name: '한모바일',
                    email: 'han.mobile@example.com',
                    status: 'active',
                    courseCount: 2,
                    studentCount: 380,
                    rating: 4.4,
                    monthlyRevenue: '₩800,000',
                    totalRevenue: '₩12,000,000',
                    courses: [
                        { id: 1, title: 'Flutter 입문', students: 220, revenue: '₩500,000' },
                        { id: 2, title: 'React Native', students: 160, revenue: '₩300,000' }
                    ]
                }
            ]
        }
    },
    methods: {
        openCreateModal() {
            this.navigateTo('/users/instructors-create');
        },
        viewDetail(instructor) {
            this.navigateTo('/users/instructors-detail', {id: instructor.id});
        },
        editInstructor(instructor) {
            this.navigateTo('/users/instructors-detail', {id: instructor.id});
        },
        deleteInstructor(instructor) {
            if (confirm(`${instructor.name}을(를) 삭제하시겠습니까?`)) {
                alert('삭제 기능은 추후 구현 예정입니다.');
            }
        },
        exportData() {
            alert('내보내기 기능은 추후 구현 예정입니다.');
        }
    }
}
