export const actions = {
    async getAllNodes({ commit }, nodeList) {
        for(const el of nodeList) {
            await commit('checkNodeStatusStart', el);
      
            try {
                const res = await fetch(`${el.url}/api/v1/status`);
                const response = await res.json();
                const params = {
                    el,
                    name: response.node_name
                };

                await commit('checkNodeStatusSuccess', params);
            }
            catch (e) {
                await commit('checkNodeStatusFailure', el);
            }
        }
    },
    async getBlocksFromNode({ commit }, { id, url }){
        commit('setBlockInitStatus', id);

        try {
            const response = await fetch(`${url}/api/v1/blocks`);
            const { data } = await response.json();
            const params = {
                id,
                data
            };
            commit('setBlocksStatusSuccess', params);
        } catch (e){
            console.error(e);
            commit('setBlockStatusFailure', id);
        }
    }
}