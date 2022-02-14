import { http } from './config.js'

export default {
    findAll: () => {
        return http.get(`agencias`)
    },
    findById: (agencia) => {
        return http.get(`agencias/${agencia.id}`)
    },
    create: (agencia) => {
        return http.post('agencias', agencia);
    },
    inactive: (agenciaId) => {
        return http.patch(`agencias/${agenciaId}/inativar`)
    },
    update: (agencia, agenciaId) => {
        return http.put(`agencias/${agenciaId}`, agencia)
    }
}