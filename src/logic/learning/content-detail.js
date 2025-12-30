export default {
    name: 'ContentDetail',
    layout: 'admin',
    data() {
        return {
            contentId: this.getParam('id'),
            currentTab: 'info',
            content: null,
            usageData: [],
            dailyViews: [],
            completionDistribution: [],
            maxDailyViews: 0
        }
    },
    async mounted() {
        if (!this.contentId) {
            alert('콘텐츠 ID가 필요합니다.');
            this.navigateTo('/learning/content');
            return;
        }

        await this.loadContent();
    },
    methods: {
        async loadContent() {
            try {
                // API 호출 시뮬레이션
                // const response = await this.$api.get(`/api/learning/content/${this.contentId}`);
                // this.content = response.data;

                // 임시 데이터
                this.content = {
                    id: this.contentId,
                    title: 'React Hooks 완벽 가이드',
                    type: 'video',
                    duration: '45분',
                    fileSize: '128 MB',
                    status: 'published',
                    description: 'React Hooks를 처음부터 끝까지 다루는 영상 강의입니다. useState, useEffect, useContext 등 주요 Hooks를 실습과 함께 학습합니다.',
                    tags: 'react, hooks, frontend, javascript',
                    downloadable: true,
                    trackProgress: true,
                    views: 3450,
                    usedInCourses: 3,
                    avgCompletion: 87.5,
                    fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    createdAt: '2024-10-15',
                    updatedAt: '2024-12-20'
                };

                this.usageData = [
                    { id: 1, courseName: 'React 완벽 가이드', curriculum: 'React 기초', lesson: '4차시: Hooks 소개', students: 850, completion: 92 },
                    { id: 2, courseName: 'JavaScript ES6+', curriculum: '모던 JavaScript', lesson: '12차시: React 기초', students: 420, completion: 85 },
                    { id: 3, courseName: 'Frontend 마스터', curriculum: 'React 심화', lesson: '3차시: Hooks 패턴', students: 280, completion: 78 }
                ];

                this.dailyViews = [
                    { date: '2024-12-24', views: 145 },
                    { date: '2024-12-25', views: 98 },
                    { date: '2024-12-26', views: 167 },
                    { date: '2024-12-27', views: 189 },
                    { date: '2024-12-28', views: 203 },
                    { date: '2024-12-29', views: 178 },
                    { date: '2024-12-30', views: 156 }
                ];

                this.maxDailyViews = Math.max(...this.dailyViews.map(d => d.views));

                this.completionDistribution = [
                    { label: '90-100% 완료', count: 458, percentage: 38.2 },
                    { label: '70-89% 완료', count: 385, percentage: 32.1 },
                    { label: '50-69% 완료', count: 198, percentage: 16.5 },
                    { label: '30-49% 완료', count: 97, percentage: 8.1 },
                    { label: '30% 미만', count: 62, percentage: 5.1 }
                ];
            } catch (error) {
                alert('콘텐츠 정보를 불러오는데 실패했습니다.');
                console.error(error);
            }
        },

        getStatusClass(status) {
            return { 'published': 'bg-success', 'draft': 'bg-warning text-dark', 'archived': 'bg-secondary' }[status] || 'bg-secondary';
        },

        getStatusText(status) {
            return { 'published': '게시됨', 'draft': '준비중', 'archived': '보관' }[status] || status;
        },

        getTypeText(type) {
            return {
                'video': '비디오',
                'document': '문서',
                'link': '외부 링크',
                'scorm': 'SCORM'
            }[type] || type;
        },

        edit() {
            alert('수정 기능은 추후 구현 예정입니다.');
        },

        deleteContent() {
            if (confirm('이 콘텐츠를 삭제하시겠습니까?')) {
                alert('삭제 기능은 추후 구현 예정입니다.');
            }
        }
    }
}
