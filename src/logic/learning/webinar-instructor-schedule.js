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
            schedules: [],
            currentSchedule: null,
            selectedScheduleId: null,
            showScheduleVersionModal: false,
            newScheduleVersion: {
                effectiveFrom: '',
                copyFromCurrent: true
            },
            newTimeSlot: {
                day: 'monday',
                startTime: '09:00',
                endTime: '10:00'
            },
            exceptions: [
                { id: 1, instructorId: 1, date: '2025-01-15', type: 'unavailable', reason: '개인 일정', isAllDay: true, startTime: '', endTime: '' },
                { id: 2, instructorId: 1, date: '2025-02-10', type: 'holiday', reason: '설날 연휴', isAllDay: true, startTime: '', endTime: '' },
                { id: 3, instructorId: 1, date: '2025-01-20', type: 'unavailable', reason: '병원 진료', isAllDay: false, startTime: '14:00', endTime: '16:00' }
            ],
            showAddSlotModal: false,
            showAddExceptionModal: false,
            newException: {
                date: '',
                type: 'unavailable',
                reason: '',
                isAllDay: true,
                startTime: '09:00',
                endTime: '18:00'
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
            this.schedules = [
                {
                    id: 1,
                    instructorId: instructorId,
                    effectiveFrom: '2025-01-01',
                    effectiveTo: '2025-03-31',
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
                },
                {
                    id: 2,
                    instructorId: instructorId,
                    effectiveFrom: '2025-04-01',
                    effectiveTo: null,
                    slotDuration: 60,
                    weeklySchedule: {
                        monday: [
                            { startTime: '10:00', endTime: '13:00' }
                        ],
                        tuesday: [
                            { startTime: '10:00', endTime: '12:00' },
                            { startTime: '14:00', endTime: '16:00' }
                        ],
                        wednesday: [
                            { startTime: '10:00', endTime: '13:00' }
                        ],
                        thursday: [
                            { startTime: '14:00', endTime: '17:00' }
                        ],
                        friday: [],
                        saturday: [],
                        sunday: []
                    }
                }
            ];

            // 현재 날짜 기준 활성 스케줄 선택
            const activeSchedule = this.getActiveSchedule();
            if (activeSchedule) {
                this.selectedScheduleId = activeSchedule.id;
                this.currentSchedule = activeSchedule;
            } else if (this.schedules.length > 0) {
                // 활성 스케줄이 없으면 가장 최근 스케줄 선택
                this.selectedScheduleId = this.schedules[this.schedules.length - 1].id;
                this.currentSchedule = this.schedules[this.schedules.length - 1];
            }
        },

        getActiveSchedule(date = null) {
            if (!this.selectedInstructor) return null;

            const targetDate = date ? new Date(date) : new Date();
            const instructorSchedules = this.schedules.filter(s => s.instructorId === this.selectedInstructor.id);

            for (const schedule of instructorSchedules) {
                const fromDate = new Date(schedule.effectiveFrom);
                const toDate = schedule.effectiveTo ? new Date(schedule.effectiveTo) : null;

                if (targetDate >= fromDate && (!toDate || targetDate <= toDate)) {
                    return schedule;
                }
            }

            return null;
        },

        getScheduleHistory() {
            if (!this.selectedInstructor) return [];
            return this.schedules
                .filter(s => s.instructorId === this.selectedInstructor.id)
                .sort((a, b) => new Date(b.effectiveFrom) - new Date(a.effectiveFrom));
        },

        selectScheduleVersion(scheduleId) {
            const schedule = this.schedules.find(s => s.id === scheduleId);
            if (schedule) {
                this.selectedScheduleId = scheduleId;
                this.currentSchedule = schedule;
            }
        },

        openScheduleVersionModal() {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            this.newScheduleVersion = {
                effectiveFrom: tomorrow.toISOString().split('T')[0],
                copyFromCurrent: true
            };
            this.showScheduleVersionModal = true;
        },

        createScheduleVersion() {
            if (!this.newScheduleVersion.effectiveFrom) {
                alert('적용 시작일을 선택해주세요.');
                return;
            }

            const effectiveFromDate = new Date(this.newScheduleVersion.effectiveFrom);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (effectiveFromDate < today) {
                alert('적용 시작일은 오늘 이후여야 합니다.');
                return;
            }

            // 기존 스케줄과 날짜 중복 체크
            const overlapping = this.schedules.find(s => {
                if (s.instructorId !== this.selectedInstructor.id) return false;

                const fromDate = new Date(s.effectiveFrom);
                const toDate = s.effectiveTo ? new Date(s.effectiveTo) : null;

                return effectiveFromDate >= fromDate && (!toDate || effectiveFromDate <= toDate);
            });

            if (overlapping) {
                if (!confirm('선택한 날짜에 이미 스케줄이 존재합니다.\n기존 스케줄의 종료일을 자동으로 조정하시겠습니까?')) {
                    return;
                }

                // 이전 스케줄의 종료일을 새 스케줄 시작일 전날로 설정
                const previousDay = new Date(effectiveFromDate);
                previousDay.setDate(previousDay.getDate() - 1);
                overlapping.effectiveTo = previousDay.toISOString().split('T')[0];
            }

            // 새 스케줄 생성
            const newSchedule = {
                id: Math.max(...this.schedules.map(s => s.id), 0) + 1,
                instructorId: this.selectedInstructor.id,
                effectiveFrom: this.newScheduleVersion.effectiveFrom,
                effectiveTo: null,
                slotDuration: 60,
                weeklySchedule: this.newScheduleVersion.copyFromCurrent && this.currentSchedule
                    ? JSON.parse(JSON.stringify(this.currentSchedule.weeklySchedule))
                    : {
                        monday: [],
                        tuesday: [],
                        wednesday: [],
                        thursday: [],
                        friday: [],
                        saturday: [],
                        sunday: []
                    }
            };

            this.schedules.push(newSchedule);
            this.selectedScheduleId = newSchedule.id;
            this.currentSchedule = newSchedule;
            this.showScheduleVersionModal = false;

            alert('새 스케줄 버전이 생성되었습니다.');
        },

        deleteScheduleVersion(scheduleId) {
            if (!confirm('이 스케줄 버전을 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.')) {
                return;
            }

            const index = this.schedules.findIndex(s => s.id === scheduleId);
            if (index > -1) {
                this.schedules.splice(index, 1);

                // 삭제한 스케줄이 현재 선택된 스케줄이면 다른 스케줄 선택
                if (this.selectedScheduleId === scheduleId) {
                    const activeSchedule = this.getActiveSchedule();
                    if (activeSchedule) {
                        this.selectedScheduleId = activeSchedule.id;
                        this.currentSchedule = activeSchedule;
                    } else if (this.schedules.length > 0) {
                        const latest = this.schedules[this.schedules.length - 1];
                        this.selectedScheduleId = latest.id;
                        this.currentSchedule = latest;
                    } else {
                        this.selectedScheduleId = null;
                        this.currentSchedule = null;
                    }
                }

                alert('스케줄 버전이 삭제되었습니다.');
            }
        },

        getScheduleStatus(schedule) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const fromDate = new Date(schedule.effectiveFrom);
            fromDate.setHours(0, 0, 0, 0);

            const toDate = schedule.effectiveTo ? new Date(schedule.effectiveTo) : null;
            if (toDate) toDate.setHours(0, 0, 0, 0);

            if (today < fromDate) {
                return { class: 'bg-info', text: '예정' };
            } else if (today >= fromDate && (!toDate || today <= toDate)) {
                return { class: 'bg-success', text: '활성' };
            } else {
                return { class: 'bg-secondary', text: '만료' };
            }
        },

        formatDateRange(schedule) {
            const from = new Date(schedule.effectiveFrom).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            if (schedule.effectiveTo) {
                const to = new Date(schedule.effectiveTo).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                return `${from} ~ ${to}`;
            } else {
                return `${from} ~ 종료일 미지정`;
            }
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
                reason: '',
                isAllDay: true,
                startTime: '09:00',
                endTime: '18:00'
            };
            this.showAddExceptionModal = true;
        },

        addException() {
            if (!this.newException.date || !this.newException.reason) {
                alert('날짜와 사유를 입력해주세요.');
                return;
            }

            if (!this.newException.isAllDay) {
                if (!this.newException.startTime || !this.newException.endTime) {
                    alert('시작 시간과 종료 시간을 입력해주세요.');
                    return;
                }
                if (this.newException.startTime >= this.newException.endTime) {
                    alert('종료 시간은 시작 시간보다 늦어야 합니다.');
                    return;
                }
            }

            this.exceptions.push({
                id: Date.now(),
                instructorId: this.selectedInstructor.id,
                date: this.newException.date,
                type: this.newException.type,
                reason: this.newException.reason,
                isAllDay: this.newException.isAllDay,
                startTime: this.newException.isAllDay ? '' : this.newException.startTime,
                endTime: this.newException.isAllDay ? '' : this.newException.endTime
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
