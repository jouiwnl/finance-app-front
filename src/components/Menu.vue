<template>
<nav class="menu">  
  <input checked="checked" class="menu-toggler" type="checkbox">
  <label for="menu-toggler"></label>
  <ul>
    <li class="menu-item" title="Dashboard">
        <a class="fa-solid fa-table-columns black-icon"
           data-bs-toggle="modal" 
           data-bs-target="#dashboardModal">
        </a>
    </li>
    <li class="menu-item" title="Reports">
        <a class="fa-solid fa-file-invoice-dollar black-icon"></a>
    </li>
    <li class="menu-item" title="Partners">
        <a class="fa-solid fa-handshake black-icon"
          data-bs-toggle="modal" 
          data-bs-target="#listPartnerModal"
        ></a>
    </li>
    <li class="menu-item" title="Clients">
        <a
          class="fa-solid fa-user black-icon" 
          data-bs-toggle="modal" 
          data-bs-target="#listClientModal"/>
    </li>
    <li class="menu-item" title="Search reports">
        <a
          class="fa-solid fa-magnifying-glass" 
          data-bs-toggle="modal" 
          data-bs-target="#finder"/>
    </li>
    <li class="menu-item" title="Close menu">
        <a class="fa-solid fa-xmark" />
    </li>
    <Clientes />
    <Partners />
    <Dashboard />
    <Finder />
  </ul>
</nav>
</template>

<script>
import Clientes from '../views/Clientes.vue';
import Partners from '../views/Partners.vue';
import Dashboard from '../views/DashBoard.vue';
import Finder from '../views/Finder.vue';
import './styles.css';

export default {
    name: 'Menu',
    components: {
        Clientes,
        Partners,
        Dashboard,
        Finder
    }
}

</script>


<style scoped>
  .black-icon {
    color: #e0e0e0;
  }
</style>
