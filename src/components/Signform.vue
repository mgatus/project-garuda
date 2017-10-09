<template lang="html">
  <div class="sign-in-container">
    <h3>Sign In</h3>
    <div class="sign-in-form">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" v-model="emailm" placeholder="e.g. alexsmith@gmail.com">
        </div>
      </div>

      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" type="password" v-model="passwordm" placeholder="Password">
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button v-on:click="signIn" class="button is-primary">Sign in</button>
          <router-link to="/signup" class="button">Sign Up Here!</router-link>
          <button v-on:click="backToHome" class="button is-primary">Go Back</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import firebaseui from 'firebaseui'
export default {
  name: 'SignIn',
  data: function() {
    return {
      emailm: '',
      passwordm: ''
    }
  },
  methods: {
      signIn: function() {
        //let ui = new firebaseui.auth.AuthUI(firebase.auth());
        firebase.auth().signInWithEmailAndPassword(this.emailm, this.passwordm).then(
          (user) => {
            this.$router.replace('/success')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        );
      },
      backToHome: function() {
        this.$router.go(0)
        this.$router.push('/auth')
      }
    }
}
</script>

<style scoped lang="sass">
  .sign-in-container
    display: flex
    align-items: center
    justify-content: center
    height: 100vh
    flex-direction: column
</style>
