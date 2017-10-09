<template>
<div class="columns">
  <div class="loading" v-if="loadingActive">
    <div class="load-status">
      <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
<span class="sr-only">Uploading...</span>
    </div>
  </div>


  <div v-bind:class="{ modalOn: activeModal }" class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="column add-form is-12">
        <div class="group-field">
          <div class="field">
            <label class="label">Add Keep</label>
            <div class="control">
              <input class="input" type="text" placeholder="Add Keep Title" v-model="title">
            </div>
          </div>

          <div class="field">
            <label class="label">Take note</label>
            <div class="control">
              <textarea class="textarea" placeholder="Take note" v-model="content"></textarea>
            </div>
          </div>

          <div class="field">
            <label class="label">Upload Image</label>
            <div class="control">
              <input type="file" name="" value="" id="file" @change="onFileChange">
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-primary" @click="submitContent">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="modalOff"></button>
  </div>

  <nav class="navbar column is-2" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="http://bulma.io">
        <img class="logo" src="https://pmcdeadline2.files.wordpress.com/2016/07/logo-tv-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
      </a>
      <button class="button navbar-burger">
          <span></span>
          <span></span>
          <span></span>
        </button>
    </div>
    <div class="navbar-menu" id="navMenu">
      <div class="navbar-end">
        <a class="navbar-item is-hidden-desktop-only" href="/about">About</a>
        <a class="navbar-item is-hidden-desktop-only" @click='logOut'>Log out</a>
        <img class="navbar-item is-hidden-desktop-only" :src="photo">
      </div>
    </div>
  </nav>

  <!-- <p>{{name}}</p>
    <p>{{email}}</p>
    <p>{{userId}}</p> -->
  <!-- <pre>{{user}}</pre> -->
  <div class="column is-10">
    <div class="columns is-multiline form-the-keep">
      <div class="column add-form is-2">
        <button type="button" name="button" @click="modalOn">Kamehame haaaa!</button>
      </div>
      <div class="contents column is-12">
        <ul v-masonry transition-duration="0.3s" item-selector=".item">
          <li v-masonry-tile class="item" v-for="content of reverseit" v-bind:key="content['.key']">
            <div class="noedit" v-if="!content.edit">
              <div class="card">
                <header class="card-header">

                  <p class="card-header-title">
                    {{content.title}}
                  </p>
                </header>
                <div class="card-content">
                  <div class="content">
                    <img v-bind:src="content.imgUrl" alt="">
                    {{content.content}}
                  </div>
                </div>
                <footer class="card-footer">
                  <a href="#" class="card-footer-item" @click="editContent(content['.key'])">Edit</a>
                  <a href="#" class="card-footer-item" @click="deleteContent(content['.key'])">Delete</a>
                </footer>
              </div>
            </div>
            <div class="editing" v-else>
              <div class="card">
                <header class="card-header">
                  <p class="card-header-title">
                    <input type="text" name="" value="" v-model="content.title">
                  </p>
                </header>
                <div class="card-content">
                  <div class="content">
                    <textarea name="name" v-model="content.content"></textarea>
                  </div>
                </div>
                <footer class="card-footer">
                  <a href="#" class="card-footer-item" @click="saveEdit(content)">Save</a>
                  <a href="#" class="card-footer-item" @click="cancelEdit(content['.key'])">Cancel</a>
                </footer>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import vueFire from 'vuefire'
import firebase from 'firebase'
import {
  VueMasonryPlugin
} from 'vue-masonry'
import {
  titleRef
} from './../helpers/firebaseConfig'

Vue.use(vueFire)
Vue.use(VueMasonryPlugin)

export default {
  data() {
    return {
      photo: '',
      userId: '',
      name: '',
      email: '',
      user: {},
      title: '',
      content: '',
      image: '',
      h: '',
      file: '',
      activeModal: false,
      loadingActive: false
    }
  },
  firebase: {
    contents: titleRef
  },
  watch() {
    this.aa()
  },
  computed: {
    reverseit: function() {
      return this.contents.reverse()
    }
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
      firebase.auth().signOut().then(function() {
        location.reload()
      }).catch(function(error) {
        // An error happened.
      });

    },
    submitContent() {
      var self = this
      if (this.title === '' || this.content === '') {
        alert('Add something dude!')
        return false
      } else {
        var filename = this.image.name
        if(filename != null) {
          var storageRef = firebase.storage().ref('/keepImages/' + filename)
          var uploadTask = storageRef.put(this.image)
          var stRef = storageRef.child('/keepImages/' + filename)
          var titleA = this.title
          var contentA = this.content


          uploadTask.on('state_changed', function(snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            document.querySelectorAll('.load-status').innerHTML = 'Upload is ' + progress + '% done';

            //console.log('Upload is ' + progress + '% done');
            self.loadingActive = true;
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          }, function(error) {
            alert("Error on Uploading image")
            self.loadingActive = true;
          }, function() {
            var downloadURL = uploadTask.snapshot.downloadURL;
            titleRef.push({
              title: titleA,
              content: contentA,
              imgUrl: downloadURL,
              edit: false
            })
            self.loadingActive = false;
          })
        } else {
          self.loadingActive = false;
          titleRef.push({
            title: self.title,
            content: self.content,
            imgUrl: 'Null',
            edit: false
          })

        }

        this.title = ""
        this.content = ""
        this.image = ""
        this.$redrawVueMasonry()
        document.getElementById('file').value = ''
        this.activeModal = false

      }
    },
    deleteContent(key) {
      titleRef.child(key).remove()
      this.$redrawVueMasonry()
    },
    editContent(key) {
      titleRef.child(key).update({
        edit: true
      })
      this.$redrawVueMasonry()
    },
    saveEdit(updates) {
      const key = updates['.key']
      titleRef.child(key).set({
        title: updates.title,
        content: updates.content,
        edit: false
      })
      this.$redrawVueMasonry()
    },
    cancelEdit(key) {
      titleRef.child(key).update({
        edit: false
      })
    },
    onFileChange(e) {
      this.image = e.target.files[0] || e.dataTransfer.files[0];
      //console.log(this.image.name)
    },
    modalOn() {
      this.activeModal = true
    },
    modalOff() {
      this.activeModal = false
    },
    aa() {
      return this.contents.reverse()
    }
  }
}
</script>

<style lang="sass" scoped>
  .add-form
    width: 50%
    margin: 2% auto
    background: #fff
    padding: 15px
    border-radius: 3px

  .modalOn
    display: flex

  .loading
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
    background: rgba(0, 0, 0, 0.48)
    z-index: 9
    color: #fff
    display: flex
    align-items: center
    justify-content: center

  nav.navbar.column.is-2
    height: 100vh

</style>
