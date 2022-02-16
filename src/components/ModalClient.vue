<template>
<div class="modal fade" data-bs-backdrop="static" id="clienteModal" tabindex="-1" style="z-index: 1101" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content" style="background-color: #272727; color: white;">
      <div class="modal-header">
        <h5 class="modal-title" id="labelClient">{{ client.id ? 'Editing' : 'Registering'}} client <span v-if="client.id" class="badge badge-secondary">{{ client.id }}</span></h5>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="name" class="col-form-label">Name</label>
            <input type="text" class="form-control" id="name" v-model="client.nome">
          </div>
          <div class="form-group">
            <label for="SSN" class="col-form-label" title="Social Security Number">SSN</label>
            <input type="text" class="form-control" id="name" maxlength="9" v-model="client.ssn">
          </div>
          <div class="form-group">
            <label for="contato" class="col-form-label" title="Contact (Cellphone or E-mail)">Contact</label>
            <input type="text" class="form-control" id="contato" v-model="client.contato">
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
            v-on:click="salvar(client); closeModal()">
            Save
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import ClientService from '../services/ClienteService';
import { eventBus } from '../main'
    export default {
        name: 'ModalClient',
        data() {
            eventBus.$on('sendClient', (client) => {
              this.client = client;
            });

            return {
                client: {}
            } 
        },
        methods: {
            salvar(clientForSave) {
                var client = {
                  id: clientForSave.id, 
                  nome: clientForSave.nome, 
                  ssn: clientForSave.ssn, 
                  contato: clientForSave.contato
                }

                if (this.hasAllAtributtes(client) || !client.id) {
                    if (clientForSave.id) {
                        return ClientService.update(clientForSave, clientForSave.id)
                        .then(() => {
                            eventBus.$emit('recordSaved');
                            eventBus.$emit('operationSuccess', 'Edited with success!');
                            this.closeModal();
                        });
                    }

                    return ClientService.create(clientForSave)
                    .then(() => {
                        eventBus.$emit('recordSaved');
                        eventBus.$emit('operationSuccess', 'Registered with success!');
                        this.closeModal();
                    });
                }

                return eventBus.$emit('operationFailed', "Please fill all fields!");
            },

            closeModal() {
              $('#clienteModal').modal('hide');
              this.client = {};             
            },

            hasAllAtributtes(obj) {
              return !Object.values(obj).some(v => v === null || v === '' || v === undefined);
            }
        }
    }
</script>

<style scoped>

</style>
