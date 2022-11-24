export const state = () => ({
  accessToken: '',
})

export const getters = {
  existAccessToken(state) {
    return !!state.accessToken;
  },
  getAccessToken (state) {
    return state.accessToken;
  },
  getPrincipal(state) {
    return state.accessToken;
  }
}

export const mutations = {
  setAccessToken (state, payload) {
    state.accessToken = payload;
  },
  removeAccessToken(state) {
    state.accessToken = '';
  }
}

export const actions = {
  async login({ commit }, loginForm) {
    const res = await this.$axios.$post('/login', loginForm)
    commit('setAccessToken', res.accessToken);
    await this.$router.push('/department');
  },
  async logout({ commit }) {
    commit('removeAccessToken');
    await this.$router.push('/login');
  },
  async checkStorage({ commit }) {
    await commit('setAccessToken', window.localStorage.getItem('accessToken'));
  }
}
