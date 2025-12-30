export default {
    name: 'ContentCreate',
    layout: 'admin',
    data() {
        return {
            form: {
                title: '',
                type: '',
                duration: '',
                description: '',
                status: 'draft',
                fileUrl: '',
                fileName: '',
                fileSize: 0,
                tags: '',
                downloadable: false,
                trackProgress: true
            },
            uploadProgress: 0
        }
    },
    methods: {
        validateForm() {
            if (!this.form.title) {
                alert('콘텐츠 제목을 입력해주세요.');
                return false;
            }
            if (!this.form.type) {
                alert('콘텐츠 유형을 선택해주세요.');
                return false;
            }
            if (this.form.type === 'link' && !this.form.fileUrl) {
                alert('URL을 입력해주세요.');
                return false;
            }
            if (this.form.type !== 'link' && !this.form.fileName) {
                alert('파일을 선택해주세요.');
                return false;
            }
            return true;
        },

        async submit() {
            if (!this.validateForm()) return;

            if (confirm('콘텐츠를 생성하시겠습니까?')) {
                try {
                    // API 호출 시뮬레이션
                    // const response = await this.$api.post('/api/learning/content', this.form);

                    alert('콘텐츠가 생성되었습니다.');
                    this.navigateTo('/learning/content');
                } catch (error) {
                    alert('생성에 실패했습니다: ' + error.message);
                }
            }
        },

        saveDraft() {
            if (!this.form.title) {
                alert('콘텐츠 제목을 입력해주세요.');
                return;
            }
            alert('임시저장되었습니다.');
        },

        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                // 파일 크기 체크 (500MB)
                const maxSize = 500 * 1024 * 1024;
                if (file.size > maxSize) {
                    alert('파일 크기는 500MB를 초과할 수 없습니다.');
                    event.target.value = '';
                    return;
                }

                this.form.fileName = file.name;
                this.form.fileSize = file.size;

                // 업로드 시뮬레이션
                this.simulateUpload();
            }
        },

        simulateUpload() {
            this.uploadProgress = 0;
            const interval = setInterval(() => {
                this.uploadProgress += 10;
                if (this.uploadProgress >= 100) {
                    clearInterval(interval);
                }
            }, 200);
        },

        getAcceptedFileTypes() {
            const types = {
                'video': 'video/*',
                'document': '.pdf,.ppt,.pptx,.doc,.docx',
                'scorm': '.zip',
                '': '*'
            };
            return types[this.form.type] || '*';
        },

        formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
        }
    }
}
