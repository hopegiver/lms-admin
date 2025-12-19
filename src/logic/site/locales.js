export default {
    name: 'Locales',
    layout: 'admin',
    data() {
        return {
            searchQuery: '',
            filterCategory: '',
            selectedLanguage: null,
            languages: [
                { code: 'ko', name: '한국어', flag: '🇰🇷', isDefault: true, isActive: true },
                { code: 'en', name: 'English', flag: '🇺🇸', isDefault: false, isActive: true },
                { code: 'ja', name: '日本語', flag: '🇯🇵', isDefault: false, isActive: true },
                { code: 'zh', name: '中文', flag: '🇨🇳', isDefault: false, isActive: false },
                { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳', isDefault: false, isActive: false }
            ],
            translations: [
                { key: 'common.save', category: 'common', original: '저장', translated: 'Save' },
                { key: 'common.cancel', category: 'common', original: '취소', translated: 'Cancel' },
                { key: 'common.delete', category: 'common', original: '삭제', translated: 'Delete' },
                { key: 'common.edit', category: 'common', original: '수정', translated: 'Edit' },
                { key: 'common.search', category: 'common', original: '검색', translated: 'Search' },
                { key: 'menu.dashboard', category: 'menu', original: '대시보드', translated: 'Dashboard' },
                { key: 'menu.users', category: 'menu', original: '사용자', translated: 'Users' },
                { key: 'menu.courses', category: 'menu', original: '강좌', translated: 'Courses' },
                { key: 'menu.settings', category: 'menu', original: '설정', translated: 'Settings' },
                { key: 'message.welcome', category: 'message', original: '환영합니다', translated: 'Welcome' },
                { key: 'message.logout_confirm', category: 'message', original: '로그아웃 하시겠습니까?', translated: 'Are you sure you want to logout?' },
                { key: 'message.save_success', category: 'message', original: '저장되었습니다', translated: 'Saved successfully' },
                { key: 'error.required', category: 'error', original: '필수 항목입니다', translated: 'This field is required' },
                { key: 'error.invalid_email', category: 'error', original: '올바른 이메일 주소를 입력하세요', translated: 'Please enter a valid email address' },
                { key: 'error.network', category: 'error', original: '네트워크 오류가 발생했습니다', translated: 'A network error occurred' }
            ]
        }
    },
    computed: {
        filteredTranslations() {
            return this.translations.filter(item => {
                const matchesSearch = !this.searchQuery ||
                    item.key.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    item.original.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    item.translated.toLowerCase().includes(this.searchQuery.toLowerCase());
                const matchesCategory = !this.filterCategory || item.category === this.filterCategory;
                return matchesSearch && matchesCategory;
            });
        },
        translationProgress() {
            const translated = this.translations.filter(t => t.translated && t.translated.trim() !== '').length;
            return Math.round((translated / this.translations.length) * 100);
        }
    },
    methods: {
        selectLanguage(lang) {
            this.selectedLanguage = lang;
        },
        openAddLanguageModal() {
            alert('언어 추가 기능은 추후 구현 예정입니다.');
        },
        importTranslations() {
            alert('번역 가져오기 기능은 추후 구현 예정입니다.');
        },
        exportTranslations() {
            alert('번역 내보내기 기능은 추후 구현 예정입니다.');
        },
        saveTranslations() {
            alert('번역이 저장되었습니다.');
        }
    }
}
