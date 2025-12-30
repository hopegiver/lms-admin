export default {
    name: 'BannersDetail',
    layout: 'admin',
    data() {
        return {
            currentTab: 'info',
            bannerId: null,
            banner: null,
            hourlyStats: []
        }
    },
    methods: {
        getTypeText(type) {
            return type === 'banner' ? '배너' : '팝업';
        },

        getStatusText(status) {
            const statuses = {
                'active': '활성',
                'inactive': '비활성',
                'scheduled': '예약됨'
            };
            return statuses[status] || status;
        },

        getStatusClass(status) {
            const classes = {
                'active': 'bg-success',
                'inactive': 'bg-secondary',
                'scheduled': 'bg-warning'
            };
            return classes[status] || 'bg-secondary';
        },

        getLocationText(location) {
            const locations = {
                'main_top': '메인 상단',
                'main_middle': '메인 중간',
                'main_bottom': '메인 하단',
                'sidebar': '사이드바',
                'popup_center': '팝업 (중앙)'
            };
            return locations[location] || location;
        },

        getTargetAudienceText(target) {
            const targets = {
                'all': '전체 사용자',
                'guest': '비회원만',
                'member': '회원만',
                'new_member': '신규 회원'
            };
            return targets[target] || target;
        },

        getTargetPagesText(pages) {
            const pageTypes = {
                'all': '전체 페이지',
                'home': '홈페이지만',
                'courses': '강좌 페이지',
                'specific': '특정 페이지'
            };
            return pageTypes[pages] || pages;
        },

        getActiveAlertClass() {
            const now = new Date();
            const start = new Date(this.banner.startDate);
            const end = new Date(this.banner.endDate);

            if (now < start) return 'alert-warning';
            if (now > end) return 'alert-secondary';
            return 'alert-success';
        },

        getActiveStatusText() {
            const now = new Date();
            const start = new Date(this.banner.startDate);
            const end = new Date(this.banner.endDate);

            if (now < start) return '노출 예정입니다.';
            if (now > end) return '노출 기간이 종료되었습니다.';
            return '현재 노출 중입니다.';
        },

        async loadBanner() {
            try {
                // API 호출 시뮬레이션
                // const response = await this.$api.get(`/api/site/banners/${this.bannerId}`);

                // 임시 데이터
                this.banner = {
                    id: this.bannerId,
                    title: '신규 강좌 오픈 안내',
                    type: 'banner',
                    status: 'active',
                    imageUrl: 'https://via.placeholder.com/1200x400?text=New+Course+Banner',
                    linkUrl: '/courses/new',
                    linkTarget: '_self',
                    location: 'main_top',
                    priority: 1,
                    startDate: '2024-01-10 00:00',
                    endDate: '2024-02-10 23:59',
                    targetAudience: 'all',
                    targetPages: 'all',
                    specificPages: null,
                    popupWidth: 600,
                    popupHeight: 800,
                    showCloseButton: true,
                    showTodayClose: true,
                    impressions: 12450,
                    clicks: 623,
                    ctr: 5.0,
                    imageWidth: 1200,
                    imageHeight: 400,
                    fileSize: '245KB',
                    createdAt: '2024-01-10 14:30'
                };

                this.loadHourlyStats();
            } catch (error) {
                alert('배너 정보를 불러오는데 실패했습니다: ' + error.message);
            }
        },

        loadHourlyStats() {
            this.hourlyStats = [
                { hour: '09', impressions: 450, clicks: 23, ctr: 5.1 },
                { hour: '10', impressions: 520, clicks: 28, ctr: 5.4 },
                { hour: '11', impressions: 610, clicks: 32, ctr: 5.2 },
                { hour: '12', impressions: 480, clicks: 21, ctr: 4.4 },
                { hour: '13', impressions: 390, clicks: 18, ctr: 4.6 },
                { hour: '14', impressions: 550, clicks: 29, ctr: 5.3 },
                { hour: '15', impressions: 590, clicks: 31, ctr: 5.3 },
                { hour: '16', impressions: 520, clicks: 26, ctr: 5.0 }
            ];
        },

        preview() {
            // 실제 구현에서는 모달이나 새 창으로 미리보기 표시
            alert('미리보기 기능은 추후 구현 예정입니다.');
        },

        edit() {
            this.navigateTo(`/site/banners/edit?id=${this.bannerId}`);
        },

        async deleteBanner() {
            if (confirm('정말 삭제하시겠습니까?')) {
                try {
                    // API 호출 시뮬레이션
                    // await this.$api.delete(`/api/site/banners/${this.bannerId}`);

                    alert('배너/팝업이 삭제되었습니다.');
                    this.navigateTo('/site/banners');
                } catch (error) {
                    alert('삭제에 실패했습니다: ' + error.message);
                }
            }
        }
    },
    mounted() {
        // 쿼리 파라미터에서 ID 추출
        const params = new URLSearchParams(window.location.search);
        this.bannerId = params.get('id');

        if (!this.bannerId) {
            alert('배너 ID가 없습니다.');
            this.navigateTo('/site/banners');
            return;
        }

        this.loadBanner();
    }
}
