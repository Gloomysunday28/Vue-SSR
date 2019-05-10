<template>
  <div>
    SSR服务端渲染
    <!-- <img :src="require('../1.JPG')"/>  -->
    <router-link to="/home">Home</router-link>
    <router-link to="/foo">Foo</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
  div {
    color: red;
  }
</style>
