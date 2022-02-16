<template>
<div>
    <div class="modal fade" id="dashboardModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content" style="background-color: #151414; color: white;">
                <div class="modal-header">
                    <span 
                        class="modal-title" 
                        id="staticBackdropLabel"
                        title="Dashboard">
                        <i class="fa-solid fa-table-columns" style="font-size: 1.8rem"></i>
                    </span>
                    <span 
                        data-bs-dismiss="modal"
                        data-bs-toggle="modal"
                        data-bs-target="#clienteModal"
                        class="options-button"
                        title="Register client"
                        v-on:click="() => this.infoCliente = {}">
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
                        title="Close">
                        <i class="fa-solid fa-xmark"></i>
                    </span>
                </div>
                <div class="modal-body">
                    <Spinner v-if="this.showLoading"/>
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
                eventBus.$emit('operationFailed','An error occurred to get api. Please, try again later.')
            });
        },

        inactive(idAgencia) {
            if (confirm("Remove register? Will be deactivaded all reports for this partner (This action can't be undone)")) {
                return PartnerService.inactive(idAgencia).then(() => {
                    eventBus.$emit('operationSuccess', 'Register inactivaded!')
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
