export default {
    name: 'MainPage',
    layout: 'admin',
    data() {
        return {
            activeSections: [
                {
                    id: 1,
                    type: 'hero',
                    name: '히어로 배너',
                    icon: '🎯',
                    description: '메인 비주얼 영역',
                    visible: true,
                    sortOrder: 1,
                    settings: {
                        title: '온라인 학습의 새로운 시작',
                        subtitle: '전문가와 함께하는 온라인 강좌',
                        backgroundColor: '#ffffff',
                        padding: 'lg',
                        showTitle: true,
                        backgroundImage: '',
                        mainText: '당신의 성장을 위한 최고의 선택',
                        buttonText: '강좌 둘러보기',
                        buttonLink: '/courses'
                    }
                },
                {
                    id: 2,
                    type: 'popular-courses',
                    name: '인기 강좌',
                    icon: '🔥',
                    description: '가장 많이 수강한 강좌',
                    visible: true,
                    sortOrder: 2,
                    settings: {
                        title: '인기 강좌',
                        subtitle: '가장 많은 수강생이 선택한 강좌',
                        layout: 'grid',
                        itemCount: 8,
                        backgroundColor: '#f8f9fa',
                        padding: 'md',
                        showTitle: true
                    }
                },
                {
                    id: 3,
                    type: 'new-courses',
                    name: '신규 강좌',
                    icon: '✨',
                    description: '최근 추가된 강좌',
                    visible: true,
                    sortOrder: 3,
                    settings: {
                        title: '신규 강좌',
                        subtitle: '따끈따끈한 신규 강좌를 만나보세요',
                        layout: 'carousel',
                        itemCount: 6,
                        backgroundColor: '#ffffff',
                        padding: 'md',
                        showTitle: true
                    }
                }
            ],
            availableSections: [
                {
                    type: 'hero',
                    name: '히어로 배너',
                    icon: '🎯',
                    description: '메인 비주얼 영역'
                },
                {
                    type: 'popular-courses',
                    name: '인기 강좌',
                    icon: '🔥',
                    description: '가장 많이 수강한 강좌'
                },
                {
                    type: 'new-courses',
                    name: '신규 강좌',
                    icon: '✨',
                    description: '최근 추가된 강좌'
                },
                {
                    type: 'recommended-courses',
                    name: '추천 강좌',
                    icon: '⭐',
                    description: '관리자 추천 강좌'
                },
                {
                    type: 'categories',
                    name: '카테고리',
                    icon: '📁',
                    description: '강좌 카테고리 목록'
                },
                {
                    type: 'instructors',
                    name: '강사 소개',
                    icon: '👨‍🏫',
                    description: '인기 강사 목록'
                },
                {
                    type: 'testimonials',
                    name: '수강후기',
                    icon: '💬',
                    description: '수강생 후기'
                },
                {
                    type: 'stats',
                    name: '통계',
                    icon: '📊',
                    description: '플랫폼 통계 (수강생 수, 강좌 수 등)'
                },
                {
                    type: 'features',
                    name: '주요 기능',
                    icon: '⚡',
                    description: '플랫폼 주요 기능 소개'
                },
                {
                    type: 'blog',
                    name: '블로그/소식',
                    icon: '📰',
                    description: '최근 블로그 글'
                },
                {
                    type: 'partners',
                    name: '파트너사',
                    icon: '🤝',
                    description: '협력사 로고'
                },
                {
                    type: 'cta',
                    name: 'CTA 배너',
                    icon: '📣',
                    description: '행동 유도 배너'
                },
                {
                    type: 'faq',
                    name: 'FAQ',
                    icon: '❓',
                    description: '자주 묻는 질문'
                },
                {
                    type: 'newsletter',
                    name: '뉴스레터',
                    icon: '📧',
                    description: '뉴스레터 구독 폼'
                }
            ],
            showAddSectionModal: false,
            showSettingsModal: false,
            editingSection: null,
            sectionSettings: {}
        }
    },
    computed: {
        visibleSections() {
            return this.activeSections
                .filter(s => s.visible)
                .sort((a, b) => a.sortOrder - b.sortOrder);
        }
    },
    methods: {
        addSection(sectionTemplate) {
            const maxId = this.activeSections.length > 0
                ? Math.max(...this.activeSections.map(s => s.id))
                : 0;

            const maxSortOrder = this.activeSections.length > 0
                ? Math.max(...this.activeSections.map(s => s.sortOrder))
                : 0;

            const newSection = {
                id: maxId + 1,
                type: sectionTemplate.type,
                name: sectionTemplate.name,
                icon: sectionTemplate.icon,
                description: sectionTemplate.description,
                visible: true,
                sortOrder: maxSortOrder + 1,
                settings: {
                    title: sectionTemplate.name,
                    subtitle: '',
                    layout: 'grid',
                    itemCount: 6,
                    backgroundColor: '#ffffff',
                    padding: 'md',
                    showTitle: true
                }
            };

            // Hero 섹션 전용 설정
            if (sectionTemplate.type === 'hero') {
                newSection.settings = {
                    ...newSection.settings,
                    backgroundImage: '',
                    mainText: '',
                    buttonText: '자세히 보기',
                    buttonLink: '#'
                };
            }

            this.activeSections.push(newSection);
        },

        removeSection(index) {
            if (confirm('이 섹션을 삭제하시겠습니까?')) {
                this.activeSections.splice(index, 1);
                // sortOrder 재정렬
                this.activeSections.forEach((section, idx) => {
                    section.sortOrder = idx + 1;
                });
            }
        },

        moveSection(index, direction) {
            if (direction === 'up' && index > 0) {
                const temp = this.activeSections[index];
                this.activeSections[index] = this.activeSections[index - 1];
                this.activeSections[index - 1] = temp;
            } else if (direction === 'down' && index < this.activeSections.length - 1) {
                const temp = this.activeSections[index];
                this.activeSections[index] = this.activeSections[index + 1];
                this.activeSections[index + 1] = temp;
            }

            // sortOrder 재정렬
            this.activeSections.forEach((section, idx) => {
                section.sortOrder = idx + 1;
            });
        },

        editSection(section) {
            this.editingSection = section;
            this.sectionSettings = { ...section.settings };
            this.showSettingsModal = true;
        },

        closeSettingsModal() {
            this.showSettingsModal = false;
            this.editingSection = null;
            this.sectionSettings = {};
        },

        saveSettings() {
            if (this.editingSection) {
                this.editingSection.settings = { ...this.sectionSettings };
            }
            this.closeSettingsModal();
        },

        previewMainPage() {
            alert('미리보기 기능은 추후 구현 예정입니다.\n\n현재 구성:\n' +
                this.visibleSections.map((s, i) => `${i + 1}. ${s.name}`).join('\n'));
        },

        saveMainPage() {
            console.log('저장된 메인페이지 구성:', {
                sections: this.activeSections,
                visibleCount: this.visibleSections.length
            });

            alert(`메인페이지가 저장되었습니다.\n\n활성 섹션: ${this.visibleSections.length}개\n전체 섹션: ${this.activeSections.length}개`);
        }
    }
}
