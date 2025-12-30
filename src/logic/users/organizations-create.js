export default {
    name: 'OrganizationsCreate',
    layout: 'admin',
    data() {
        return {
            form: {
                name: '',
                code: '',
                parentOrganization: '',
                manager: '',
                contact: '',
                email: '',
                address: '',
                status: 'active',
                description: ''
            },
            parentOrganizations: [
                { id: 1, name: '본사' },
                { id: 2, name: '서울지점' },
                { id: 3, name: '부산지점' },
                { id: 4, name: '대구지점' }
            ]
        }
    },
    methods: {
        validateForm() {
            if (!this.form.name) {
                alert('조직명을 입력해주세요.');
                return false;
            }
            if (!this.form.code) {
                alert('조직코드를 입력해주세요.');
                return false;
            }
            return true;
        },

        async submit() {
            if (!this.validateForm()) return;

            if (confirm('조직을 등록하시겠습니까?')) {
                try {
                    // API 호출 시뮬레이션
                    // const response = await this.$api.post('/api/users/organizations', this.form);

                    alert('조직이 등록되었습니다.');
                    this.navigateTo('/users/organizations');
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
