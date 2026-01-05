export default {
    name: 'coursesWizard',
    layout: 'admin',
    data() {
        return {
            currentStep: 1,
            totalSteps: 7,

            // 1단계: 기본 정보
            basicInfo: {
                title: '',
                category: '',
                level: 'beginner',
                instructor: '',
                description: '',
                thumbnail: null,
                courseType: 'self-paced',
                // 코호트/집체/혼합 강좌용 필드
                cohortNumber: null,
                capacity: null,
                startDate: '',
                endDate: '',
                registrationEndDate: '',
                location: '',
                onlineRatio: 60,
                offlineRatio: 40,
                templateCourseId: null
            },

            // 2단계: 커리큘럼 구성
            sections: [],

            // 3단계: 콘텐츠 연결
            contentMapping: {},
            availableContents: [],

            // 4단계: 평가 설정
            assessments: {
                exams: [],
                assignments: []
            },
            availableExams: [],
            availableAssignments: [],

            // 5단계: 수료 설정
            completionSettings: {
                certificateTemplateId: null,
                completionType: 'auto',
                progressRequired: 100,
                scoreRequired: 70,
                requireAllLessons: true,
                requireExams: false,
                requireAssignments: false
            },
            certificateTemplates: [],

            // 6단계: 가격 설정
            pricingEnabled: false,
            pricing: {
                price: '',
                salePrice: '',
                salesStart: '',
                salesEnd: ''
            },

            // 7단계: 최종 검토
            publishImmediately: false,

            // 기타
            categories: ['개발', '디자인', '마케팅', '비즈니스', '언어', '기타'],
            tempSectionForm: {
                title: '',
                description: ''
            },
            showSectionForm: false,
            editingSectionIndex: null
        }
    },
    mounted() {
        this.loadResources();
    },
    watch: {
        'basicInfo.onlineRatio'(newVal) {
            if (this.basicInfo.courseType === 'blended') {
                this.basicInfo.offlineRatio = 100 - newVal;
            }
        }
    },
    computed: {
        isScheduledCourse() {
            return ['cohort', 'in-person', 'blended'].includes(this.basicInfo.courseType);
        },

        canProceed() {
            switch (this.currentStep) {
                case 1:
                    const basicValid = this.basicInfo.title && this.basicInfo.category && this.basicInfo.instructor;
                    if (!basicValid) return false;

                    // 스케줄형 강좌는 추가 필드 필수
                    if (this.isScheduledCourse) {
                        if (!this.basicInfo.capacity || !this.basicInfo.startDate || !this.basicInfo.endDate || !this.basicInfo.registrationEndDate) {
                            return false;
                        }
                        // 집체교육/혼합교육은 장소 필수
                        if ((this.basicInfo.courseType === 'in-person' || this.basicInfo.courseType === 'blended') && !this.basicInfo.location) {
                            return false;
                        }
                    }
                    return true;
                case 2:
                    return this.sections.length > 0 && this.sections.some(s => s.lessons && s.lessons.length > 0);
                case 3:
                    return true; // 콘텐츠는 나중에 추가 가능
                case 4:
                    return true; // 평가는 선택사항
                case 5:
                    return this.completionSettings.certificateTemplateId !== null;
                case 6:
                    return true; // 가격은 선택사항
                case 7:
                    return true;
                default:
                    return false;
            }
        },

        canSkipCurrentStep() {
            return [3, 4, 6].includes(this.currentStep);
        },

        progressPercentage() {
            return (this.currentStep / this.totalSteps) * 100;
        },

        totalLessons() {
            let count = 0;
            this.sections.forEach(section => {
                if (section.lessons) {
                    count += section.lessons.length;
                }
            });
            return count;
        }
    },
    methods: {
        loadResources() {
            // 실제로는 API 호출
            this.availableContents = [
                { id: 1, title: 'React 개요 영상', type: 'video', duration: '15분' },
                { id: 2, title: 'JSX 문법 설명 영상', type: 'video', duration: '20분' },
                { id: 3, title: 'React 공식 문서', type: 'document', duration: '10분' }
            ];

            this.availableExams = [
                { id: 1, title: 'React 기초 이해도 테스트', questionCount: 10, timeLimit: '20분' },
                { id: 2, title: 'JSX 문법 퀴즈', questionCount: 5, timeLimit: '10분' }
            ];

            this.availableAssignments = [
                { id: 1, title: 'TODO 앱 만들기', dueDate: '7일', points: 100 },
                { id: 2, title: '계산기 구현', dueDate: '5일', points: 80 }
            ];

            this.certificateTemplates = [
                { id: 1, name: '기본 수료증', orientation: 'horizontal' },
                { id: 2, name: '프리미엄 수료증', orientation: 'horizontal' },
                { id: 3, name: '세로형 수료증', orientation: 'vertical' }
            ];
        },

        nextStep() {
            if (this.currentStep < this.totalSteps && this.canProceed) {
                this.currentStep++;
            }
        },

        prevStep() {
            if (this.currentStep > 1) {
                this.currentStep--;
            }
        },

        skipStep() {
            if (this.canSkipCurrentStep) {
                this.currentStep++;
            }
        },

        goToStep(step) {
            if (step >= 1 && step <= this.totalSteps) {
                this.currentStep = step;
            }
        },

        // 섹션 관리
        showAddSectionForm() {
            this.tempSectionForm = { title: '', description: '' };
            this.showSectionForm = true;
            this.editingSectionIndex = null;
        },

        editSection(index) {
            this.tempSectionForm = { ...this.sections[index] };
            this.showSectionForm = true;
            this.editingSectionIndex = index;
        },

        saveSectionForm() {
            if (!this.tempSectionForm.title) {
                alert('섹션명을 입력해주세요.');
                return;
            }

            if (this.editingSectionIndex !== null) {
                this.sections[this.editingSectionIndex] = {
                    ...this.tempSectionForm,
                    lessons: this.sections[this.editingSectionIndex].lessons || []
                };
            } else {
                this.sections.push({
                    ...this.tempSectionForm,
                    lessons: []
                });
            }

            this.showSectionForm = false;
            this.tempSectionForm = { title: '', description: '' };
            this.editingSectionIndex = null;
        },

        cancelSectionForm() {
            this.showSectionForm = false;
            this.tempSectionForm = { title: '', description: '' };
            this.editingSectionIndex = null;
        },

        deleteSection(index) {
            if (confirm('이 섹션을 삭제하시겠습니까?')) {
                this.sections.splice(index, 1);
            }
        },

        addLessonToSection(sectionIndex) {
            const lessonTitle = prompt('차시명을 입력하세요:');
            if (lessonTitle) {
                if (!this.sections[sectionIndex].lessons) {
                    this.sections[sectionIndex].lessons = [];
                }
                this.sections[sectionIndex].lessons.push({
                    title: lessonTitle,
                    duration: '15분',
                    type: 'video',
                    contentId: null
                });
            }
        },

        removeLessonFromSection(sectionIndex, lessonIndex) {
            if (confirm('이 차시를 삭제하시겠습니까?')) {
                this.sections[sectionIndex].lessons.splice(lessonIndex, 1);
            }
        },

        // 콘텐츠 연결
        assignContentToLesson(sectionIndex, lessonIndex, contentId) {
            const lesson = this.sections[sectionIndex].lessons[lessonIndex];
            lesson.contentId = contentId;

            const content = this.availableContents.find(c => c.id === contentId);
            if (content) {
                lesson.duration = content.duration;
            }
        },

        createNewContent() {
            alert('콘텐츠 생성 기능은 추후 구현됩니다. 먼저 콘텐츠 메뉴에서 콘텐츠를 등록해주세요.');
        },

        // 평가 추가
        addExam(examId) {
            if (!this.assessments.exams.includes(examId)) {
                this.assessments.exams.push(examId);
            }
        },

        removeExam(examId) {
            const index = this.assessments.exams.indexOf(examId);
            if (index > -1) {
                this.assessments.exams.splice(index, 1);
            }
        },

        addAssignment(assignmentId) {
            if (!this.assessments.assignments.includes(assignmentId)) {
                this.assessments.assignments.push(assignmentId);
            }
        },

        removeAssignment(assignmentId) {
            const index = this.assessments.assignments.indexOf(assignmentId);
            if (index > -1) {
                this.assessments.assignments.splice(index, 1);
            }
        },

        // 썸네일 업로드
        uploadThumbnail() {
            alert('썸네일 업로드 기능은 추후 구현됩니다.');
        },

        removeThumbnail() {
            this.basicInfo.thumbnail = null;
        },

        // 임시 저장
        saveDraft() {
            alert('임시 저장되었습니다. 언제든지 이어서 작성할 수 있습니다.');
            this.navigateTo('/learning/courses');
        },

        // 최종 완료
        completeCourse() {
            if (!this.canProceed) {
                alert('필수 항목을 모두 입력해주세요.');
                return;
            }

            const courseData = {
                ...this.basicInfo,
                sections: this.sections,
                assessments: this.assessments,
                completionSettings: this.completionSettings,
                pricing: this.pricingEnabled ? this.pricing : null,
                status: this.publishImmediately ? 'published' : 'draft'
            };

            console.log('생성할 강좌 데이터:', courseData);

            if (this.publishImmediately) {
                alert('강좌가 생성되고 즉시 발행되었습니다!');
            } else {
                alert('강좌가 임시 저장되었습니다. 강좌 목록에서 확인 후 발행할 수 있습니다.');
            }

            this.navigateTo('/learning/courses');
        },

        cancel() {
            if (confirm('작성 중인 내용이 저장되지 않습니다. 정말 취소하시겠습니까?')) {
                this.navigateTo('/learning/courses');
            }
        },

        getStepTitle(step) {
            const titles = {
                1: '기본 정보',
                2: '커리큘럼 구성',
                3: '콘텐츠 연결',
                4: '평가 설정',
                5: '수료 설정',
                6: '가격 설정',
                7: '최종 검토'
            };
            return titles[step] || '';
        },

        getStepIcon(step) {
            const icons = {
                1: '📋',
                2: '📚',
                3: '🎬',
                4: '📝',
                5: '🎓',
                6: '💰',
                7: '✅'
            };
            return icons[step] || '';
        }
    }
}
