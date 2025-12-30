export default {
    name: 'ProductsCreate',
    layout: 'admin',
    data() {
        return {
            form: {
                name: '',
                type: 'course',
                status: 'draft',
                description: '',
                courseId: null,
                courses: [],
                price: '',
                salePrice: '',
                thumbnail: '',
                // 도서 관련 필드
                author: '',
                publisher: '',
                isbn: '',
                stock: '',
                // 일반상품 관련 필드
                brand: '',
                category: ''
            },
            selectedCourse: '',
            availableCourses: [
                { id: 1, name: 'React 완벽 가이드', instructor: '김개발' },
                { id: 2, name: 'Vue.js 마스터 클래스', instructor: '이프론트' },
                { id: 3, name: 'Node.js 백엔드 개발', instructor: '박노드' },
                { id: 4, name: 'Python 데이터 분석', instructor: '최파이썬' },
                { id: 5, name: 'JavaScript 기초부터 심화까지', instructor: '정자바' }
            ],
            productCategories: {
                book: ['IT', '경영', '자기계발', '인문', '과학'],
                general: ['의류', '문구/잡화', '전자기기', '가방/케이스', '기타']
            }
        }
    },
    methods: {
        onTypeChange() {
            // 강좌 유형이 변경되면 선택된 강좌 초기화
            if (this.form.type === 'course') {
                this.form.courses = this.form.courses.slice(0, 1);
            } else if (this.form.type === 'subscription') {
                this.form.courses = [];
            }
        },

        addCourse() {
            if (!this.selectedCourse) return;

            if (this.form.type === 'course') {
                // 강좌 유형은 하나만 선택 가능
                this.form.courses = [parseInt(this.selectedCourse)];
            } else if (this.form.type === 'bundle') {
                // 번들은 여러 개 선택 가능
                if (!this.form.courses.includes(parseInt(this.selectedCourse))) {
                    this.form.courses.push(parseInt(this.selectedCourse));
                }
            }

            this.selectedCourse = '';
        },

        removeCourse(courseId) {
            this.form.courses = this.form.courses.filter(id => id !== courseId);
        },

        getCourseNameById(id) {
            const course = this.availableCourses.find(c => c.id === id);
            return course ? course.name : '';
        },

        calculateDiscountRate() {
            if (!this.form.price || !this.form.salePrice) return 0;
            const rate = ((this.form.price - this.form.salePrice) / this.form.price * 100).toFixed(0);
            return rate;
        },

        validateForm() {
            if (!this.form.name) {
                alert('상품명을 입력해주세요.');
                return false;
            }
            if (!this.form.type) {
                alert('상품 유형을 선택해주세요.');
                return false;
            }
            if (this.form.type === 'course' && !this.form.courseId) {
                alert('강좌를 선택해주세요.');
                return false;
            }
            if (this.form.type === 'package' && this.form.courses.length === 0) {
                alert('패키지에 포함할 강좌를 선택해주세요.');
                return false;
            }
            if (this.form.type === 'book') {
                if (!this.form.author) {
                    alert('저자를 입력해주세요.');
                    return false;
                }
                if (!this.form.publisher) {
                    alert('출판사를 입력해주세요.');
                    return false;
                }
            }
            if (this.form.type === 'general' && !this.form.brand) {
                alert('브랜드를 입력해주세요.');
                return false;
            }
            if ((this.form.type === 'book' || this.form.type === 'general') && !this.form.stock) {
                alert('재고를 입력해주세요.');
                return false;
            }
            if (!this.form.price) {
                alert('정가를 입력해주세요.');
                return false;
            }
            if (this.form.salePrice && parseInt(this.form.salePrice) >= parseInt(this.form.price)) {
                alert('할인가는 정가보다 낮아야 합니다.');
                return false;
            }
            return true;
        },

        async submit() {
            if (!this.validateForm()) return;

            if (confirm('상품을 생성하시겠습니까?')) {
                try {
                    // API 호출 시뮬레이션
                    // const response = await this.$api.post('/api/commerce/products', this.form);

                    alert('상품이 생성되었습니다.');
                    this.navigateTo('/commerce/products');
                } catch (error) {
                    alert('생성에 실패했습니다: ' + error.message);
                }
            }
        },

        saveDraft() {
            this.form.status = 'draft';
            alert('임시저장 기능은 추후 구현 예정입니다.');
        },

        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.form.thumbnail = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        }
    }
}
