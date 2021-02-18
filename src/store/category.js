import firebase from 'firebase/app';

export default {
  actions: {
    async fetchCategories({ commit, dispatch }) {
      try {
        const userId = await dispatch('getUserId');
        const categories = (await firebase.database().ref(`/users/${userId}/categories`).once('value')).val() || {};

        return Object.keys(categories).map((key) => ({ ...categories[key], id: key }));
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const userId = await dispatch('getUserId');
        const newCategory = await firebase.database().ref(`/users/${userId}/categories`).push({ title, limit });
        return { title, limit, id: newCategory.key };
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async updateCategory({ commit, dispatch }, { title, limit, id }) {
      try {
        const userId = await dispatch('getUserId');
        await firebase.database().ref(`/users/${userId}/categories`).child(id).update({ title, limit });
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
  },
};
