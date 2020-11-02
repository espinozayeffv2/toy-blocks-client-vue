import { mutations } from '../../src/store/mutations'
import initialState from '../../src/store/initialState';

describe('Store Mutations', () => {
    const { 
        checkNodeStatusStart, 
        checkNodeStatusSuccess, 
        checkNodeStatusFailure,
        setBlockInitStatus,
        setBlockSuccessStatus,
        setBlockFailureStatus
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

    it('check block init status', () => {
        const id = 1;

        setBlockInitStatus(initState, id);
        expect(initState.blocks[id].loading).toBe(true);
    });
    
    it('check block success state', () => {
        const id = 1;
        const params = {
            id,
            data: [
                {
                    id: 1,
                    attributes: {
                        data: 'Testing 1'
                    }
                },
                {
                    id: 2,
                    attributes: {
                        data: 'Testing 2'
                    }
                },
            ]
        };

        setBlockSuccessStatus(initState, params);
        expect(initState.blocks[id].loading).toBe(false);
        expect(initState.blocks[id].list.length).toEqual(params.data.length);
    });

    it('check block failure status', () => {
        const id = 1;

        setBlockFailureStatus(initState, id);
        expect(initState.blocks[id].loading).toBe(false);
    });
});