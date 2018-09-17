<template>
    <div class="dialog">
        <button
            class="btn btn-dark"
            @click="showDialog()">
            {{ visibleDialog ? 'Close dialog' : 'Open dialog' }}
        </button>
        <div v-show="visibleDialog">
            <form>
                <VueSuggestions v-model="dialog.name" id="company-name" v-bind:dialog="dialog"/>
                <!-- <input v-model="dialog.name" id="company-name" type="text" placeholder="Enter company name..."><br> -->
                <input v-model="dialog.CEO" id="ceo-name" type="text" name="CEO" placeholder="Enter CEO name..."><br>
                <input v-model="dialog.INN" id="inn" type="text" name="INN" placeholder="Enter INN..."><br>    
            </form>          
            <div>
                <button
                    class="btn btn-dark"
                    @click="addCompany()">
                    Add company
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import VueSuggestions from './VueSuggestions';

    export default {
        props: ['dialog','visibleDialog'],
        methods: {
            showDialog() {
                this.$emit('showDialog');
            },
            addCompany() {
                this.$emit('addCompany');
            }
        },
        components: {
            VueSuggestions
        }
    }
</script>

<style>
    .dialog {
        float: right;
        margin-top: 50px;
    }

</style>
