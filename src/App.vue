<template>
  <div>
    <ListOfCompanies />
    <VueSuggestions />
  </div>
</template>

<script>
  import ListOfCompanies from './components/ListOfCompanies';
  import VueSuggestions from './components/VueSuggestions';

  export default {
    components: {
      ListOfCompanies,
      VueSuggestions
    },
    data: function(){
      return  {

      }
    },
    methods: {

    }
  }
</script>



<style>

</style>