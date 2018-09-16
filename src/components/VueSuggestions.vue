<template>
  <div class="suggestion">
    <VueSuggestions
        :model.sync="city"
        :coordinates.sync="coordinates"
        :placeholder="'Начните вводить'"
        class="form-control"
        :options="suggestionOptions">
    </VueSuggestions>
  </div>
</template>
 
<script>
  import VueSuggestions from 'vue-suggestions';
 
  export default {
    data() {
      return {
        city: '',
        coordinates: {
          latitude: '',
          longitude: ''
        },
        suggestionOptions: {
          token: 'b4390c81d1a08f730d018daf7d62ca6b08376ec2',
          type: "NAME",
          scrollOnFocus: false,
          triggerSelectOnBlur: false,
          triggerSelectOnEnter: false,
          addon: 'none',
          onSelect (suggestion) {
            
          }
        },
      }
    },
    components: { VueSuggestions }
  }
  // b4390c81d1a08f730d018daf7d62ca6b08376ec2
</script> 

<style>
  .suggestion {
    width: 100px;
  }
</style>