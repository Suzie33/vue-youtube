import firebase from 'firebase/app';

export default {
  actions: {
    async login({ commit }, { email, password }) {
      // eslint-disable-next-line no-useless-catch
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },

    async register({ commit, dispatch }, { email, password, name }) {
      // eslint-disable-next-line no-useless-catch
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const userId = await dispatch('getUserId');
        await firebase.database().ref(`/users/${userId}/info`).set({
          bill: 10000,
          name,
        });
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    getUserId() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },

    async logout({ commit }) {
      await firebase.auth().signOut();
      commit('clearInfo');
    },
  },
};
