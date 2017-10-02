<template lang="html">
  <div class="sign-options">
    <h1>Sign in options</h1>
    <router-link to="/manualsignin" class="button">Manual Sign In</router-link><br><br>
    <router-link to="/signup" class="button">Sign Up Here!</router-link>
    <div id="firebaseui-auth-container"></div>
  </div>

</template>

<script>
import firebase from 'firebase';
import firebaseui from 'firebaseui'
export default {
  name: 'auth',
  mounted() {
    this.uiAuth()
  },
  methods: {
    uiAuth: function(){
      var uiConfig = {
        signInSuccessUrl: '/success',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
          ]
        };
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start('#firebaseui-auth-container', uiConfig);
    }
  }
}
</script>
