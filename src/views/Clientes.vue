<template>
<div>
    <div class="modal fade" id="listClientModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
            <div class="modal-content" style="background-color: #151414; color: white;">
                <div class="modal-header">
                    <span 
                        class="modal-title" 
                        id="staticBackdropLabel"
                        title="Clients">
                        <i class="fa-solid fa-user" style="font-size: 1.8rem"></i>
                    </span>
                    <span 
                        data-bs-toggle="modal"
                        data-bs-target="#clienteModal"
                        class="options-button"
                        title="Register client">
                        <i class="fa-solid fa-plus"></i>
                    </span>
                    <span
                        class="options-button"
                        title="Refresh"
                        v-on:click="getAll()">
                        <i class="fa-solid fa-arrows-rotate"></i>
                    </span>
                    <span 
                        data-bs-dismiss="modal"
                        class="options-button"
                        title="Close"
                        v-on:click="() => this.clientes = []">
                        <i class="fa-solid fa-xmark"></i>
                    </span>
                </div>
                <div class="modal-body" style="padding: 0;">
                    <Spinner v-if="this.showLoading"/>
                    <table class="table table-borderless table-dark" :key="componentKey" v-if="!this.showLoading">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Contact</th>
                                <th scope="col" class="text-center">Situation</th>
                                <th scope="col" class="text-center">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="cliente in clientes" :key="cliente.id" :class="{ 'line-through' : cliente.situacao == 'DEACTIVADED'}">
                                <th scope="row">{{cliente.id}}</th>
                                <td>{{cliente.nome}}</td>
                                <td>{{cliente.contato}}</td>
                                <td class="text-center">
                                    <span v-if="cliente.situacao == 'DEACTIVADED'" class="badge badge-pill badge-danger">{{cliente.situacao}}</span>
                                    <span v-if="cliente.hasReportsActives == true" class="badge badge-pill badge-warning" style="color: black">Have active reports</span>
                                </td>
                                <td class="options" v-show="cliente.situacao != 'DEACTIVADED'">
                                    <span
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
            </div>
        </div>
    </div>
    <ModalClient />
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
            eventBus.$emit('sendClient', cliente);
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
