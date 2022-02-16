<template>
<div class="modal fade" id="partnerModal" data-bs-backdrop="static" tabindex="-2" style="z-index: 1101" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content" style="background-color: #272727; color: white; z-index: 999;">
      <div class="modal-header">
        <h5 class="modal-title" id="labelPartner">{{ partner.id ? 'Editing' : 'Registering'}} partner <span v-if="partner.id" class="badge badge-secondary">{{ partner.id }}</span></h5>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="name" class="col-form-label">Name</label>
            <input type="text" class="form-control" id="name" v-model="partner.nome">

            <label for="email" class="col-form-label">E-mail</label>
            <input type="text" class="form-control" id="email" v-model="partner.email">
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
            v-on:click="salvar(partner);">
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
              this.partner = partner;
            });

            return {
                partner: {}
            } 
        },
        methods: {
            salvar(partnerForSave) {
                var partner = { 
                  id: partnerForSave.id , 
                  nome: partnerForSave.nome, 
                  email: partnerForSave.email 
                } ;
                if (this.hasAllAtributtes(partner) || !partner.id) {
                  if (partnerForSave.id) {
                      return PartnerService.update(partner, partnerForSave.id)
                      .then(() => {
                          eventBus.$emit('recordSaved');
                          eventBus.$emit('operationSuccess', 'Edited with success!');
                          this.closeModal();
                      });
                  }

                  return PartnerService.create(partner)
                  .then(() => {
                      eventBus.$emit('recordSaved');
                      eventBus.$emit('operationSuccess', 'Registered with success!');
                      this.closeModal();
                  });
                } 

                return eventBus.$emit('operationFailed', 'Please fill all fields!');
            },

            closeModal() {
              $('#partnerModal').modal('hide');
              this.partner = {};
              eventBus.$emit('recordSaved');
            },

            hasAllAtributtes(obj) {
              return !Object.values(obj).some(v => v === null || v === '' || v === undefined);
            }
        },
    }
</script>

<style scoped>

</style>
