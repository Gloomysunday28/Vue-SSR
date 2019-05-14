<template>
  <div id="app">
    App
    <router-link to="/">Home</router-link>
    <router-link to="/foo">Foo</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>
