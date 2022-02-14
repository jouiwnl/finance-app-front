<template>
<div>
    <div class="modal fade" id="listClientModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Clients</h5>
                    <button 
                        data-bs-dismiss="modal"
                        type="button" 
                        class="btn btn-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#clienteModal"
                        v-on:click="() => this.infoCliente = {}">
                        + Client
                    </button>
                    <button 
                        type="button" 
                        class="btn btn-secondary"
                        v-on:click="getAll()">
                        <i class="fa-solid fa-arrows-rotate"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <Spinner v-if="this.showLoading"/>
                    <table class="table table-borderless" :key="componentKey" v-if="!this.showLoading">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Contact</th>
                                <th scope="col" class="text-center">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="cliente in clientes" :key="cliente.id" :class="{ 'line-through' : cliente.situacao == 'DEACTIVADED'}">
                                <th scope="row">{{cliente.id}}</th>
                                <td>{{cliente.nome}}</td>
                                <td>{{cliente.contato}}</td>
                                <td class="options" v-if="cliente.situacao != 'DEACTIVADED'">
                                    <span data-bs-dismiss="modal"
                                        class="options-button"
                                        data-bs-toggle="modal" 
                                        data-bs-target="#clienteModal"
                                        v-on:click="enviaInfoCliente(cliente)">
                                        <i class="fa-solid fa-pen"></i>
                                    </span>
                                    <span
                                        class="options-button"
                                        v-on:click="inactive(cliente.id)"
                                        title="Inactive client">
                                        <i class="fa-solid fa-ban" style="color: red;"></i>
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer" style="justify-content: center;">
                    <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-dark btn-sm" data-bs-dismiss="modal">Understood</button>
                </div>
            </div>
        </div>
    </div>
    <ModalClient :cliente="infoCliente"/>
</div>
    
</template>

<script>
import ClienteService from '../services/ClienteService';
import ModalClient from '../components/ModalClient.vue';
import Spinner from '../components/Spinner.vue';
import { eventBus } from '../main';

export default {
    name: "Clientes",
    components: { 
        ModalClient,
        Spinner
    },
    data() {

        eventBus.$on('recordSaved', () => {
            this.getAll()
        });

        return {
            clientes : [],
            infoCliente: {},
            componentKey: 0,
            showLoading: false,
        }
    },
    methods: {
        getAll() {
            this.showLoading = true;
            ClienteService.findAll().then((response) => {
                this.clientes = response.data;
                this.componentKey++;
            }).finally(() => {
                this.showLoading = false;
            }).catch(err => {
                alert('An error occurred to get api. Please, try again later.')
            });
        },

        inactive(idCliente) {
            if (confirm("Remove register? Will be deactivaded all reports for this client (This action can't be undone)")) {
                return ClienteService.inactive(idCliente).then(() => {
                    alert('Register inactivaded!')
                });
            }
            return;
        },

        enviaInfoCliente(cliente) {        
            this.infoCliente = cliente;
        },
    }
}
</script>


<style scoped>
   .options {
       display: flex;
       flex-direction: row;
       justify-content: space-evenly;
   }

   .options-button {
       cursor: pointer;
   }

   .options-button:hover {
       opacity: 0.8;
       transition: all ease 0.3s;
   }

   .line-through {
       text-decoration: line-through;
   }
</style>
