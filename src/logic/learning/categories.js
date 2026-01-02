export default {
    name: 'Categories',
    layout: 'admin',
    data() {
        return {
            categories: [
                { id: 1, name: '프로그래밍', parentId: null, sortOrder: 1, isVisible: true, courseCount: 45, description: '프로그래밍 관련 강좌' },
                { id: 2, name: '웹 개발', parentId: 1, sortOrder: 1, isVisible: true, courseCount: 25, description: '웹 개발 기술' },
                { id: 3, name: '모바일 개발', parentId: 1, sortOrder: 2, isVisible: true, courseCount: 15, description: '모바일 앱 개발' },
                { id: 4, name: '백엔드', parentId: 1, sortOrder: 3, isVisible: true, courseCount: 5, description: '서버 개발' },
                { id: 5, name: '디자인', parentId: null, sortOrder: 2, isVisible: true, courseCount: 30, description: '디자인 관련 강좌' },
                { id: 6, name: 'UI/UX', parentId: 5, sortOrder: 1, isVisible: true, courseCount: 20, description: 'UI/UX 디자인' },
                { id: 7, name: '그래픽 디자인', parentId: 5, sortOrder: 2, isVisible: true, courseCount: 10, description: '그래픽 디자인' },
                { id: 8, name: '마케팅', parentId: null, sortOrder: 3, isVisible: true, courseCount: 12, description: '마케팅 관련 강좌' },
                { id: 9, name: '디지털 마케팅', parentId: 8, sortOrder: 1, isVisible: true, courseCount: 8, description: '디지털 마케팅' },
                { id: 10, name: '콘텐츠 마케팅', parentId: 8, sortOrder: 2, isVisible: true, courseCount: 4, description: '콘텐츠 마케팅' }
            ],
            expandedIds: [1, 5, 8], // 기본적으로 모든 대분류 펼침
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
            // parentId가 null인 것들만 가져와서 sortOrder로 정렬
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

        getParentName(parentId) {
            const parent = this.categories.find(c => c.id === parentId);
            return parent ? parent.name : '';
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
                    id: Math.max(...this.categories.map(c => c.id), 0) + 1,
                    name: this.categoryForm.name,
                    description: this.categoryForm.description,
                    parentId: this.modalParentId,
                    sortOrder: maxSortOrder + 1,
                    isVisible: this.categoryForm.isVisible,
                    courseCount: 0
                };

                this.categories.push(newCategory);

                // 대분류를 추가한 경우 자동으로 펼침
                if (!this.modalParentId && !this.expandedIds.includes(newCategory.id)) {
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

            // 강좌가 있는지 확인
            if (category.courseCount > 0) {
                if (!confirm(`이 카테고리에는 ${category.courseCount}개의 강좌가 있습니다.\n정말 삭제하시겠습니까?`)) {
                    return;
                }
            } else {
                if (!confirm(`'${category.name}' 카테고리를 삭제하시겠습니까?`)) {
                    return;
                }
            }

            const index = this.categories.findIndex(c => c.id === category.id);
            if (index > -1) {
                this.categories.splice(index, 1);
                alert('카테고리가 삭제되었습니다.');
            }
        },

        updateCategory(category) {
            // 실제로는 API 호출
            // 여기서는 이미 v-model로 바인딩되어 있어 자동 업데이트됨
        },

        moveCategory(category, direction) {
            // 같은 레벨의 카테고리들
            const siblings = this.categories
                .filter(c => c.parentId === category.parentId)
                .sort((a, b) => a.sortOrder - b.sortOrder);

            const currentIndex = siblings.findIndex(c => c.id === category.id);

            if (direction === 'up' && currentIndex > 0) {
                // 위로 이동
                const temp = siblings[currentIndex - 1].sortOrder;
                siblings[currentIndex - 1].sortOrder = category.sortOrder;
                category.sortOrder = temp;
            } else if (direction === 'down' && currentIndex < siblings.length - 1) {
                // 아래로 이동
                const temp = siblings[currentIndex + 1].sortOrder;
                siblings[currentIndex + 1].sortOrder = category.sortOrder;
                category.sortOrder = temp;
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
        }
    }
}
