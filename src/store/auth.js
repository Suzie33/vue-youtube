import firebase from 'firebase/app';

export default {
  actions: {
    async login(ctx, { email, password }) {
      // eslint-disable-next-line no-useless-catch
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        throw error;
      }
    },

    async register({ dispatch }, { email, password, name }) {
      // eslint-disable-next-line no-useless-catch
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const userId = await dispatch('getUserId');
        await firebase.database().ref(`/users/${userId}/info`).set({
          bill: 0,
          name,
        });
      } catch (error) {
        throw error;
      }
    },
    getUserId() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },

    async logout() {
      await firebase.auth().signOut();
    },
  },
};
