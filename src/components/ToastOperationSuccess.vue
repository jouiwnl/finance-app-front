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
                    duration: 3000
                })
            });
        }
    }
</script>

<style scoped>

</style>