export default {
    name: 'RecipientGroups',
    layout: 'admin',
    data() {
        return {
            searchQuery: '',
            showModal: false,
            editingGroup: null,
            groupForm: {
                name: '',
                description: '',
                type: 'manual',
                conditions: []
            },
            groups: [
                { id: 1, name: '전체 학습자', description: '모든 학습자', type: 'system', count: 5230, createdAt: '2024-01-01', updatedAt: '2024-01-16' },
                { id: 2, name: 'VIP 회원', description: '누적 구매 100만원 이상', type: 'auto', count: 245, createdAt: '2024-01-02', updatedAt: '2024-01-16' },
                { id: 3, name: '신규 가입자 (7일 이내)', description: '최근 7일 이내 가입한 회원', type: 'auto', count: 128, createdAt: '2024-01-03', updatedAt: '2024-01-16' },
                { id: 4, name: '휴면 회원 (30일 미접속)', description: '30일 이상 미접속 회원', type: 'auto', count: 892, createdAt: '2024-01-04', updatedAt: '2024-01-16' },
                { id: 5, name: '수강 완료자', description: '최소 1개 이상 강좌 수료', type: 'auto', count: 1456, createdAt: '2024-01-05', updatedAt: '2024-01-16' },
                { id: 6, name: '기업 회원', description: 'B2B 계정 회원', type: 'manual', count: 678, createdAt: '2024-01-06', updatedAt: '2024-01-16' }
            ]
        }
    },
    computed: {
        filteredGroups() {
            if (!this.searchQuery) return this.groups;

            const query = this.searchQuery.toLowerCase();
            return this.groups.filter(g =>
                g.name.toLowerCase().includes(query) ||
                g.description.toLowerCase().includes(query)
            );
        }
    },
    methods: {
        getTypeLabel(type) {
            const labels = {
                'system': '시스템',
                'auto': '자동',
                'manual': '수동'
            };
            return labels[type] || type;
        },
        getTypeBadgeClass(type) {
            const classes = {
                'system': 'bg-secondary',
                'auto': 'bg-primary',
                'manual': 'bg-success'
            };
            return classes[type] || 'bg-secondary';
        },
        createGroup() {
            this.editingGroup = null;
            this.groupForm = {
                name: '',
                description: '',
                type: 'manual',
                conditions: []
            };
            this.showModal = true;
        },
        editGroup(group) {
            if (group.type === 'system') {
                alert('시스템 그룹은 수정할 수 없습니다.');
                return;
            }

            this.editingGroup = group;
            this.groupForm = {
                name: group.name,
                description: group.description,
                type: group.type,
                conditions: group.conditions || []
            };
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.editingGroup = null;
        },
        saveGroup() {
            if (!this.groupForm.name) {
                alert('그룹명을 입력해주세요.');
                return;
            }

            if (this.editingGroup) {
                // 수정
                Object.assign(this.editingGroup, {
                    name: this.groupForm.name,
                    description: this.groupForm.description,
                    type: this.groupForm.type,
                    updatedAt: new Date().toISOString().split('T')[0]
                });
            } else {
                // 추가
                this.groups.push({
                    id: this.groups.length + 1,
                    name: this.groupForm.name,
                    description: this.groupForm.description,
                    type: this.groupForm.type,
                    count: 0,
                    createdAt: new Date().toISOString().split('T')[0],
                    updatedAt: new Date().toISOString().split('T')[0]
                });
            }

            this.closeModal();
        },
        deleteGroup(group) {
            if (group.type === 'system') {
                alert('시스템 그룹은 삭제할 수 없습니다.');
                return;
            }

            if (confirm(`"${group.name}" 그룹을 삭제하시겠습니까?`)) {
                const index = this.groups.indexOf(group);
                this.groups.splice(index, 1);
            }
        },
        viewMembers(group) {
            alert(`"${group.name}" 그룹의 회원 목록 기능은 추후 구현 예정입니다.`);
        }
    }
}
