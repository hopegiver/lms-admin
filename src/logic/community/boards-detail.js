export default {
    name: 'BoardsDetail',
    layout: 'admin',
    data() {
        return {
            currentTab: 'info',
            boardId: null,
            board: null,
            posts: [],
            topPosts: []
        }
    },
    methods: {
        getBoardTypeText(type) {
            const types = {
                'notice': '공지사항',
                'faq': 'FAQ',
                'free': '자유게시판',
                'qna': 'Q&A'
            };
            return types[type] || type;
        },

        getPermissionText(permission) {
            const permissions = {
                'all': '전체 공개',
                'member': '회원만',
                'admin': '관리자만'
            };
            return permissions[permission] || permission;
        },

        async loadBoard() {
            try {
                // API 호출 시뮬레이션
                // const response = await this.$api.get(`/api/community/boards/${this.boardId}`);

                // 임시 데이터
                this.board = {
                    id: this.boardId,
                    title: '공지사항',
                    boardType: 'notice',
                    status: 'active',
                    description: '중요한 공지사항을 게시하는 게시판입니다',
                    readPermission: 'all',
                    writePermission: 'admin',
                    categories: ['일반', '시스템', '이벤트'],
                    useComments: true,
                    useAttachments: true,
                    totalPosts: 156,
                    totalComments: 432,
                    totalViews: 12450,
                    createdAt: '2024-01-15'
                };
            } catch (error) {
                alert('게시판 정보를 불러오는데 실패했습니다: ' + error.message);
            }
        },

        async loadPosts() {
            try {
                // API 호출 시뮬레이션
                // const response = await this.$api.get(`/api/community/boards/${this.boardId}/posts`);

                // 임시 데이터
                this.posts = [
                    { id: 1, title: '2024년 신규 강좌 오픈 안내', category: '일반', author: '관리자', views: 1234, comments: 45, createdAt: '2024-01-15' },
                    { id: 2, title: '시스템 점검 안내', category: '시스템', author: '관리자', views: 892, comments: 23, createdAt: '2024-01-14' },
                    { id: 3, title: '겨울 이벤트 당첨자 발표', category: '이벤트', author: '관리자', views: 2341, comments: 78, createdAt: '2024-01-13' }
                ];

                this.topPosts = [
                    { id: 1, title: '겨울 이벤트 당첨자 발표', views: 2341, comments: 78 },
                    { id: 2, title: '2024년 신규 강좌 오픈 안내', views: 1234, comments: 45 },
                    { id: 3, title: '시스템 점검 안내', views: 892, comments: 23 }
                ];
            } catch (error) {
                alert('게시글 목록을 불러오는데 실패했습니다: ' + error.message);
            }
        },

        edit() {
            this.navigateTo(`/community/boards/edit?id=${this.boardId}`);
        },

        async deleteBoard() {
            if (confirm('정말 삭제하시겠습니까?')) {
                try {
                    // API 호출 시뮬레이션
                    // await this.$api.delete(`/api/community/boards/${this.boardId}`);

                    alert('게시판이 삭제되었습니다.');
                    this.navigateTo('/community/boards');
                } catch (error) {
                    alert('삭제에 실패했습니다: ' + error.message);
                }
            }
        },

        createPost() {
            this.navigateTo(`/community/posts/create?boardId=${this.boardId}`);
        },

        viewPost(post) {
            this.navigateTo(`/community/posts/detail?id=${post.id}`);
        }
    },
    mounted() {
        // 쿼리 파라미터에서 ID 추출
        const params = new URLSearchParams(window.location.search);
        this.boardId = params.get('id');

        if (!this.boardId) {
            alert('게시판 ID가 없습니다.');
            this.navigateTo('/community/boards');
            return;
        }

        this.loadBoard();
        this.loadPosts();
    }
}
