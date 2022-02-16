<template>
<div>
    <div class="modal fade" id="finder" data-bs-backdrop="static" style="z-index: 1100;" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content" style="background-color: #151414; color: white;">
                <div class="button-header" style="display: flex; justify-content: flex-end; padding-right: 30px; padding-top: 10px;">
                    <span 
                        id="teste"
                        data-bs-dismiss="modal"
                        class="options-button"
                        title="Close"
                        v-on:click="cleanModal()">
                        <i class="fa-solid fa-xmark"></i>
                    </span>
                </div>
                <div class="modal-header" style="padding-top: 0;">
                    <div>
                        <label for="partner" class="col-form-label">Partner</label>
                        <select name="partners" class="custom-select" id="partner" v-model="finder.partner">
                            <option selected>
                                All
                            </option>
                            <option v-bind:value="partner.nome" v-for="partner in partners" :key="partner.id">
                                {{partner.nome}}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label for="situation" class="col-form-label">Situation</label>
                        <select name="situation" class="custom-select" id="Situation" v-model="finder.situation">
                            <option selected>All</option>
                            <option value="PAID">PAID</option>
                            <option value="UNPAID">UNPAID</option>
                        </select>
                    </div>

                    <div>
                        <label for="startDate" class="col-form-label">Start Date</label>
                        <input required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" v-model="finder.startDate" type="date" class="form-control"/>
                    </div>

                    <div>
                        <label for="endDate" class="col-form-label">End Date</label>
                        <input v-model="finder.endDate" type="date" class="form-control"/>
                    </div>
                    <button type="button" 
                            style="margin-top: 37px;"
                            class="btn btn-primary" 
                            v-on:click="executeSearch(finder)">
                        Search
                    </button>
                </div>
                <div class="modal-body" style="padding: 0;">
                    <Spinner v-if="this.showLoading"/>
                    <table class="table table-dark" :key="componentKey" v-if="!this.showLoading">
                        <thead>
                            <tr>
                                <th scope="col" class="text-center">Partner</th>
                                <th scope="col" class="text-center">Stock</th>
                                <th scope="col" class="text-center">#</th>
                                <th scope="col" class="text-center">Days</th>
                                <th scope="col" class="text-center">Due date</th>
                                <th scope="col" class="text-center">Interest</th>
                                <th scope="col" class="text-center">Principal</th>
                                <th scope="col" class="text-center">Payment</th>
                                <th scope="col" class="text-center">Principal payment</th>
                                <th scope="col" class="text-center">Principal balance</th>
                                <th scope="col" class="text-center">Status</th>
                                <th scope="col" class="text-center">Paid date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="parcela in parcelas" :key="parcela.id" style="text-align: center;">
                                <td>
                                    <small>
                                        <a data-bs-target="#partnerModal"
                                            data-bs-toggle="modal"
                                            style="text-decoration: none;" 
                                            href=""
                                            v-on:click="enviaInfoParcela(parcela)">
                                            {{parcela.contrato.banco.nome}}
                                        </a>
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        <a style="text-decoration: none;" href="">
                                            {{parcela.contrato.id}}
                                        </a>
                                    </small>
                                </td>
                                <td>{{parcela.nroParcela}}/{{parcela.contrato.qtdeParcelas}}</td>
                                <td>{{parcela.diasProximaParcela}}</td>
                                <td>{{parcela.dataPagamento}}</td>
                                <td>juros</td>
                                <td>{{parcela.contrato.totalPagar}}</td>
                                <td>{{parcela.vlParcela}}</td>
                                <td>{{parcela.vlParcela}}</td>
                                <td>{{parcela.contrato.totalPagar}}</td>
                                <td>{{parcela.situacao}}</td>
                                <td>
                                    {{parcela.dataPagamentoPaga}}
                                    <span v-if="parcela.situacao != 'PAID'">
                                        <input type="checkbox">
                                        Pay
                                    </span>
                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <h5 v-if="this.showNotFound" class="text-center">
                       No loans were found with the selected filters.
                    </h5>
                </div>
            </div>
        </div>
    </div>
    <ModalPartner />
</div>
    
</template>

<script>
import PartnerService from '../services/PartnerService';
import ParcelaService from '../services/ParcelaService';
import ModalPartner from '../components/ModalPartner.vue';
import Spinner from '../components/Spinner.vue';
import moment from 'moment';
import { eventBus } from '../main';

export default {
    name: "Finder",
    components: { 
        Spinner,
        ModalPartner
    },
    mounted() {
        this.getAllPartners()
    },
    data() {

        eventBus.$on('recordSaved', () => {
            this.getAll()
        });

        return {
            parcelas : [],
            partners: [],
            finder: { 
                startDate: moment().format('YYYY-MM-DD'), 
                endDate: moment().format('YYYY-MM-DD'),
                situation: "All",
                partner: "All"
            },
            componentKey: 0,
            showLoading: false,
            showNotFound: false,
            infoPartnerInFinder: {},
            infoReport: {}
        }
    },
    methods: {
        getAllPartners() {
            PartnerService.findAll().then((response) => {
                this.partners = response.data;
            }).catch(err => {
                eventBus.$emit('operationFailed','An error occurred to get api. Please, try again later.')
            });
        },
        executeSearch(finder) {
            this.showLoading = true;
            ParcelaService.buscaAvancada(
                finder.partner, 
                finder.situation, 
                finder.startDate, 
                finder.endDate
            ).then((response) => {
                this.parcelas = response.data;
                this.componentKey++;
            }).finally(() => {
                this.showLoading = false;
                if (this.parcelas.length == 0) {
                    this.showNotFound = true;
                } else {
                    this.showNotFound = false;
                }
            }).catch(err => {
                eventBus.$emit('operationFailed','An error occurred to get api. Please, try again later.')
            });   
        },

        enviaInfoParcela(parcela) {
            eventBus.$emit('sendPartner', parcela.contrato.banco);
        },

        cleanModal() {
            this.parcelas = [];
            this.finder = { 
                startDate: moment().format('YYYY-MM-DD'), 
                endDate: moment().format('YYYY-MM-DD'),
                situation: "All",
                partner: "All"
            };
        }
    }
}
</script>


<style scoped>
    .options-button {
       cursor: pointer;
   }

   .options-button:hover {
       opacity: 0.8;
       transition: all ease 0.3s;
   }
</style>
