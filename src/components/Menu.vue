<template>
<nav class="menu">  
  <input checked="checked" class="menu-toggler" type="checkbox">
  <label for="menu-toggler"></label>
  <ul>
    <li class="menu-item" title="Dashboard">
        <a class="fa-solid fa-table-columns"></a>
    </li>
    <li class="menu-item" title="Reports">
        <a class="fa-solid fa-file-invoice-dollar"></a>
    </li>
    <li class="menu-item" title="Partners">
        <a class="fa-solid fa-handshake"></a>
    </li>
    <li class="menu-item" title="Clients">
        <a
          class="fa-solid fa-user" 
          data-bs-toggle="modal" 
          data-bs-target="#listClientModal"/>
    </li>
    <Clientes />
  </ul>
</nav>
</template>

<script>
import Clientes from '../views/Clientes.vue';
import './styles.css';

export default {
    name: 'Menu',
    components: {
        Clientes
    }
}

</script>


<style scoped>

</style>
