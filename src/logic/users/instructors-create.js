export default {
    name: 'InstructorsCreate',
    layout: 'admin',
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: '',
                phone: '',
                specialization: '',
                bio: '',
                profileImage: null,
                profileImagePreview: null,
                status: 'active'
            }
        }
    },
    methods: {
        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                if (file.size > 2 * 1024 * 1024) {
                    alert('파일 크기는 2MB를 초과할 수 없습니다.');
                    event.target.value = '';
                    return;
                }

                this.form.profileImage = file;

                // 미리보기 생성
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.form.profileImagePreview = e.target.result;
                };
                reader.readAsDataURL(file);
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
            if (!this.form.specialization) {
                alert('전문분야를 입력해주세요.');
                return false;
            }
            return true;
        },

        async submit() {
            if (!this.validateForm()) return;

            if (confirm('강사를 등록하시겠습니까?')) {
                try {
                    // API 호출 시뮬레이션
                    // const formData = new FormData();
                    // Object.keys(this.form).forEach(key => {
                    //     if (this.form[key] !== null) {
                    //         formData.append(key, this.form[key]);
                    //     }
                    // });
                    // const response = await this.$api.post('/api/users/instructors', formData);

                    alert('강사가 등록되었습니다.');
                    this.navigateTo('/users/instructors');
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
