export default {
    name: 'PermissionSettings',
    layout: 'admin',
    data() {
        return {
            selectedRole: null,
            roles: [
                { id: 1, name: '최고 관리자', description: '모든 권한을 가진 관리자', userCount: 2, isSystem: true, permissions: { dashboard: true, users: true, users_create: true, users_edit: true, users_delete: true, courses: true, courses_create: true, courses_edit: true, courses_delete: true, orders: true, orders_create: true, orders_edit: true, orders_delete: true, settings: true, settings_create: true, settings_edit: true, settings_delete: true } },
                { id: 2, name: '운영 관리자', description: '일반 운영 업무를 담당', userCount: 5, isSystem: true, permissions: { dashboard: true, users: true, users_create: true, users_edit: true, users_delete: false, courses: true, courses_create: true, courses_edit: true, courses_delete: false, orders: true, orders_create: false, orders_edit: true, orders_delete: false, settings: false } },
                { id: 3, name: '콘텐츠 관리자', description: '강좌 콘텐츠 관리 담당', userCount: 8, isSystem: false, permissions: { dashboard: true, courses: true, courses_create: true, courses_edit: true, courses_delete: false } },
                { id: 4, name: 'CS 담당자', description: '고객 문의 처리 담당', userCount: 3, isSystem: false, permissions: { dashboard: true, users: true, users_edit: true, orders: true, inquiries: true, inquiries_edit: true } },
                { id: 5, name: '마케팅 담당자', description: '마케팅 및 프로모션 담당', userCount: 2, isSystem: false, permissions: { dashboard: true, promotions: true, promotions_create: true, promotions_edit: true, banners: true, banners_create: true, banners_edit: true } }
            ],
            permissionGroups: [
                {
                    id: 'dashboard',
                    name: '대시보드',
                    icon: '📊',
                    permissions: [
                        { id: 'dashboard', name: '대시보드' }
                    ]
                },
                {
                    id: 'users',
                    name: '사용자 관리',
                    icon: '👥',
                    permissions: [
                        { id: 'users', name: '사용자' },
                        { id: 'instructors', name: '강사' },
                        { id: 'admins', name: '관리자' }
                    ]
                },
                {
                    id: 'learning',
                    name: '학습 관리',
                    icon: '📚',
                    permissions: [
                        { id: 'courses', name: '강좌' },
                        { id: 'curriculum', name: '커리큘럼' },
                        { id: 'enrollments', name: '수강 관리' },
                        { id: 'assessments', name: '평가' }
                    ]
                },
                {
                    id: 'commerce',
                    name: '판매 관리',
                    icon: '🛒',
                    permissions: [
                        { id: 'products', name: '상품' },
                        { id: 'orders', name: '주문' },
                        { id: 'payments', name: '결제' },
                        { id: 'promotions', name: '프로모션' }
                    ]
                },
                {
                    id: 'site',
                    name: '사이트 관리',
                    icon: '🌐',
                    permissions: [
                        { id: 'pages', name: '페이지' },
                        { id: 'menus', name: '메뉴' },
                        { id: 'banners', name: '배너/팝업' },
                        { id: 'design', name: '디자인' }
                    ]
                },
                {
                    id: 'settings',
                    name: '설정',
                    icon: '⚙️',
                    permissions: [
                        { id: 'settings', name: '기본 설정' },
                        { id: 'permissions', name: '권한 관리' },
                        { id: 'system', name: '시스템' }
                    ]
                }
            ]
        }
    },
    methods: {
        selectRole(role) {
            this.selectedRole = role;
        },
        getGroupPermissionCount(group) {
            if (!this.selectedRole) return 0;
            return group.permissions.filter(p => this.selectedRole.permissions[p.id]).length;
        },
        openCreateRoleModal() {
            alert('역할 추가 기능은 추후 구현 예정입니다.');
        },
        deleteRole() {
            if (confirm(`${this.selectedRole.name} 역할을 삭제하시겠습니까?`)) {
                alert('역할이 삭제되었습니다.');
                this.selectedRole = null;
            }
        },
        savePermissions() {
            alert('권한 설정이 저장되었습니다.');
        }
    }
}
