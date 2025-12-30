export default {
    name: 'Boards',
    layout: 'admin',
    data() {
        return {
            searchQuery: '',
            stats: {
                totalBoards: 8,
                totalPosts: 1245,
                todayPosts: 23,
                reportedPosts: 5
            },
            boards: [
                { id: 1, name: '공지사항', slug: 'notice', icon: '📢', description: '서비스 공지 및 안내', postsCount: 45, commentsCount: 128, isActive: true, createdAt: '2024-01-01' },
                { id: 2, name: '자유게시판', slug: 'free', icon: '💬', description: '자유로운 이야기를 나눠요', postsCount: 523, commentsCount: 2341, isActive: true, createdAt: '2024-01-01' },
                { id: 3, name: 'Q&A', slug: 'qna', icon: '❓', description: '질문과 답변', postsCount: 312, commentsCount: 892, isActive: true, createdAt: '2024-01-01' },
                { id: 4, name: '강좌 후기', slug: 'review', icon: '⭐', description: '수강 후기를 공유해요', postsCount: 189, commentsCount: 456, isActive: true, createdAt: '2024-01-15' },
                { id: 5, name: '스터디 모집', slug: 'study', icon: '👥', description: '스터디원을 모집합니다', postsCount: 87, commentsCount: 234, isActive: true, createdAt: '2024-02-01' },
                { id: 6, name: '취업/이직', slug: 'career', icon: '💼', description: '취업 정보와 경험 공유', postsCount: 156, commentsCount: 523, isActive: true, createdAt: '2024-02-15' },
                { id: 7, name: '이벤트', slug: 'event', icon: '🎉', description: '이벤트 안내 및 참여', postsCount: 34, commentsCount: 89, isActive: false, createdAt: '2024-03-01' }
            ],
            recentPosts: [
                { id: 1, title: '2024년 12월 서비스 업데이트 안내', boardName: '공지사항', author: '관리자', views: 1523, comments: 12, isNotice: true, isNew: false, createdAt: '2024-12-19' },
                { id: 2, title: 'React 강좌 완강했습니다! 후기 남겨요', boardName: '강좌 후기', author: '김학습', views: 234, comments: 8, isNotice: false, isNew: true, createdAt: '2024-12-19' },
                { id: 3, title: 'TypeScript 스터디 모집합니다 (강남)', boardName: '스터디 모집', author: '이개발', views: 156, comments: 23, isNotice: false, isNew: true, createdAt: '2024-12-19' },
                { id: 4, title: 'async/await 관련 질문있습니다', boardName: 'Q&A', author: '박초보', views: 89, comments: 5, isNotice: false, isNew: true, createdAt: '2024-12-19' },
                { id: 5, title: '프론트엔드 개발자 취업 후기', boardName: '취업/이직', author: '최합격', views: 567, comments: 34, isNotice: false, isNew: false, createdAt: '2024-12-18' }
            ]
        }
    },
    methods: {
        openCreateBoardModal() {
            this.navigateTo('/community/boards-create');
        },
        viewDetail(board) {
            this.navigateTo('/community/boards-detail', {id: board.id});
        },
        viewPosts(board) {
            this.navigateTo('/community/boards-detail', {id: board.id});
        },
        editBoard(board) {
            this.navigateTo('/community/boards-detail', {id: board.id});
        },
        toggleBoardStatus(board) {
            board.isActive = !board.isActive;
        },
        deleteBoard(board) {
            if (confirm(`${board.name} 게시판을 삭제하시겠습니까?`)) {
                alert('삭제 기능은 추후 구현 예정입니다.');
            }
        },
        viewPost(post) {
            alert(`게시글 상세보기: ${post.title}`);
        }
    }
}
