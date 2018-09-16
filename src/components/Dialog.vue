<template>
    <div>
        <div v-show="visibleDialog">
            <form>
                <input v-model="dialog.name" id="company-name" type="text" placeholder="Enter company name..."><br>
                <input v-model="dialog.CEO" id="ceo-name" type="text" name="CEO" placeholder="Enter CEO name..."><br>
                <input v-model="dialog.INN" id="inn" type="text" name="INN" placeholder="Enter INN..."><br>    
            </form>            
            <div>
                <button
                    @click="addCompany()">
                    Add company from child
                </button>
            </div>
        </div>
        <button
            @click="showDialog()">
            Show popup from child
        </button>
    </div>
</template>

<script>
    export default {
        props: ['dialog','visibleDialog'],
        methods: {
            showDialog() {
                this.$emit('showDialog');
            },
            addCompany() {
                this.$emit('addCompany');
            }
        }
    }
</script>

<style>
</style>
