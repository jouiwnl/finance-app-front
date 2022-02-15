<template>
<div class="modal fade" id="partnerModal" tabindex="-2" style="z-index: 2000" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content" style="background-color: #272727; color: white; z-index: 999;">
      <div class="modal-header">
        <h5 class="modal-title" id="labelPartner">{{ agencia.id ? 'Editing' : 'Registering'}} partner <span v-if="agencia.id" class="badge badge-secondary">{{ agencia.id }}</span></h5>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="name" class="col-form-label">Name</label>
            <input type="text" class="form-control" id="name" v-model="agencia.nome">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button 
            type="button" 
            class="btn btn-secondary"
            v-on:click="closeModal()">
            Close
        </button>
        <button 
            type="button" 
            class="btn btn-dark" 
            v-on:click="salvar(agencia); closeModal()">
            Save
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import PartnerService from '../services/PartnerService';
import { eventBus } from '../main'
    export default {
        name: 'ModalPartner',
        data() {
            eventBus.$on('sendPartner', (partner) => {
              this.agencia = partner;
            });

            return {
                agencia: {}
            } 
        },
        methods: {
            salvar(agenciaForSave) {
                this.agencia = {nome: agenciaForSave.nome, ssn: agenciaForSave.ssn, contato: agenciaForSave.contato}

                if (agenciaForSave.id) {
                    return PartnerService.update(this.agencia, agenciaForSave.id).then(() => {
                        eventBus.$emit('recordSaved');
                        alert('Registro salvo!')
                    });
                }

                return PartnerService.create(this.agencia).then(() => {
                    eventBus.$emit('recordSaved');
                    alert('Registro salvo!')
                });
            },

            closeModal() {
              $('#partnerModal').modal('hide');
              this.agencia = {};
            }
        },
    }
</script>

<style scoped>

</style>
