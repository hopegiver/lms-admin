export default {
    name: 'Design',
    layout: 'admin',
    data() {
        return {
            design: {
                primaryColor: '#0d6efd',
                secondaryColor: '#6c757d',
                fontFamily: 'Pretendard',
                fontSize: '16px',
                borderRadius: '8px',
                shadowStyle: 'soft',
                logo: null,
                favicon: null,
                headerStyle: 'fixed',
                footerStyle: 'full',
                maxWidth: '1400px'
            }
        }
    },
    computed: {
        previewStyle() {
            return {
                fontFamily: this.design.fontFamily,
                fontSize: this.design.fontSize,
                backgroundColor: '#f8f9fa',
                minHeight: '300px'
            };
        },
        cardStyle() {
            const shadows = {
                'none': 'none',
                'soft': '0 2px 8px rgba(0,0,0,0.08)',
                'medium': '0 4px 12px rgba(0,0,0,0.12)',
                'strong': '0 8px 24px rgba(0,0,0,0.16)'
            };
            return {
                backgroundColor: '#fff',
                borderRadius: this.design.borderRadius,
                boxShadow: shadows[this.design.shadowStyle]
            };
        }
    },
    methods: {
        uploadLogo(e) {
            const file = e.target.files[0];
            if (file) {
                this.design.logo = URL.createObjectURL(file);
            }
        },
        uploadFavicon(e) {
            const file = e.target.files[0];
            if (file) {
                this.design.favicon = URL.createObjectURL(file);
            }
        },
        saveDesign() {
            alert('디자인 설정이 저장되었습니다.');
        }
    }
}
