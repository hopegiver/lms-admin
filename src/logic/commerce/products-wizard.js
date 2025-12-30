export default {
    name: 'productsWizard',
    layout: 'admin',
    data() {
        return {
            currentStep: 1,
            totalSteps: 6,

            // 1단계: 기본 정보
            basicInfo: {
                name: '',
                category: '',
                description: '',
                shortDescription: '',
                thumbnail: null,
                images: []
            },

            // 2단계: 가격 설정
            pricing: {
                hasOptions: false,
                basePrice: '',
                salePrice: '',
                salesStart: '',
                salesEnd: '',
                taxable: true,
                options: []
            },

            // 3단계: 재고 관리
            inventory: {
                trackInventory: true,
                sku: '',
                stock: '',
                lowStockThreshold: 10,
                allowBackorder: false,
                maxPurchaseQty: '',
                minPurchaseQty: 1
            },

            // 4단계: 배송 설정
            shipping: {
                requiresShipping: true,
                weight: '',
                dimensions: {
                    length: '',
                    width: '',
                    height: ''
                },
                shippingClass: 'standard',
                freeShipping: false,
                shippingFee: ''
            },

            // 5단계: SEO/메타데이터
            seo: {
                metaTitle: '',
                metaDescription: '',
                metaKeywords: '',
                slug: '',
                ogImage: null
            },

            // 6단계: 최종 검토
            publishImmediately: false,

            // 기타
            categories: ['전자제품', '의류', '도서', '식품', '화장품', '가구', '기타'],
            shippingClasses: [
                { value: 'standard', label: '일반 배송' },
                { value: 'express', label: '빠른 배송' },
                { value: 'free', label: '무료 배송' }
            ],
            tempOptionForm: {
                name: '',
                values: '',
                priceModifier: 0
            },
            showOptionForm: false,
            editingOptionIndex: null
        }
    },
    mounted() {
        // 자동으로 slug 생성
        this.$watch(() => this.basicInfo.name, (newVal) => {
            if (!this.seo.slug) {
                this.seo.slug = this.generateSlug(newVal);
            }
        });

        // 자동으로 메타 타이틀 생성
        this.$watch(() => this.basicInfo.name, (newVal) => {
            if (!this.seo.metaTitle) {
                this.seo.metaTitle = newVal;
            }
        });
    },
    computed: {
        canProceed() {
            switch (this.currentStep) {
                case 1:
                    return this.basicInfo.name && this.basicInfo.category && this.basicInfo.description;
                case 2:
                    if (this.pricing.hasOptions) {
                        return this.pricing.options.length > 0;
                    }
                    return this.pricing.basePrice && parseFloat(this.pricing.basePrice) >= 0;
                case 3:
                    if (this.inventory.trackInventory) {
                        return this.inventory.sku && this.inventory.stock && parseInt(this.inventory.stock) >= 0;
                    }
                    return true;
                case 4:
                    if (this.shipping.requiresShipping) {
                        return this.shipping.weight && this.shipping.shippingClass;
                    }
                    return true;
                case 5:
                    return this.seo.slug && this.seo.metaTitle;
                case 6:
                    return true;
                default:
                    return false;
            }
        },

        canSkipCurrentStep() {
            return [4, 5].includes(this.currentStep);
        },

        progressPercentage() {
            return (this.currentStep / this.totalSteps) * 100;
        },

        totalPrice() {
            const base = parseFloat(this.pricing.basePrice) || 0;
            const sale = parseFloat(this.pricing.salePrice) || 0;
            return sale > 0 && sale < base ? sale : base;
        },

        discountPercentage() {
            const base = parseFloat(this.pricing.basePrice) || 0;
            const sale = parseFloat(this.pricing.salePrice) || 0;
            if (base > 0 && sale > 0 && sale < base) {
                return Math.round(((base - sale) / base) * 100);
            }
            return 0;
        }
    },
    methods: {
        nextStep() {
            if (this.currentStep < this.totalSteps && this.canProceed) {
                this.currentStep++;
            }
        },

        prevStep() {
            if (this.currentStep > 1) {
                this.currentStep--;
            }
        },

        skipStep() {
            if (this.canSkipCurrentStep) {
                this.currentStep++;
            }
        },

        goToStep(step) {
            if (step >= 1 && step <= this.totalSteps) {
                this.currentStep = step;
            }
        },

        // 옵션 관리
        showAddOptionForm() {
            this.tempOptionForm = { name: '', values: '', priceModifier: 0 };
            this.showOptionForm = true;
            this.editingOptionIndex = null;
        },

        editOption(index) {
            this.tempOptionForm = { ...this.pricing.options[index] };
            this.showOptionForm = true;
            this.editingOptionIndex = index;
        },

        saveOptionForm() {
            if (!this.tempOptionForm.name || !this.tempOptionForm.values) {
                alert('옵션명과 옵션값을 입력해주세요.');
                return;
            }

            const option = {
                name: this.tempOptionForm.name,
                values: this.tempOptionForm.values.split(',').map(v => v.trim()),
                priceModifier: parseFloat(this.tempOptionForm.priceModifier) || 0
            };

            if (this.editingOptionIndex !== null) {
                this.pricing.options[this.editingOptionIndex] = option;
            } else {
                this.pricing.options.push(option);
            }

            this.showOptionForm = false;
            this.tempOptionForm = { name: '', values: '', priceModifier: 0 };
            this.editingOptionIndex = null;
        },

        cancelOptionForm() {
            this.showOptionForm = false;
            this.tempOptionForm = { name: '', values: '', priceModifier: 0 };
            this.editingOptionIndex = null;
        },

        deleteOption(index) {
            if (confirm('이 옵션을 삭제하시겠습니까?')) {
                this.pricing.options.splice(index, 1);
            }
        },

        // 이미지 업로드
        uploadThumbnail() {
            alert('썸네일 업로드 기능은 추후 구현됩니다.');
        },

        removeThumbnail() {
            this.basicInfo.thumbnail = null;
        },

        uploadImages() {
            alert('이미지 업로드 기능은 추후 구현됩니다.');
        },

        removeImage(index) {
            this.basicInfo.images.splice(index, 1);
        },

        // SEO
        generateSlug(text) {
            return text
                .toLowerCase()
                .replace(/[^a-z0-9가-힣\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();
        },

        regenerateSlug() {
            this.seo.slug = this.generateSlug(this.basicInfo.name);
        },

        // 임시 저장
        saveDraft() {
            alert('임시 저장되었습니다. 언제든지 이어서 작성할 수 있습니다.');
            this.navigateTo('/commerce/products');
        },

        // 최종 완료
        completeProduct() {
            if (!this.canProceed) {
                alert('필수 항목을 모두 입력해주세요.');
                return;
            }

            const productData = {
                ...this.basicInfo,
                pricing: this.pricing,
                inventory: this.inventory,
                shipping: this.shipping,
                seo: this.seo,
                status: this.publishImmediately ? 'published' : 'draft'
            };

            console.log('생성할 상품 데이터:', productData);

            if (this.publishImmediately) {
                alert('상품이 생성되고 즉시 발행되었습니다!');
            } else {
                alert('상품이 임시 저장되었습니다. 상품 목록에서 확인 후 발행할 수 있습니다.');
            }

            this.navigateTo('/commerce/products');
        },

        cancel() {
            if (confirm('작성 중인 내용이 저장되지 않습니다. 정말 취소하시겠습니까?')) {
                this.navigateTo('/commerce/products');
            }
        },

        getStepTitle(step) {
            const titles = {
                1: '기본 정보',
                2: '가격 설정',
                3: '재고 관리',
                4: '배송 설정',
                5: 'SEO 설정',
                6: '최종 검토'
            };
            return titles[step] || '';
        },

        getStepIcon(step) {
            const icons = {
                1: '📋',
                2: '💰',
                3: '📦',
                4: '🚚',
                5: '🔍',
                6: '✅'
            };
            return icons[step] || '';
        },

        formatPrice(price) {
            return new Intl.NumberFormat('ko-KR').format(price);
        }
    }
}
