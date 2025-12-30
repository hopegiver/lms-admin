export default {
    name: 'PromotionsCreate',
    layout: 'admin',
    data() {
        return {
            form: {
                name: '',
                type: '',
                status: 'draft',
                description: '',
                discountType: 'percentage',
                discountValue: '',
                maxDiscountAmount: '',
                minPurchaseAmount: '',
                couponCode: '',
                issueLimit: '',
                targetType: 'all',
                targetProducts: [],
                startDate: '',
                endDate: '',
                usageLimit: '',
                perUserLimit: ''
            },
            selectedProduct: '',
            availableProducts: [
                { id: 1, name: 'React 완벽 가이드' },
                { id: 2, name: 'Vue.js 마스터 클래스' },
                { id: 3, name: 'Node.js 백엔드 개발' },
                { id: 4, name: 'Python 데이터 분석' },
                { id: 5, name: 'React + Vue.js 번들' }
            ]
        }
    },
    methods: {
        onTypeChange() {
            // 쿠폰 유형이 아니면 쿠폰 코드 초기화
            if (this.form.type !== 'coupon') {
                this.form.couponCode = '';
                this.form.issueLimit = '';
            }
        },

        addProduct() {
            if (!this.selectedProduct) return;

            if (!this.form.targetProducts.includes(parseInt(this.selectedProduct))) {
                this.form.targetProducts.push(parseInt(this.selectedProduct));
            }

            this.selectedProduct = '';
        },

        removeProduct(productId) {
            this.form.targetProducts = this.form.targetProducts.filter(id => id !== productId);
        },

        getProductNameById(id) {
            const product = this.availableProducts.find(p => p.id === id);
            return product ? product.name : '';
        },

        generateCouponCode() {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let code = '';
            for (let i = 0; i < 8; i++) {
                code += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            this.form.couponCode = code;
        },

        calculateDiscountPreview() {
            const basePrice = 100000;
            if (!this.form.discountValue) return basePrice;

            if (this.form.discountType === 'percentage') {
                let discount = basePrice * (this.form.discountValue / 100);
                if (this.form.maxDiscountAmount && discount > parseInt(this.form.maxDiscountAmount)) {
                    discount = parseInt(this.form.maxDiscountAmount);
                }
                return (basePrice - discount).toLocaleString();
            } else {
                return (basePrice - parseInt(this.form.discountValue)).toLocaleString();
            }
        },

        validateForm() {
            if (!this.form.name) {
                alert('프로모션명을 입력해주세요.');
                return false;
            }
            if (!this.form.type) {
                alert('프로모션 유형을 선택해주세요.');
                return false;
            }
            if (!this.form.discountValue) {
                alert('할인 값을 입력해주세요.');
                return false;
            }
            if (this.form.type === 'coupon' && !this.form.couponCode) {
                alert('쿠폰 코드를 입력해주세요.');
                return false;
            }
            if (this.form.targetType === 'specific' && this.form.targetProducts.length === 0) {
                alert('대상 상품을 선택해주세요.');
                return false;
            }
            if (!this.form.startDate) {
                alert('시작일시를 선택해주세요.');
                return false;
            }
            if (!this.form.endDate) {
                alert('종료일시를 선택해주세요.');
                return false;
            }
            if (new Date(this.form.startDate) >= new Date(this.form.endDate)) {
                alert('종료일시는 시작일시보다 이후여야 합니다.');
                return false;
            }
            return true;
        },

        async submit() {
            if (!this.validateForm()) return;

            if (confirm('프로모션을 생성하시겠습니까?')) {
                try {
                    // API 호출 시뮬레이션
                    // const response = await this.$api.post('/api/commerce/promotions', this.form);

                    alert('프로모션이 생성되었습니다.');
                    this.navigateTo('/commerce/promotions');
                } catch (error) {
                    alert('생성에 실패했습니다: ' + error.message);
                }
            }
        },

        saveDraft() {
            this.form.status = 'draft';
            alert('임시저장 기능은 추후 구현 예정입니다.');
        }
    }
}
