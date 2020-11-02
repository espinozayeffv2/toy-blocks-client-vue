import { mutations } from '../../src/store/mutations'
import initialState from '../../src/store/initialState';

describe('Store Mutations', () => {
    const { 
        checkNodeStatusStart, 
        checkNodeStatusSuccess, 
        checkNodeStatusFailure,
        setBlockInitStatus,
        setBlockStatusFailure,
        setBlocksStatusSuccess
    } = mutations; 

    const initState = initialState();

    it('checkNodeStatusStart', () => {
        checkNodeStatusStart(initState, { url: initState.nodes.list[0].url });
        expect(initState.nodes.list[0].loading).toEqual(true);
    });

    it('checkNodeStatusSuccess', () => {
        const params = {
            el: {
                url: initState.nodes.list[0].url 
            },
            name: 'Thawing Springs'
        };

        checkNodeStatusSuccess(initState, params);
        expect(initState.nodes.list[0].name).toEqual(params.name);
    });

    it('checkNodeStatusFailure', () => {
        checkNodeStatusFailure(initState, { url: initState.nodes.list[0].url });
        expect(initState.nodes.list[0].loading).toEqual(false);
        expect(initState.nodes.list[0].online).toEqual(false);
    });

    it('Check block init state', () => {
        const id = 1;

        setBlockInitStatus(initState, id);
        expect(initState.blocks[id].loading).toEqual(true);        
    });
    
    it('Check block failure state', () => {
        const id = 1;

        setBlockStatusFailure(initState, id);
        expect(initState.blocks[id].loading).toEqual(false);        
    });
    
    it('Check block success state', () => {
        const id = 1;
        const params = {
            id,
            data: [
                {
                    id: 1,
                    attributes: {
                        data: 'By reason of these things',
                    },
                },
                {
                    id: 2,
                    attributes: {
                        data: 'then the whaling voyage was welcome'
                    }
                },
            ]
        };

        setBlocksStatusSuccess(initState, params);
        expect(initState.blocks[id].loading).toBe(false);        
        expect(initState.blocks[id].list.length).toBe(params.data.length);        
    });
});