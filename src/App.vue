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
$mainColor: #df1b33
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
a
  color: $mainColor

.navbar-item img
  width: 100px

.navbar
  box-shadow: 0px 0px 6px #e6e6e6
  border-bottom: 1px solid #e0e0e0
  position: sticky
  background: $mainColor
  a
    color: #e2e2e2
    font-size: 0.9rem
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
  margin-top: 30px
  ul
    li
      display: inline-block
      margin: 0 1%
      padding: 8px
      width: 40%
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
