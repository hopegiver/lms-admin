export default {
    name: 'Organizations',
    layout: 'admin',
    data() {
        return {
            selectedOrg: null,
            organizations: [
                {
                    id: 1,
                    name: '본사',
                    parent: null,
                    memberCount: 156,
                    expanded: true,
                    members: [
                        { id: 1, name: '김대표', email: 'ceo@example.com', position: '대표이사' }
                    ],
                    children: [
                        {
                            id: 2,
                            name: '개발본부',
                            parent: '본사',
                            memberCount: 45,
                            expanded: true,
                            members: [
                                { id: 2, name: '이개발', email: 'dev.lee@example.com', position: '본부장' },
                                { id: 3, name: '박프론트', email: 'front.park@example.com', position: '팀장' },
                                { id: 4, name: '최백엔드', email: 'back.choi@example.com', position: '팀장' }
                            ],
                            children: [
                                {
                                    id: 5,
                                    name: '프론트엔드팀',
                                    parent: '개발본부',
                                    memberCount: 12,
                                    members: [
                                        { id: 5, name: '김프론트', email: 'kim.front@example.com', position: '선임' },
                                        { id: 6, name: '이리액트', email: 'lee.react@example.com', position: '사원' }
                                    ]
                                },
                                {
                                    id: 6,
                                    name: '백엔드팀',
                                    parent: '개발본부',
                                    memberCount: 15,
                                    members: [
                                        { id: 7, name: '박자바', email: 'park.java@example.com', position: '선임' },
                                        { id: 8, name: '정노드', email: 'jung.node@example.com', position: '사원' }
                                    ]
                                },
                                {
                                    id: 7,
                                    name: '인프라팀',
                                    parent: '개발본부',
                                    memberCount: 8,
                                    members: [
                                        { id: 9, name: '한클라우드', email: 'han.cloud@example.com', position: '팀장' }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 8,
                            name: '사업본부',
                            parent: '본사',
                            memberCount: 35,
                            expanded: false,
                            members: [
                                { id: 10, name: '김사업', email: 'biz.kim@example.com', position: '본부장' }
                            ],
                            children: [
                                {
                                    id: 9,
                                    name: '영업팀',
                                    parent: '사업본부',
                                    memberCount: 18,
                                    members: []
                                },
                                {
                                    id: 10,
                                    name: '마케팅팀',
                                    parent: '사업본부',
                                    memberCount: 12,
                                    members: []
                                }
                            ]
                        },
                        {
                            id: 11,
                            name: '경영지원본부',
                            parent: '본사',
                            memberCount: 25,
                            expanded: false,
                            members: [
                                { id: 11, name: '박경영', email: 'mgmt.park@example.com', position: '본부장' }
                            ],
                            children: [
                                {
                                    id: 12,
                                    name: '인사팀',
                                    parent: '경영지원본부',
                                    memberCount: 8,
                                    members: []
                                },
                                {
                                    id: 13,
                                    name: '재무팀',
                                    parent: '경영지원본부',
                                    memberCount: 6,
                                    members: []
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        toggleExpand(org) {
            org.expanded = !org.expanded;
        },
        selectOrg(org) {
            this.selectedOrg = org;
        },
        openCreateModal() {
            alert('부서 추가 모달은 추후 구현 예정입니다.');
        },
        editOrg(org) {
            alert(`${org.name} 수정 기능은 추후 구현 예정입니다.`);
        },
        deleteOrg(org) {
            if (confirm(`${org.name} 부서를 삭제하시겠습니까?`)) {
                alert('삭제 기능은 추후 구현 예정입니다.');
            }
        },
        assignMembers() {
            alert('인원 배정 기능은 추후 구현 예정입니다.');
        },
        removeMember(member) {
            if (confirm(`${member.name}을(를) 이 부서에서 제외하시겠습니까?`)) {
                alert('제외 기능은 추후 구현 예정입니다.');
            }
        }
    }
}
