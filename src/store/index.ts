import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import { STATUSES, MESSAGES } from '../axios/httpcode'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    websites: [],
  },
  mutations: {
    setWebsites (state, payload) {
      state.websites = payload;
    },
  },
  actions: {
    fetchWebsites ({ commit }) {
      axios.get('websites').then((response) => {
        if (response.status === STATUSES.FETCHED && response.statusText === MESSAGES.FETCHED) {
          commit('setWebsites', response.data.data);
        }
      }).catch(() => {
        Vue.notify({
          text: 'Network Error',
          type: 'error',
        });
      });
    },
    async subscribe (_context, data) {
      return await axios.post('subscriber', data);
    }
  },
})
