<template>
    <div class="container">
        <div class="table-companies">
            <paginatron @change="updateItems" @next="advanced" @previous="decreased" :items-per-page="4" :items="companies">
                <div slot-scope="{ setPage, nextPage, prevPage, page, pages, hasNextPage, hasPrevPage, nextButtonEvents, prevButtonEvents, nextButtonAttrs, prevButtonAttrs }">
                    <table class="table table-bordered">
                        <thead class="thead-dark">
                            <th class="text-center" v-on:click="sortName" scope="col">Company Name</th>
                            <th v-on:click="sortCeo" scope="col">CEO</th>
                            <th v-on:click="sortINN" scope="col">INN</th> 
                            <th>Edit</th> 
                            <th>Action</th>      
                        </thead>
                        <tr v-for="(item, index) in activeItems" :key="item.INN">
                            <td v-for="(property, index) in item" :key="index">
                                <p v-if="!item.editable"> {{ property }} </p>
                                <input class="form-control" v-bind:id="item.name + '-' + index" v-if="item.editable" v-bind:value="property"/>
                            </td>
                            <td>
                                <button class="btn btn-outline-light" v-on:click="removeCompany(index)">
                                    <DeleteIcon /> 
                                </button>
                                <button class="btn btn-outline-light" v-if="!item.editable" @click="editCompany(index)">
                                    <EditIcon />
                                </button>
                                <button class="btn btn-outline-light" v-if="item.editable" @click="editCompany(index)()">
                                    <EditIcon />
                                </button>   
                            </td>
                        </tr>
                    </table>
                    <div class="paginatron">
                        <button class="btn btn-dark" v-on="prevButtonEvents" v-bind="prevButtonAttrs">Prev</button>
                        <ul class="pagination" v-for="(page, index) in pages" :key="index">
                            <li class="page-link" @click="setPage(index)">{{ page }}</li>
                        </ul>
                        <button class="btn btn-dark" v-on="nextButtonEvents">Next</button>
                    </div>    
                </div>
            </paginatron>    
        </div>
        <div class="paginatron-btns">
            <Dialog 
                @showDialog="toggle"   
                @addCompany="addCompany"   
                v-bind:dialog="dialog"
                v-bind:visibleDialog="visibleDialog"
            />
        </div>
    </div>
</template>

<script> 
    import Vue from 'vue';
    import Storage from 'vue-ls';
    import Dialog from './Dialog';
    import EditIcon from './style/EditIcon';
    import DeleteIcon from './style/DeleteIcon';
    import Paginatron from 'vue-paginatron';
    import 'bootstrap/dist/css/bootstrap.css';
    import 'bootstrap-vue/dist/bootstrap-vue.css';

    Vue.use(Storage); 
    
    export default {    
        props: [],
        methods: {
            addCompany(name) {
                event.preventDefault();
                this.companies.push({ ...this.dialog });
            },
            removeCompany(index) {
                this.companies.splice(index, 1);
            },
            editCompany(index) {
                let self = this;
                this.companies[index].editable = !this.companies[index].editable;
                    return function () {
                        self.companies.splice(index, 1, {
                            name: document.getElementById(`${self.companies[index].name}-name`).value,
                            CEO: document.getElementById(`${self.companies[index].name}-CEO`).value,
                            INN: document.getElementById(`${self.companies[index].name}-INN`).value,
                            editable: false                       
                        });
                    }
                self.companies[index].editable = !self.companies[index].editable;
            },
            sortCeo() {
                this.companies.sort(function(a, b) {
                    return a.CEO > b.CEO ? 1 : -1;
                });    
            },
            sortName() {
                this.companies.sort(function(a, b) {
                    return a.name > b.name ? 1 : -1;
                });
            },
            sortINN() {
                switch(this.INNsorted) {
                    case false:
                        this.companies.sort((a, b) => a.INN > b.INN ? 1 : -1);
                        break;
                    case true:
                        this.companies.sort((a, b) => a.INN < b.INN ? 1 : -1);
                        break;
                }
                this.INNsorted = !this.INNsorted;
            },
            toggle() {
                this.visibleDialog = !this.visibleDialog;
            },
            updateItems(activeItems) {
                this.activeItems = activeItems;
            },
            decreased({ prev, current }) {
                console.log(prev, current);
            },
            advanced({ activeItems, prev, current }) {
                console.log(prev, current);
            }
        },
        components: {
            Dialog,
            DeleteIcon,
            EditIcon,
            Paginatron
        },
        watch: {
            companies: function(val) {
                Vue.ls.set('companies', val, 60 * 60 * 1000);
            }   
        },
        created: function() {
            this.companies = Vue.ls.get('companies');
        }, 
        data() {
            return {
                companies: [
                    {   
                        name: 'Cola',
                        CEO: 'Пупин',
                        INN: 1,
                        editable: false
                    },
                    {   
                        name: 'Pepsi',
                        CEO: 'Kупин',
                        INN: 2,
                        editable: false
                    },
                    {   
                        name: 'Bon Aqua',
                        CEO: 'Мупин',
                        INN: 3,
                        editable: false
                    },
                    {   
                        name: 'Байкал',
                        CEO: 'Зупин',
                        INN: 4,
                        editable: false
                    },
                    {   
                        name: 'Fanta',
                        CEO: 'Тупин',
                        INN: 5,
                        editable: false
                    }
                ],
                dialog: {
                  name: null,
                  CEO: null,
                  INN: null,
                  editable: false 
                },
                editable: false,
                CEOsorted: false,
                INNsorted: false,
                nameSorted: false,
                visibleDialog: false
            }
        }
    };
</script>

<style>
    .table-companies {
        float: left;
    }

    td {
        width: 160px;
        height: 65px;
    }

    .paginatron {
        display: flex;
        justify-content: center;
    }

    table {
        text-align: center;
        font-family: 'Cabin', sans-serif;
    }
    
    th, svg {
        cursor: pointer;
    }

    .page-link {
        margin: 0;
        color: #000;
    }

    .pagination {
        margin-top: 0px;
        margin-bottom: 0px;
    }

</style>




