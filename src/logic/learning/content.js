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
            files: [
                { id: 1, name: 'React 컴포넌트 기초.mp4', type: 'video', course: 'React 완벽 가이드', size: '256 MB', uploadDate: '2024-12-19' },
                { id: 2, name: 'JavaScript 가이드.pdf', type: 'document', course: 'JavaScript ES6+', size: '4.2 MB', uploadDate: '2024-12-18' },
                { id: 3, name: '강좌 썸네일.png', type: 'image', course: 'React 완벽 가이드', size: '1.5 MB', uploadDate: '2024-12-18' },
                { id: 4, name: 'Python 데이터분석 실습.mp4', type: 'video', course: 'Python 데이터 분석', size: '512 MB', uploadDate: '2024-12-17' },
                { id: 5, name: 'AWS 아키텍처 다이어그램.png', type: 'image', course: 'AWS 클라우드 입문', size: '2.3 MB', uploadDate: '2024-12-17' },
                { id: 6, name: '실습 자료.zip', type: 'document', course: 'React 완벽 가이드', size: '15 MB', uploadDate: '2024-12-16' },
                { id: 7, name: 'ES6 문법 정리.pdf', type: 'document', course: 'JavaScript ES6+', size: '3.1 MB', uploadDate: '2024-12-15' },
                { id: 8, name: '머신러닝 개요.mp4', type: 'video', course: 'Python 데이터 분석', size: '380 MB', uploadDate: '2024-12-15' }
            ]
        }
    },
    methods: {
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
        openUploadModal() { alert('파일 업로드 모달은 추후 구현 예정입니다.'); },
        previewFile(file) { alert(`${file.name} 미리보기 기능은 추후 구현 예정입니다.`); },
        downloadFile(file) { alert(`${file.name} 다운로드 기능은 추후 구현 예정입니다.`); },
        editFile(file) { alert(`${file.name} 정보 수정 기능은 추후 구현 예정입니다.`); },
        deleteFile(file) { if (confirm(`${file.name}을(를) 삭제하시겠습니까?`)) alert('삭제되었습니다.'); }
    }
}
