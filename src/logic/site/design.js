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
                maxWidth: '1400px',
                selectedHeaderTemplate: 1,
                selectedFooterTemplate: 1
            },
            headerTemplates: [
                {
                    id: 1,
                    name: '클래식 헤더',
                    description: '로고 왼쪽, 메뉴 오른쪽 배치',
                    layout: 'Logo | Menu',
                    position: '고정',
                    style: '화이트',
                    backgroundColor: '#ffffff',
                    height: '70px'
                },
                {
                    id: 2,
                    name: '센터 헤더',
                    description: '로고 중앙, 메뉴 양쪽 배치',
                    layout: 'Menu | Logo | Menu',
                    position: '고정',
                    style: '화이트',
                    backgroundColor: '#ffffff',
                    height: '80px'
                },
                {
                    id: 3,
                    name: '투명 헤더',
                    description: '배경 투명, 스크롤 시 색상 변경',
                    layout: 'Logo | Menu',
                    position: '투명',
                    style: '투명',
                    backgroundColor: 'transparent',
                    height: '70px'
                },
                {
                    id: 4,
                    name: '다크 헤더',
                    description: '어두운 배경, 대비 강조',
                    layout: 'Logo | Menu',
                    position: '고정',
                    style: '다크',
                    backgroundColor: '#2c3e50',
                    height: '70px'
                },
                {
                    id: 5,
                    name: '미니멀 헤더',
                    description: '얇은 헤더, 심플한 디자인',
                    layout: 'Logo | Menu',
                    position: '일반',
                    style: '화이트',
                    backgroundColor: '#ffffff',
                    height: '50px'
                },
                {
                    id: 6,
                    name: '메가 메뉴 헤더',
                    description: '드롭다운 메가 메뉴 지원',
                    layout: 'Logo | Mega Menu',
                    position: '고정',
                    style: '화이트',
                    backgroundColor: '#ffffff',
                    height: '80px'
                }
            ],
            footerTemplates: [
                {
                    id: 1,
                    name: '3단 푸터',
                    description: '회사정보, 링크, SNS로 구성',
                    columns: 3,
                    width: '전체',
                    backgroundColor: '#f8f9fa',
                    height: '200px'
                },
                {
                    id: 2,
                    name: '4단 푸터',
                    description: '상세한 정보 제공',
                    columns: 4,
                    width: '전체',
                    backgroundColor: '#f8f9fa',
                    height: '220px'
                },
                {
                    id: 3,
                    name: '미니멀 푸터',
                    description: '최소한의 정보만 표시',
                    columns: 1,
                    width: '컨테이너',
                    backgroundColor: '#ffffff',
                    height: '80px'
                },
                {
                    id: 4,
                    name: '다크 푸터',
                    description: '어두운 배경의 풀 푸터',
                    columns: 3,
                    width: '전체',
                    backgroundColor: '#2c3e50',
                    height: '250px'
                },
                {
                    id: 5,
                    name: '2단 심플 푸터',
                    description: '기본 정보와 링크',
                    columns: 2,
                    width: '컨테이너',
                    backgroundColor: '#f8f9fa',
                    height: '150px'
                },
                {
                    id: 6,
                    name: '뉴스레터 푸터',
                    description: '구독 폼 포함 푸터',
                    columns: 3,
                    width: '전체',
                    backgroundColor: '#ffffff',
                    height: '280px'
                }
            ]
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
        selectHeaderTemplate(templateId) {
            this.design.selectedHeaderTemplate = templateId;
            const template = this.headerTemplates.find(t => t.id === templateId);
            if (template) {
                // 템플릿에 따라 헤더 스타일 자동 설정
                if (template.position === '고정') {
                    this.design.headerStyle = 'fixed';
                } else if (template.position === '투명') {
                    this.design.headerStyle = 'transparent';
                } else {
                    this.design.headerStyle = 'static';
                }
            }
        },
        selectFooterTemplate(templateId) {
            this.design.selectedFooterTemplate = templateId;
            const template = this.footerTemplates.find(t => t.id === templateId);
            if (template) {
                // 템플릿에 따라 푸터 스타일 자동 설정
                if (template.width === '전체') {
                    this.design.footerStyle = 'full';
                } else if (template.width === '컨테이너') {
                    this.design.footerStyle = 'contained';
                } else {
                    this.design.footerStyle = 'minimal';
                }
            }
        },
        getHeaderPreviewStyle(template) {
            return {
                backgroundColor: template.backgroundColor,
                color: template.backgroundColor === '#2c3e50' ? '#ffffff' : '#000000',
                padding: '8px',
                borderRadius: '4px',
                height: '40px',
                display: 'flex',
                alignItems: 'center'
            };
        },
        getFooterPreviewStyle(template) {
            return {
                backgroundColor: template.backgroundColor,
                color: template.backgroundColor === '#2c3e50' ? '#ffffff' : '#000000',
                padding: '8px',
                borderRadius: '4px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            };
        },
        saveDesign() {
            const headerTemplate = this.headerTemplates.find(t => t.id === this.design.selectedHeaderTemplate);
            const footerTemplate = this.footerTemplates.find(t => t.id === this.design.selectedFooterTemplate);

            console.log('저장된 디자인:', {
                ...this.design,
                headerTemplateName: headerTemplate?.name,
                footerTemplateName: footerTemplate?.name
            });

            alert(`디자인 설정이 저장되었습니다.\n\n헤더 템플릿: ${headerTemplate?.name}\n푸터 템플릿: ${footerTemplate?.name}`);
        }
    }
}
