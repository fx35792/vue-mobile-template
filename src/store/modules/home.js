export default {
    namespaced: true,
    state: {
        list: [],
        visible: false,
        firstName: 'Sunny',
        lastName: 'Fan'
    },
    mutations: {
        MGetList(state, data){
            state.list = data
        },
        MChangeVisible(state, value){
            state.visible = value
        }
    },
    actions: {
        // 异步请求接口数据
        AGetList ({ commit }, params) {
            const url = '/users'
            const error = '获取数据失败'
            return $http.get(url, params).then(res => {
                const { data } = res
                // commit 去同步更改state里面的数据
                return commit('MGetList', data)
            }).catch(e => {
                return Promise.resolve(e && e.statusText || error)
            })
        },
    },
    getters: {
        getFullName: state => {
            return state.firstName +'----'+ state.lastName
        }
    }
}