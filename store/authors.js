const author ={
  store:{
    author: null,
    authors: [],
    authorModal:false
  },
  actions: {
    async getAuthor({ commit },id) {
      const { data } = await this.$axios.get(`author/${id}`);
      commit('setAuthor', data);
  },
    async getAuthors({commit}){
      const{ data } = await this.$axios.get('author');
      commit('setAuthors',data)

    }
  },
  mutations: {
      setAuthor: (state, payload) => (state.author = payload),
      setAuthors: (state, payload) => (state.authors = payload),
      setAuthorModal: (state, payload) => (state.authorModal = payload)
  }
};
export const state = () => ({
  ...author.store
});

export const actions = {
  ...author.actions,
};

export const mutations = {
  ...author.mutations
};
