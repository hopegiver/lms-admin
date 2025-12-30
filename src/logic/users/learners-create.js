export default {
    name: 'LearnersCreate',
    layout: 'admin',
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: '',
                phone: '',
                organization: '',
                status: 'active',
                memo: '',
                birthdate: '',
                gender: '',
                address: ''
            },
            organizations: [
                { id: 1, name: '개발팀' },
                { id: 2, name: '마케팅팀' },
                { id: 3, name: '영업팀' },
                { id: 4, name: '인사팀' }
            ]
        }
    },
    methods: {
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
            return true;
        },

        async submit() {
            if (!this.validateForm()) return;

            if (confirm('학습자를 등록하시겠습니까?')) {
                try {
                    // API 호출 시뮬레이션
                    // const response = await this.$api.post('/api/users/learners', this.form);

                    alert('학습자가 등록되었습니다.');
                    this.navigateTo('/users/learners');
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
