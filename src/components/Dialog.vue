<template>
    <div class="dialog">
        <button
            class="btn btn-dark"
            @click="showDialog()">
            {{ visibleDialog ? 'Close dialog' : 'Open dialog' }}
        </button>
        <div 
            class="form-wrapper"
            v-show="visibleDialog">
            <form>
                <input class="input-form" v-model="dialog.CEO" id="ceo-name" type="text" name="CEO" placeholder="Enter CEO name..."><br>
                <input class="input-form" v-model="dialog.INN" id="inn" type="text" name="INN" placeholder="Enter INN..."><br>  
                <input class="input-form" v-model="dialog.name" id="company-name" type="text" placeholder="Enter company name..."><br>
            </form>          
            <div>
                <button
                    class="btn btn-danger"
                    @click="addCompany()">
                    Add company
                </button>
            </div>
        </div>
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
    .dialog {
        text-align: center;
        padding-top: 30px;
    }

    .form-wrapper {
    }

    .input-form {
        margin: 10px;
        border-radius: 3px;
        border: none;
        border: 1px solid gray;
    }

</style>
