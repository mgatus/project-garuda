<template>
<div>

  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="http://bulma.io">
          <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
        </a>

      <button class="button navbar-burger">
          <span></span>
          <span></span>
          <span></span>
        </button>
    </div>
    <div class="navbar-menu" id="navMenu">
      <div class="navbar-end">
        <a class="navbar-item is-hidden-desktop-only" href="about">About</a>
        <a class="navbar-item is-hidden-desktop-only" @click='logOut'>Log out</a>
        <img class="navbar-item is-hidden-desktop-only" :src="photo"> <br>
      </div>
    </div>
  </nav>

  <!-- <p>{{name}}</p>
    <p>{{email}}</p>
    <p>{{userId}}</p> -->
  <!-- <pre>{{user}}</pre> -->
  <div class="form-the-keep">
    <div class="keep">
      <label>Title</label>
      <input type="text" v-model="title">
      <br>
      <label>Add here</label>
      <textarea v-model="content" rows="8" cols="80"></textarea>
      <br>
      <button type="button" name="button" @click="submitContent">Submit</button>
    </div>
    <div class="contents">
      <ul>
        <li v-for="content of contents" v-bind:key="content['.key']">
          <div class="noedit" v-if="!content.edit">
            <strong>{{content.title}}</strong><br>{{content.content}}
            <br>
            <button type="button" name="button" @click="deleteContent(content['.key'])">Delete</button>
            <button type="button" name="button" @click="editContent(content['.key'])">Edit</button>
          </div>
          <div class="editing" v-else>
            <input type="text" name="" value="" v-model="content.title"><br>
            <textarea name="name" rows="8" cols="80" v-model="content.content"></textarea><br>
            <button type="button" name="button" @click="saveEdit(content)">Save</button>
            <button type="button" name="button" @click="cancelEdit(content['.key'])">Cancel</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import vueFire from 'vuefire'
import firebase from 'firebase'
import {
  titleRef
} from './../helpers/firebaseConfig'

Vue.use(vueFire)

console.log(titleRef)

export default {
  data() {
    return {
      photo: '',
      userId: '',
      name: '',
      email: '',
      user: {},
      title: '',
      content: ''
    }
  },
  firebase: {
    contents: titleRef
  },
  created() {
    var vm = this
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        vm.user = user
        vm.name = vm.user.displayName
        vm.email = vm.user.email
        vm.photo = vm.user.photoURL
        vm.userId = vm.user.uid
      }
    })
  },
  methods: {
    logOut() {
      firebase.auth().signOut();
    },
    submitContent() {
      titleRef.push({
        title: this.title,
        content: this.content,
        edit: false
      })
      this.title = ""
      this.content = ""
    },
    deleteContent(key) {
      titleRef.child(key).remove()
    },
    editContent(key) {
      titleRef.child(key).update({
        edit: true
      })
    },
    saveEdit(updates) {
      const key = updates['.key']
      titleRef.child(key).set({
        title: updates.title,
        content: updates.content,
        edit: false
      })
    },
    cancelEdit(key) {
      titleRef.child(key).update({
        edit: false
      })
    }
  }
};
</script>

<style lang="sass">
  img.navbar-item
    width: 68px !important
    height: 50px !important
  .contents
    margin-top: 30px
    ul
      li
        display: inline-block
        margin: 1% 2%
        border: 1px solid #666666
        padding: 8px
        width: 23.3333%
        min-height: 200px
</style>
