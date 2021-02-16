import Vue from 'vue';
import Vuelidate from 'vuelidate';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import messagePlugin from '@/utils/message.plugin';
import dateFilter from '@/filters/date.filter';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter('dateFilter', dateFilter);

const firebaseConfig = {
  apiKey: 'AIzaSyAHp00NjajUb33UWIbjgWp_Kqud9ILq1Ms',
  authDomain: 'vue-crm7.firebaseapp.com',
  projectId: 'vue-crm7',
  storageBucket: 'vue-crm7.appspot.com',
  messagingSenderId: '491172355614',
  appId: '1:491172355614:web:def7e7b27afb8f25f7d80f',
  measurementId: 'G-0Y0Y3HQQMF',
};

let app;

firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
