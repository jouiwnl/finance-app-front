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
        <a class="fa-solid fa-handshake"
          data-bs-toggle="modal" 
          data-bs-target="#listPartnerModal"
        ></a>
    </li>
    <li class="menu-item" title="Clients">
        <a
          class="fa-solid fa-user" 
          data-bs-toggle="modal" 
          data-bs-target="#listClientModal"/>
    </li>
    <Clientes />
    <Partners />
  </ul>
</nav>
</template>

<script>
import Clientes from '../views/Clientes.vue';
import Partners from '../views/Partners.vue';
import './styles.css';

export default {
    name: 'Menu',
    components: {
        Clientes,
        Partners
    }
}

</script>


<style scoped>

</style>
