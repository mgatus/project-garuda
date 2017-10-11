<template lang="html">
  <div class="sign-options">
    <h1>Sign in options</h1>
    <router-link to="/manualsignin" class="button">Manual Sign In</router-link>
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

<style lang="sass" scoped>
  .sign-options
    display: flex
    align-items: center
    justify-content: center
    height: 100vh
    flex-direction: column
    
    a
      margin-top: 15px
      min-width: 187px
      box-shadow: 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12), 0 2px 4px -1px rgba(0,0,0,.2)
</style>
