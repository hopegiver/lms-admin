export default {
    name: 'ProductCategories',
    layout: 'admin',
    data() {
        return {
            categories: [
                { id: 1, name: '도서', parentId: null, sortOrder: 1, isVisible: true, productCount: 25, description: '각종 도서 및 교재' },
                { id: 2, name: 'IT/프로그래밍', parentId: 1, sortOrder: 1, isVisible: true, productCount: 15, description: '' },
                { id: 3, name: '경영/경제', parentId: 1, sortOrder: 2, isVisible: true, productCount: 10, description: '' },
                { id: 4, name: '굿즈', parentId: null, sortOrder: 2, isVisible: true, productCount: 30, description: '브랜드 굿즈 및 기념품' },
                { id: 5, name: '의류', parentId: 4, sortOrder: 1, isVisible: true, productCount: 12, description: '' },
                { id: 6, name: '문구/잡화', parentId: 4, sortOrder: 2, isVisible: true, productCount: 18, description: '' },
                { id: 7, name: '전자기기', parentId: null, sortOrder: 3, isVisible: true, productCount: 15, description: '교육용 전자기기' },
                { id: 8, name: '태블릿/노트북', parentId: 7, sortOrder: 1, isVisible: true, productCount: 8, description: '' },
                { id: 9, name: '액세서리', parentId: 7, sortOrder: 2, isVisible: true, productCount: 7, description: '' }
            ],
            expandedIds: [1, 4, 7],
            showModal: false,
            editingCategory: null,
            modalParentId: null,
            categoryForm: {
                name: '',
                description: '',
                isVisible: true
            }
        }
    },
    computed: {
        sortedCategories() {
            return this.categories
                .filter(c => !c.parentId)
                .sort((a, b) => a.sortOrder - b.sortOrder);
        }
    },
    methods: {
        getChildren(parentId) {
            return this.categories
                .filter(c => c.parentId === parentId)
                .sort((a, b) => a.sortOrder - b.sortOrder);
        },

        toggleExpand(categoryId) {
            const index = this.expandedIds.indexOf(categoryId);
            if (index > -1) {
                this.expandedIds.splice(index, 1);
            } else {
                this.expandedIds.push(categoryId);
            }
        },

        openAddModal(parentId) {
            this.editingCategory = null;
            this.modalParentId = parentId;
            this.categoryForm = {
                name: '',
                description: '',
                isVisible: true
            };
            this.showModal = true;
        },

        openEditModal(category) {
            this.editingCategory = category;
            this.modalParentId = category.parentId;
            this.categoryForm = {
                name: category.name,
                description: category.description || '',
                isVisible: category.isVisible
            };
            this.showModal = true;
        },

        saveCategory() {
            if (!this.categoryForm.name.trim()) {
                alert('카테고리명을 입력해주세요.');
                return;
            }

            if (this.editingCategory) {
                // 수정
                this.editingCategory.name = this.categoryForm.name;
                this.editingCategory.description = this.categoryForm.description;
                this.editingCategory.isVisible = this.categoryForm.isVisible;
                alert('카테고리가 수정되었습니다.');
            } else {
                // 추가
                const siblings = this.categories.filter(c => c.parentId === this.modalParentId);
                const maxSortOrder = siblings.length > 0 ? Math.max(...siblings.map(s => s.sortOrder)) : 0;

                const newCategory = {
                    id: Math.max(...this.categories.map(c => c.id)) + 1,
                    name: this.categoryForm.name,
                    description: this.categoryForm.description,
                    parentId: this.modalParentId,
                    sortOrder: maxSortOrder + 1,
                    isVisible: this.categoryForm.isVisible,
                    productCount: 0
                };

                this.categories.push(newCategory);

                // 대분류를 추가한 경우 자동으로 펼치기
                if (!this.modalParentId) {
                    this.expandedIds.push(newCategory.id);
                }

                alert('카테고리가 추가되었습니다.');
            }

            this.showModal = false;
        },

        deleteCategory(category) {
            // 하위 카테고리가 있는지 확인
            const children = this.getChildren(category.id);
            if (children.length > 0) {
                alert('하위 카테고리가 있는 카테고리는 삭제할 수 없습니다.\n먼저 하위 카테고리를 삭제해주세요.');
                return;
            }

            // 상품이 있는 경우 확인
            if (category.productCount > 0) {
                if (!confirm(`이 카테고리에는 ${category.productCount}개의 상품이 있습니다.\n정말 삭제하시겠습니까?`)) {
                    return;
                }
            }

            if (confirm(`"${category.name}" 카테고리를 삭제하시겠습니까?`)) {
                const index = this.categories.indexOf(category);
                if (index > -1) {
                    this.categories.splice(index, 1);
                    alert('카테고리가 삭제되었습니다.');
                }
            }
        },

        moveCategory(category, direction) {
            const siblings = this.categories
                .filter(c => c.parentId === category.parentId)
                .sort((a, b) => a.sortOrder - b.sortOrder);

            const currentIndex = siblings.findIndex(c => c.id === category.id);

            if (direction === 'up' && currentIndex > 0) {
                const temp = category.sortOrder;
                category.sortOrder = siblings[currentIndex - 1].sortOrder;
                siblings[currentIndex - 1].sortOrder = temp;
            } else if (direction === 'down' && currentIndex < siblings.length - 1) {
                const temp = category.sortOrder;
                category.sortOrder = siblings[currentIndex + 1].sortOrder;
                siblings[currentIndex + 1].sortOrder = temp;
            }
        },

        isFirst(category) {
            const siblings = this.categories
                .filter(c => c.parentId === category.parentId)
                .sort((a, b) => a.sortOrder - b.sortOrder);
            return siblings[0]?.id === category.id;
        },

        isLast(category) {
            const siblings = this.categories
                .filter(c => c.parentId === category.parentId)
                .sort((a, b) => a.sortOrder - b.sortOrder);
            return siblings[siblings.length - 1]?.id === category.id;
        },

        updateCategory(category) {
            // 실제로는 API 호출하여 서버에 업데이트
            // 여기서는 로컬 데이터만 업데이트 (v-model로 이미 반영됨)
        },

        getParentName(parentId) {
            const parent = this.categories.find(c => c.id === parentId);
            return parent ? parent.name : '';
        }
    }
}
