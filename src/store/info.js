import firebase from 'firebase/app';

export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  actions: {
    async fetchInfo({ commit, dispatch }) {
      try {
        const userId = await dispatch('getUserId');
        const info = (await (await firebase.database().ref(`/users/${userId}/info`).once('value'))).val();
        console.log(info);
        commit('setInfo', info);
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    info: (state) => state.info,
  },
};
