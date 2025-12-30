export default {
    name: 'LocalesCreate',
    layout: 'admin',
    data() {
        return {
            form: {
                key: '',
                category: '',
                description: '',
                status: 'active',
                translations: {
                    ko: '',
                    en: '',
                    ja: '',
                    zh: ''
                },
                locations: []
            },
            newLocation: ''
        }
    },
    methods: {
        validateKey() {
            // 번역 키 유효성 검사 (영문, 숫자, 점, 언더스코어만)
            this.form.key = this.form.key
                .toLowerCase()
                .replace(/[^a-z0-9._]/g, '');
        },

        validateForm() {
            if (!this.form.key) {
                alert('번역 키를 입력해주세요.');
                return false;
            }
            if (!/^[a-z0-9._]+$/.test(this.form.key)) {
                alert('번역 키는 영문 소문자, 숫자, 점(.), 언더스코어(_)만 사용 가능합니다.');
                return false;
            }
            if (!this.form.translations.ko) {
                alert('한국어 번역은 필수입니다.');
                return false;
            }
            return true;
        },

        addLocation() {
            if (this.newLocation.trim()) {
                if (!this.form.locations.includes(this.newLocation.trim())) {
                    this.form.locations.push(this.newLocation.trim());
                    this.newLocation = '';
                } else {
                    alert('이미 추가된 위치입니다.');
                }
            }
        },

        removeLocation(index) {
            this.form.locations.splice(index, 1);
        },

        async submit() {
            if (!this.validateForm()) return;

            // 빈 번역 제거
            const translations = {};
            for (const [lang, text] of Object.entries(this.form.translations)) {
                if (text.trim()) {
                    translations[lang] = text.trim();
                }
            }

            const submitData = {
                ...this.form,
                translations
            };

            if (confirm('번역을 추가하시겠습니까?')) {
                try {
                    // API 호출 시뮬레이션
                    // const response = await this.$api.post('/api/site/locales', submitData);

                    alert('번역이 추가되었습니다.');
                    this.navigateTo('/site/locales');
                } catch (error) {
                    alert('추가에 실패했습니다: ' + error.message);
                }
            }
        }
    },
    mounted() {
        // 쿼리 파라미터에서 데이터 로드
        const params = new URLSearchParams(window.location.search);
        if (params.get('category')) {
            this.form.category = params.get('category');
        }
        if (params.get('key')) {
            this.form.key = params.get('key');
        }
    }
}
