<template>
<div class="modal fade" id="partnerModal" data-bs-backdrop="static" tabindex="-2" style="z-index: 1101" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

            <label for="email" class="col-form-label">E-mail</label>
            <input type="text" class="form-control" id="email" v-model="agencia.email">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button 
            type="button" 
            class="btn btn-secondary"
            v-on:click="closeModal($event)">
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
                console.log(agenciaForSave)
                var agencia = { nome: agenciaForSave.nome, email: agenciaForSave.email } ;
                this.agencia = agencia;
                if (!this.hasAllAtributtes(agencia)) {
                  if (agenciaForSave.id) {
                      return PartnerService.update(agencia, agenciaForSave.id).then(() => {
                          eventBus.$emit('recordSaved');
                          eventBus.$emit('operationSuccess', 'Edited with success!');
                      });
                  }

                  return PartnerService.create(agencia).then(() => {
                      eventBus.$emit('recordSaved');
                      eventBus.$emit('operationSuccess', 'Registered with success!');
                  });
                }
                
                return eventBus.$emit('operationFailed', 'Please fill all fields!'); 
            },

            closeModal(event) {
              if (event) {
                $('#partnerModal').modal('hide');
                this.agencia = {};
              } else if (!this.hasAllAtributtes(this.agencia)) {
                $('#partnerModal').modal('hide');
                this.agencia = {};
              }
            },

            hasAllAtributtes(obj) {
              console.log(obj)
              return Object.values(obj).some(v => v === null || v === '' || v === undefined);
            }
        },
    }
</script>

<style scoped>

</style>
