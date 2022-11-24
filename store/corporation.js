export const state = () => ({
  corporations: [],
  selectCorporationId: 0,
})

export const getters = {
  existCorporations (state) {
    return state.corporations.length > 0;
  },
  getCorporations (state) {
    return state.corporations;
  },
  getSelectCorporationId (state) {
    return state.selectCorporationId;
  }
}

export const mutations = {
  setCorporations (state, payload) {
    state.corporations = payload;
  },
  setSelectCorporation (state, payload) {
    state.selectCorporationId = payload;
  }
}

export const actions = {
  async findAll({ commit }) {
    const corporations = await this.$axios.$get('/api/corporation');
    commit('setCorporations', corporations);
    if(corporations && corporations.length) commit('setSelectCorporation', corporations[0].corporationId);
  }
}
