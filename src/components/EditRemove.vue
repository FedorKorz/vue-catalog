<template>
    <div>

    </div>
</template>

<script>
    export default {
        props: ['editable'],
        methods: {
            removeCompany() {
                this.$emit('removeCompany');
            },
            editCompany() {
                this.$emit('editCompany');
            }
        }
    }
</script>

<style>
    
</style>
