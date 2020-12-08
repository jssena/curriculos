<template>
 
   <q-option-group
      v-model="vaga"
      :options="vagas"
      color="green"
      type="checkbox"
    />
</template>
<style lang="scss">
 
</style>
<script>

export default {
   
  name: 'vaga',
  props: {
  vaga: String,
},
  methods:{
    remove() {
        this.$emit('remove');
    }
  }
   
}
</script>
