import Vue from 'vue';
import VueRouter from 'vue-router';
import Facility from '../views/Facility.vue';
import SignIn from '../views/SignIn.vue';
import SignOut from '../views/SignOut.vue';
// import firebase from '../plugins/firebase';
import 'firebase/auth';
import * as firebase from 'firebase/app';

Vue.use(VueRouter);

// TODO: path: '/'をSignIn.vueに振り向ける
const routes = [
  {
    path: '/',
    name: 'Facility',
    component: Facility,
    meta: { requiredAuth: true },
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    meta: { requiredAuth: false },
  },
  {
    path: '/signout',
    name: 'SignOut',
    component: SignOut,
    meta: { requiredAuth: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiredAuth)) {
    if (firebase.auth().currentUser) {
      console.log(firebase.auth().currentUser);
      next();
      return;
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        next();
      } else {
        next({ name: 'SignIn' });
      }
    });
  }
  next();
});

export default router;
