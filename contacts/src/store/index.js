import { createStore } from 'vuex'
import api from '@/http/services'
export default createStore({
  state: {
    users:[],
    current:{}
  },
  getters: {
    userById: (state) => (id) => {
      return state.users.find(user => user.id === id)
    },
    userByCpf: (state) => (cpf) => {
      return state.users.find(user => user.cpf === cpf)
    }
  },
  mutations: {
    UPDATE_ITEMS (state, payload) {
      state.users = payload
    },
    ADD_ITEMS(state,payload) {
      state.users.push(payload)
    },
    UPDATE_ITEMS2 (state, payload) {
      state.current ={ ...state.current, ...payload}
    }
  },
  actions: {
    getUsers ({ commit }) {
      return api.get('/users').then((response) => {
        commit('UPDATE_ITEMS', response.data.data)
        return response.data
      })
    },
    getUserById ({ commit },id) {
      return api.get(`/users/edit/${id}`).then((response) => {
        commit('UPDATE_ITEMS2', response.data.user)
        return response.data.user
      })
    },
    checkCpf (_,cpf) {
      return api.get(`/users/validate/${cpf}`).then((response) => {
        return response
    }).catch(error =>  error)
  },
    createUsers ({ commit }, user) {
      api.post('/users/create',user).then((response) => {
        commit('ADD_ITEMS', response.data.data)
      })
    },
    updateUsers({ commit },user) {
      api.put(`/users/edit/${user.id}`,user).then((response) => {
        commit('UPDATE_ITEMS', response.data.data[0])
      })
    },
    deleteUser({ commit },user) {
      api.delete(`/users`, { data: { data: user } }).then((response) => {
        commit('UPDATE_ITEMS', response.data.data)
      })
    }
  },
  modules: {
  }
})
