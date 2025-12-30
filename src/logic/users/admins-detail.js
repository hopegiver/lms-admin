export default {
    name: 'AdminsDetail',
    layout: 'admin',
    data() {
        return {
            adminId: this.getParam('id'),
            currentTab: 'info',
            logFilter: 'all',
            admin: null,
            allPermissions: [
                { id: 'dashboard', name: '대시보드', description: '전체 현황 및 통계 조회' },
                { id: 'users_learners', name: '학습자 관리', description: '학습자 등록, 수정, 삭제' },
                { id: 'users_admins', name: '관리자 관리', description: '관리자 등록, 수정, 삭제' },
                { id: 'users_instructors', name: '강사 관리', description: '강사 등록, 수정, 삭제' },
                { id: 'courses', name: '강좌 관리', description: '강좌 생성, 수정, 삭제' },
                { id: 'content', name: '콘텐츠 관리', description: '강의 콘텐츠 업로드 및 관리' },
                { id: 'enrollment', name: '수강 관리', description: '수강 신청 및 진도 관리' },
                { id: 'payment', name: '결제 관리', description: '결제 내역 및 환불 처리' },
                { id: 'community', name: '커뮤니티 관리', description: '게시판 및 댓글 관리' },
                { id: 'reports', name: '리포트', description: '각종 통계 리포트 조회' },
                { id: 'settings', name: '시스템 설정', description: '시스템 전반 설정 관리' }
            ],
            activityLogs: [
                { date: '2024-12-30 10:30', type: 'login', action: '로그인', detail: 'IP: 192.168.1.100' },
                { date: '2024-12-30 10:35', type: 'action', action: '학습자 등록', detail: '새 학습자 "김철수" 등록' },
                { date: '2024-12-30 09:15', type: 'action', action: '강좌 수정', detail: 'React 입문 강좌 설명 수정' },
                { date: '2024-12-29 16:20', type: 'setting', action: '권한 변경', detail: '콘텐츠 관리 권한 추가' },
                { date: '2024-12-29 14:00', type: 'login', action: '로그인', detail: 'IP: 192.168.1.100' },
                { date: '2024-12-29 10:30', type: 'action', action: '강좌 등록', detail: 'TypeScript 마스터 강좌 등록' },
                { date: '2024-12-28 15:45', type: 'action', action: '결제 처리', detail: '학습자 "이영희" 환불 승인' },
                { date: '2024-12-28 09:00', type: 'login', action: '로그인', detail: 'IP: 192.168.1.100' }
            ]
        }
    },
    computed: {
        filteredActivityLogs() {
            if (this.logFilter === 'all') {
                return this.activityLogs;
            }
            return this.activityLogs.filter(log => log.type === this.logFilter);
        }
    },
    async mounted() {
        if (!this.adminId) {
            alert('관리자 ID가 필요합니다.');
            this.navigateTo('/users/admins');
            return;
        }

        await this.loadAdmin();
    },
    methods: {
        async loadAdmin() {
            try {
                // API 호출 시뮬레이션
                // const response = await this.$api.get(`/api/users/admins/${this.adminId}`);
                // this.admin = response.data;

                // 임시 데이터
                this.admin = {
                    id: this.adminId,
                    name: '김관리',
                    email: 'admin@example.com',
                    phone: '010-9876-5432',
                    role: 'general_admin',
                    department: '교육운영팀',
                    status: 'active',
                    createdAt: '2024-11-01',
                    lastLogin: '2024-12-30 10:30',
                    loginCount: 156,
                    todayAccess: true,
                    weeklyActions: 42,
                    monthlyActions: 187,
                    memo: '교육 운영 총괄 관리자',
                    permissions: ['dashboard', 'users_learners', 'users_instructors', 'courses', 'enrollment', 'payment', 'community', 'reports'],
                    permissionUpdatedAt: '2024-12-29 16:20'
                };
            } catch (error) {
                alert('관리자 정보를 불러오는데 실패했습니다.');
                console.error(error);
            }
        },

        hasPermission(permissionId) {
            return this.admin?.permissions?.includes(permissionId) || false;
        },

        getRoleBadgeClass(role) {
            const classes = {
                'super_admin': 'bg-danger',
                'general_admin': 'bg-primary',
                'content_admin': 'bg-info'
            };
            return classes[role] || 'bg-secondary';
        },

        getRoleText(role) {
            const texts = {
                'super_admin': '슈퍼관리자',
                'general_admin': '일반관리자',
                'content_admin': '콘텐츠관리자'
            };
            return texts[role] || role;
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

        getLogTypeBadgeClass(type) {
            const classes = {
                'login': 'bg-info',
                'action': 'bg-primary',
                'setting': 'bg-warning'
            };
            return classes[type] || 'bg-secondary';
        },

        getLogTypeText(type) {
            const texts = {
                'login': '로그인',
                'action': '작업',
                'setting': '설정'
            };
            return texts[type] || type;
        },

        edit() {
            alert('수정 기능은 추후 구현 예정입니다.');
            // this.navigateTo('/users/admins/edit', { id: this.adminId });
        },

        deleteAdmin() {
            if (confirm('이 관리자를 삭제하시겠습니까?')) {
                alert('삭제 기능은 추후 구현 예정입니다.');
                // this.navigateTo('/users/admins');
            }
        }
    }
}
