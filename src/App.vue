<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="sass">
$mainColor: rgb(1, 209, 177)
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50


.sign-options
  background: url("./assets/bg.jpg")
  background-size: cover
  color: #fff

nav[role="navigation"]
  position: absolute
  top: 0
  bottom: 0
  left: 0
a
  color: $mainColor

.sign-in-form
  max-width: 360px
  margin: 0 auto
  border: 1px solid #e0e0e0
  padding: 30px

.navbar-item img
  width: 100px

.navbar
  box-shadow: 0px 0px 6px #e6e6e6
  border-bottom: 1px solid #e0e0e0
  border-right: 1px solid #e0e0e0
  position: sticky
  background: #fbfbfb
  a
    color: $mainColor
    font-size: 0.9rem
    font-weight: 700
.button
  background-color: $mainColor !important
  color: #fff !important
  border: none
  box-shadow: none
img.navbar-item
  width: 68px !important
  height: 50px !important
  border-radius: 50%
.logo
  width: 48px !important
  max-height: initial !important
.contents
  margin-top: 0px
  ul
    li
      display: inline-block
      margin: 0 0.1%
      padding: 8px
      width: 15%
      min-height: 200px
.keep
  border-right: 1px solid #e0e0e0
  padding: 2%
  box-shadow: 0px 0px 6px #e6e6e6
  height: 100vh
  .group-field
    position: fixed
    width: 13.5%
.card
  input
    border: none
    border-bottom: 1px solid #e0e0e0
    width: 99%
  textarea
    width: 99%
    border: none
    border-bottom: 1px solid #e0e0e0
</style>
