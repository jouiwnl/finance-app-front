<template>
<div class="modal fade" data-bs-backdrop="static" id="clienteModal" tabindex="-1" style="z-index: 1101" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content" style="background-color: #272727; color: white;">
      <div class="modal-header">
        <h5 class="modal-title" id="labelClient">{{ cliente.id ? 'Editing' : 'Registering'}} client <span v-if="cliente.id" class="badge badge-secondary">{{ cliente.id }}</span></h5>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="name" class="col-form-label">Name</label>
            <input type="text" class="form-control" id="name" v-model="cliente.nome">
          </div>
          <div class="form-group">
            <label for="SSN" class="col-form-label" title="Social Security Number">SSN</label>
            <input type="text" class="form-control" id="name" maxlength="9" v-model="cliente.ssn">
          </div>
          <div class="form-group">
            <label for="contato" class="col-form-label" title="Contact (Cellphone or E-mail)">Contact</label>
            <input type="text" class="form-control" id="contato" v-model="cliente.contato">
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
            v-on:click="salvar(cliente); closeModal()">
            Save
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import ClienteService from '../services/ClienteService';
import { eventBus } from '../main'
    export default {
        name: 'ModalClient',
        data() {
            eventBus.$on('sendClient', (cliente) => {
              this.cliente = cliente;
            });

            return {
                cliente: {}
            } 
        },
        methods: {
            salvar(clienteForSave) {
                var cliente = {nome: clienteForSave.nome, ssn: clienteForSave.ssn, contato: clienteForSave.contato}
                this.cliente = cliente;
                if (!this.hasAllAtributtes(cliente)) {
                    if (clienteForSave.id) {
                        return ClienteService.update(clienteForSave, clienteForSave.id).then(() => {
                            eventBus.$emit('recordSaved');
                            eventBus.$emit('operationSuccess', 'Edited with success!');
                        });
                    }

                    return ClienteService.create(clienteForSave).then(() => {
                        eventBus.$emit('recordSaved');
                        eventBus.$emit('operationSuccess', 'Registered with success!');
                    });
                }

                return eventBus.$emit('operationFailed', "Please fill all fields!");
            },

            closeModal(event) {
              if (event) {
                $('#clienteModal').modal('hide');
                this.cliente = {};
              } else if (!this.hasAllAtributtes(this.cliente)) {
                    $('#clienteModal').modal('hide');
                    this.cliente = {};
                }              
            },

            hasAllAtributtes(obj) {
              return Object.values(obj).some(v => v === null || v === '' || v === undefined);
            }
        }
    }
</script>

<style scoped>

</style>
