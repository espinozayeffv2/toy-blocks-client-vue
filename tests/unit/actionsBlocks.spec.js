import { actions } from '../../src/store/actions'

describe('Block store actions', () => {
  
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ el: { url: 'https://thawing-springs-53971.herokuapp.com' }, 
                "data": [
                    {
                        "id": "5",
                        "type": "blocks",
                        "attributes": {
                            "index": 1,
                            "timestamp": 1530679678,
                            "data": "The Human Torch",
                            "previous-hash": "KsmmdGrKVDr43/OYlM/oFzr7oh6wHG+uM9UpRyIoVe8=",
                            "hash": "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc="
                        }
                    }
                ]
            }),
        })
    );

    beforeEach(() => {
        fetch.mockClear();
    });

    it('get the blocks from one node', async () => {
        const commit = jest.fn();
        const params = {
            id: 1,
            url: 'https://thawing-springs-53971.herokuapp.com'
        };
        const data = [
            {
                "id": "5",
                "type": "blocks",
                "attributes": {
                    "index": 1,
                    "timestamp": 1530679678,
                    "data": "The Human Torch",
                    "previous-hash": "KsmmdGrKVDr43/OYlM/oFzr7oh6wHG+uM9UpRyIoVe8=",
                    "hash": "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc="
                }
            }
        ];
        await actions.getBlocksFromNode({ commit }, params);

        expect(commit).toHaveBeenCalledTimes(2);
        expect(commit).toHaveBeenCalledWith('setBlockInitStatus', params.id);
        expect(commit).toHaveBeenCalledWith('setBlocksStatusSuccess', {
            id: params.id,
            data
        });
    });

    it('get the block with failure', async () => {
        const commit = jest.fn();
        fetch.mockImplementationOnce(() => Promise.reject());

        const params = {
            id: 1,
            url: 'https://thawing-springs-53971.herokuapp.com'
        };

        await actions.getBlocksFromNode({ commit }, params);
        expect(commit).toHaveBeenCalledTimes(2);
        expect(commit).toHaveBeenCalledWith('setBlockInitStatus', params.id);
        expect(commit).toHaveBeenCalledWith('setBlockStatusFailure', params.id);
    });
});