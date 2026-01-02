export default {
    name: 'Menus',
    layout: 'admin',
    data() {
        return {
            selectedMenu: null,
            showItemModal: false,
            editingItem: null,
            editingItemIndex: null,
            itemForm: {
                label: '',
                linkType: 'url',
                url: '',
                resourceId: '',
                openNewTab: false
            },
            courseSearchKeyword: '',
            productSearchKeyword: '',
            showCourseDropdown: false,
            showProductDropdown: false,
            // 리소스 데이터
            pages: [
                { id: 1, title: '회사소개', slug: 'about' },
                { id: 2, title: '이용약관', slug: 'terms' },
                { id: 3, title: '개인정보처리방침', slug: 'privacy' },
                { id: 4, title: '환불정책', slug: 'refund-policy' },
                { id: 5, title: 'FAQ', slug: 'faq' }
            ],
            courses: [
                { id: 1, title: 'React 완벽 가이드', instructor: '김개발', slug: 'react-complete-guide' },
                { id: 2, title: 'Python 데이터 분석', instructor: '이데이터', slug: 'python-data-analysis' },
                { id: 3, title: 'JavaScript ES6+', instructor: '박자바', slug: 'javascript-es6' },
                { id: 4, title: 'AWS 클라우드 입문', instructor: '최클라우드', slug: 'aws-cloud-intro' },
                { id: 5, title: 'UX 디자인 원칙', instructor: '정디자인', slug: 'ux-design-principles' }
            ],
            courseCategories: [
                { id: 1, name: '프로그래밍', parentId: null, sortOrder: 1, slug: 'programming' },
                { id: 2, name: '웹 개발', parentId: 1, sortOrder: 1, slug: 'web-dev' },
                { id: 3, name: '모바일 개발', parentId: 1, sortOrder: 2, slug: 'mobile-dev' },
                { id: 4, name: '백엔드', parentId: 1, sortOrder: 3, slug: 'backend' },
                { id: 5, name: '디자인', parentId: null, sortOrder: 2, slug: 'design' },
                { id: 6, name: 'UI/UX', parentId: 5, sortOrder: 1, slug: 'ui-ux' },
                { id: 7, name: '그래픽 디자인', parentId: 5, sortOrder: 2, slug: 'graphic-design' },
                { id: 8, name: '마케팅', parentId: null, sortOrder: 3, slug: 'marketing' }
            ],
            products: [
                { id: 1, name: 'React 완벽 가이드 2024', price: '₩149,000', slug: 'react-guide-2024' },
                { id: 2, name: 'Python 데이터 분석 마스터', price: '₩129,000', slug: 'python-data-master' },
                { id: 3, name: '클린 코드', price: '₩29,700', slug: 'clean-code' },
                { id: 4, name: 'LMS 로고 티셔츠', price: '₩29,000', slug: 'lms-tshirt' },
                { id: 5, name: '개발자 머그컵', price: '₩12,000', slug: 'dev-mug' }
            ],
            productCategories: [
                { id: 1, name: '도서', parentId: null, sortOrder: 1, slug: 'books' },
                { id: 2, name: 'IT/프로그래밍', parentId: 1, sortOrder: 1, slug: 'it-programming' },
                { id: 3, name: '경영/경제', parentId: 1, sortOrder: 2, slug: 'business' },
                { id: 4, name: '굿즈', parentId: null, sortOrder: 2, slug: 'goods' },
                { id: 5, name: '의류', parentId: 4, sortOrder: 1, slug: 'apparel' },
                { id: 6, name: '문구/잡화', parentId: 4, sortOrder: 2, slug: 'stationery' }
            ],
            boards: [
                { id: 1, name: '공지사항', slug: 'notice' },
                { id: 2, name: '자유게시판', slug: 'free' },
                { id: 3, name: 'Q&A', slug: 'qna' },
                { id: 4, name: '자료실', slug: 'resources' },
                { id: 5, name: '수강후기', slug: 'reviews' }
            ],
            menus: [
                {
                    id: 1, name: '메인 네비게이션', location: '상단 헤더', itemsCount: 5,
                    items: [
                        { id: 1, label: '홈', linkType: 'url', url: '/', resourceId: '', openNewTab: false },
                        { id: 2, label: '강좌', linkType: 'url', url: '/courses', resourceId: '', openNewTab: false },
                        { id: 3, label: '로드맵', linkType: 'url', url: '/roadmaps', resourceId: '', openNewTab: false },
                        { id: 4, label: '커뮤니티', linkType: 'url', url: '/community', resourceId: '', openNewTab: false },
                        { id: 5, label: '이벤트', linkType: 'url', url: '/events', resourceId: '', openNewTab: false }
                    ]
                },
                {
                    id: 2, name: '푸터 링크', location: '하단 푸터', itemsCount: 4,
                    items: [
                        { id: 1, label: '이용약관', linkType: 'url', url: '/terms', resourceId: '', openNewTab: false },
                        { id: 2, label: '개인정보처리방침', linkType: 'url', url: '/privacy', resourceId: '', openNewTab: false },
                        { id: 3, label: '고객센터', linkType: 'url', url: '/support', resourceId: '', openNewTab: false },
                        { id: 4, label: '회사소개', linkType: 'url', url: '/about', resourceId: '', openNewTab: false }
                    ]
                },
                {
                    id: 3, name: '사이드바 메뉴', location: '학습 페이지 사이드바', itemsCount: 3,
                    items: [
                        { id: 1, label: '내 강좌', linkType: 'url', url: '/my/courses', resourceId: '', openNewTab: false },
                        { id: 2, label: '학습 현황', linkType: 'url', url: '/my/progress', resourceId: '', openNewTab: false },
                        { id: 3, label: '수료증', linkType: 'url', url: '/my/certificates', resourceId: '', openNewTab: false }
                    ]
                },
                {
                    id: 4, name: '모바일 메뉴', location: '모바일 햄버거 메뉴', itemsCount: 6,
                    items: [
                        { id: 1, label: '홈', linkType: 'url', url: '/', resourceId: '', openNewTab: false },
                        { id: 2, label: '강좌', linkType: 'url', url: '/courses', resourceId: '', openNewTab: false },
                        { id: 3, label: '내 학습', linkType: 'url', url: '/my/courses', resourceId: '', openNewTab: false },
                        { id: 4, label: '커뮤니티', linkType: 'url', url: '/community', resourceId: '', openNewTab: false },
                        { id: 5, label: '고객센터', linkType: 'url', url: '/support', resourceId: '', openNewTab: false },
                        { id: 6, label: '로그인', linkType: 'url', url: '/login', resourceId: '', openNewTab: false }
                    ]
                }
            ]
        }
    },
    computed: {
        sortedCourseCategories() {
            return this.getSortedCategories(this.courseCategories);
        },
        sortedProductCategories() {
            return this.getSortedCategories(this.productCategories);
        },
        filteredCourses() {
            if (!this.courseSearchKeyword) return this.courses;
            const keyword = this.courseSearchKeyword.toLowerCase();
            return this.courses.filter(c =>
                c.title.toLowerCase().includes(keyword) ||
                c.instructor.toLowerCase().includes(keyword)
            );
        },
        filteredProducts() {
            if (!this.productSearchKeyword) return this.products;
            const keyword = this.productSearchKeyword.toLowerCase();
            return this.products.filter(p =>
                p.name.toLowerCase().includes(keyword)
            );
        }
    },
    methods: {
        selectMenu(menu) {
            this.selectedMenu = menu;
        },
        viewDetail(menu) {
            this.navigateTo('/site/menus-detail', {id: menu.id});
        },
        openCreateMenuModal() {
            this.navigateTo('/site/menus-create');
        },
        addMenuItem() {
            this.editingItem = null;
            this.editingItemIndex = null;
            this.itemForm = {
                label: '',
                linkType: 'url',
                url: '',
                resourceId: '',
                openNewTab: false
            };
            this.courseSearchKeyword = '';
            this.productSearchKeyword = '';
            this.showItemModal = true;
        },
        editMenuItem(item) {
            const index = this.selectedMenu.items.indexOf(item);
            this.editingItem = item;
            this.editingItemIndex = index;
            this.itemForm = {
                label: item.label,
                linkType: item.linkType || 'url',
                url: item.url || '',
                resourceId: item.resourceId || '',
                openNewTab: item.openNewTab || false
            };
            this.courseSearchKeyword = '';
            this.productSearchKeyword = '';
            this.showItemModal = true;
        },
        closeItemModal() {
            this.showItemModal = false;
            this.editingItem = null;
            this.editingItemIndex = null;
        },
        saveMenuItem() {
            if (!this.itemForm.label.trim()) {
                alert('메뉴 이름을 입력해주세요.');
                return;
            }

            // URL 생성
            let url = '';
            if (this.itemForm.linkType === 'url') {
                if (!this.itemForm.url.trim()) {
                    alert('URL을 입력해주세요.');
                    return;
                }
                url = this.itemForm.url;
            } else {
                if (!this.itemForm.resourceId) {
                    alert('항목을 선택해주세요.');
                    return;
                }
                url = this.buildUrl(this.itemForm.linkType, this.itemForm.resourceId);
            }

            const menuItem = {
                id: this.editingItem ? this.editingItem.id : Date.now(),
                label: this.itemForm.label,
                linkType: this.itemForm.linkType,
                url: url,
                resourceId: this.itemForm.resourceId,
                openNewTab: this.itemForm.openNewTab
            };

            if (this.editingItem) {
                // 수정
                Object.assign(this.editingItem, menuItem);
            } else {
                // 추가
                this.selectedMenu.items.push(menuItem);
                this.selectedMenu.itemsCount = this.selectedMenu.items.length;
            }

            this.closeItemModal();
        },
        removeMenuItem(index) {
            if (confirm('이 메뉴 항목을 삭제하시겠습니까?')) {
                this.selectedMenu.items.splice(index, 1);
                this.selectedMenu.itemsCount = this.selectedMenu.items.length;
            }
        },
        saveMenu() {
            alert('메뉴가 저장되었습니다.');
        },

        // 리소스 URL 생성
        buildUrl(linkType, resourceId) {
            let resource;
            switch (linkType) {
                case 'page':
                    resource = this.pages.find(p => p.id === resourceId);
                    return resource ? `/pages/${resource.slug}` : '#';
                case 'course':
                    resource = this.courses.find(c => c.id === resourceId);
                    return resource ? `/courses/${resource.slug}` : '#';
                case 'course-category':
                    resource = this.courseCategories.find(c => c.id === resourceId);
                    return resource ? `/courses?category=${resource.slug}` : '#';
                case 'product':
                    resource = this.products.find(p => p.id === resourceId);
                    return resource ? `/products/${resource.slug}` : '#';
                case 'product-category':
                    resource = this.productCategories.find(c => c.id === resourceId);
                    return resource ? `/products?category=${resource.slug}` : '#';
                case 'board':
                    resource = this.boards.find(b => b.id === resourceId);
                    return resource ? `/board/${resource.slug}` : '#';
                default:
                    return '#';
            }
        },

        getPreviewUrl() {
            if (this.itemForm.linkType === 'url') {
                return this.itemForm.url || '/';
            }
            if (!this.itemForm.resourceId) {
                return '(리소스를 선택하세요)';
            }
            return this.buildUrl(this.itemForm.linkType, this.itemForm.resourceId);
        },

        getLinkTypeLabel(linkType) {
            const labels = {
                'url': 'URL',
                'page': '페이지',
                'course': '강좌',
                'course-category': '강좌 카테고리',
                'product': '상품',
                'product-category': '상품 카테고리',
                'board': '게시판'
            };
            return labels[linkType] || 'URL';
        },

        // 강좌/상품 선택
        selectCourse(course) {
            this.itemForm.resourceId = course.id;
            this.courseSearchKeyword = '';
            this.showCourseDropdown = false;
        },

        selectProduct(product) {
            this.itemForm.resourceId = product.id;
            this.productSearchKeyword = '';
            this.showProductDropdown = false;
        },

        getSelectedCourseName() {
            const course = this.courses.find(c => c.id === this.itemForm.resourceId);
            return course ? course.title : '';
        },

        getSelectedProductName() {
            const product = this.products.find(p => p.id === this.itemForm.resourceId);
            return product ? product.name : '';
        },

        // 카테고리 정렬 및 표시
        getSortedCategories(categories) {
            const result = [];
            const parents = categories
                .filter(c => !c.parentId)
                .sort((a, b) => a.sortOrder - b.sortOrder);

            parents.forEach(parent => {
                result.push(parent);
                const children = categories
                    .filter(c => c.parentId === parent.id)
                    .sort((a, b) => a.sortOrder - b.sortOrder);
                children.forEach(child => {
                    result.push(child);
                });
            });

            return result;
        },

        getCategoryDisplayName(category) {
            if (category.parentId) {
                return `  → ${category.name}`;
            }
            return category.name;
        }
    }
}
