const book ={
  store:{
    book: null,
    books: [],
    bookModal:false
  },
  actions: {
    async getBook({ commit },id) {
      const { data } = await this.$axios.get(`book/${id}`);
      commit('setBook', data);
  },
    async getBooks({commit}){
      const{ data } = await this.$axios.get('book');
      commit('setBooks',data)

    }
  },
  mutations: {
      setBook: (state, payload) => (state.book = payload),
      setBooks: (state, payload) => (state.books = payload),
      setBookModal: (state, payload) => (state.bookModal = payload)
  }
};
export const state = () => ({
  ...book.store
});

export const actions = {
  ...book.actions,
};

export const mutations = {
  ...book.mutations
};
