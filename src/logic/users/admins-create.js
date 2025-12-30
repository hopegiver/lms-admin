export default {
    name: 'AdminsCreate',
    layout: 'admin',
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: '',
                phone: '',
                role: '',
                department: '',
                status: 'active',
                memo: '',
                permissions: []
            },
            departments: [
                { id: 1, name: '경영지원팀' },
                { id: 2, name: '개발팀' },
                { id: 3, name: 'IT운영팀' },
                { id: 4, name: '교육운영팀' },
                { id: 5, name: '콘텐츠팀' }
            ],
            availablePermissions: [
                { id: 'dashboard', name: '대시보드' },
                { id: 'users_learners', name: '학습자 관리' },
                { id: 'users_admins', name: '관리자 관리' },
                { id: 'users_instructors', name: '강사 관리' },
                { id: 'courses', name: '강좌 관리' },
                { id: 'content', name: '콘텐츠 관리' },
                { id: 'enrollment', name: '수강 관리' },
                { id: 'payment', name: '결제 관리' },
                { id: 'community', name: '커뮤니티 관리' },
                { id: 'reports', name: '리포트' },
                { id: 'settings', name: '시스템 설정' }
            ]
        }
    },
    watch: {
        'form.role'(newRole) {
            // 역할에 따른 기본 권한 자동 설정
            this.setDefaultPermissions(newRole);
        }
    },
    methods: {
        setDefaultPermissions(role) {
            const defaultPermissions = {
                'super_admin': ['dashboard', 'users_learners', 'users_admins', 'users_instructors', 'courses', 'content', 'enrollment', 'payment', 'community', 'reports', 'settings'],
                'general_admin': ['dashboard', 'users_learners', 'users_instructors', 'courses', 'enrollment', 'payment', 'community', 'reports'],
                'content_admin': ['dashboard', 'courses', 'content', 'community']
            };

            if (defaultPermissions[role]) {
                this.form.permissions = [...defaultPermissions[role]];
            }
        },

        validateForm() {
            if (!this.form.name) {
                alert('이름을 입력해주세요.');
                return false;
            }
            if (!this.form.email) {
                alert('이메일을 입력해주세요.');
                return false;
            }
            if (!this.form.password || this.form.password.length < 8) {
                alert('비밀번호는 8자 이상이어야 합니다.');
                return false;
            }
            if (!this.form.role) {
                alert('역할을 선택해주세요.');
                return false;
            }
            if (this.form.permissions.length === 0) {
                alert('최소 1개 이상의 권한을 선택해주세요.');
                return false;
            }
            return true;
        },

        async submit() {
            if (!this.validateForm()) return;

            if (confirm('관리자를 등록하시겠습니까?')) {
                try {
                    // API 호출 시뮬레이션
                    // const response = await this.$api.post('/api/users/admins', this.form);

                    alert('관리자가 등록되었습니다.');
                    this.navigateTo('/users/admins');
                } catch (error) {
                    alert('등록에 실패했습니다: ' + error.message);
                }
            }
        },

        saveDraft() {
            alert('임시저장 기능은 추후 구현 예정입니다.');
        }
    }
}
