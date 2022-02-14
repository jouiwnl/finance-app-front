<template>
<div class="modal fade" id="clienteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content" style="background-color: #151414; color: white;">
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
            data-bs-dismiss="modal"
            type="button" 
            class="btn btn-secondary"
            data-bs-target="#listClientModal"
            data-bs-toggle="modal">
            Close
        </button>
        <button 
            data-bs-dismiss="modal"
            type="button" 
            class="btn btn-dark" 
            v-on:click="salvar(cliente)"
            data-bs-target="#listClientModal"
            data-bs-toggle="modal">
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
        props: ["cliente"],
        data() {
            return {
                cliente: this.cliente
            } 
        },
        methods: {
            salvar(clienteForSave) {
                this.cliente = {nome: clienteForSave.nome, ssn: clienteForSave.ssn, contato: clienteForSave.contato}

                if (clienteForSave.id) {
                    return ClienteService.update(this.cliente, clienteForSave.id).then(() => {
                        eventBus.$emit('recordSaved');
                        alert('Registro salvo!')
                    });
                }

                return ClienteService.create(this.cliente).then(() => {
                    eventBus.$emit('recordSaved');
                    alert('Registro salvo!')
                });
            }
        }
    }
</script>

<style scoped>

</style>
