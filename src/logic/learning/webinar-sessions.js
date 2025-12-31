export default {
    name: 'webinarSessions',
    layout: 'admin',
    data() {
        return {
            filterPeriod: '30days',
            filterInstructor: 'all',
            searchKeyword: '',
            sessions: [
                {
                    id: 1,
                    reservationId: 3,
                    instructorName: '김영희',
                    studentName: '박서연',
                    courseTitle: 'React 고급 과정',
                    startTime: '2025-01-17 16:00',
                    endTime: '2025-01-17 17:00',
                    duration: 60,
                    actualDuration: 58,
                    attendanceStatus: 'attended',
                    recordingUrl: 'https://example.com/recordings/session1.mp4',
                    notes: '프로젝트 구조 및 상태 관리에 대해 심도있게 논의함',
                    rating: 5,
                    feedback: '매우 유익한 시간이었습니다.'
                },
                {
                    id: 2,
                    reservationId: 5,
                    instructorName: '이철수',
                    studentName: '김민수',
                    courseTitle: 'UI/UX 디자인 기초',
                    startTime: '2025-01-14 10:00',
                    endTime: '2025-01-14 11:30',
                    duration: 90,
                    actualDuration: 92,
                    attendanceStatus: 'attended',
                    recordingUrl: 'https://example.com/recordings/session2.mp4',
                    notes: '포트폴리오 리뷰 및 개선 방향 제시',
                    rating: 4,
                    feedback: '좋은 피드백을 받았습니다.'
                },
                {
                    id: 3,
                    reservationId: 6,
                    instructorName: '박민수',
                    studentName: '최지우',
                    courseTitle: '디지털 마케팅 전략',
                    startTime: '2025-01-12 14:00',
                    endTime: '2025-01-12 15:00',
                    duration: 60,
                    actualDuration: 0,
                    attendanceStatus: 'no-show',
                    recordingUrl: '',
                    notes: '학생 불참',
                    rating: null,
                    feedback: ''
                },
                {
                    id: 4,
                    reservationId: 7,
                    instructorName: '김영희',
                    studentName: '이서준',
                    courseTitle: 'JavaScript 심화',
                    startTime: '2025-01-10 15:00',
                    endTime: '2025-01-10 16:30',
                    duration: 90,
                    actualDuration: 85,
                    attendanceStatus: 'attended',
                    recordingUrl: 'https://example.com/recordings/session4.mp4',
                    notes: '비동기 프로그래밍 및 Promise 패턴 학습',
                    rating: 5,
                    feedback: '설명이 매우 명확했습니다.'
                }
            ],
            instructors: [
                { id: 1, name: '김영희' },
                { id: 2, name: '이철수' },
                { id: 3, name: '박민수' }
            ],
            showDetailModal: false,
            selectedSession: null
        }
    },
    computed: {
        filteredSessions() {
            return this.sessions.filter(s => {
                // 기간 필터
                const sessionDate = new Date(s.startTime);
                const now = new Date();
                const daysDiff = Math.floor((now - sessionDate) / (1000 * 60 * 60 * 24));

                if (this.filterPeriod === '7days' && daysDiff > 7) return false;
                if (this.filterPeriod === '30days' && daysDiff > 30) return false;
                if (this.filterPeriod === '90days' && daysDiff > 90) return false;

                // 강사 필터
                if (this.filterInstructor !== 'all') {
                    const instructor = this.instructors.find(i => i.id === parseInt(this.filterInstructor));
                    if (instructor && s.instructorName !== instructor.name) return false;
                }

                // 검색어 필터
                if (this.searchKeyword) {
                    const keyword = this.searchKeyword.toLowerCase();
                    return s.studentName.toLowerCase().includes(keyword) ||
                           s.instructorName.toLowerCase().includes(keyword) ||
                           s.courseTitle.toLowerCase().includes(keyword);
                }

                return true;
            });
        },

        statistics() {
            const attended = this.sessions.filter(s => s.attendanceStatus === 'attended');
            const totalDuration = attended.reduce((sum, s) => sum + s.actualDuration, 0);
            const avgRating = attended.filter(s => s.rating).reduce((sum, s) => sum + s.rating, 0) / attended.filter(s => s.rating).length;

            return {
                total: this.sessions.length,
                attended: attended.length,
                noShow: this.sessions.filter(s => s.attendanceStatus === 'no-show').length,
                totalHours: Math.floor(totalDuration / 60),
                avgRating: avgRating ? avgRating.toFixed(1) : 0
            };
        }
    },
    methods: {
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

        getAttendanceBadge(status) {
            return status === 'attended'
                ? { class: 'bg-success', text: '출석' }
                : { class: 'bg-danger', text: '불참' };
        },

        getRatingStars(rating) {
            if (!rating) return '';
            return '⭐'.repeat(rating);
        },

        viewDetail(session) {
            this.selectedSession = session;
            this.showDetailModal = true;
        },

        downloadRecording(url) {
            window.open(url, '_blank');
        },

        exportData() {
            alert('세션 데이터를 CSV로 내보냅니다.');
        }
    }
}
