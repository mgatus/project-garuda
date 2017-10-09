<template>
  <div class="sign-up">
    <p>Let's create a new account !</p>
    <input type="text" class="input" v-model="email" placeholder="Email"><br>
    <input type="password" class="input" v-model="password" placeholder="Password"><br>
    <button class="button" v-on:click="signUp">Sign Up</button><br>
    <span>or go back to <a @click="backToHome">login</a>.</span>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import {config} from '../helpers/firebaseConfig';
  export default {
    name: 'signUp',
    data: function() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signUp: function() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.$router.replace('success')
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

  .sign-up
    max-width: 360px
    margin: 0 auto
    padding: 30px
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    height: 100vh

</style>
