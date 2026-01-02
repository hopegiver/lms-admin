export default {
    name: 'KakaoAlimtalk',
    layout: 'admin',
    data() {
        return {
            kakaoForm: {
                campaignName: '',
                templateCode: '',
                variables: {},
                targetType: 'all',
                targetGroups: [],
                useFallbackSms: true,
                fallbackMessage: '',
                scheduleType: 'now',
                scheduleDate: '',
                scheduleTime: ''
            },
            availableGroups: [
                { id: 1, name: '전체 학습자', count: 5230 },
                { id: 2, name: 'VIP 회원', count: 245 },
                { id: 3, name: '신규 가입자 (7일 이내)', count: 128 },
                { id: 4, name: '휴면 회원 (30일 미접속)', count: 892 },
                { id: 5, name: '수강 완료자', count: 1456 },
                { id: 6, name: '기업 회원', count: 678 }
            ],
            templates: [
                {
                    code: 'WELCOME_001',
                    name: '신규 가입 환영',
                    content: '안녕하세요 #{이름}님!\nLMS에 가입해주셔서 감사합니다.\n\n첫 강좌 수강 시 #{할인율}% 할인 혜택을 드립니다.',
                    variables: ['이름', '할인율'],
                    buttons: [{ name: '강좌 둘러보기', type: 'WL', url: 'https://example.com/courses' }],
                    status: 'approved',
                    approvedAt: '2024-01-10'
                },
                {
                    code: 'COURSE_REMIND',
                    name: '학습 독려',
                    content: '#{이름}님, #{강좌명} 수강을 계속하세요!\n\n현재 진도율: #{진도율}%\n목표까지 #{남은일수}일 남았습니다.',
                    variables: ['이름', '강좌명', '진도율', '남은일수'],
                    buttons: [{ name: '학습 이어하기', type: 'WL', url: 'https://example.com/learning' }],
                    status: 'approved',
                    approvedAt: '2024-01-12'
                },
                {
                    code: 'PROMO_SALE',
                    name: '프로모션 안내',
                    content: '[#{프로모션명}]\n\n#{이름}님을 위한 특별 혜택!\n기간: #{시작일} ~ #{종료일}\n할인: 최대 #{할인율}%',
                    variables: ['프로모션명', '이름', '시작일', '종료일', '할인율'],
                    buttons: [
                        { name: '혜택 보기', type: 'WL', url: 'https://example.com/promo' },
                        { name: '고객센터', type: 'WL', url: 'https://example.com/support' }
                    ],
                    status: 'approved',
                    approvedAt: '2024-01-15'
                },
                {
                    code: 'CERT_COMPLETE',
                    name: '수료 축하',
                    content: '축하합니다! #{이름}님\n\n#{강좌명} 과정을 수료하셨습니다.\n수료증이 발급되었습니다.',
                    variables: ['이름', '강좌명'],
                    buttons: [{ name: '수료증 확인', type: 'WL', url: 'https://example.com/certificates' }],
                    status: 'approved',
                    approvedAt: '2024-01-08'
                },
                {
                    code: 'PAYMENT_CONFIRM',
                    name: '결제 완료',
                    content: '#{이름}님, 결제가 완료되었습니다.\n\n상품명: #{상품명}\n금액: #{금액}원\n결제일: #{결제일}',
                    variables: ['이름', '상품명', '금액', '결제일'],
                    buttons: [{ name: '주문 상세', type: 'WL', url: 'https://example.com/orders' }],
                    status: 'approved',
                    approvedAt: '2024-01-05'
                },
                {
                    code: 'EVENT_INVITE',
                    name: '이벤트 초대',
                    content: '#{이름}님을 초대합니다!\n\n이벤트: #{이벤트명}\n일시: #{일시}\n장소: #{장소}',
                    variables: ['이름', '이벤트명', '일시', '장소'],
                    buttons: [{ name: '참가 신청', type: 'WL', url: 'https://example.com/events' }],
                    status: 'pending',
                    approvedAt: null
                }
            ],
            selectedTemplate: null
        }
    },
    computed: {
        approvedTemplates() {
            return this.templates.filter(t => t.status === 'approved');
        },
        targetCount() {
            if (this.kakaoForm.targetType === 'all') {
                return 5230;
            } else if (this.kakaoForm.targetType === 'groups') {
                return this.kakaoForm.targetGroups.reduce((sum, groupId) => {
                    const group = this.availableGroups.find(g => g.id === groupId);
                    return sum + (group ? group.count : 0);
                }, 0);
            }
            return 0;
        },
        estimatedCost() {
            const alimtalkCost = this.targetCount * 12; // 알림톡 12원
            const fallbackCost = this.kakaoForm.useFallbackSms ? this.targetCount * 20 : 0; // 대체 SMS 20원 (실패 시)
            return { alimtalk: alimtalkCost, fallback: fallbackCost, total: alimtalkCost };
        },
        previewContent() {
            if (!this.selectedTemplate) return '';

            let content = this.selectedTemplate.content;
            Object.keys(this.kakaoForm.variables).forEach(key => {
                const value = this.kakaoForm.variables[key];
                content = content.replace(new RegExp(`#\\{${key}\\}`, 'g'), value || `[${key}]`);
            });
            return content;
        }
    },
    methods: {
        selectTemplate(template) {
            this.selectedTemplate = template;
            this.kakaoForm.templateCode = template.code;

            // 변수 초기화
            this.kakaoForm.variables = {};
            template.variables.forEach(v => {
                this.kakaoForm.variables[v] = '';
            });
        },
        sendKakao() {
            if (!this.kakaoForm.campaignName) {
                alert('캠페인명을 입력해주세요.');
                return;
            }
            if (!this.kakaoForm.templateCode) {
                alert('템플릿을 선택해주세요.');
                return;
            }

            // 변수 값 검증
            const emptyVars = Object.keys(this.kakaoForm.variables).filter(k => !this.kakaoForm.variables[k]);
            if (emptyVars.length > 0) {
                alert(`다음 변수 값을 입력해주세요: ${emptyVars.join(', ')}`);
                return;
            }

            if (this.targetCount === 0) {
                alert('발송 대상을 선택해주세요.');
                return;
            }

            const scheduleInfo = this.kakaoForm.scheduleType === 'now'
                ? '즉시 발송'
                : `예약 발송 (${this.kakaoForm.scheduleDate} ${this.kakaoForm.scheduleTime})`;

            const fallbackInfo = this.kakaoForm.useFallbackSms
                ? '\n대체 발송: SMS (실패 시 자동 발송)'
                : '\n대체 발송: 사용 안 함';

            if (confirm(`${this.targetCount}명에게 알림톡을 발송하시겠습니까?\n\n발송 방식: ${scheduleInfo}${fallbackInfo}\n예상 비용: ₩${this.estimatedCost.total.toLocaleString()}`)) {
                console.log('알림톡 발송:', this.kakaoForm);
                alert('알림톡이 발송되었습니다.');
                this.navigateTo('/marketing/campaigns');
            }
        },
        saveDraft() {
            console.log('임시 저장:', this.kakaoForm);
            alert('임시저장되었습니다.');
        },
        getStatusBadge(status) {
            const badges = {
                'approved': { class: 'bg-success', text: '승인' },
                'pending': { class: 'bg-warning', text: '검수중' },
                'rejected': { class: 'bg-danger', text: '반려' }
            };
            return badges[status] || badges['pending'];
        }
    }
}
