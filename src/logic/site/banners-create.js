export default {
    name: 'BannersCreate',
    layout: 'admin',
    data() {
        return {
            form: {
                title: '',
                type: '',
                status: 'active',
                imageUrl: '',
                linkUrl: '',
                linkTarget: '_self',
                location: 'main_top',
                priority: 1,
                startDate: '',
                endDate: '',
                targetAudience: 'all',
                targetPages: 'all',
                specificPages: '',
                popupWidth: 600,
                popupHeight: 800,
                showCloseButton: true,
                showTodayClose: true
            }
        }
    },
    methods: {
        validateForm() {
            if (!this.form.title) {
                alert('제목을 입력해주세요.');
                return false;
            }
            if (!this.form.type) {
                alert('유형을 선택해주세요.');
                return false;
            }
            if (!this.form.imageUrl) {
                alert('이미지를 업로드해주세요.');
                return false;
            }
            if (!this.form.startDate) {
                alert('노출 시작일을 입력해주세요.');
                return false;
            }
            if (!this.form.endDate) {
                alert('노출 종료일을 입력해주세요.');
                return false;
            }
            if (new Date(this.form.startDate) >= new Date(this.form.endDate)) {
                alert('종료일은 시작일보다 이후여야 합니다.');
                return false;
            }
            return true;
        },

        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                // 파일 크기 체크 (5MB)
                if (file.size > 5 * 1024 * 1024) {
                    alert('이미지 크기는 5MB 이하여야 합니다.');
                    event.target.value = '';
                    return;
                }

                const reader = new FileReader();
                reader.onload = (e) => {
                    this.form.imageUrl = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },

        removeImage() {
            this.form.imageUrl = '';
        },

        async submit() {
            if (!this.validateForm()) return;

            if (confirm('배너/팝업을 생성하시겠습니까?')) {
                try {
                    // API 호출 시뮬레이션
                    // const response = await this.$api.post('/api/site/banners', this.form);

                    alert('배너/팝업이 생성되었습니다.');
                    this.navigateTo('/site/banners');
                } catch (error) {
                    alert('생성에 실패했습니다: ' + error.message);
                }
            }
        }
    },
    watch: {
        'form.type'(newVal) {
            // 유형에 따라 기본 위치 설정
            if (newVal === 'banner') {
                this.form.location = 'main_top';
            } else if (newVal === 'popup') {
                this.form.location = 'popup_center';
            }
        }
    },
    mounted() {
        // 쿼리 파라미터에서 데이터 로드
        const params = new URLSearchParams(window.location.search);
        if (params.get('type')) {
            this.form.type = params.get('type');
        }

        // 기본 날짜 설정 (오늘 ~ 1개월 후)
        const now = new Date();
        const oneMonthLater = new Date();
        oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

        this.form.startDate = now.toISOString().slice(0, 16);
        this.form.endDate = oneMonthLater.toISOString().slice(0, 16);
    }
}
