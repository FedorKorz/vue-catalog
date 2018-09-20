<template>
  <div class="suggestion">
    <VueSuggestions
        :model.sync="city"
        :coordinates.sync="coordinates"
        :placeholder="'Начните вводить'"
        :options="suggestionOptions">
    </VueSuggestions>
  </div>
</template>
 
<script>
  import VueSuggestions from 'vue-suggestions';
 
  export default {
    props: ['dialog'],
    data() {
      return {
        city: '',
        coordinates: {
          latitude: '',
          longitude: ''
        },
        suggestionOptions: {
          chosenName: [],
          token: 'b4390c81d1a08f730d018daf7d62ca6b08376ec2',
          type: "NAME",
          scrollOnFocus: false,
          triggerSelectOnBlur: false,
          triggerSelectOnEnter: false,
          addon: 'none',
          onSelect (suggestion) {
            alert(suggestion.value);
            console.log(this);
          }
        },
      }
    },
    components: { VueSuggestions }
  }
</script> 

<style>
  .suggestion {
    width: 100px;
  }
  .suggestions-wrapper {
    position: relative;
    margin: 0;
    padding: 0;
    vertical-align: top;
    -webkit-text-size-adjust: 100%;
  }
</style>