<template>
  <div id="app" class="wrapper">
    <Menu />
    <ToastFailed />
    <ToastSuccess />
  </div>
  
</template>

<script>
  import Menu from './components/Menu.vue'
  import ToastSuccess from './components/ToastOperationSuccess.vue';
  import ToastFailed from './components/ToastOperationFailed.vue';

  export default {
    name: 'App',
    components: {
      Menu,
      ToastSuccess,
      ToastFailed
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
