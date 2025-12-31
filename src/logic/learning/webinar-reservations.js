export default {
    name: 'webinarReservations',
    layout: 'admin',
    data() {
        return {
            viewMode: 'list', // 'list' or 'calendar'
            filterStatus: 'all',
            filterInstructor: 'all',
            searchKeyword: '',
            currentMonth: new Date(),
            reservations: [
                {
                    id: 1,
                    instructorId: 1,
                    instructorName: '김영희',
                    studentId: 101,
                    studentName: '홍길동',
                    studentEmail: 'hong@example.com',
                    courseTitle: 'Vue.js 심화 과정',
                    dateTime: '2025-01-15 14:00',
                    duration: 60,
                    status: 'confirmed',
                    meetingUrl: 'https://zoom.us/j/123456789',
                    notes: '프로젝트 구조에 대해 상담 요청',
                    createdAt: '2025-01-10 10:30'
                },
                {
                    id: 2,
                    instructorId: 2,
                    instructorName: '이철수',
                    studentId: 102,
                    studentName: '김민수',
                    studentEmail: 'kim@example.com',
                    courseTitle: 'UI/UX 디자인 기초',
                    dateTime: '2025-01-16 10:00',
                    duration: 90,
                    status: 'pending',
                    meetingUrl: '',
                    notes: '포트폴리오 검토 부탁드립니다',
                    createdAt: '2025-01-11 15:20'
                },
                {
                    id: 3,
                    instructorId: 1,
                    instructorName: '김영희',
                    studentId: 103,
                    studentName: '박서연',
                    studentEmail: 'park@example.com',
                    courseTitle: 'React 고급 과정',
                    dateTime: '2025-01-17 16:00',
                    duration: 60,
                    status: 'completed',
                    meetingUrl: 'https://zoom.us/j/987654321',
                    notes: '',
                    createdAt: '2025-01-08 09:15'
                },
                {
                    id: 4,
                    instructorId: 3,
                    instructorName: '박민수',
                    studentId: 104,
                    studentName: '최지우',
                    studentEmail: 'choi@example.com',
                    courseTitle: '디지털 마케팅 전략',
                    dateTime: '2025-01-18 11:00',
                    duration: 60,
                    status: 'cancelled',
                    meetingUrl: '',
                    notes: '일정 변경 필요',
                    createdAt: '2025-01-09 14:45'
                }
            ],
            instructors: [
                { id: 1, name: '김영희' },
                { id: 2, name: '이철수' },
                { id: 3, name: '박민수' }
            ],
            students: [
                { id: 101, name: '홍길동', email: 'hong@example.com', phone: '010-1234-5678' },
                { id: 102, name: '김민수', email: 'kim@example.com', phone: '010-2345-6789' },
                { id: 103, name: '박서연', email: 'park@example.com', phone: '010-3456-7890' },
                { id: 104, name: '최지우', email: 'choi@example.com', phone: '010-4567-8901' },
                { id: 105, name: '이서준', email: 'lee@example.com', phone: '010-5678-9012' },
                { id: 106, name: '정유진', email: 'jung@example.com', phone: '010-6789-0123' },
                { id: 107, name: '강민지', email: 'kang@example.com', phone: '010-7890-1234' },
                { id: 108, name: '윤서아', email: 'yoon@example.com', phone: '010-8901-2345' },
                { id: 109, name: '조현우', email: 'cho@example.com', phone: '010-9012-3456' },
                { id: 110, name: '한지민', email: 'han@example.com', phone: '010-0123-4567' }
            ],
            showCreateModal: false,
            showDetailModal: false,
            selectedReservation: null,
            newReservation: {
                instructorId: null,
                studentId: null,
                courseTitle: '',
                dateTime: '',
                duration: 60,
                notes: '',
                isRecurring: false,
                recurringType: 'weekly',
                recurringCount: 4
            },
            studentSearchKeyword: '',
            showStudentDropdown: false
        }
    },
    computed: {
        filteredStudents() {
            if (!this.studentSearchKeyword) return this.students;

            const keyword = this.studentSearchKeyword.toLowerCase();
            return this.students.filter(s =>
                s.name.toLowerCase().includes(keyword) ||
                s.email.toLowerCase().includes(keyword) ||
                s.phone.includes(keyword)
            );
        },

        selectedStudent() {
            if (!this.newReservation.studentId) return null;
            return this.students.find(s => s.id === this.newReservation.studentId);
        },

        filteredReservations() {
            return this.reservations.filter(r => {
                // 상태 필터
                if (this.filterStatus !== 'all' && r.status !== this.filterStatus) {
                    return false;
                }

                // 강사 필터
                if (this.filterInstructor !== 'all' && r.instructorId !== parseInt(this.filterInstructor)) {
                    return false;
                }

                // 검색어 필터
                if (this.searchKeyword) {
                    const keyword = this.searchKeyword.toLowerCase();
                    return r.studentName.toLowerCase().includes(keyword) ||
                           r.instructorName.toLowerCase().includes(keyword) ||
                           r.courseTitle.toLowerCase().includes(keyword);
                }

                return true;
            });
        },

        statusCounts() {
            return {
                all: this.reservations.length,
                pending: this.reservations.filter(r => r.status === 'pending').length,
                confirmed: this.reservations.filter(r => r.status === 'confirmed').length,
                completed: this.reservations.filter(r => r.status === 'completed').length,
                cancelled: this.reservations.filter(r => r.status === 'cancelled').length
            };
        }
    },
    methods: {
        getStatusBadge(status) {
            const badges = {
                pending: { class: 'bg-warning', text: '대기중' },
                confirmed: { class: 'bg-success', text: '확정' },
                completed: { class: 'bg-secondary', text: '완료' },
                cancelled: { class: 'bg-danger', text: '취소' }
            };
            return badges[status] || { class: 'bg-secondary', text: status };
        },

        formatDateTime(dateTime) {
            const date = new Date(dateTime);
            return date.toLocaleString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        },

        formatDate(dateTime) {
            const date = new Date(dateTime);
            return date.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },

        formatTime(dateTime) {
            const date = new Date(dateTime);
            return date.toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit'
            });
        },

        openCreateModal() {
            this.newReservation = {
                instructorId: null,
                studentId: null,
                courseTitle: '',
                dateTime: '',
                duration: 60,
                notes: '',
                isRecurring: false,
                recurringType: 'weekly',
                recurringCount: 4
            };
            this.studentSearchKeyword = '';
            this.showStudentDropdown = false;
            this.showCreateModal = true;
        },

        selectStudent(student) {
            this.newReservation.studentId = student.id;
            this.studentSearchKeyword = student.name;
            this.showStudentDropdown = false;
        },

        clearStudentSelection() {
            this.newReservation.studentId = null;
            this.studentSearchKeyword = '';
        },

        focusStudentSearch() {
            this.showStudentDropdown = true;
        },

        createReservation() {
            if (!this.newReservation.instructorId || !this.newReservation.studentId ||
                !this.newReservation.dateTime) {
                alert('필수 항목을 모두 입력해주세요.');
                return;
            }

            const instructor = this.instructors.find(i => i.id === parseInt(this.newReservation.instructorId));
            const student = this.students.find(s => s.id === this.newReservation.studentId);

            if (this.newReservation.isRecurring) {
                // 반복 예약 생성
                this.createRecurringReservations(instructor, student);
            } else {
                // 단일 예약 생성
                this.createSingleReservation(instructor, student);
            }

            this.showCreateModal = false;
        },

        createSingleReservation(instructor, student) {
            const newRes = {
                id: this.reservations.length + 1,
                instructorId: parseInt(this.newReservation.instructorId),
                instructorName: instructor.name,
                studentId: student.id,
                studentName: student.name,
                studentEmail: student.email,
                courseTitle: this.newReservation.courseTitle || '개별 상담',
                dateTime: this.newReservation.dateTime.replace('T', ' '),
                duration: parseInt(this.newReservation.duration),
                status: 'pending',
                meetingUrl: '',
                notes: this.newReservation.notes,
                createdAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
            };

            this.reservations.unshift(newRes);
            alert('예약이 생성되었습니다.');
        },

        createRecurringReservations(instructor, student) {
            const baseDate = new Date(this.newReservation.dateTime);
            const createdReservations = [];

            for (let i = 0; i < this.newReservation.recurringCount; i++) {
                const reservationDate = new Date(baseDate);

                if (this.newReservation.recurringType === 'weekly') {
                    reservationDate.setDate(baseDate.getDate() + (i * 7));
                } else if (this.newReservation.recurringType === 'biweekly') {
                    reservationDate.setDate(baseDate.getDate() + (i * 14));
                } else if (this.newReservation.recurringType === 'monthly') {
                    reservationDate.setMonth(baseDate.getMonth() + i);
                }

                const dateTimeStr = reservationDate.toISOString().slice(0, 16).replace('T', ' ');

                const newRes = {
                    id: this.reservations.length + createdReservations.length + 1,
                    instructorId: parseInt(this.newReservation.instructorId),
                    instructorName: instructor.name,
                    studentId: student.id,
                    studentName: student.name,
                    studentEmail: student.email,
                    courseTitle: this.newReservation.courseTitle || '개별 상담',
                    dateTime: dateTimeStr,
                    duration: parseInt(this.newReservation.duration),
                    status: 'pending',
                    meetingUrl: '',
                    notes: this.newReservation.notes + (i > 0 ? ` (${i + 1}/${this.newReservation.recurringCount}회차)` : ` (1/${this.newReservation.recurringCount}회차)`),
                    createdAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
                };

                createdReservations.push(newRes);
            }

            // 모든 예약을 앞에 추가
            this.reservations.unshift(...createdReservations.reverse());
            alert(`${createdReservations.length}개의 반복 예약이 생성되었습니다.`);
        },

        viewDetail(reservation) {
            this.selectedReservation = reservation;
            this.showDetailModal = true;
        },

        confirmReservation(reservation) {
            if (confirm('이 예약을 확정하시겠습니까?')) {
                reservation.status = 'confirmed';
                reservation.meetingUrl = 'https://zoom.us/j/' + Math.floor(Math.random() * 1000000000);
                alert('예약이 확정되었습니다.');
            }
        },

        cancelReservation(reservation) {
            if (confirm('이 예약을 취소하시겠습니까?')) {
                reservation.status = 'cancelled';
                alert('예약이 취소되었습니다.');
            }
        },

        completeReservation(reservation) {
            if (confirm('이 세션을 완료 처리하시겠습니까?')) {
                reservation.status = 'completed';
                alert('세션이 완료 처리되었습니다.');
            }
        },

        deleteReservation(id) {
            if (confirm('이 예약을 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.')) {
                const index = this.reservations.findIndex(r => r.id === id);
                if (index > -1) {
                    this.reservations.splice(index, 1);
                    this.showDetailModal = false;
                    alert('예약이 삭제되었습니다.');
                }
            }
        },

        goToSchedule() {
            this.navigateTo('/learning/webinar-instructor-schedule');
        },

        // 캘린더 관련 메서드
        getCalendarDays() {
            const year = this.currentMonth.getFullYear();
            const month = this.currentMonth.getMonth();

            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);

            const startDate = new Date(firstDay);
            startDate.setDate(startDate.getDate() - firstDay.getDay());

            const endDate = new Date(lastDay);
            endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));

            const days = [];
            const currentDate = new Date(startDate);

            while (currentDate <= endDate) {
                days.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }

            return days;
        },

        getReservationsForDate(date) {
            const dateStr = date.toISOString().split('T')[0];
            return this.filteredReservations.filter(r => {
                const resDateStr = r.dateTime.split(' ')[0];
                const resDate = new Date(resDateStr);
                return resDate.toISOString().split('T')[0] === dateStr;
            }).sort((a, b) => {
                const timeA = a.dateTime.split(' ')[1];
                const timeB = b.dateTime.split(' ')[1];
                return timeA.localeCompare(timeB);
            });
        },

        isToday(date) {
            const today = new Date();
            return date.toDateString() === today.toDateString();
        },

        isCurrentMonth(date) {
            return date.getMonth() === this.currentMonth.getMonth();
        },

        previousMonth() {
            this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
        },

        nextMonth() {
            this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
        },

        goToToday() {
            this.currentMonth = new Date();
        },

        formatMonthYear() {
            return this.currentMonth.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' });
        }
    }
}
