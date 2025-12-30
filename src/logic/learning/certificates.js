export default {
    name: 'certificates',
    layout: 'admin',
    data() {
        return {
            templates: [],
            searchQuery: '',
            sortBy: 'newest'
        }
    },
    mounted() {
        this.loadTemplates();
    },
    computed: {
        filteredTemplates() {
            let result = [...this.templates];

            // 검색 필터
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                result = result.filter(t =>
                    t.name.toLowerCase().includes(query) ||
                    t.description.toLowerCase().includes(query)
                );
            }

            // 정렬
            if (this.sortBy === 'newest') {
                result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            } else if (this.sortBy === 'oldest') {
                result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            } else if (this.sortBy === 'name') {
                result.sort((a, b) => a.name.localeCompare(b.name));
            } else if (this.sortBy === 'usage') {
                result.sort((a, b) => b.usageCount - a.usageCount);
            }

            return result;
        }
    },
    methods: {
        loadTemplates() {
            // 임시 데이터
            this.templates = [
                {
                    id: 1,
                    name: '기본 수료증',
                    description: '일반적인 강좌 수료증 템플릿',
                    orientation: 'horizontal',
                    size: 'A4',
                    backgroundImage: '/assets/cert-bg-1.jpg',
                    usageCount: 25,
                    createdAt: '2024-01-15',
                    updatedAt: '2024-03-10',
                    fields: [
                        { type: 'studentName', label: '수료자명', x: 50, y: 40, fontSize: 24, fontWeight: 'bold' },
                        { type: 'courseName', label: '강좌명', x: 50, y: 50, fontSize: 18 },
                        { type: 'completionDate', label: '수료일', x: 50, y: 60, fontSize: 14 },
                        { type: 'certificateNumber', label: '수료번호', x: 50, y: 70, fontSize: 12 }
                    ]
                },
                {
                    id: 2,
                    name: '프리미엄 수료증',
                    description: '고급 디자인의 수료증 템플릿',
                    orientation: 'horizontal',
                    size: 'A4',
                    backgroundImage: '/assets/cert-bg-2.jpg',
                    usageCount: 18,
                    createdAt: '2024-02-01',
                    updatedAt: '2024-03-15',
                    fields: [
                        { type: 'studentName', label: '수료자명', x: 50, y: 35, fontSize: 28, fontWeight: 'bold' },
                        { type: 'courseName', label: '강좌명', x: 50, y: 48, fontSize: 20 },
                        { type: 'instructor', label: '강사명', x: 50, y: 58, fontSize: 16 },
                        { type: 'completionDate', label: '수료일', x: 50, y: 68, fontSize: 14 },
                        { type: 'certificateNumber', label: '수료번호', x: 50, y: 78, fontSize: 12 }
                    ]
                },
                {
                    id: 3,
                    name: '세로형 수료증',
                    description: '세로 방향 수료증 템플릿',
                    orientation: 'vertical',
                    size: 'A4',
                    backgroundImage: '/assets/cert-bg-3.jpg',
                    usageCount: 12,
                    createdAt: '2024-03-01',
                    updatedAt: '2024-03-20',
                    fields: [
                        { type: 'studentName', label: '수료자명', x: 50, y: 30, fontSize: 26, fontWeight: 'bold' },
                        { type: 'courseName', label: '강좌명', x: 50, y: 45, fontSize: 18 },
                        { type: 'completionDate', label: '수료일', x: 50, y: 55, fontSize: 14 },
                        { type: 'certificateNumber', label: '수료번호', x: 50, y: 90, fontSize: 10 }
                    ]
                },
                {
                    id: 4,
                    name: '미니멀 수료증',
                    description: '심플한 디자인의 수료증 템플릿',
                    orientation: 'horizontal',
                    size: 'A4',
                    backgroundImage: null,
                    usageCount: 8,
                    createdAt: '2024-03-10',
                    updatedAt: '2024-03-22',
                    fields: [
                        { type: 'studentName', label: '수료자명', x: 50, y: 40, fontSize: 22, fontWeight: 'bold' },
                        { type: 'courseName', label: '강좌명', x: 50, y: 52, fontSize: 16 },
                        { type: 'completionDate', label: '수료일', x: 50, y: 62, fontSize: 14 }
                    ]
                }
            ];
        },

        createTemplate() {
            this.navigateTo('/learning/certificates/create');
        },

        viewTemplate(template) {
            this.navigateTo(`/learning/certificates/${template.id}`);
        },

        editTemplate(template) {
            this.navigateTo(`/learning/certificates/${template.id}/edit`);
        },

        duplicateTemplate(template) {
            if (confirm(`"${template.name}" 템플릿을 복제하시겠습니까?`)) {
                const newTemplate = {
                    ...template,
                    id: Math.max(...this.templates.map(t => t.id)) + 1,
                    name: `${template.name} (복사본)`,
                    usageCount: 0,
                    createdAt: new Date().toISOString().split('T')[0],
                    updatedAt: new Date().toISOString().split('T')[0]
                };
                this.templates.push(newTemplate);
                alert('템플릿이 복제되었습니다.');
            }
        },

        deleteTemplate(template) {
            if (template.usageCount > 0) {
                alert(`이 템플릿은 ${template.usageCount}개의 강좌에서 사용 중입니다. 사용 중인 템플릿은 삭제할 수 없습니다.`);
                return;
            }
            if (confirm(`"${template.name}" 템플릿을 삭제하시겠습니까?`)) {
                this.templates = this.templates.filter(t => t.id !== template.id);
                alert('템플릿이 삭제되었습니다.');
            }
        },

        getOrientationText(orientation) {
            return orientation === 'horizontal' ? '가로형' : '세로형';
        },

        resetFilters() {
            this.searchQuery = '';
            this.sortBy = 'newest';
        }
    }
}
