export default {
    name: 'contentAuthor',
    data() {
        return {
            content: {
                id: null,
                title: '',
                description: '',
                blocks: [],
                status: 'draft',
                createdAt: null,
                updatedAt: null
            },
            focusedBlockIndex: null,
            blockIdCounter: 1
        }
    },
    mounted() {
        // URL에서 콘텐츠 ID 가져오기 (편집 모드)
        const contentId = new URLSearchParams(window.location.search).get('id');

        if (contentId) {
            this.loadContent(contentId);
        } else {
            // 새 콘텐츠: 기본 텍스트 블록 추가
            this.addBlock('text');
        }
    },
    methods: {
        /**
         * 블록 생성 템플릿
         */
        createBlock(type, position = null) {
            const blockId = 'block-' + this.blockIdCounter++;

            const templates = {
                text: {
                    id: blockId,
                    type: 'text',
                    data: {
                        content: '',
                        style: 'normal' // normal, h1, h2, h3
                    }
                },
                image: {
                    id: blockId,
                    type: 'image',
                    data: {
                        url: '',
                        caption: ''
                    }
                },
                video: {
                    id: blockId,
                    type: 'video',
                    data: {
                        url: '',
                        provider: 'youtube', // youtube, vimeo, file
                        caption: ''
                    }
                },
                quiz: {
                    id: blockId,
                    type: 'quiz',
                    data: {
                        question: '',
                        quizType: 'multiple', // multiple, checkbox, short, essay
                        options: [
                            { text: '', correct: false },
                            { text: '', correct: false }
                        ],
                        answer: '',
                        explanation: ''
                    }
                },
                code: {
                    id: blockId,
                    type: 'code',
                    data: {
                        language: 'javascript',
                        code: ''
                    }
                },
                file: {
                    id: blockId,
                    type: 'file',
                    data: {
                        url: '',
                        filename: '',
                        size: ''
                    }
                },
                divider: {
                    id: blockId,
                    type: 'divider',
                    data: {}
                }
            };

            return templates[type];
        },

        /**
         * 블록 추가
         */
        addBlock(type, position = null) {
            const block = this.createBlock(type);

            if (position !== null) {
                this.content.blocks.splice(position, 0, block);
                this.focusedBlockIndex = position;
            } else {
                this.content.blocks.push(block);
                this.focusedBlockIndex = this.content.blocks.length - 1;
            }
        },

        /**
         * 블록 메뉴 표시
         */
        showBlockMenu(position) {
            // 사이드바의 블록 버튼을 클릭했을 때 해당 위치에 추가
            // 현재는 사이드바 버튼이 addBlock을 직접 호출
            console.log('Block menu at position:', position);
        },

        /**
         * 블록 포커스
         */
        focusBlock(index) {
            this.focusedBlockIndex = index;
        },

        /**
         * 블록 삭제
         */
        deleteBlock(index) {
            if (confirm('이 블록을 삭제하시겠습니까?')) {
                this.content.blocks.splice(index, 1);
                this.focusedBlockIndex = null;
            }
        },

        /**
         * 블록 위로 이동
         */
        moveBlockUp(index) {
            if (index > 0) {
                const block = this.content.blocks.splice(index, 1)[0];
                this.content.blocks.splice(index - 1, 0, block);
                this.focusedBlockIndex = index - 1;
            }
        },

        /**
         * 블록 아래로 이동
         */
        moveBlockDown(index) {
            if (index < this.content.blocks.length - 1) {
                const block = this.content.blocks.splice(index, 1)[0];
                this.content.blocks.splice(index + 1, 0, block);
                this.focusedBlockIndex = index + 1;
            }
        },

        /**
         * 이미지 업로드 처리
         */
        handleImageUpload(event, index) {
            const file = event.target.files[0];
            if (!file) return;

            // 실제로는 서버에 업로드하고 URL을 받아야 함
            // 여기서는 임시로 Data URL 사용
            const reader = new FileReader();
            reader.onload = (e) => {
                this.content.blocks[index].data.url = e.target.result;
            };
            reader.readAsDataURL(file);
        },

        /**
         * 비디오 업로드 처리
         */
        handleVideoUpload(event, index) {
            const file = event.target.files[0];
            if (!file) return;

            // 실제로는 서버에 업로드
            const reader = new FileReader();
            reader.onload = (e) => {
                this.content.blocks[index].data.url = e.target.result;
            };
            reader.readAsDataURL(file);
        },

        /**
         * 파일 업로드 처리
         */
        handleFileUpload(event, index) {
            const file = event.target.files[0];
            if (!file) return;

            // 파일 정보 저장
            this.content.blocks[index].data.filename = file.name;
            this.content.blocks[index].data.size = this.formatFileSize(file.size);

            // 실제로는 서버에 업로드
            this.content.blocks[index].data.url = URL.createObjectURL(file);
        },

        /**
         * 비디오 URL 로드
         */
        loadVideo(index) {
            const block = this.content.blocks[index];
            if (!block.data.url) {
                alert('URL을 입력해주세요.');
                return;
            }

            // URL 검증
            if (block.data.provider === 'youtube') {
                const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
                const match = block.data.url.match(youtubeRegex);
                if (!match) {
                    alert('올바른 YouTube URL이 아닙니다.');
                    return;
                }
            } else if (block.data.provider === 'vimeo') {
                const vimeoRegex = /vimeo\.com\/(\d+)/;
                const match = block.data.url.match(vimeoRegex);
                if (!match) {
                    alert('올바른 Vimeo URL이 아닙니다.');
                    return;
                }
            }

            // URL이 검증되면 그대로 유지 (이미 data.url에 저장됨)
        },

        /**
         * YouTube 임베드 URL 생성
         */
        getYoutubeEmbedUrl(url) {
            const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
            const match = url.match(youtubeRegex);
            if (match) {
                return `https://www.youtube.com/embed/${match[1]}`;
            }
            return url;
        },

        /**
         * Vimeo 임베드 URL 생성
         */
        getVimeoEmbedUrl(url) {
            const vimeoRegex = /vimeo\.com\/(\d+)/;
            const match = url.match(vimeoRegex);
            if (match) {
                return `https://player.vimeo.com/video/${match[1]}`;
            }
            return url;
        },

        /**
         * 퀴즈 선택지 추가
         */
        addQuizOption(index) {
            this.content.blocks[index].data.options.push({
                text: '',
                correct: false
            });
        },

        /**
         * 퀴즈 선택지 제거
         */
        removeQuizOption(blockIndex, optionIndex) {
            this.content.blocks[blockIndex].data.options.splice(optionIndex, 1);
        },

        /**
         * 텍스트 영역 자동 리사이즈
         */
        autoResize(event) {
            const textarea = event.target;
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        },

        /**
         * 파일 크기 포맷
         */
        formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
        },

        /**
         * 미리보기
         */
        previewContent() {
            // 제목 검증
            if (!this.content.title.trim()) {
                alert('콘텐츠 제목을 입력해주세요.');
                return;
            }

            // 빈 블록 확인
            const hasContent = this.content.blocks.some(block => {
                if (block.type === 'text') return block.data.content.trim();
                if (block.type === 'image') return block.data.url;
                if (block.type === 'video') return block.data.url;
                if (block.type === 'quiz') return block.data.question.trim();
                if (block.type === 'code') return block.data.code.trim();
                if (block.type === 'file') return block.data.url;
                return true; // divider는 항상 true
            });

            if (!hasContent) {
                alert('콘텐츠에 내용을 추가해주세요.');
                return;
            }

            // Bootstrap 모달 열기
            const modal = new bootstrap.Modal(document.getElementById('previewModal'));
            modal.show();
        },

        /**
         * 임시저장
         */
        saveDraft() {
            if (!this.content.title.trim()) {
                alert('콘텐츠 제목을 입력해주세요.');
                return;
            }

            this.content.status = 'draft';
            this.content.updatedAt = new Date().toISOString();

            if (!this.content.id) {
                this.content.id = 'content-' + Date.now();
                this.content.createdAt = new Date().toISOString();
            }

            // 실제로는 서버에 저장
            console.log('Saving draft:', this.content);

            // 로컬스토리지에 임시 저장
            localStorage.setItem('draft-' + this.content.id, JSON.stringify(this.content));

            alert('임시저장되었습니다.');
        },

        /**
         * 게시
         */
        publishContent() {
            // 유효성 검증
            if (!this.content.title.trim()) {
                alert('콘텐츠 제목을 입력해주세요.');
                return;
            }

            if (this.content.blocks.length === 0) {
                alert('최소 하나 이상의 블록을 추가해주세요.');
                return;
            }

            // 블록 내용 검증
            for (let i = 0; i < this.content.blocks.length; i++) {
                const block = this.content.blocks[i];

                if (block.type === 'text' && !block.data.content.trim()) {
                    alert(`${i + 1}번째 텍스트 블록이 비어있습니다.`);
                    return;
                }

                if (block.type === 'image' && !block.data.url) {
                    alert(`${i + 1}번째 이미지 블록에 이미지를 추가해주세요.`);
                    return;
                }

                if (block.type === 'video' && !block.data.url) {
                    alert(`${i + 1}번째 비디오 블록에 비디오를 추가해주세요.`);
                    return;
                }

                if (block.type === 'quiz') {
                    if (!block.data.question.trim()) {
                        alert(`${i + 1}번째 퀴즈 블록에 질문을 입력해주세요.`);
                        return;
                    }

                    if (block.data.quizType === 'multiple' || block.data.quizType === 'checkbox') {
                        const hasEmptyOption = block.data.options.some(opt => !opt.text.trim());
                        if (hasEmptyOption) {
                            alert(`${i + 1}번째 퀴즈의 선택지를 모두 입력해주세요.`);
                            return;
                        }

                        const hasCorrect = block.data.options.some(opt => opt.correct);
                        if (!hasCorrect) {
                            alert(`${i + 1}번째 퀴즈의 정답을 선택해주세요.`);
                            return;
                        }
                    }

                    if (block.data.quizType === 'short' && !block.data.answer.trim()) {
                        alert(`${i + 1}번째 단답형 퀴즈의 정답을 입력해주세요.`);
                        return;
                    }
                }

                if (block.type === 'code' && !block.data.code.trim()) {
                    alert(`${i + 1}번째 코드 블록에 코드를 입력해주세요.`);
                    return;
                }

                if (block.type === 'file' && !block.data.url) {
                    alert(`${i + 1}번째 파일 블록에 파일을 추가해주세요.`);
                    return;
                }
            }

            if (!confirm('콘텐츠를 게시하시겠습니까?')) {
                return;
            }

            this.content.status = 'published';
            this.content.updatedAt = new Date().toISOString();

            if (!this.content.id) {
                this.content.id = 'content-' + Date.now();
                this.content.createdAt = new Date().toISOString();
            }

            // 실제로는 서버에 저장
            console.log('Publishing content:', this.content);

            alert('콘텐츠가 게시되었습니다.');

            // 콘텐츠 목록으로 이동
            this.navigateTo('/learning/content');
        },

        /**
         * 콘텐츠 불러오기
         */
        loadContent(contentId) {
            // 실제로는 서버에서 불러옴
            // 여기서는 로컬스토리지에서 불러오기
            const savedContent = localStorage.getItem('draft-' + contentId);

            if (savedContent) {
                this.content = JSON.parse(savedContent);
                this.blockIdCounter = this.content.blocks.length + 1;
            } else {
                // 서버에서 불러오기 실패
                alert('콘텐츠를 불러올 수 없습니다.');
                this.navigateTo('/learning/content');
            }
        }
    }
}
