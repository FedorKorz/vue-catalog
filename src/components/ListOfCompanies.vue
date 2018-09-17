<template>
    <div class="container">
        <div class="table-companies">
            <paginate :per=5 name="companies" :list="companies" class="paginate-list">
                <table class="table table-bordered">
                    <thead class="thead-dark">
                        <th class="text-center" v-on:click="sortName" scope="col">Company Name</th>
                        <th v-on:click="sortCeo" scope="col">CEO</th>
                        <th v-on:click="sortINN" scope="col">INN</th> 
                        <th>Edit</th> 
                        <th>Action</th>      
                    </thead>
                    <tr v-for="(company, index) in paginated('companies')" :key="index">
                        <td v-for="(property, index) in company" :key="index">
                            <p v-if="!company.editable"> {{ property }} </p>
                            <input class="form-control" v-bind:id="company.name + '-' + index" v-if="company.editable" v-bind:value="property"/>
                        </td>
                        <td>
                            <div class="btn-group">
                                <button class="btn btn-outline-light" v-on:click="removeCompany(index)">
                                    <DeleteIcon /> 
                                </button>
                                <button class="btn btn-outline-light" v-if="!company.editable" @click="editCompany(index)">
                                    <EditIcon />
                                </button>
                                <button class="btn btn-outline-light" v-if="company.editable" @click="editCompany(index)()">
                                    <EditIcon />
                                </button>        
                            </div>
                        </td>
                    </tr>
                </table>
            </paginate>
            <paginate-links for="companies" :show-step-links="true"></paginate-links>
        </div>
        <div class="dialog">
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
            }
        },
        components: {
            Dialog,
            DeleteIcon,
            EditIcon
        },
        watch: {
            companies: function(val) {
                Vue.ls.set('companies', val)
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
                        INN: 1337,
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
                paginate: ['companies'],
                INNsorted: false,
                nameSorted: false,
                CEOsorted: false,
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

    ul.paginate-links {
        list-style: none;
        text-align: center;
    }

    ul.paginate-links > li {
        display: inline-block;
        padding: 5px 9px;
        margin-right: 4px;
        border-radius: 3px;
        border: solid 1px #32373b;
        background: #3e4347;
        box-shadow: inset 0px 1px 1px rgba(255,255,255, .1), 0px 1px 3px rgba(0,0,0, .1);
        font-size: .875em;
        font-weight: bold;  
        text-decoration: none;
        color: #feffff;
        text-shadow: 0px 1px 0px rgba(0,0,0, .5);
        cursor: pointer;
    }

    ul.paginate-links > li:hover {
        background: #3d4f5d;
        background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#547085), to(#3d4f5d));
        background: -moz-linear-gradient(0% 0% 270deg,#547085, #3d4f5d);
    }
    
    table {
        text-align: center;
        font-family: 'Cabin', sans-serif;
    }
    
    svg {
        cursor: pointer;
    }
</style>





