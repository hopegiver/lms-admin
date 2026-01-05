export default {
    name: 'Courses',
    layout: 'admin',
    data() {
        return {
            searchQuery: '',
            filters: {
                status: '',
                category: '',
                instructor: '',
                courseType: ''
            },
            selectAll: false,
            selectedIds: [],
            currentPage: 1,
            pageSize: 10,
            totalCount: 89,
            categories: [
                { id: 1, name: '프로그래밍', parentId: null, sortOrder: 1 },
                { id: 2, name: '웹 개발', parentId: 1, sortOrder: 1 },
                { id: 3, name: '모바일 개발', parentId: 1, sortOrder: 2 },
                { id: 4, name: '백엔드', parentId: 1, sortOrder: 3 },
                { id: 5, name: '디자인', parentId: null, sortOrder: 2 },
                { id: 6, name: 'UI/UX', parentId: 5, sortOrder: 1 },
                { id: 7, name: '그래픽 디자인', parentId: 5, sortOrder: 2 },
                { id: 8, name: '마케팅', parentId: null, sortOrder: 3 },
                { id: 9, name: '디지털 마케팅', parentId: 8, sortOrder: 1 },
                { id: 10, name: '콘텐츠 마케팅', parentId: 8, sortOrder: 2 }
            ],
            instructors: [
                { id: 1, name: '김개발' },
                { id: 2, name: '이데이터' },
                { id: 3, name: '박자바' },
                { id: 4, name: '최클라우드' }
            ],
            courses: [
                { id: 1, title: 'React 완벽 가이드', courseType: 'self-paced', category: '개발', instructor: '김개발', lessons: 45, duration: '12시간', students: 1250, rating: 4.9, price: '₩99,000', status: 'published' },
                { id: 2, title: 'Python 데이터 분석 - 2024년 1월 기수', courseType: 'cohort', cohortNumber: 1, category: '데이터', instructor: '이데이터', lessons: 38, duration: '10시간', students: 25, capacity: 30, startDate: '2024-01-15', endDate: '2024-04-15', registrationEndDate: '2024-01-10', rating: 4.8, price: '₩120,000', status: 'published' },
                { id: 3, title: 'JavaScript ES6+', courseType: 'self-paced', category: '개발', instructor: '박자바', lessons: 32, duration: '8시간', students: 856, rating: 4.7, price: '₩79,000', status: 'published' },
                { id: 4, title: 'AWS 클라우드 실무 - 주말 집체', courseType: 'in-person', cohortNumber: 3, category: '개발', instructor: '최클라우드', lessons: 16, duration: '32시간', location: '서울 강남구 테헤란로 123', students: 18, capacity: 20, startDate: '2024-02-03', endDate: '2024-02-25', registrationEndDate: '2024-01-28', rating: 4.6, price: '₩450,000', status: 'published' },
                { id: 5, title: 'UX 디자인 원칙', courseType: 'self-paced', category: '디자인', instructor: '정디자인', lessons: 24, duration: '6시간', students: 450, rating: 4.5, price: '₩69,000', status: 'draft' },
                { id: 6, title: '풀스택 개발자 과정 - 4기 (혼합)', courseType: 'blended', cohortNumber: 4, category: '개발', instructor: '김개발', lessons: 60, duration: '120시간', location: '서울 강남구 역삼동 456', onlineRatio: 60, offlineRatio: 40, students: 22, capacity: 25, startDate: '2024-03-04', endDate: '2024-06-28', registrationEndDate: '2024-02-25', rating: 4.9, price: '₩1,200,000', status: 'published' },
                { id: 7, title: 'Python 데이터 분석 - 2024년 4월 기수', courseType: 'cohort', cohortNumber: 2, templateCourseId: 2, category: '데이터', instructor: '이데이터', lessons: 38, duration: '10시간', students: 12, capacity: 30, startDate: '2024-04-20', endDate: '2024-07-20', registrationEndDate: '2024-04-15', rating: 0, price: '₩120,000', status: 'published' }
            ]
        }
    },
    watch: {
        filters: {
            deep: true,
            handler() {
                this.currentPage = 1;
            }
        },
        searchQuery() {
            this.currentPage = 1;
        }
    },
    computed: {
        filteredCourses() {
            let result = this.courses;

            // 상태 필터
            if (this.filters.status) {
                result = result.filter(c => c.status === this.filters.status);
            }

            // 카테고리 필터
            if (this.filters.category) {
                result = result.filter(c => c.category === this.filters.category);
            }

            // 강사 필터
            if (this.filters.instructor) {
                result = result.filter(c => c.instructor === this.filters.instructor);
            }

            // 강좌 유형 필터
            if (this.filters.courseType) {
                result = result.filter(c => c.courseType === this.filters.courseType);
            }

            // 검색어 필터
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                result = result.filter(c =>
                    c.title.toLowerCase().includes(query) ||
                    c.instructor.toLowerCase().includes(query) ||
                    c.category.toLowerCase().includes(query)
                );
            }

            return result;
        },
        totalPages() {
            return Math.ceil(this.filteredCourses.length / this.pageSize);
        },
        paginatedCourses() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.filteredCourses.slice(start, end);
        },
        sortedCategories() {
            // 계층 구조를 유지하면서 선택상자용 리스트 생성
            const result = [];
            const parents = this.categories
                .filter(c => !c.parentId)
                .sort((a, b) => a.sortOrder - b.sortOrder);

            parents.forEach(parent => {
                result.push(parent);
                const children = this.categories
                    .filter(c => c.parentId === parent.id)
                    .sort((a, b) => a.sortOrder - b.sortOrder);
                children.forEach(child => {
                    result.push(child);
                });
            });

            return result;
        }
    },
    methods: {
        getStatusClass(status) {
            return { 'published': 'bg-success', 'draft': 'bg-warning text-dark', 'closed': 'bg-secondary' }[status] || 'bg-secondary';
        },
        getStatusText(status) {
            return { 'published': '판매중', 'draft': '준비중', 'closed': '판매종료' }[status] || status;
        },
        getCourseTypeLabel(type) {
            const labels = {
                'self-paced': '자기주도',
                'cohort': '코호트',
                'in-person': '집체교육',
                'blended': '혼합교육'
            };
            return labels[type] || '자기주도';
        },
        getCourseTypeClass(type) {
            const classes = {
                'self-paced': 'bg-info',
                'cohort': 'bg-primary',
                'in-person': 'bg-success',
                'blended': 'bg-warning text-dark'
            };
            return classes[type] || 'bg-info';
        },
        getCourseTypeIcon(type) {
            const icons = {
                'self-paced': '📚',
                'cohort': '👥',
                'in-person': '🏫',
                'blended': '🔄'
            };
            return icons[type] || '📚';
        },
        isScheduledCourse(course) {
            return ['cohort', 'in-person', 'blended'].includes(course.courseType);
        },
        getEnrollmentStatus(course) {
            if (!this.isScheduledCourse(course)) return null;

            const today = new Date();
            const startDate = new Date(course.startDate);
            const endDate = new Date(course.endDate);
            const regEndDate = new Date(course.registrationEndDate);

            if (today < regEndDate) {
                const spotsLeft = course.capacity - course.students;
                if (spotsLeft <= 0) return { text: '마감', class: 'bg-danger' };
                if (spotsLeft <= 3) return { text: `${spotsLeft}석 남음`, class: 'bg-warning text-dark' };
                return { text: '모집중', class: 'bg-success' };
            }
            if (today >= startDate && today <= endDate) {
                return { text: '진행중', class: 'bg-primary' };
            }
            if (today > endDate) {
                return { text: '종료', class: 'bg-secondary' };
            }
            return { text: '대기', class: 'bg-info' };
        },
        toggleSelectAll() {
            this.selectedIds = this.selectAll ? this.filteredCourses.map(c => c.id) : [];
        },
        viewDetail(course) {
            this.navigateTo('/learning/courses-detail', { id: course.id });
        },
        openCreateWizard() { this.navigateTo('/learning/courses-create'); },
        openCreateModal() {
            alert('고급 강좌 생성 기능은 추후 구현 예정입니다. 지금은 "간편 생성"을 이용해주세요.');
        },
        openCategoryModal() { this.navigateTo('/learning/categories'); },
        getCategoryDisplayName(category) {
            if (category.parentId) {
                const parent = this.categories.find(c => c.id === category.parentId);
                return `  → ${category.name}`;
            }
            return category.name;
        },
        editCourse(course) { this.navigateTo('/learning/courses-detail', { id: course.id }); },
        manageCurriculum(course) { this.navigateTo('/learning/curriculum', { courseId: course.id }); },
        copyCourse(course) { alert(`${course.title} 복사 기능은 추후 구현 예정입니다.`); },
        previewCourse(course) { alert(`${course.title} 미리보기 기능은 추후 구현 예정입니다.`); },
        deleteCourse(course) { if (confirm(`${course.title}을(를) 삭제하시겠습니까?`)) alert('삭제 기능은 추후 구현 예정입니다.'); },
        exportData(type) { alert(`${type.toUpperCase()} 내보내기 기능은 추후 구현 예정입니다.`); },
        bulkAction(action) { alert(`${action} 일괄 처리 기능은 추후 구현 예정입니다.`); }
    }
}
