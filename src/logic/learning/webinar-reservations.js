export default {
    name: 'webinarReservations',
    layout: 'admin',
    data() {
        return {
            filterStatus: 'all',
            filterInstructor: 'all',
            searchKeyword: '',
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
            showCreateModal: false,
            showDetailModal: false,
            selectedReservation: null,
            newReservation: {
                instructorId: null,
                studentName: '',
                studentEmail: '',
                courseTitle: '',
                dateTime: '',
                duration: 60,
                notes: ''
            }
        }
    },
    computed: {
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
                studentName: '',
                studentEmail: '',
                courseTitle: '',
                dateTime: '',
                duration: 60,
                notes: ''
            };
            this.showCreateModal = true;
        },

        createReservation() {
            if (!this.newReservation.instructorId || !this.newReservation.studentName ||
                !this.newReservation.studentEmail || !this.newReservation.dateTime) {
                alert('필수 항목을 모두 입력해주세요.');
                return;
            }

            const instructor = this.instructors.find(i => i.id === parseInt(this.newReservation.instructorId));

            const newRes = {
                id: this.reservations.length + 1,
                instructorId: parseInt(this.newReservation.instructorId),
                instructorName: instructor.name,
                studentId: 100 + this.reservations.length,
                studentName: this.newReservation.studentName,
                studentEmail: this.newReservation.studentEmail,
                courseTitle: this.newReservation.courseTitle || '개별 상담',
                dateTime: this.newReservation.dateTime.replace('T', ' '),
                duration: parseInt(this.newReservation.duration),
                status: 'pending',
                meetingUrl: '',
                notes: this.newReservation.notes,
                createdAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
            };

            this.reservations.unshift(newRes);
            this.showCreateModal = false;
            alert('예약이 생성되었습니다.');
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
        }
    }
}
