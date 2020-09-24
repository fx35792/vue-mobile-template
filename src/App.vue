<template>
  <div id="app">
   <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  created(){
    console.log(process.env.VUE_APP_NODE_ENV, '-', process.env.VUE_APP_VERSION)
  }
}
</script>

<style>

</style>
