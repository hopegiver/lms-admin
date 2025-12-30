export default {
    name: 'certificatesCreate',
    layout: 'admin',
    data() {
        return {
            templateId: this.getParam('id'),
            mode: 'create',
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
                { type: 'text', label: '사용자 정의 텍스트', icon: '📝' }
            ],
            selectedField: null,
            previewMode: false
        }
    },
    mounted() {
        if (this.templateId) {
            this.mode = 'edit';
            this.loadTemplate();
        } else {
            // 기본 필드 추가
            this.addDefaultFields();
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
                        { type: 'studentName', label: '수료자명', x: 50, y: 40, fontSize: 24, fontWeight: 'bold', color: '#000000', customText: '' },
                        { type: 'courseName', label: '강좌명', x: 50, y: 50, fontSize: 18, fontWeight: 'normal', color: '#333333', customText: '' },
                        { type: 'completionDate', label: '수료일', x: 50, y: 60, fontSize: 14, fontWeight: 'normal', color: '#666666', customText: '' },
                        { type: 'certificateNumber', label: '수료번호', x: 50, y: 70, fontSize: 12, fontWeight: 'normal', color: '#999999', customText: '' }
                    ]
                };
            }, 100);
        },

        addDefaultFields() {
            this.form.fields = [
                { type: 'studentName', label: '수료자명', x: 50, y: 35, fontSize: 24, fontWeight: 'bold', color: '#000000', customText: '' },
                { type: 'courseName', label: '강좌명', x: 50, y: 50, fontSize: 18, fontWeight: 'normal', color: '#333333', customText: '' },
                { type: 'completionDate', label: '수료일', x: 50, y: 65, fontSize: 14, fontWeight: 'normal', color: '#666666', customText: '' }
            ];
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
                customText: ''
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
                this.form.fields = [...this.form.fields]; // Vue 반응성 트리거
            }
        },

        moveFieldDown(index) {
            if (index < this.form.fields.length - 1) {
                const temp = this.form.fields[index];
                this.form.fields[index] = this.form.fields[index + 1];
                this.form.fields[index + 1] = temp;
                this.form.fields = [...this.form.fields]; // Vue 반응성 트리거
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
            if (this.mode === 'create') {
                alert('수료증 템플릿이 생성되었습니다.');
            } else {
                alert('수료증 템플릿이 수정되었습니다.');
            }
            this.navigateTo('/learning/certificates');
        },

        cancel() {
            if (confirm('작성 중인 내용을 취소하시겠습니까?')) {
                this.navigateTo('/learning/certificates');
            }
        },

        getFieldIcon(type) {
            const field = this.availableFields.find(f => f.type === type);
            return field ? field.icon : '📝';
        }
    }
}
