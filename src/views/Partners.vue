<template>
<div>
    <div class="modal fade" id="listPartnerModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
            <div class="modal-content" style="background-color: #151414; color: white;">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Partners</h5>
                    <button 
                        data-bs-dismiss="modal"
                        type="button" 
                        class="btn btn-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#partnerModal"
                        v-on:click="() => this.infoPartner = {}">
                        + Partner
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
                    <table class="table table-bordered table-dark" :key="componentKey" v-if="!this.showLoading">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col" class="text-center">Situation</th>
                                <th scope="col" class="text-center">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="agencia in partners" :key="agencia.id" :class="{ 'line-through' : agencia.situacao == 'DEACTIVADED'}">
                                <th scope="row">{{agencia.id}}</th>
                                <td>{{agencia.nome}}</td>
                                <td class="text-center">
                                    <span v-if="agencia.situacao == 'DEACTIVADED'" class="badge badge-pill badge-secondary">{{agencia.situacao}}</span>
                                    <span v-if="agencia.hasReportsActive == true" class="badge badge-pill badge-warning" style="color: black;">Have active reports</span>
                                </td>
                                <td class="options" v-show="agencia.situacao != 'DEACTIVADED'">
                                    <span
                                        data-bs-dismiss="modal"
                                        class="options-button"
                                        data-bs-toggle="modal" 
                                        data-bs-target="#partnerModal"
                                        v-on:click="enviaInfoCliente(agencia)">
                                        <i class="fa-solid fa-pen"></i>
                                    </span>
                                    <span 
                                        class="options-button"
                                        v-on:click="inactive(agencia.id)"
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
    <ModalPartner :agencia="infoPartner"/>
</div>
    
</template>

<script>
import PartnerService from '../services/PartnerService';
import ModalPartner from '../components/ModalPartner.vue';
import Spinner from '../components/Spinner.vue';
import { eventBus } from '../main';

export default {
    name: "Partners",
    components: { 
        Spinner,
        ModalPartner
    },
    data() {
        eventBus.$on('recordSaved', () => {
            this.getAll()
        });

        return {
            partners : [],
            infoPartner: {},
            componentKey: 0,
            showLoading: false,
        }
    },
    methods: {
        getAll() {
            this.showLoading = true;
            PartnerService.findAll().then((response) => {
                this.partners = response.data;
                this.componentKey++;
            }).finally(() => {
                this.showLoading = false;
            }).catch(err => {
                alert('An error occurred to get api. Please, try again later.')
            });
        },

        inactive(idAgencia) {
            if (confirm("Remove register? Will be deactivaded all reports for this partner (This action can't be undone)")) {
                return PartnerService.inactive(idAgencia).then(() => {
                    alert('Register inactivaded!')
                });
            }
            return;
        },

        enviaInfoCliente(agencia) {        
            this.infoPartner = agencia;
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
