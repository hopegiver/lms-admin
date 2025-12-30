export default {
    name: 'InquiriesDetail',
    layout: 'admin',
    data() {
        return {
            currentTab: 'content',
            inquiryId: null,
            inquiry: null,
            replyForm: {
                content: '',
                isPrivate: false,
                sendEmail: true
            },
            replyTemplates: [
                {
                    id: 1,
                    title: '일반 문의 답변',
                    description: '기본 감사 인사 포함',
                    content: '안녕하세요.\n문의해 주셔서 감사합니다.\n\n[답변 내용]\n\n추가 문의사항이 있으시면 언제든지 문의해 주세요.\n감사합니다.'
                },
                {
                    id: 2,
                    title: '기술 지원 답변',
                    description: '기술 문제 해결 템플릿',
                    content: '안녕하세요.\n문의하신 기술적인 문제에 대해 안내드립니다.\n\n[문제 분석]\n[해결 방법]\n\n문제가 해결되지 않으면 추가로 연락 주세요.\n감사합니다.'
                },
                {
                    id: 3,
                    title: '환불 관련 답변',
                    description: '환불 정책 안내',
                    content: '안녕하세요.\n환불 관련 문의에 대해 안내드립니다.\n\n[환불 정책 설명]\n[필요 절차]\n\n추가 문의사항이 있으시면 연락 주세요.\n감사합니다.'
                }
            ],
            processHistory: []
        }
    },
    methods: {
        getStatusText(status) {
            const statuses = {
                'pending': '대기중',
                'processing': '처리중',
                'resolved': '해결됨',
                'closed': '종료됨'
            };
            return statuses[status] || status;
        },

        getStatusAlertClass(status) {
            const classes = {
                'pending': 'alert-warning',
                'processing': 'alert-info',
                'resolved': 'alert-success',
                'closed': 'alert-secondary'
            };
            return classes[status] || 'alert-secondary';
        },

        getStatusBadgeClass(status) {
            const classes = {
                'pending': 'bg-warning',
                'processing': 'bg-info',
                'resolved': 'bg-success',
                'closed': 'bg-secondary'
            };
            return classes[status] || 'bg-secondary';
        },

        getTypeText(type) {
            const types = {
                'general': '일반 문의',
                'technical': '기술 지원',
                'billing': '결제/환불',
                'content': '콘텐츠 문의',
                'other': '기타'
            };
            return types[type] || type;
        },

        getPriorityText(priority) {
            const priorities = {
                'high': '높음',
                'medium': '보통',
                'low': '낮음'
            };
            return priorities[priority] || priority;
        },

        getPriorityClass(priority) {
            const classes = {
                'high': 'bg-danger',
                'medium': 'bg-warning',
                'low': 'bg-secondary'
            };
            return classes[priority] || 'bg-secondary';
        },

        getHistoryIconClass(type) {
            const classes = {
                'created': 'bg-info',
                'assigned': 'bg-warning',
                'replied': 'bg-success',
                'status_changed': 'bg-primary',
                'closed': 'bg-danger'
            };
            return classes[type] || 'bg-secondary';
        },

        getHistoryIcon(type) {
            const icons = {
                'created': 'bi-plus-circle',
                'assigned': 'bi-person-check',
                'replied': 'bi-chat-dots',
                'status_changed': 'bi-arrow-repeat',
                'closed': 'bi-check-circle'
            };
            return icons[type] || 'bi-circle';
        },

        async loadInquiry() {
            try {
                // API 호출 시뮬레이션
                // const response = await this.$api.get(`/api/community/inquiries/${this.inquiryId}`);

                // 임시 데이터
                this.inquiry = {
                    id: this.inquiryId,
                    type: 'technical',
                    status: 'processing',
                    priority: 'high',
                    subject: '강좌 재생이 되지 않습니다',
                    content: '안녕하세요.\n어제부터 강좌를 재생하려고 하면 계속 로딩만 되고 재생이 되지 않습니다.\n브라우저는 크롬을 사용하고 있습니다.\n\n확인 부탁드립니다.',
                    userName: '김학생',
                    email: 'student@example.com',
                    createdAt: '2024-01-15 10:30',
                    assignedTo: '김관리자',
                    attachments: [
                        { id: 1, name: 'screenshot.png', size: '1.2MB' }
                    ],
                    relatedCourse: {
                        title: 'React 완벽 가이드',
                        instructor: '김개발'
                    },
                    replies: [
                        {
                            id: 1,
                            author: '김관리자',
                            content: '문의해 주셔서 감사합니다.\n확인 결과 일시적인 서버 문제로 확인되었습니다.\n현재는 정상화되었으니 다시 시도해 주세요.',
                            isPrivate: false,
                            createdAt: '2024-01-15 14:20'
                        }
                    ]
                };

                this.loadHistory();
            } catch (error) {
                alert('문의 정보를 불러오는데 실패했습니다: ' + error.message);
            }
        },

        loadHistory() {
            this.processHistory = [
                {
                    id: 1,
                    type: 'created',
                    title: '문의 접수',
                    description: '새로운 문의가 접수되었습니다',
                    actor: '시스템',
                    timestamp: '2024-01-15 10:30'
                },
                {
                    id: 2,
                    type: 'assigned',
                    title: '담당자 지정',
                    description: '김관리자에게 문의가 할당되었습니다',
                    actor: '시스템',
                    timestamp: '2024-01-15 11:00'
                },
                {
                    id: 3,
                    type: 'status_changed',
                    title: '상태 변경',
                    description: '대기중 → 처리중',
                    actor: '김관리자',
                    timestamp: '2024-01-15 11:05'
                },
                {
                    id: 4,
                    type: 'replied',
                    title: '답변 등록',
                    description: '관리자가 답변을 등록했습니다',
                    actor: '김관리자',
                    timestamp: '2024-01-15 14:20'
                }
            ];
        },

        applyTemplate(template) {
            this.replyForm.content = template.content;
        },

        validateReply() {
            if (!this.replyForm.content.trim()) {
                alert('답변 내용을 입력해주세요.');
                return false;
            }
            return true;
        },

        async submitReply() {
            if (!this.validateReply()) return;

            try {
                // API 호출 시뮬레이션
                // await this.$api.post(`/api/community/inquiries/${this.inquiryId}/replies`, this.replyForm);

                alert('답변이 등록되었습니다.');
                this.replyForm.content = '';
                this.loadInquiry();
            } catch (error) {
                alert('답변 등록에 실패했습니다: ' + error.message);
            }
        },

        async submitReplyAndResolve() {
            if (!this.validateReply()) return;

            if (confirm('답변을 등록하고 문의를 해결 완료 처리하시겠습니까?')) {
                try {
                    // API 호출 시뮬레이션
                    // await this.$api.post(`/api/community/inquiries/${this.inquiryId}/replies`, this.replyForm);
                    // await this.$api.patch(`/api/community/inquiries/${this.inquiryId}/status`, { status: 'resolved' });

                    alert('답변이 등록되고 해결 완료 처리되었습니다.');
                    this.inquiry.status = 'resolved';
                    this.replyForm.content = '';
                    this.loadInquiry();
                } catch (error) {
                    alert('처리에 실패했습니다: ' + error.message);
                }
            }
        },

        async assignToMe() {
            if (confirm('이 문의를 담당하시겠습니까?')) {
                try {
                    // API 호출 시뮬레이션
                    // await this.$api.patch(`/api/community/inquiries/${this.inquiryId}/assign`, { userId: 'current_user_id' });

                    alert('담당자로 지정되었습니다.');
                    this.loadInquiry();
                } catch (error) {
                    alert('담당자 지정에 실패했습니다: ' + error.message);
                }
            }
        },

        async closeInquiry() {
            if (confirm('문의를 종료하시겠습니까?')) {
                try {
                    // API 호출 시뮬레이션
                    // await this.$api.patch(`/api/community/inquiries/${this.inquiryId}/status`, { status: 'closed' });

                    alert('문의가 종료되었습니다.');
                    this.inquiry.status = 'closed';
                    this.loadInquiry();
                } catch (error) {
                    alert('처리에 실패했습니다: ' + error.message);
                }
            }
        },

        async deleteInquiry() {
            if (confirm('정말 삭제하시겠습니까?')) {
                try {
                    // API 호출 시뮬레이션
                    // await this.$api.delete(`/api/community/inquiries/${this.inquiryId}`);

                    alert('문의가 삭제되었습니다.');
                    this.navigateTo('/community/inquiries');
                } catch (error) {
                    alert('삭제에 실패했습니다: ' + error.message);
                }
            }
        },

        downloadFile(file) {
            alert(`파일 다운로드: ${file.name}`);
            // 실제 구현에서는 파일 다운로드 처리
        }
    },
    mounted() {
        // 쿼리 파라미터에서 ID 추출
        const params = new URLSearchParams(window.location.search);
        this.inquiryId = params.get('id');

        if (!this.inquiryId) {
            alert('문의 ID가 없습니다.');
            this.navigateTo('/community/inquiries');
            return;
        }

        this.loadInquiry();
    }
}
