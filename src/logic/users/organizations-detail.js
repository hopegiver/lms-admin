export default {
    name: 'OrganizationsDetail',
    layout: 'admin',
    data() {
        return {
            organizationId: this.getParam('id'),
            currentTab: 'info',
            organization: null,
            stats: {
                totalEnrollments: 0,
                completedCourses: 0,
                inProgressCourses: 0,
                avgProgress: 0,
                totalMembers: 0,
                activeMembers: 0,
                inactiveMembers: 0,
                newMembersThisMonth: 0,
                totalLearningHours: 0,
                avgLearningHours: 0,
                topLearner: '',
                registeredCourses: 0,
                popularCourse: '',
                topCompletionCourse: ''
            }
        }
    },
    async mounted() {
        if (!this.organizationId) {
            alert('조직 ID가 필요합니다.');
            this.navigateTo('/users/organizations');
            return;
        }

        await this.loadOrganization();
        await this.loadStats();
    },
    methods: {
        async loadOrganization() {
            try {
                // API 호출 시뮬레이션
                // const response = await this.$api.get(`/api/users/organizations/${this.organizationId}`);
                // this.organization = response.data;

                // 임시 데이터
                this.organization = {
                    id: this.organizationId,
                    name: '개발팀',
                    code: 'DEV001',
                    parentOrganization: '본사',
                    manager: '김철수',
                    contact: '02-1234-5678',
                    email: 'dev@example.com',
                    address: '서울시 강남구 테헤란로 123',
                    status: 'active',
                    description: '소프트웨어 개발 및 유지보수를 담당하는 부서입니다.',
                    createdAt: '2024-01-15',
                    updatedAt: '2024-12-30',
                    totalMembers: 25,
                    subOrganizations: 3,
                    activeCourses: 12,
                    avgLearningRate: 78,
                    subOrgList: [
                        { id: 101, name: '프론트엔드팀', code: 'DEV001-F', manager: '박영희', memberCount: 8, status: 'active' },
                        { id: 102, name: '백엔드팀', code: 'DEV001-B', manager: '이민수', memberCount: 10, status: 'active' },
                        { id: 103, name: 'QA팀', code: 'DEV001-Q', manager: '최수진', memberCount: 7, status: 'active' }
                    ],
                    members: [
                        { id: 1, name: '홍길동', email: 'hong@example.com', phone: '010-1234-5678', role: '팀장', enrolledCourses: 3, status: 'active' },
                        { id: 2, name: '김영희', email: 'kim@example.com', phone: '010-2345-6789', role: '팀원', enrolledCourses: 5, status: 'active' },
                        { id: 3, name: '박민수', email: 'park@example.com', phone: '010-3456-7890', role: '팀원', enrolledCourses: 2, status: 'active' },
                        { id: 4, name: '이수진', email: 'lee@example.com', phone: '010-4567-8901', role: '팀원', enrolledCourses: 4, status: 'active' },
                        { id: 5, name: '최철수', email: 'choi@example.com', phone: '010-5678-9012', role: '팀원', enrolledCourses: 1, status: 'inactive' }
                    ]
                };
            } catch (error) {
                alert('조직 정보를 불러오는데 실패했습니다.');
                console.error(error);
            }
        },

        async loadStats() {
            try {
                // API 호출 시뮬레이션
                // const response = await this.$api.get(`/api/users/organizations/${this.organizationId}/stats`);
                // this.stats = response.data;

                // 임시 데이터
                this.stats = {
                    totalEnrollments: 45,
                    completedCourses: 28,
                    inProgressCourses: 17,
                    avgProgress: 78,
                    totalMembers: 25,
                    activeMembers: 22,
                    inactiveMembers: 3,
                    newMembersThisMonth: 5,
                    totalLearningHours: 1250,
                    avgLearningHours: 50,
                    topLearner: '김영희',
                    registeredCourses: 12,
                    popularCourse: 'React 심화',
                    topCompletionCourse: 'JavaScript 기초'
                };
            } catch (error) {
                alert('통계 정보를 불러오는데 실패했습니다.');
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
            // this.navigateTo('/users/organizations/edit', { id: this.organizationId });
        },

        deleteOrganization() {
            if (confirm('이 조직을 삭제하시겠습니까?')) {
                alert('삭제 기능은 추후 구현 예정입니다.');
                // this.navigateTo('/users/organizations');
            }
        },

        addSubOrganization() {
            alert('하위 조직 추가 기능은 추후 구현 예정입니다.');
            // this.navigateTo('/users/organizations-create', { parentId: this.organizationId });
        },

        addMember() {
            alert('구성원 추가 기능은 추후 구현 예정입니다.');
            // this.navigateTo('/users/learners-create', { organizationId: this.organizationId });
        }
    }
}
