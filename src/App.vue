<template>
  <div id="app" class="wrapper">
    <Menu />
  </div>
  
</template>

<script>
  import Menu from './components/Menu.vue'

  export default {
    name: 'App',
    components: {
      Menu
    }
  }
</script>


<style>
body {
  overflow: hidden;
  background: #E6E6FA;
  background: linear-gradient(to right, #292929, #131313)
}
</style>
