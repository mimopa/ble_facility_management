<template>
  <v-container>
    <div>
      <v-btn @click="logout">LOGOUT</v-btn>
    </div>
    <div id="firebaseui-auth-container"></div>
  </v-container>
</template>

<script>
import 'firebaseui/dist/firebaseui.css';
import * as firebase from 'firebase/app';
// import * as firebaseui from 'firebaseui';
import 'firebase/auth';

export default {
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => console.log('Sign out.'));
    },
  },
};
</script>
