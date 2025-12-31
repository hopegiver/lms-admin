export default {
    name: 'webinarInstructorSchedule',
    layout: 'admin',
    data() {
        return {
            selectedInstructor: null,
            instructors: [
                { id: 1, name: '김영희', email: 'kim@example.com', department: '프로그래밍' },
                { id: 2, name: '이철수', email: 'lee@example.com', department: '디자인' },
                { id: 3, name: '박민수', email: 'park@example.com', department: '마케팅' }
            ],
            scheduleTemplate: {
                instructorId: null,
                slotDuration: 60,
                weeklySchedule: {
                    monday: [],
                    tuesday: [],
                    wednesday: [],
                    thursday: [],
                    friday: [],
                    saturday: [],
                    sunday: []
                }
            },
            currentSchedule: null,
            newTimeSlot: {
                day: 'monday',
                startTime: '09:00',
                endTime: '10:00'
            },
            exceptions: [
                { id: 1, instructorId: 1, date: '2025-01-15', type: 'unavailable', reason: '개인 일정' },
                { id: 2, instructorId: 1, date: '2025-02-10', type: 'holiday', reason: '설날 연휴' }
            ],
            showAddSlotModal: false,
            showAddExceptionModal: false,
            newException: {
                date: '',
                type: 'unavailable',
                reason: ''
            },
            dayNames: {
                monday: '월요일',
                tuesday: '화요일',
                wednesday: '수요일',
                thursday: '목요일',
                friday: '금요일',
                saturday: '토요일',
                sunday: '일요일'
            }
        }
    },
    mounted() {
        // 첫 번째 강사 자동 선택
        if (this.instructors.length > 0) {
            this.selectInstructor(this.instructors[0]);
        }
    },
    methods: {
        selectInstructor(instructor) {
            this.selectedInstructor = instructor;
            this.loadInstructorSchedule(instructor.id);
        },

        loadInstructorSchedule(instructorId) {
            // Mock 데이터 - 실제로는 API 호출
            this.currentSchedule = {
                instructorId: instructorId,
                slotDuration: 60,
                weeklySchedule: {
                    monday: [
                        { startTime: '09:00', endTime: '12:00' },
                        { startTime: '14:00', endTime: '17:00' }
                    ],
                    tuesday: [
                        { startTime: '10:00', endTime: '12:00' }
                    ],
                    wednesday: [
                        { startTime: '09:00', endTime: '12:00' }
                    ],
                    thursday: [],
                    friday: [
                        { startTime: '14:00', endTime: '18:00' }
                    ],
                    saturday: [],
                    sunday: []
                }
            };
        },

        openAddSlotModal() {
            this.newTimeSlot = {
                day: 'monday',
                startTime: '09:00',
                endTime: '10:00'
            };
            this.showAddSlotModal = true;
        },

        addTimeSlot() {
            if (!this.currentSchedule) return;

            const day = this.newTimeSlot.day;
            this.currentSchedule.weeklySchedule[day].push({
                startTime: this.newTimeSlot.startTime,
                endTime: this.newTimeSlot.endTime
            });

            // 시간순 정렬
            this.currentSchedule.weeklySchedule[day].sort((a, b) =>
                a.startTime.localeCompare(b.startTime)
            );

            this.showAddSlotModal = false;
            alert('시간 슬롯이 추가되었습니다.');
        },

        removeTimeSlot(day, index) {
            if (confirm('이 시간 슬롯을 삭제하시겠습니까?')) {
                this.currentSchedule.weeklySchedule[day].splice(index, 1);
            }
        },

        openAddExceptionModal() {
            this.newException = {
                date: '',
                type: 'unavailable',
                reason: ''
            };
            this.showAddExceptionModal = true;
        },

        addException() {
            if (!this.newException.date || !this.newException.reason) {
                alert('날짜와 사유를 입력해주세요.');
                return;
            }

            this.exceptions.push({
                id: Date.now(),
                instructorId: this.selectedInstructor.id,
                date: this.newException.date,
                type: this.newException.type,
                reason: this.newException.reason
            });

            this.showAddExceptionModal = false;
            alert('예외 날짜가 추가되었습니다.');
        },

        removeException(id) {
            if (confirm('이 예외 날짜를 삭제하시겠습니까?')) {
                const index = this.exceptions.findIndex(e => e.id === id);
                if (index > -1) {
                    this.exceptions.splice(index, 1);
                }
            }
        },

        getInstructorExceptions() {
            if (!this.selectedInstructor) return [];
            return this.exceptions.filter(e => e.instructorId === this.selectedInstructor.id);
        },

        saveSchedule() {
            if (!this.currentSchedule) {
                alert('스케줄이 없습니다.');
                return;
            }

            // 실제로는 API 호출
            alert('스케줄이 저장되었습니다.');
        },

        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'short'
            });
        }
    }
}
