export default {
    name: 'SEO',
    layout: 'admin',
    data() {
        return {
            seo: {
                siteTitle: 'LMS Platform - 온라인 학습의 새로운 시작',
                siteDescription: '전문가가 직접 제작한 고품질 온라인 강좌를 통해 새로운 기술을 배우고 커리어를 성장시키세요. 프로그래밍, 디자인, 마케팅 등 다양한 분야의 강좌를 제공합니다.',
                keywords: '온라인강좌, 프로그래밍, 웹개발, React, JavaScript, 디자인, 마케팅',
                siteUrl: 'https://lms.example.com',
                ogTitle: 'LMS Platform - 온라인 학습의 새로운 시작',
                ogDescription: '전문가가 직접 제작한 고품질 온라인 강좌로 커리어를 성장시키세요.',
                ogImage: null,
                robotsTxt: `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Sitemap: https://lms.example.com/sitemap.xml`,
                allowIndexing: true,
                allowFollow: true,
                sitemapUrl: 'https://lms.example.com/sitemap.xml',
                sitemapLastGenerated: '2024-12-19 09:00'
            }
        }
    },
    methods: {
        uploadOGImage(e) {
            const file = e.target.files[0];
            if (file) {
                this.seo.ogImage = URL.createObjectURL(file);
            }
        },
        generateSitemap() {
            this.seo.sitemapLastGenerated = new Date().toLocaleString('ko-KR');
            alert('사이트맵이 생성되었습니다.');
        },
        copySitemapUrl() {
            navigator.clipboard.writeText(this.seo.sitemapUrl);
            alert('사이트맵 URL이 복사되었습니다.');
        },
        saveSEO() {
            alert('SEO 설정이 저장되었습니다.');
        }
    }
}
