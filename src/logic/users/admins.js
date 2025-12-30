export default {
    name: 'Admins',
    layout: 'admin',
    data() {
        return {
            activeTab: 'admins',
            admins: [
                {
                    id: 1,
                    name: '최고관리자',
                    email: 'super@example.com',
                    role: 'super',
                    status: 'active',
                    lastLogin: '2024-12-19 10:30'
                },
                {
                    id: 2,
                    name: '김관리',
                    email: 'kim.admin@example.com',
                    role: 'admin',
                    status: 'active',
                    lastLogin: '2024-12-19 09:15'
                },
                {
                    id: 3,
                    name: '이운영',
                    email: 'lee.ops@example.com',
                    role: 'operator',
                    status: 'active',
                    lastLogin: '2024-12-18 18:45'
                },
                {
                    id: 4,
                    name: '박콘텐츠',
                    email: 'park.content@example.com',
                    role: 'content',
                    status: 'active',
                    lastLogin: '2024-12-18 14:20'
                },
                {
                    id: 5,
                    name: '정지원',
                    email: 'jung.support@example.com',
                    role: 'support',
                    status: 'inactive',
                    lastLogin: '2024-12-10 11:00'
                }
            ],
            roles: [
                {
                    id: 1,
                    name: 'Super Admin',
                    icon: '👑',
                    description: '시스템의 모든 기능에 접근 가능한 최고 관리자',
                    permissions: ['전체 관리', '시스템 설정', '관리자 관리'],
                    userCount: 1,
                    isSystem: true
                },
                {
                    id: 2,
                    name: 'Admin',
                    icon: '🔑',
                    description: '일반 관리자로 대부분의 기능에 접근 가능',
                    permissions: ['사용자 관리', '강좌 관리', '주문 관리', '콘텐츠 관리'],
                    userCount: 2,
                    isSystem: true
                },
                {
                    id: 3,
                    name: 'Operator',
                    icon: '⚙️',
                    description: '운영 담당자로 일상적인 운영 업무 처리',
                    permissions: ['주문 관리', '문의 관리', '게시판 관리'],
                    userCount: 3,
                    isSystem: false
                },
                {
                    id: 4,
                    name: 'Content Manager',
                    icon: '📝',
                    description: '콘텐츠 담당자로 강좌와 콘텐츠 관리',
                    permissions: ['강좌 관리', '콘텐츠 관리', '게시판 관리'],
                    userCount: 2,
                    isSystem: false
                },
                {
                    id: 5,
                    name: 'Support',
                    icon: '💬',
                    description: '고객 지원 담당자로 문의 처리',
                    permissions: ['문의 관리', '게시판 관리'],
                    userCount: 4,
                    isSystem: false
                }
            ]
        }
    },
    methods: {
        getRoleBadgeClass(role) {
            const classes = {
                'super': 'bg-danger',
                'admin': 'bg-primary',
                'operator': 'bg-info',
                'content': 'bg-success',
                'support': 'bg-warning text-dark'
            };
            return classes[role] || 'bg-secondary';
        },
        getRoleText(role) {
            const texts = {
                'super': 'Super Admin',
                'admin': 'Admin',
                'operator': 'Operator',
                'content': 'Content Manager',
                'support': 'Support'
            };
            return texts[role] || role;
        },
        openCreateModal() {
            this.navigateTo('/users/admins-create');
        },
        viewDetail(admin) {
            this.navigateTo('/users/admins-detail', {id: admin.id});
        },
        editAdmin(admin) {
            this.navigateTo('/users/admins-detail', {id: admin.id});
        },
        resetPassword(admin) {
            if (confirm(`${admin.name}의 비밀번호를 초기화하시겠습니까?`)) {
                alert('비밀번호 초기화 기능은 추후 구현 예정입니다.');
            }
        },
        deleteAdmin(admin) {
            if (admin.role === 'super') {
                alert('Super Admin은 삭제할 수 없습니다.');
                return;
            }
            if (confirm(`${admin.name}을(를) 삭제하시겠습니까?`)) {
                alert('삭제 기능은 추후 구현 예정입니다.');
            }
        },
        openRoleModal() {
            alert('권한 그룹 추가 모달은 추후 구현 예정입니다.');
        },
        editRole(role) {
            alert(`${role.name} 수정 기능은 추후 구현 예정입니다.`);
        },
        deleteRole(role) {
            if (confirm(`${role.name} 권한 그룹을 삭제하시겠습니까?`)) {
                alert('삭제 기능은 추후 구현 예정입니다.');
            }
        }
    }
}
