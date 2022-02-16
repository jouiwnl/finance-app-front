<template>

</template>

<script>
import { eventBus } from '../main'
    export default {
        name: 'ToastSuccess',
        created() {
            eventBus.$on('operationSuccess', (message) => {
                tata.success('Success!', message, {
                    position: 'br',
                    duration: 3000,
                    onclose: eventBus.$emit('recordSaved')
                })
            });
        }
    }
</script>

<style scoped>

</style>