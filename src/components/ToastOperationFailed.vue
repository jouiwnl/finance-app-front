<template>

</template>

<script>
import { eventBus } from '../main'
    export default {
        name: 'ToastFailed',
        created() {
            eventBus.$on('operationFailed', (message) => {
                tata.error('Failed!', message, {
                    position: 'br',
                    duration: 3000,
                    onClose: eventBus.$emit('recordSaved')
                })
            });
        }
    }
</script>

<style scoped>

</style>