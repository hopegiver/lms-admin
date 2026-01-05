export default {
    name: 'KeywordManagement',
    layout: 'admin',
    data() {
        return {
            keywords: [
                {
                    id: 1,
                    keyword: 'Vue.js 강좌',
                    searchEngine: 'naver',
                    targetUrl: 'https://example.com/courses/vuejs',
                    currentRank: 3,
                    previousRank: 5,
                    bestRank: 2,
                    lastChecked: '2024-01-15 14:30',
                    status: 'active',
                    history: [
                        { date: '2024-01-15', rank: 3 },
                        { date: '2024-01-14', rank: 5 },
                        { date: '2024-01-13', rank: 4 },
                        { date: '2024-01-12', rank: 6 },
                        { date: '2024-01-11', rank: 7 }
                    ]
                },
                {
                    id: 2,
                    keyword: 'React 온라인 강의',
                    searchEngine: 'google',
                    targetUrl: 'https://example.com/courses/react',
                    currentRank: 8,
                    previousRank: 8,
                    bestRank: 5,
                    lastChecked: '2024-01-15 14:30',
                    status: 'active',
                    history: [
                        { date: '2024-01-15', rank: 8 },
                        { date: '2024-01-14', rank: 8 },
                        { date: '2024-01-13', rank: 9 },
                        { date: '2024-01-12', rank: 10 },
                        { date: '2024-01-11', rank: 11 }
                    ]
                },
                {
                    id: 3,
                    keyword: 'Node.js 교육',
                    searchEngine: 'naver',
                    targetUrl: 'https://example.com/courses/nodejs',
                    currentRank: 15,
                    previousRank: 12,
                    bestRank: 8,
                    lastChecked: '2024-01-15 14:30',
                    status: 'active',
                    history: [
                        { date: '2024-01-15', rank: 15 },
                        { date: '2024-01-14', rank: 12 },
                        { date: '2024-01-13', rank: 13 },
                        { date: '2024-01-12', rank: 14 },
                        { date: '2024-01-11', rank: 16 }
                    ]
                },
                {
                    id: 4,
                    keyword: 'Python 프로그래밍',
                    searchEngine: 'google',
                    targetUrl: 'https://example.com/courses/python',
                    currentRank: null,
                    previousRank: 28,
                    bestRank: 18,
                    lastChecked: '2024-01-15 14:30',
                    status: 'inactive',
                    history: [
                        { date: '2024-01-15', rank: null },
                        { date: '2024-01-14', rank: 28 },
                        { date: '2024-01-13', rank: 25 },
                        { date: '2024-01-12', rank: 22 },
                        { date: '2024-01-11', rank: 20 }
                    ]
                }
            ],
            searchQuery: '',
            filterEngine: '',
            filterStatus: '',
            showAddModal: false,
            showDetailModal: false,
            selectedKeyword: null,
            newKeyword: {
                keyword: '',
                searchEngine: 'naver',
                targetUrl: ''
            },
            isChecking: false
        }
    },
    computed: {
        filteredKeywords() {
            let result = this.keywords;

            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                result = result.filter(k => k.keyword.toLowerCase().includes(query));
            }

            if (this.filterEngine) {
                result = result.filter(k => k.searchEngine === this.filterEngine);
            }

            if (this.filterStatus) {
                result = result.filter(k => k.status === this.filterStatus);
            }

            return result;
        },
        summary() {
            const total = this.keywords.length;
            const top10 = this.keywords.filter(k => k.currentRank && k.currentRank <= 10).length;
            const improved = this.keywords.filter(k =>
                k.currentRank && k.previousRank && k.currentRank < k.previousRank
            ).length;
            const declined = this.keywords.filter(k =>
                k.currentRank && k.previousRank && k.currentRank > k.previousRank
            ).length;

            return { total, top10, improved, declined };
        }
    },
    methods: {
        getRankChange(keyword) {
            if (!keyword.currentRank || !keyword.previousRank) return null;
            return keyword.previousRank - keyword.currentRank;
        },
        getRankChangeIcon(keyword) {
            const change = this.getRankChange(keyword);
            if (change === null) return '—';
            if (change > 0) return '▲';
            if (change < 0) return '▼';
            return '―';
        },
        getRankChangeClass(keyword) {
            const change = this.getRankChange(keyword);
            if (change === null) return 'text-muted';
            if (change > 0) return 'text-success';
            if (change < 0) return 'text-danger';
            return 'text-muted';
        },
        getSearchEngineLabel(engine) {
            const labels = { 'naver': '네이버', 'google': '구글', 'daum': '다음' };
            return labels[engine] || engine;
        },
        getSearchEngineIcon(engine) {
            const icons = { 'naver': '🟢', 'google': '🔵', 'daum': '🟠' };
            return icons[engine] || '🔍';
        },
        openAddModal() {
            this.showAddModal = true;
        },
        closeAddModal() {
            this.showAddModal = false;
            this.newKeyword = {
                keyword: '',
                searchEngine: 'naver',
                targetUrl: ''
            };
        },
        addKeyword() {
            if (!this.newKeyword.keyword) {
                alert('키워드를 입력해주세요.');
                return;
            }
            if (!this.newKeyword.targetUrl) {
                alert('목표 URL을 입력해주세요.');
                return;
            }

            const newId = Math.max(...this.keywords.map(k => k.id)) + 1;
            this.keywords.push({
                id: newId,
                keyword: this.newKeyword.keyword,
                searchEngine: this.newKeyword.searchEngine,
                targetUrl: this.newKeyword.targetUrl,
                currentRank: null,
                previousRank: null,
                bestRank: null,
                lastChecked: null,
                status: 'active',
                history: []
            });

            alert('키워드가 등록되었습니다. 순위 조회를 시작합니다.');
            this.closeAddModal();
        },
        deleteKeyword(keyword) {
            if (confirm(`"${keyword.keyword}" 키워드를 삭제하시겠습니까?`)) {
                const index = this.keywords.indexOf(keyword);
                this.keywords.splice(index, 1);
            }
        },
        viewDetail(keyword) {
            this.selectedKeyword = keyword;
            this.showDetailModal = true;
        },
        closeDetailModal() {
            this.showDetailModal = false;
            this.selectedKeyword = null;
        },
        checkAllRanks() {
            this.isChecking = true;
            console.log('전체 순위 조회 시작...');

            // 실제로는 API 호출
            setTimeout(() => {
                this.keywords.forEach(keyword => {
                    if (keyword.status === 'active') {
                        // 랜덤 순위 업데이트 (시뮬레이션)
                        const newRank = Math.floor(Math.random() * 30) + 1;
                        keyword.previousRank = keyword.currentRank;
                        keyword.currentRank = newRank;
                        keyword.lastChecked = new Date().toISOString().slice(0, 16).replace('T', ' ');

                        if (!keyword.bestRank || newRank < keyword.bestRank) {
                            keyword.bestRank = newRank;
                        }
                    }
                });

                this.isChecking = false;
                alert('순위 조회가 완료되었습니다.');
            }, 2000);
        },
        checkSingleRank(keyword) {
            console.log(`${keyword.keyword} 순위 조회...`);

            // 실제로는 API 호출
            const newRank = Math.floor(Math.random() * 30) + 1;
            keyword.previousRank = keyword.currentRank;
            keyword.currentRank = newRank;
            keyword.lastChecked = new Date().toISOString().slice(0, 16).replace('T', ' ');

            if (!keyword.bestRank || newRank < keyword.bestRank) {
                keyword.bestRank = newRank;
            }

            alert(`순위 조회 완료: ${newRank}위`);
        },
        resetFilters() {
            this.searchQuery = '';
            this.filterEngine = '';
            this.filterStatus = '';
        }
    }
}
