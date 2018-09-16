<template>
    <div class="mx-auto info" style="width: 500px;">
        <div>
            <paginate :per=2 name="companies" :list="companies" class="paginate-list">
                <table class="table table-bordered">
                    <thead class="thead-dark">
                        <th v-on:click="sortName" scope="col">Company Name</th>
                        <th v-on:click="sortCeo" scope="col">CEO</th>
                        <th v-on:click="sortINN" scope="col">INN</th> 
                        <th>Edit</th> 
                        <th>Action</th>      
                    </thead>
                    <tr scope="row" v-for="(company, index) in paginated('companies')" :key="index">
                        <td v-for="(property, index) in company" :key="index">
                            <span v-if="!company.editable"> {{ property }} </span>
                            <input v-bind:id="company.name + '-' + index" v-if="company.editable" v-bind:value="property"/>
                        </td>
                        <td>
                            <svg 
                                v-on:click="removeCompany(index)"
                                width="20" 
                                height="20" 
                                viewBox="0 0 24 24">
                                <path d="M0 10h24v4h-24z"/>
                            </svg>
                            <svg 
                                v-if="!company.editable"
                                v-on:click="editCompany(index)"
                                width="20" 
                                height="20" 
                                viewBox="0 0 24 24">
                                <path d="M7.127 22.564l-7.126 1.436 1.438-7.125 5.688 5.689zm-4.274-7.104l5.688 5.689 15.46-15.46-5.689-5.689-15.459 15.46z"/>
                            </svg>
                            <svg  
                                v-if="company.editable"
                                v-on:click="editCompany(index)()"
                                width="20" 
                                height="20" 
                                viewBox="0 0 24 24">
                                <path d="M7.127 22.564l-7.126 1.436 1.438-7.125 5.688 5.689zm-4.274-7.104l5.688 5.689 15.46-15.46-5.689-5.689-15.459 15.46z"/>
                            </svg>
                        </td>
                    </tr>
                </table>
            </paginate>
            <paginate-links for="companies" :show-step-links="true"></paginate-links>
        </div>

        <Dialog 
            @showDialog="toggle"   
            @addCompany="addCompany"   
            v-bind:dialog="dialog"
            v-bind:visibleDialog="visibleDialog"
        />
    </div>
</template>

<script> 
    import Storage from 'vue-ls';
    import Vue from 'vue';
    import 'bootstrap/dist/css/bootstrap.css';
    import 'bootstrap-vue/dist/bootstrap-vue.css';
    import Dialog from './Dialog';
    
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
                        this.companies.sort(function(a, b) {
                            return a.INN > b.INN ? 1 : -1;
                        });
                        break;
                    case true:
                        this.companies.sort(function(a, b) {
                            return a.INN < b.INN ? 1 : -1;
                        });
                        break;
                }
                this.INNsorted = !this.INNsorted;
                console.log(this.INNsorted);
            },
            toggle() {
                this.visibleDialog = !this.visibleDialog;
            }
        },
        components: {
            Dialog
        },
        watch: {
            companies: function(val) {
                Vue.ls.set('companies', val)
            }   
        },
        created: function() {
            this.companies = Vue.ls.get('companies', 0);
            var _this = this;
            Vue.ls.on('companies', function(val) {

            });
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

    input {
        width: 25px;
    }

    svg {
        cursor: pointer;
    }
</style>





