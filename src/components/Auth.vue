<template lang="html">
  <div class="sign-options">
    <h1>Sign in options</h1>
    <router-link to="/manualsignin" class="button"><i class="fa fa-sign-in" aria-hidden="true"></i> Manual Sign In</router-link><br>
    <router-link to="/signup" class="button"><i class="fa fa-pencil-square" aria-hidden="true"></i> Sign Up Here!</router-link>
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

<style scoped lang="sass">

  .sign-options a.button
    width: 220px
    margin: 0 0 1%
    box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.38)
    .fa
      margin-right: 2px

</style>
