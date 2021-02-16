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
  },
};
