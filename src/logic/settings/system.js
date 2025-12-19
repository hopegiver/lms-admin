export default {
    name: 'SystemSettings',
    layout: 'admin',
    data() {
        return {
            systemInfo: {
                version: '2.5.3',
                environment: 'Production',
                nodeVersion: 'v20.10.0',
                database: 'PostgreSQL 15.2',
                uptime: '15일 4시간 32분',
                lastDeploy: '2024-12-19 09:00:00',
                storageUsed: '45.2GB',
                storageTotal: '100GB'
            },
            logs: [
                { id: 1, timestamp: '2024-12-19 14:32:15', level: 'INFO', message: 'User login: admin@lms.com' },
                { id: 2, timestamp: '2024-12-19 14:31:45', level: 'INFO', message: 'Order created: ORD-2024121901' },
                { id: 3, timestamp: '2024-12-19 14:30:12', level: 'WARN', message: 'High memory usage detected: 85%' },
                { id: 4, timestamp: '2024-12-19 14:28:33', level: 'INFO', message: 'Cache cleared by admin' },
                { id: 5, timestamp: '2024-12-19 14:25:00', level: 'INFO', message: 'Scheduled task completed: daily_report' },
                { id: 6, timestamp: '2024-12-19 14:20:18', level: 'ERROR', message: 'Payment gateway timeout: transaction pending' },
                { id: 7, timestamp: '2024-12-19 14:15:42', level: 'INFO', message: 'New user registered: user123@email.com' },
                { id: 8, timestamp: '2024-12-19 14:10:05', level: 'INFO', message: 'Course published: React 완벽 가이드' }
            ],
            cronJobs: [
                { id: 1, name: '일일 리포트 생성', schedule: '매일 00:00', enabled: true },
                { id: 2, name: '만료 알림 발송', schedule: '매일 09:00', enabled: true },
                { id: 3, name: '데이터베이스 백업', schedule: '매일 03:00', enabled: true },
                { id: 4, name: '임시 파일 정리', schedule: '매주 일요일 04:00', enabled: true },
                { id: 5, name: '검색 인덱스 업데이트', schedule: '매 6시간', enabled: false }
            ],
            backups: [
                { id: 1, name: 'backup_2024-12-19_03-00.sql', size: '2.3GB' },
                { id: 2, name: 'backup_2024-12-18_03-00.sql', size: '2.3GB' },
                { id: 3, name: 'backup_2024-12-17_03-00.sql', size: '2.2GB' }
            ]
        }
    },
    methods: {
        getLogLevelClass(level) {
            return {
                'INFO': 'text-info',
                'WARN': 'text-warning',
                'ERROR': 'text-danger',
                'DEBUG': 'text-secondary'
            }[level] || 'text-light';
        },
        clearCache() {
            alert('캐시가 삭제되었습니다.');
        },
        backupDatabase() {
            alert('데이터베이스 백업이 시작되었습니다. 완료 시 알림을 받게 됩니다.');
        },
        cleanupTempFiles() {
            alert('임시 파일 정리가 완료되었습니다.');
        },
        rebuildSearchIndex() {
            alert('검색 인덱스 재구축이 시작되었습니다.');
        },
        refreshLogs() {
            alert('로그가 새로고침되었습니다.');
        },
        downloadBackup(backup) {
            alert(`${backup.name} 다운로드가 시작됩니다.`);
        }
    }
}
