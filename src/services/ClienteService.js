import { http } from './config.js'

export default {
    findAll: () => {
        return http.get(`clientes`)
    },
    findById: (cliente) => {
        return http.get(`clientes/${cliente.id}`)
    },
    create: (cliente) => {
        return http.post('clientes', cliente);
    },
    inactive: (clienteId) => {
        return http.patch(`clientes/${clienteId}/inativar`)
    },
    update: (cliente, clienteId) => {
        return http.put(`clientes/${clienteId}`, cliente)
    }
}