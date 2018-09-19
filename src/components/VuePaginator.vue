<template>
  <div id="app">
    <paginatron @change="updateItems" @next="advanced" @previous="decreased" :items-per-page="2" :items="companies">
      <div slot-scope="{ setPage, nextPage, prevPage, page, pages, hasNextPage, hasPrevPage, nextButtonEvents, prevButtonEvents, nextButtonAttrs, prevButtonAttrs }">
        <thead>
          <th>Company name</th>
          <th>CEO</th>
          <th>INN</th>
        </thead>
        <tr v-for="(property, index) in activeItems" :key="index">
            <td> {{ property.name }} </td>
            <td> {{ property.CEO }} </td>
            <td> {{ property.INN }} </td>
        </tr>
        <button v-on="prevButtonEvents" v-bind="prevButtonAttrs">Prev</button>
        <button v-on="nextButtonEvents">Next</button>
        <div v-for="(page, index) in pages" :key="index">
          <p @click="setPage(index)">{{ page }}</p>
        </div>
      </div>
    </paginatron>
      <Dialog 
        @showDialog="toggle"   
        @addCompany="addCompany"   
        v-bind:dialog="dialog"
        v-bind:visibleDialog="visibleDialog"
      />
  </div>
</template>

<script>

import Paginatron from 'vue-paginatron';
import Dialog from './Dialog';
import EditIcon from './style/EditIcon';
import DeleteIcon from './style/DeleteIcon';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

export default {
  name: 'app',
  components: { 
    Paginatron,
    Dialog
    },
  data() {
    return {
      activeItems: [],
      companies: [
            { 
              name: 'Cola',
              CEO: 'Пупин',
              INN: 228,
              editable: false
            },
            { 
              name: 'Pepsi',
              CEO: 'Лупин',
              INN: 140,
              editable: false
            },
            { 
              name: 'Fanta',
              CEO: 'Юнин',
              INN: 32,
              editable: false
            }
            
      ],
      editable: false,
      INNsorted: false,
      nameSorted: false,
      CEOsorted: false,
      visibleDialog: false
    };
  },
  methods: {
    updateItems(activeItems) {
      this.activeItems = activeItems;
    },
    decreased({ prev, current }) {
      console.log(prev, current);
    },
    advanced({ activeItems, prev, current }) {
      console.log(prev, current);
    },
  },
};
</script>

<style>
    tr {
        border: 1px solid black;
    }

    td {
        border: 1px solid black;
    }
</style>