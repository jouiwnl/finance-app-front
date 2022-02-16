<template>
<div>
    <div class="modal fade" id="listPartnerModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
            <div class="modal-content" style="background-color: #151414; color: white;">
                <div class="modal-header">
                    <span 
                        class="modal-title" 
                        id="staticBackdropLabel"
                        title="Partners">
                        <i class="fa-solid fa-handshake" style="font-size: 1.8rem"></i>
                    </span>
                    <span 
                        data-bs-toggle="modal"
                        data-bs-target="#partnerModal"
                        class="options-button"
                        title="Register partner">
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
                        v-on:click="() => this.partners = []">
                        <i class="fa-solid fa-xmark"></i>
                    </span>
                </div>
                <div class="modal-body" style="padding: 0;">
                    <Spinner v-if="this.showLoading"/>
                    <table class="table table-borderless" style="background-color: #343a40; color: white;" :key="componentKey" v-if="!this.showLoading">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">E-mail</th>
                                <th scope="col" class="text-center">Situation</th>
                                <th scope="col" class="text-center">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="partner in partners" :key="partner.id" :class="{ 'line-through' : partner.situacao == 'DEACTIVADED'}">
                                <th scope="row">{{partner.id}}</th>
                                <td>{{partner.nome}}</td>
                                <td>{{partner.email}}</td>
                                <td class="text-center">
                                    <span v-if="partner.situacao == 'DEACTIVADED'" class="badge badge-pill badge-secondary">{{partner.situacao}}</span>
                                    <span v-if="partner.hasReportsActive == true" class="badge badge-pill badge-warning" style="color: black;">Have active reports</span>
                                </td>
                                <td class="options">
                                    <span v-show="partner.situacao != 'DEACTIVADED'"
                                        class="options-button"
                                        data-bs-toggle="modal" 
                                        data-bs-target="#partnerModal"
                                        v-on:click="enviaInfoPartner(partner)">
                                        <i class="fa-solid fa-pen"></i>
                                    </span>
                                    <span v-show="partner.situacao != 'DEACTIVADED'"
                                        class="options-button"
                                        v-on:click="inactive(partner.id)"
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
    <ModalPartner />
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
        ModalPartner,
    },
    data() {
        return {
            partners : [],
            componentKey: 0,
            showLoading: false,
        }
    },
    async created() {
        eventBus.$on('recordSaved', () => {
            this.getAll()
        });
    },
    methods: {
        getAll() {
            this.showLoading = true;
            PartnerService.findAll()
            .then((response) => {
                this.partners = response.data;
                this.componentKey++;
            }).finally(() => {
                this.showLoading = false;
            }).catch(err => {
                eventBus.$emit('operationFailed','An error occurred to get api. Please, try again later.')
            });
        },

        inactive(idPartner) {
            if (confirm("Remove register? Will be deactivaded all reports for this partner (This action can't be undone)")) {
                return PartnerService.inactive(idPartner)
                .then(() => {
                    eventBus.$emit('operationSuccess', 'Register inactivaded!')
                });
            }
            return;
        },

        enviaInfoPartner(partner) {        
            eventBus.$emit('sendPartner', partner);
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
