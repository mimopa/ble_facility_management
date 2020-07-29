<template>
  <v-layout justify-center>
    <v-card flat class="ma-15 text-xs-center">
      <v-card-title class="headline">
        <v-layout justify-center>
          <p class="text-md-center">ログイン</p>
        </v-layout>
      </v-card-title>
      <v-container>
        <div id="firebaseui-auth-container"></div>
      </v-container>
    </v-card>
  </v-layout>
</template>
<script>
import 'firebaseui/dist/firebaseui.css';
// import firebase from 'firebase/app';
import * as firebase from 'firebase/app';
// import firebaseui from 'firebaseui-ja';
import * as firebaseui from 'firebaseui';
import 'firebase/auth';

export default {
  mounted() {
    console.log('Login_mounted');
    var vm = this;
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', {
      callbacks: {
        uiShown: function() {
          console.log('uiShown');
        },
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          console.log('signInSuccessWithAuthResult', authResult, redirectUrl);

          var isNewUser = authResult.additionalUserInfo.isNewUser;
          var displayName = authResult.user.displayName;
          var photoURL = authResult.user.photoURL;

          // SNSログイン＆で登録済みであればスキップ
          if (displayName != 'ゲスト' && !isNewUser) {
            return true;
          }

          switch (authResult.additionalUserInfo.providerId) {
            case firebase.auth.GoogleAuthProvider.PROVIDER_ID:
              displayName = authResult.additionalUserInfo.profile.name;
              photoURL = authResult.additionalUserInfo.profile.picture;
              break;
            case firebase.auth.FacebookAuthProvider.PROVIDER_ID:
              displayName = authResult.additionalUserInfo.profile.name;
              photoURL = authResult.additionalUserInfo.profile.picture.data.url;
              break;
            case firebase.auth.TwitterAuthProvider.PROVIDER_ID:
              displayName = authResult.additionalUserInfo.profile.name;
              photoURL =
                authResult.additionalUserInfo.profile.profile_image_url;
              break;
            case firebase.auth.GithubAuthProvider.PROVIDER_ID:
              displayName = authResult.additionalUserInfo.profile.name;
              photoURL = authResult.additionalUserInfo.profile.avatar_url;
              break;
            default:
              displayName = 'ゲスト';
              photoURL = '';
              break;
          }

          var user = {
            displayName: displayName,
            photoURL: photoURL,
          };

          firebase
            .auth()
            .currentUser.updateProfile(user)
            .then((res) => {
              console.log('Auth登録完了', res);
              alert('ログインしました。');
              vm.$router.go();
            });
        },
        signInFailure: function(error) {
          console.log('signInFailure', error);
          alert(error.message);
          vm.$router.go();
        },
      },
      autoUpgradeAnonymousUsers: true,
      signInFlow: 'redirect',
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
      ],
    });
  },
};
</script>
