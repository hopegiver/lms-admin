export default {
    name: 'Content',
    layout: 'admin',
    data() {
        return {
            searchQuery: '',
            viewMode: 'grid',
            sortBy: 'date',
            filters: { type: '', course: '' },
            stats: { videos: 156, documents: 89, images: 234, totalSize: '45.2 GB' },
            courseList: ['React 완벽 가이드', 'Python 데이터 분석', 'JavaScript ES6+', 'AWS 클라우드 입문'],

            // 폴더 관리
            selectedFolderId: null, // null = 전체
            folders: [
                { id: 1, name: '프로그래밍', icon: '💻', count: 5, color: '#3b82f6' },
                { id: 2, name: '디자인', icon: '🎨', count: 3, color: '#8b5cf6' },
                { id: 3, name: '마케팅', icon: '📢', count: 2, color: '#10b981' },
                { id: 4, name: '비즈니스', icon: '💼', count: 1, color: '#f59e0b' }
            ],
            showFolderModal: false,
            folderForm: {
                id: null,
                name: '',
                icon: '📁',
                color: '#3b82f6'
            },

            files: [
                { id: 1, name: 'React 컴포넌트 기초.mp4', type: 'video', course: 'React 완벽 가이드', size: '256 MB', uploadDate: '2024-12-19', folderId: 1 },
                { id: 2, name: 'JavaScript 가이드.pdf', type: 'document', course: 'JavaScript ES6+', size: '4.2 MB', uploadDate: '2024-12-18', folderId: 1 },
                { id: 3, name: '강좌 썸네일.png', type: 'image', course: 'React 완벽 가이드', size: '1.5 MB', uploadDate: '2024-12-18', folderId: 2 },
                { id: 4, name: 'Python 데이터분석 실습.mp4', type: 'video', course: 'Python 데이터 분석', size: '512 MB', uploadDate: '2024-12-17', folderId: 1 },
                { id: 5, name: 'AWS 아키텍처 다이어그램.png', type: 'image', course: 'AWS 클라우드 입문', size: '2.3 MB', uploadDate: '2024-12-17', folderId: 2 },
                { id: 6, name: '실습 자료.zip', type: 'document', course: 'React 완벽 가이드', size: '15 MB', uploadDate: '2024-12-16', folderId: 1 },
                { id: 7, name: 'ES6 문법 정리.pdf', type: 'document', course: 'JavaScript ES6+', size: '3.1 MB', uploadDate: '2024-12-15', folderId: 1 },
                { id: 8, name: '머신러닝 개요.mp4', type: 'video', course: 'Python 데이터 분석', size: '380 MB', uploadDate: '2024-12-15', folderId: 1 },
                { id: 9, name: '마케팅 전략 가이드.pdf', type: 'document', course: null, size: '5.2 MB', uploadDate: '2024-12-14', folderId: 3 },
                { id: 10, name: '배너 디자인.psd', type: 'image', course: null, size: '45 MB', uploadDate: '2024-12-13', folderId: 2 },
                { id: 11, name: 'SNS 마케팅 전략.mp4', type: 'video', course: null, size: '180 MB', uploadDate: '2024-12-12', folderId: 3 },
                { id: 12, name: '사업계획서.docx', type: 'document', course: null, size: '2.8 MB', uploadDate: '2024-12-11', folderId: 4 }
            ],

            // YouTube 단일 가져오기
            youtubeForm: {
                url: '',
                loading: false,
                videoData: null,
                title: '',
                description: '',
                course: ''
            },
            youtubeDebounceTimer: null,

            // Vimeo 단일 가져오기
            vimeoForm: {
                url: '',
                loading: false,
                videoData: null,
                title: '',
                description: '',
                course: ''
            },
            vimeoDebounceTimer: null,

            // YouTube 일괄 가져오기
            youtubeBatchForm: {
                type: 'playlist', // 'playlist' or 'channel'
                url: '',
                loading: false,
                videos: [],
                course: ''
            },
            youtubeBatchDebounceTimer: null,

            // Vimeo 일괄 가져오기
            vimeoBatchForm: {
                type: 'showcase', // 'showcase', 'album', 'channel'
                url: '',
                loading: false,
                videos: [],
                course: ''
            },
            vimeoBatchDebounceTimer: null
        }
    },
    computed: {
        filteredFiles() {
            return this.files.filter(file => {
                // 폴더 필터
                if (this.selectedFolderId === 0) {
                    // 미분류 - folderId가 null이거나 undefined인 파일만
                    if (file.folderId) return false;
                } else if (this.selectedFolderId !== null) {
                    // 특정 폴더 선택
                    if (file.folderId !== this.selectedFolderId) return false;
                }
                // null이면 전체

                // 타입 필터
                if (this.filters.type && file.type !== this.filters.type) {
                    return false;
                }

                // 강좌 필터
                if (this.filters.course && file.course !== this.filters.course) {
                    return false;
                }

                // 검색어 필터
                if (this.searchQuery) {
                    const keyword = this.searchQuery.toLowerCase();
                    return file.name.toLowerCase().includes(keyword) ||
                           (file.course && file.course.toLowerCase().includes(keyword));
                }

                return true;
            });
        },

        currentFolderName() {
            if (this.selectedFolderId === null) return '전체 콘텐츠';
            if (this.selectedFolderId === 0) return '미분류';
            const folder = this.folders.find(f => f.id === this.selectedFolderId);
            return folder ? folder.name : '전체 콘텐츠';
        }
    },
    mounted() {
        this.updateFolderCounts();
    },
    methods: {
        // 폴더 관리
        selectFolder(folderId) {
            this.selectedFolderId = folderId;
        },

        openCreateFolderModal() {
            this.folderForm = {
                id: null,
                name: '',
                icon: '📁',
                color: '#3b82f6'
            };
            this.showFolderModal = true;
        },

        openEditFolderModal(folder) {
            this.folderForm = {
                id: folder.id,
                name: folder.name,
                icon: folder.icon,
                color: folder.color
            };
            this.showFolderModal = true;
        },

        saveFolderForm() {
            if (!this.folderForm.name.trim()) {
                alert('폴더 이름을 입력해주세요.');
                return;
            }

            if (this.folderForm.id) {
                // 수정
                const folder = this.folders.find(f => f.id === this.folderForm.id);
                if (folder) {
                    folder.name = this.folderForm.name;
                    folder.icon = this.folderForm.icon;
                    folder.color = this.folderForm.color;
                    alert('폴더가 수정되었습니다.');
                }
            } else {
                // 새로 생성
                const newFolder = {
                    id: Math.max(...this.folders.map(f => f.id)) + 1,
                    name: this.folderForm.name,
                    icon: this.folderForm.icon,
                    color: this.folderForm.color,
                    count: 0
                };
                this.folders.push(newFolder);
                alert('폴더가 생성되었습니다.');
            }

            this.showFolderModal = false;
        },

        deleteFolder(folderId) {
            const folder = this.folders.find(f => f.id === folderId);
            if (!folder) return;

            const filesInFolder = this.files.filter(f => f.folderId === folderId);
            if (filesInFolder.length > 0) {
                if (!confirm(`${folder.name} 폴더에 ${filesInFolder.length}개의 파일이 있습니다.\n폴더를 삭제하면 파일들은 '미분류'로 이동됩니다.\n계속하시겠습니까?`)) {
                    return;
                }
                // 파일들의 folderId를 null로 변경
                filesInFolder.forEach(file => file.folderId = null);
            }

            const index = this.folders.findIndex(f => f.id === folderId);
            if (index > -1) {
                this.folders.splice(index, 1);
                if (this.selectedFolderId === folderId) {
                    this.selectedFolderId = null;
                }
                alert('폴더가 삭제되었습니다.');
            }
        },

        updateFolderCounts() {
            this.folders.forEach(folder => {
                folder.count = this.files.filter(f => f.folderId === folder.id).length;
            });
        },

        getFileIcon(type) {
            return { 'video': '🎬', 'document': '📄', 'image': '🖼️' }[type] || '📁';
        },
        getFileTypeText(type) {
            return { 'video': '동영상', 'document': '문서', 'image': '이미지' }[type] || type;
        },
        getThumbnailClass(type) {
            return type;
        },
        selectFile(file) {
            console.log('Selected:', file.name);
        },
        viewDetail(file) {
            this.navigateTo('/learning/content-detail', {id: file.id});
        },
        openUploadModal() {
            this.navigateTo('/learning/content-create');
        },
        previewFile(file) { alert(`${file.name} 미리보기 기능은 추후 구현 예정입니다.`); },
        downloadFile(file) { alert(`${file.name} 다운로드 기능은 추후 구현 예정입니다.`); },
        editFile(file) { alert(`${file.name} 정보 수정 기능은 추후 구현 예정입니다.`); },
        deleteFile(file) { if (confirm(`${file.name}을(를) 삭제하시겠습니까?`)) alert('삭제되었습니다.'); },

        // ========== YouTube 단일 가져오기 ==========
        openYoutubeModal() {
            this.youtubeForm = {
                url: '',
                loading: false,
                videoData: null,
                title: '',
                description: '',
                course: ''
            };
            const modal = new bootstrap.Modal(document.getElementById('youtubeModal'));
            modal.show();
        },

        debounceYoutubeExtract() {
            clearTimeout(this.youtubeDebounceTimer);
            this.youtubeDebounceTimer = setTimeout(() => {
                this.extractYoutubeMetadata();
            }, 800);
        },

        async extractYoutubeMetadata() {
            const url = this.youtubeForm.url.trim();
            if (!url) {
                this.youtubeForm.videoData = null;
                return;
            }

            // YouTube URL 검증
            const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
            const match = url.match(youtubeRegex);

            if (!match) {
                alert('올바른 YouTube URL을 입력해주세요.');
                return;
            }

            const videoId = match[1];
            this.youtubeForm.loading = true;

            try {
                // 실제로는 YouTube Data API 호출
                // 여기서는 시뮬레이션
                await new Promise(resolve => setTimeout(resolve, 1000));

                const mockData = {
                    id: videoId,
                    title: 'React 완벽 가이드 - 컴포넌트 기초',
                    description: 'React 컴포넌트의 기초 개념을 배우는 강의입니다. 함수형 컴포넌트와 클래스형 컴포넌트의 차이점을 알아봅니다.',
                    thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
                    duration: '15:32',
                    views: '1,234',
                    publishedAt: '2024-12-15',
                    embedUrl: `https://www.youtube.com/embed/${videoId}`
                };

                this.youtubeForm.videoData = mockData;
                this.youtubeForm.title = mockData.title;
                this.youtubeForm.description = mockData.description;
            } catch (error) {
                alert('동영상 정보를 가져오는데 실패했습니다.');
                console.error(error);
            } finally {
                this.youtubeForm.loading = false;
            }
        },

        saveYoutubeVideo() {
            if (!this.youtubeForm.title) {
                alert('제목을 입력해주세요.');
                return;
            }

            const newVideo = {
                id: this.files.length + 1,
                name: this.youtubeForm.title + '.youtube',
                type: 'video',
                source: 'youtube',
                videoId: this.youtubeForm.videoData.id,
                embedUrl: this.youtubeForm.videoData.embedUrl,
                thumbnail: this.youtubeForm.videoData.thumbnail,
                course: this.youtubeForm.course || null,
                size: '-',
                uploadDate: new Date().toISOString().split('T')[0],
                duration: this.youtubeForm.videoData.duration
            };

            this.files.unshift(newVideo);
            this.stats.videos++;

            bootstrap.Modal.getInstance(document.getElementById('youtubeModal')).hide();
            alert('YouTube 동영상이 추가되었습니다!');
        },

        // ========== Vimeo 단일 가져오기 ==========
        openVimeoModal() {
            this.vimeoForm = {
                url: '',
                loading: false,
                videoData: null,
                title: '',
                description: '',
                course: ''
            };
            const modal = new bootstrap.Modal(document.getElementById('vimeoModal'));
            modal.show();
        },

        debounceVimeoExtract() {
            clearTimeout(this.vimeoDebounceTimer);
            this.vimeoDebounceTimer = setTimeout(() => {
                this.extractVimeoMetadata();
            }, 800);
        },

        async extractVimeoMetadata() {
            const url = this.vimeoForm.url.trim();
            if (!url) {
                this.vimeoForm.videoData = null;
                return;
            }

            // Vimeo URL 검증
            const vimeoRegex = /vimeo\.com\/(\d+)/;
            const match = url.match(vimeoRegex);

            if (!match) {
                alert('올바른 Vimeo URL을 입력해주세요.');
                return;
            }

            const videoId = match[1];
            this.vimeoForm.loading = true;

            try {
                // 실제로는 Vimeo oEmbed API 호출
                // 여기서는 시뮬레이션
                await new Promise(resolve => setTimeout(resolve, 1000));

                const mockData = {
                    id: videoId,
                    title: 'Python 데이터 분석 실습',
                    description: 'Pandas와 NumPy를 활용한 데이터 분석 실습 강의입니다.',
                    thumbnail: `https://i.vimeocdn.com/video/${videoId}_640x360.jpg`,
                    duration: '22:45',
                    views: '856',
                    publishedAt: '2024-12-10',
                    embedUrl: `https://player.vimeo.com/video/${videoId}`
                };

                this.vimeoForm.videoData = mockData;
                this.vimeoForm.title = mockData.title;
                this.vimeoForm.description = mockData.description;
            } catch (error) {
                alert('동영상 정보를 가져오는데 실패했습니다.');
                console.error(error);
            } finally {
                this.vimeoForm.loading = false;
            }
        },

        saveVimeoVideo() {
            if (!this.vimeoForm.title) {
                alert('제목을 입력해주세요.');
                return;
            }

            const newVideo = {
                id: this.files.length + 1,
                name: this.vimeoForm.title + '.vimeo',
                type: 'video',
                source: 'vimeo',
                videoId: this.vimeoForm.videoData.id,
                embedUrl: this.vimeoForm.videoData.embedUrl,
                thumbnail: this.vimeoForm.videoData.thumbnail,
                course: this.vimeoForm.course || null,
                size: '-',
                uploadDate: new Date().toISOString().split('T')[0],
                duration: this.vimeoForm.videoData.duration
            };

            this.files.unshift(newVideo);
            this.stats.videos++;

            bootstrap.Modal.getInstance(document.getElementById('vimeoModal')).hide();
            alert('Vimeo 동영상이 추가되었습니다!');
        },

        // ========== YouTube 일괄 가져오기 ==========
        openYoutubeBatchModal() {
            this.youtubeBatchForm = {
                type: 'playlist',
                url: '',
                loading: false,
                videos: [],
                course: ''
            };
            const modal = new bootstrap.Modal(document.getElementById('youtubeBatchModal'));
            modal.show();
        },

        debounceYoutubeBatchExtract() {
            clearTimeout(this.youtubeBatchDebounceTimer);
            this.youtubeBatchDebounceTimer = setTimeout(() => {
                this.extractYoutubePlaylist();
            }, 1000);
        },

        async extractYoutubePlaylist() {
            const url = this.youtubeBatchForm.url.trim();
            if (!url) {
                this.youtubeBatchForm.videos = [];
                return;
            }

            // URL 검증
            let isValid = false;
            if (this.youtubeBatchForm.type === 'playlist') {
                isValid = /[?&]list=([a-zA-Z0-9_-]+)/.test(url);
            } else {
                isValid = /youtube\.com\/(channel\/|@)/.test(url);
            }

            if (!isValid) {
                alert(`올바른 YouTube ${this.youtubeBatchForm.type === 'playlist' ? '재생목록' : '채널'} URL을 입력해주세요.`);
                return;
            }

            this.youtubeBatchForm.loading = true;

            try {
                // 실제로는 YouTube Data API 호출
                // 여기서는 시뮬레이션
                await new Promise(resolve => setTimeout(resolve, 1500));

                const mockVideos = [
                    {
                        id: 'video1',
                        title: 'React 기초 - 1강: 소개',
                        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg',
                        duration: '10:25',
                        views: '2.5K',
                        publishedAt: '2024-12-01',
                        selected: true
                    },
                    {
                        id: 'video2',
                        title: 'React 기초 - 2강: 컴포넌트',
                        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg',
                        duration: '15:30',
                        views: '1.8K',
                        publishedAt: '2024-12-03',
                        selected: true
                    },
                    {
                        id: 'video3',
                        title: 'React 기초 - 3강: Props와 State',
                        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg',
                        duration: '18:45',
                        views: '1.5K',
                        publishedAt: '2024-12-05',
                        selected: true
                    },
                    {
                        id: 'video4',
                        title: 'React 기초 - 4강: 이벤트 처리',
                        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg',
                        duration: '12:20',
                        views: '1.2K',
                        publishedAt: '2024-12-07',
                        selected: true
                    },
                    {
                        id: 'video5',
                        title: 'React 기초 - 5강: 라이프사이클',
                        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg',
                        duration: '20:15',
                        views: '980',
                        publishedAt: '2024-12-10',
                        selected: true
                    }
                ];

                this.youtubeBatchForm.videos = mockVideos;
            } catch (error) {
                alert('재생목록 정보를 가져오는데 실패했습니다.');
                console.error(error);
            } finally {
                this.youtubeBatchForm.loading = false;
            }
        },

        selectAllYoutubeVideos() {
            this.youtubeBatchForm.videos.forEach(v => v.selected = true);
        },

        deselectAllYoutubeVideos() {
            this.youtubeBatchForm.videos.forEach(v => v.selected = false);
        },

        saveYoutubeBatch() {
            const selectedVideos = this.youtubeBatchForm.videos.filter(v => v.selected);

            if (selectedVideos.length === 0) {
                alert('최소 1개의 동영상을 선택해주세요.');
                return;
            }

            selectedVideos.forEach(video => {
                const newVideo = {
                    id: this.files.length + 1,
                    name: video.title + '.youtube',
                    type: 'video',
                    source: 'youtube',
                    videoId: video.id,
                    embedUrl: `https://www.youtube.com/embed/${video.id}`,
                    thumbnail: video.thumbnail,
                    course: this.youtubeBatchForm.course || null,
                    size: '-',
                    uploadDate: new Date().toISOString().split('T')[0],
                    duration: video.duration
                };
                this.files.unshift(newVideo);
            });

            this.stats.videos += selectedVideos.length;

            bootstrap.Modal.getInstance(document.getElementById('youtubeBatchModal')).hide();
            alert(`${selectedVideos.length}개의 YouTube 동영상이 추가되었습니다!`);
        },

        // ========== Vimeo 일괄 가져오기 ==========
        openVimeoBatchModal() {
            this.vimeoBatchForm = {
                type: 'showcase',
                url: '',
                loading: false,
                videos: [],
                course: ''
            };
            const modal = new bootstrap.Modal(document.getElementById('vimeoBatchModal'));
            modal.show();
        },

        debounceVimeoBatchExtract() {
            clearTimeout(this.vimeoBatchDebounceTimer);
            this.vimeoBatchDebounceTimer = setTimeout(() => {
                this.extractVimeoCollection();
            }, 1000);
        },

        async extractVimeoCollection() {
            const url = this.vimeoBatchForm.url.trim();
            if (!url) {
                this.vimeoBatchForm.videos = [];
                return;
            }

            // URL 검증
            let isValid = false;
            if (this.vimeoBatchForm.type === 'showcase') {
                isValid = /vimeo\.com\/showcase\//.test(url);
            } else if (this.vimeoBatchForm.type === 'album') {
                isValid = /vimeo\.com\/album\//.test(url);
            } else {
                isValid = /vimeo\.com\/channels\//.test(url);
            }

            if (!isValid) {
                alert(`올바른 Vimeo ${this.vimeoBatchForm.type} URL을 입력해주세요.`);
                return;
            }

            this.vimeoBatchForm.loading = true;

            try {
                // 실제로는 Vimeo API 호출
                // 여기서는 시뮬레이션
                await new Promise(resolve => setTimeout(resolve, 1500));

                const mockVideos = [
                    {
                        id: '123456789',
                        title: 'Python 기초 - 1강: 변수와 자료형',
                        thumbnail: 'https://i.vimeocdn.com/video/123456789_640x360.jpg',
                        duration: '14:20',
                        views: '850',
                        publishedAt: '2024-12-05',
                        selected: true
                    },
                    {
                        id: '123456790',
                        title: 'Python 기초 - 2강: 조건문과 반복문',
                        thumbnail: 'https://i.vimeocdn.com/video/123456790_640x360.jpg',
                        duration: '16:35',
                        views: '720',
                        publishedAt: '2024-12-07',
                        selected: true
                    },
                    {
                        id: '123456791',
                        title: 'Python 기초 - 3강: 함수',
                        thumbnail: 'https://i.vimeocdn.com/video/123456791_640x360.jpg',
                        duration: '18:50',
                        views: '680',
                        publishedAt: '2024-12-09',
                        selected: true
                    }
                ];

                this.vimeoBatchForm.videos = mockVideos;
            } catch (error) {
                alert('컬렉션 정보를 가져오는데 실패했습니다.');
                console.error(error);
            } finally {
                this.vimeoBatchForm.loading = false;
            }
        },

        selectAllVimeoVideos() {
            this.vimeoBatchForm.videos.forEach(v => v.selected = true);
        },

        deselectAllVimeoVideos() {
            this.vimeoBatchForm.videos.forEach(v => v.selected = false);
        },

        saveVimeoBatch() {
            const selectedVideos = this.vimeoBatchForm.videos.filter(v => v.selected);

            if (selectedVideos.length === 0) {
                alert('최소 1개의 동영상을 선택해주세요.');
                return;
            }

            selectedVideos.forEach(video => {
                const newVideo = {
                    id: this.files.length + 1,
                    name: video.title + '.vimeo',
                    type: 'video',
                    source: 'vimeo',
                    videoId: video.id,
                    embedUrl: `https://player.vimeo.com/video/${video.id}`,
                    thumbnail: video.thumbnail,
                    course: this.vimeoBatchForm.course || null,
                    size: '-',
                    uploadDate: new Date().toISOString().split('T')[0],
                    duration: video.duration
                };
                this.files.unshift(newVideo);
            });

            this.stats.videos += selectedVideos.length;

            bootstrap.Modal.getInstance(document.getElementById('vimeoBatchModal')).hide();
            alert(`${selectedVideos.length}개의 Vimeo 동영상이 추가되었습니다!`);
        }
    }
}
