export const state = () => ({
  corporations: []
})

export const getters = {

}

export const actions = {
  async findAll() {
    const res = await this.$axios.get('/api/corporation');
    console.log(res);
  }

}
