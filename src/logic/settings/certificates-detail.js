export default {
    name: 'certificatesDetail',
    layout: 'admin',
    data() {
        return {
            templateId: this.getParam('id'),
            mode: 'view', // 'view' or 'edit'
            isNew: false,
            form: {
                name: '',
                description: '',
                orientation: 'horizontal',
                size: 'A4',
                backgroundImage: null,
                backgroundColor: '#ffffff',
                borderStyle: 'none',
                borderColor: '#000000',
                borderWidth: 0,
                fields: []
            },
            availableFields: [
                { type: 'studentName', label: '수료자명', icon: '👤' },
                { type: 'courseName', label: '강좌명', icon: '📚' },
                { type: 'instructor', label: '강사명', icon: '👨‍🏫' },
                { type: 'completionDate', label: '수료일', icon: '📅' },
                { type: 'certificateNumber', label: '수료번호', icon: '#️⃣' },
                { type: 'issueDate', label: '발급일', icon: '📆' },
                { type: 'organization', label: '기관명', icon: '🏢' },
                { type: 'signature', label: '서명', icon: '✍️' },
                { type: 'seal', label: '직인', icon: '🔴' },
                { type: 'text', label: '사용자 정의 텍스트', icon: '📝' }
            ],
            selectedField: null,
            previewMode: false,
            usageInfo: {
                usageCount: 0,
                courses: []
            }
        }
    },
    mounted() {
        if (this.templateId === 'new') {
            this.isNew = true;
            this.mode = 'edit';
            this.addDefaultFields();
        } else {
            this.isNew = false;
            this.loadTemplate();
        }
    },
    methods: {
        loadTemplate() {
            // 실제로는 API 호출
            // 임시로 샘플 데이터 로드
            setTimeout(() => {
                this.form = {
                    name: '기본 수료증',
                    description: '일반적인 강좌 수료증 템플릿',
                    orientation: 'horizontal',
                    size: 'A4',
                    backgroundImage: null,
                    backgroundColor: '#ffffff',
                    borderStyle: 'solid',
                    borderColor: '#cccccc',
                    borderWidth: 2,
                    fields: [
                        { type: 'studentName', label: '수료자명', x: 50, y: 40, fontSize: 24, fontWeight: 'bold', color: '#000000', customText: '', align: 'center' },
                        { type: 'courseName', label: '강좌명', x: 50, y: 50, fontSize: 18, fontWeight: 'normal', color: '#333333', customText: '', align: 'center' },
                        { type: 'completionDate', label: '수료일', x: 50, y: 60, fontSize: 14, fontWeight: 'normal', color: '#666666', customText: '', align: 'center' },
                        { type: 'certificateNumber', label: '수료번호', x: 50, y: 70, fontSize: 12, fontWeight: 'normal', color: '#999999', customText: '', align: 'center' }
                    ]
                };

                this.usageInfo = {
                    usageCount: 25,
                    courses: [
                        { id: 1, name: 'React 완벽 가이드', students: 120 },
                        { id: 2, name: 'Vue.js 마스터 클래스', students: 85 },
                        { id: 3, name: 'JavaScript 기초', students: 200 }
                    ]
                };
            }, 100);
        },

        addDefaultFields() {
            this.form.fields = [
                { type: 'studentName', label: '수료자명', x: 50, y: 35, fontSize: 24, fontWeight: 'bold', color: '#000000', customText: '', align: 'center' },
                { type: 'courseName', label: '강좌명', x: 50, y: 50, fontSize: 18, fontWeight: 'normal', color: '#333333', customText: '', align: 'center' },
                { type: 'completionDate', label: '수료일', x: 50, y: 65, fontSize: 14, fontWeight: 'normal', color: '#666666', customText: '', align: 'center' }
            ];
        },

        toggleMode() {
            if (this.mode === 'view') {
                this.mode = 'edit';
            } else {
                if (confirm('편집을 취소하시겠습니까? 변경사항은 저장되지 않습니다.')) {
                    this.mode = 'view';
                    this.loadTemplate(); // 원래 데이터로 복원
                }
            }
        },

        addField(fieldType) {
            const fieldInfo = this.availableFields.find(f => f.type === fieldType.type);
            const newField = {
                type: fieldType.type,
                label: fieldInfo.label,
                x: 50,
                y: 50,
                fontSize: 16,
                fontWeight: 'normal',
                color: '#000000',
                customText: '',
                align: 'center'
            };
            this.form.fields.push(newField);
            this.selectedField = newField;
        },

        removeField(index) {
            if (confirm('이 필드를 삭제하시겠습니까?')) {
                this.form.fields.splice(index, 1);
                if (this.selectedField === this.form.fields[index]) {
                    this.selectedField = null;
                }
            }
        },

        selectField(field) {
            this.selectedField = field;
        },

        moveFieldUp(index) {
            if (index > 0) {
                const temp = this.form.fields[index];
                this.form.fields[index] = this.form.fields[index - 1];
                this.form.fields[index - 1] = temp;
                this.form.fields = [...this.form.fields];
            }
        },

        moveFieldDown(index) {
            if (index < this.form.fields.length - 1) {
                const temp = this.form.fields[index];
                this.form.fields[index] = this.form.fields[index + 1];
                this.form.fields[index + 1] = temp;
                this.form.fields = [...this.form.fields];
            }
        },

        uploadBackgroundImage() {
            // 실제로는 파일 업로드 처리
            alert('배경 이미지 업로드 기능은 추후 구현됩니다.');
        },

        removeBackgroundImage() {
            if (confirm('배경 이미지를 제거하시겠습니까?')) {
                this.form.backgroundImage = null;
            }
        },

        togglePreview() {
            this.previewMode = !this.previewMode;
        },

        save() {
            if (!this.form.name) {
                alert('템플릿 이름을 입력해주세요.');
                return;
            }

            if (this.form.fields.length === 0) {
                alert('최소 하나 이상의 필드를 추가해주세요.');
                return;
            }

            // 실제로는 API 호출
            if (this.isNew) {
                alert('수료증 템플릿이 생성되었습니다.');
            } else {
                alert('수료증 템플릿이 수정되었습니다.');
            }
            this.navigateTo('/settings/certificates');
        },

        deleteTemplate() {
            if (this.usageInfo.usageCount > 0) {
                alert(`이 템플릿은 ${this.usageInfo.usageCount}개의 강좌에서 사용 중입니다. 사용 중인 템플릿은 삭제할 수 없습니다.`);
                return;
            }
            if (confirm('이 템플릿을 삭제하시겠습니까?')) {
                alert('템플릿이 삭제되었습니다.');
                this.navigateTo('/settings/certificates');
            }
        },

        cancel() {
            if (this.isNew) {
                if (confirm('작성을 취소하시겠습니까?')) {
                    this.navigateTo('/settings/certificates');
                }
            } else {
                this.navigateTo('/settings/certificates');
            }
        },

        getFieldIcon(type) {
            const field = this.availableFields.find(f => f.type === type);
            return field ? field.icon : '📝';
        },

        downloadPDF() {
            alert('PDF 다운로드 기능은 추후 구현됩니다.');
        },

        testPrint() {
            alert('테스트 인쇄 기능은 추후 구현됩니다.');
        }
    }
}
