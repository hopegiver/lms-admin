export default {
    name: 'Banners',
    layout: 'admin',
    data() {
        return {
            activeTab: 'banners',
            banners: [
                { id: 1, title: '연말 특별 할인 이벤트', location: '메인 상단 슬라이더', image: null, isActive: true, startDate: '2024-12-01', endDate: '2024-12-31' },
                { id: 2, title: '신규 강좌 오픈 안내', location: '메인 중간 배너', image: null, isActive: true, startDate: '2024-12-15', endDate: '2025-01-15' },
                { id: 3, title: '앱 다운로드 프로모션', location: '하단 고정 배너', image: null, isActive: false, startDate: '2024-11-01', endDate: '2024-12-31' },
                { id: 4, title: '수강 후기 이벤트', location: '강좌 상세 사이드', image: null, isActive: true, startDate: '2024-12-10', endDate: '2025-01-10' }
            ],
            popups: [
                { id: 1, title: '2024 연말 특별 할인', displayPage: '전체 페이지', size: '500x400', isActive: true, startDate: '2024-12-01', endDate: '2024-12-31' },
                { id: 2, title: '설문조사 참여 안내', displayPage: '로그인 후 메인', size: '400x300', isActive: false, startDate: '2024-12-15', endDate: '2024-12-25' },
                { id: 3, title: '신규 가입 쿠폰 안내', displayPage: '회원가입 완료', size: '450x350', isActive: true, startDate: '2024-01-01', endDate: '2025-12-31' }
            ]
        }
    },
    methods: {
        openCreateBannerModal() {
            alert('배너 추가 기능은 추후 구현 예정입니다.');
        },
        openCreatePopupModal() {
            alert('팝업 추가 기능은 추후 구현 예정입니다.');
        },
        editBanner(banner) {
            alert(`${banner.title} 수정 기능은 추후 구현 예정입니다.`);
        },
        toggleBanner(banner) {
            banner.isActive = !banner.isActive;
        },
        deleteBanner(banner) {
            if (confirm(`${banner.title} 배너를 삭제하시겠습니까?`)) {
                const index = this.banners.indexOf(banner);
                if (index > -1) this.banners.splice(index, 1);
            }
        },
        previewPopup(popup) {
            alert(`${popup.title} 미리보기`);
        },
        editPopup(popup) {
            alert(`${popup.title} 수정 기능은 추후 구현 예정입니다.`);
        },
        deletePopup(popup) {
            if (confirm(`${popup.title} 팝업을 삭제하시겠습니까?`)) {
                const index = this.popups.indexOf(popup);
                if (index > -1) this.popups.splice(index, 1);
            }
        }
    }
}
