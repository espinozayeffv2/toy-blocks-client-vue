export default () => ({
    nodes: {
        list: [
            {
                id: 1,
                url: 'https://thawing-springs-53971.herokuapp.com',
                online: false,
                name: 'Node 1',
                loading: false
            },
            {
                id: 2,
                url: 'https://secret-lowlands-62331.herokuapp.com',
                online: false,
                name: 'Node 2',
                loading: false
            },
            {
                id: 3,
                url: 'https://calm-anchorage-82141.herokuapp.com',
                online: false,
                name: 'Node 3',
                loading: false
            },
            {
                id: 4,
                url: 'http://localhost:3002',
                online: false,
                name: 'Node 4',
                loading: false
            }
        ]
    },
    blocks: {
        1: {
            loading: false,
            list: []
        },
        2: {
            loading: false,
            list: []
        },
        3: {
            loading: false,
            list: []
        },
        4: {
            loading: false,
            list: []
        }
    }
});
