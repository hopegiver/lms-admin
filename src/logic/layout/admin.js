export default {
    name: 'adminLayout',
    layout: null,
    data() {
        return {
            sidebarOpen: false,
            expandedMenuId: '',
            sidebarMenus: [
                { id: 'dashboard', name: '대시보드', icon: '📊', path: '/dashboard' },
                { id: 'users', name: '사용자', icon: '👥', path: '/users/learners' },
                { id: 'learning', name: '학습 관리', icon: '📚', path: '/learning/courses' },
                { id: 'commerce', name: '판매 관리', icon: '🛒', path: '/commerce/products' },
                { id: 'community', name: '커뮤니티', icon: '💬', path: '/community/boards' },
                { id: 'marketing', name: '마케팅', icon: '📢', path: '/marketing/campaigns' },
                { id: 'site', name: '사이트', icon: '🌐', path: '/site/pages' },
                { id: 'analytics', name: '통계', icon: '📈', path: '/analytics/overview' },
                { id: 'settings', name: '설정', icon: '⚙️', path: '/settings/general' }
            ],
            sidebarSubmenus: {
                dashboard: [],
                marketing: [
                    { id: 'campaigns', name: '캠페인 관리', icon: '📋', path: '/marketing/campaigns' },
                    { id: 'email', name: '이메일 발송', icon: '📧', path: '/marketing/email' },
                    { id: 'sms', name: 'SMS 발송', icon: '💬', path: '/marketing/sms' },
                    { id: 'push', name: '푸시 알림', icon: '🔔', path: '/marketing/push' },
                    { id: 'history', name: '발송 내역', icon: '📜', path: '/marketing/history' },
                    { id: 'groups', name: '수신자 그룹', icon: '👥', path: '/marketing/groups' }
                ],
                users: [
                    { id: 'learners', name: '학습자', icon: '👤', path: '/users/learners' },
                    { id: 'instructors', name: '강사', icon: '👨‍🏫', path: '/users/instructors' },
                    { id: 'admins', name: '관리자', icon: '🔑', path: '/users/admins' },
                    { id: 'organizations', name: '조직', icon: '🏢', path: '/users/organizations' }
                ],
                learning: [
                    { id: 'courses', name: '강좌', icon: '📖', path: '/learning/courses' },
                    { id: 'assessments', name: '평가', icon: '📝', path: '/learning/assessments' },
                    { id: 'enrollments', name: '수강 관리', icon: '✅', path: '/learning/enrollments' },
                    { id: 'progress', name: '학습 현황', icon: '📈', path: '/learning/progress' },
                    { id: 'content', name: '콘텐츠', icon: '🎬', path: '/learning/content' },
                    { id: 'webinar-reservations', name: '화상강의', icon: '🎥', path: '/learning/webinar-reservations' }
                ],
                commerce: [
                    { id: 'products', name: '상품', icon: '📦', path: '/commerce/products' },
                    { id: 'orders', name: '주문', icon: '🧾', path: '/commerce/orders', badge: 3 },
                    { id: 'payments', name: '결제', icon: '💳', path: '/commerce/payments' },
                    { id: 'promotions', name: '프로모션', icon: '🎫', path: '/commerce/promotions' },
                    { id: 'settlements', name: '정산', icon: '💰', path: '/commerce/settlements' },
                    { id: 'affiliates', name: '제휴', icon: '🤝', path: '/commerce/affiliates' }
                ],
                community: [
                    { id: 'boards', name: '게시판', icon: '📋', path: '/community/boards' },
                    { id: 'inquiries', name: '문의 관리', icon: '💬', path: '/community/inquiries', badge: 12 }
                ],
                site: [
                    { id: 'main-page', name: '메인페이지', icon: '🏠', path: '/site/main-page' },
                    { id: 'pages', name: '페이지', icon: '📄', path: '/site/pages' },
                    { id: 'menus', name: '메뉴', icon: '☰', path: '/site/menus' },
                    { id: 'design', name: '디자인', icon: '🎨', path: '/site/design' },
                    { id: 'banners', name: '배너/팝업', icon: '🖼️', path: '/site/banners' },
                    { id: 'seo', name: 'SEO', icon: '🔍', path: '/site/seo' },
                    { id: 'locales', name: '다국어', icon: '🌍', path: '/site/locales' }
                ],
                settings: [
                    { id: 'general', name: '기본 설정', icon: '⚙️', path: '/settings/general' },
                    { id: 'learning', name: '학습 설정', icon: '📚', path: '/settings/learning' },
                    { id: 'certificates', name: '수료증 템플릿', icon: '🎓', path: '/settings/certificates' },
                    { id: 'payment', name: '결제 설정', icon: '💳', path: '/settings/payment' },
                    { id: 'notifications', name: '알림 설정', icon: '🔔', path: '/settings/notifications' },
                    { id: 'integrations', name: '연동 설정', icon: '🔗', path: '/settings/integrations' },
                    { id: 'permissions', name: '권한 관리', icon: '🔐', path: '/settings/permissions' },
                    { id: 'system', name: '시스템', icon: '🖥️', path: '/settings/system' }
                ],
                analytics: [
                    { id: 'overview', name: '통합 대시보드', icon: '📊', path: '/analytics/overview' },
                    { id: 'learning', name: '학습 분석', icon: '📚', path: '/analytics/learning' },
                    { id: 'revenue', name: '매출 분석', icon: '💰', path: '/analytics/revenue' },
                    { id: 'users', name: '사용자 분석', icon: '👥', path: '/analytics/users' },
                    { id: 'marketing', name: '마케팅 분석', icon: '📢', path: '/analytics/marketing' },
                    { id: 'content', name: '콘텐츠 분석', icon: '🎬', path: '/analytics/content' },
                    { id: 'community', name: '커뮤니티 분석', icon: '💬', path: '/analytics/community' },
                    { id: 'assessments', name: '평가 분석', icon: '📝', path: '/analytics/assessments' },
                    { id: 'realtime', name: '실시간 모니터링', icon: '⚡', path: '/analytics/realtime' },
                    { id: 'system', name: '시스템 분석', icon: '🖥️', path: '/analytics/system' }
                ]
            }
        }
    },
    mounted() {
        // 현재 라우트에서 메뉴 ID 추출
        const path = this.$router ? this.$router.getCurrentRoute() : '';

        if (path) {
            const parts = path.split('/').filter(Boolean);
            if (parts.length >= 1) {
                this.expandedMenuId = parts[0];
            }
        }
    },
    methods: {
        toggleSidebar() {
            this.sidebarOpen = !this.sidebarOpen;
        },
        closeSidebar() {
            this.sidebarOpen = false;
        },
        openSite() {
            // 현재는 사용자 사이트가 없으므로 확인창만 표시
            if (confirm('사용자 사이트를 새 창으로 여시겠습니까?\n(현재는 구현되지 않았습니다)')) {
                // 추후 실제 사이트 URL로 새 창 열기
                // window.open('https://your-site-url.com', '_blank');
                alert('사용자 사이트가 아직 구현되지 않았습니다.');
            }
        },
        handleLogout() {
            if (confirm('로그아웃 하시겠습니까?')) {
                this.navigateTo('/dashboard');
            }
        }
    }
}
