<template>
  <div id="app">
    VueSSR
    <router-link to="/">Home</router-link>
    <router-link to="/foo">Foo</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style scoped>
 #app {
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 18px;
 }
</style>
