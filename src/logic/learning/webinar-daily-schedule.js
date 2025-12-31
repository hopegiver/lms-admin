export default {
    name: 'webinarDailySchedule',
    layout: 'admin',
    data() {
        return {
            selectedDate: new Date().toISOString().split('T')[0],
            instructors: [
                { id: 1, name: '김영희', color: '#3b82f6' },
                { id: 2, name: '이철수', color: '#10b981' },
                { id: 3, name: '박민수', color: '#f59e0b' }
            ],
            reservations: [
                {
                    id: 1,
                    instructorId: 1,
                    instructorName: '김영희',
                    studentName: '홍길동',
                    studentEmail: 'hong@example.com',
                    courseTitle: 'Vue.js 심화 과정',
                    dateTime: '2025-01-15 09:00',
                    duration: 60,
                    status: 'confirmed',
                    meetingUrl: 'https://zoom.us/j/123456789'
                },
                {
                    id: 2,
                    instructorId: 1,
                    instructorName: '김영희',
                    studentName: '박서연',
                    studentEmail: 'park@example.com',
                    courseTitle: 'React 고급 과정',
                    dateTime: '2025-01-15 14:00',
                    duration: 90,
                    status: 'confirmed',
                    meetingUrl: 'https://zoom.us/j/987654321'
                },
                {
                    id: 3,
                    instructorId: 2,
                    instructorName: '이철수',
                    studentName: '김민수',
                    studentEmail: 'kim@example.com',
                    courseTitle: 'UI/UX 디자인 기초',
                    dateTime: '2025-01-15 10:00',
                    duration: 60,
                    status: 'pending',
                    meetingUrl: ''
                },
                {
                    id: 4,
                    instructorId: 2,
                    instructorName: '이철수',
                    studentName: '최지우',
                    studentEmail: 'choi@example.com',
                    courseTitle: '디자인 포트폴리오',
                    dateTime: '2025-01-15 15:00',
                    duration: 60,
                    status: 'confirmed',
                    meetingUrl: 'https://zoom.us/j/555666777'
                },
                {
                    id: 5,
                    instructorId: 3,
                    instructorName: '박민수',
                    studentName: '이서준',
                    studentEmail: 'lee@example.com',
                    courseTitle: '디지털 마케팅 전략',
                    dateTime: '2025-01-15 11:00',
                    duration: 90,
                    status: 'confirmed',
                    meetingUrl: 'https://zoom.us/j/888999000'
                }
            ],
            timeSlots: [],
            showDetailModal: false,
            selectedReservation: null
        }
    },
    mounted() {
        this.generateTimeSlots();
    },
    computed: {
        filteredReservations() {
            return this.reservations.filter(r => {
                const resDate = r.dateTime.split(' ')[0];
                return resDate === this.selectedDate;
            });
        },

        instructorSchedules() {
            return this.instructors.map(instructor => {
                const schedule = this.filteredReservations.filter(r => r.instructorId === instructor.id);
                return {
                    ...instructor,
                    reservations: schedule
                };
            });
        }
    },
    methods: {
        generateTimeSlots() {
            const slots = [];
            for (let hour = 9; hour <= 18; hour++) {
                slots.push(`${String(hour).padStart(2, '0')}:00`);
            }
            this.timeSlots = slots;
        },

        previousDay() {
            const date = new Date(this.selectedDate);
            date.setDate(date.getDate() - 1);
            this.selectedDate = date.toISOString().split('T')[0];
        },

        nextDay() {
            const date = new Date(this.selectedDate);
            date.setDate(date.getDate() + 1);
            this.selectedDate = date.toISOString().split('T')[0];
        },

        goToToday() {
            this.selectedDate = new Date().toISOString().split('T')[0];
        },

        formatDate(dateStr) {
            const date = new Date(dateStr);
            return date.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
            });
        },

        getReservationForTimeSlot(instructorId, timeSlot) {
            return this.filteredReservations.find(r => {
                if (r.instructorId !== instructorId) return false;
                const resTime = r.dateTime.split(' ')[1].substring(0, 5);
                return resTime === timeSlot;
            });
        },

        getReservationHeight(duration) {
            // 30분 = 50px, 60분 = 100px, 90분 = 150px
            return (duration / 30) * 50;
        },

        getStatusBadge(status) {
            const badges = {
                pending: { class: 'bg-warning', text: '대기' },
                confirmed: { class: 'bg-success', text: '확정' },
                completed: { class: 'bg-secondary', text: '완료' },
                cancelled: { class: 'bg-danger', text: '취소' }
            };
            return badges[status] || { class: 'bg-secondary', text: status };
        },

        viewDetail(reservation) {
            this.selectedReservation = reservation;
            this.showDetailModal = true;
        },

        goToReservations() {
            this.navigateTo('/learning/webinar-reservations');
        }
    }
}
