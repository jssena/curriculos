<template>
<div> 
  <div 
    v-for="(item, index) in formulario.idiomas"
    :key="'i'+index"
  class='row wrap justify-start items-start content-start col-md-12'> 
    <div class="row q-pa-sm col-xs-11 col-sm-11 col-md-11">
      
      <div class="q-pa-sm col-xs-12 col-sm-12 col-md-4">
        <q-select 
        filled
        emit-value
        map-options
        v-model="item.idioma"
        :options="optionsIdioma"
        label="Idioma"
        :rules="item.fluencia ? [$rules.required('Campo obrigatório')]:[]"
        lazy-rules
        />
      </div>
      <div class="q-pa-sm col-xs-12 col-sm-12 col-md-4">
        <q-input
          filled
          type="text"
          v-model="item.instituicao"
          label="Instituicao"
          lazy-rules

        />
      </div>
      <div class="q-pa-sm col-xs-12 col-sm-12 col-md-4">
       
        <q-btn-toggle
        v-model="item.fluencia"
        rounded
        push
        glossy
        color="grey-2"
        text-color="primary"
        toggle-color="secondary"
        
        class="q-ma-sm"
        lazy-rules
        :options="[
          {label: 'Básico', value: 'Básico'},
          {label: 'Intermediário', value: 'Intermediário'},
          {label: 'Avançado', value: 'Avançado'},
        ]"
      />
      </div>
    </div>
    <q-separator vertical />
    <q-btn round color="negative" :disabled="index ==0" class="self-center  q-ml-md"  icon="remove"   @click="remove(item.id,item.order)" />
    
  </div>
</div>
</template>
<style lang="scss">
 
</style>
<script>
export default {
  name: 'idioma',
   props: {
    formulario:Object
   
  },
  methods:{
    remove(id,order) {
      this.$emit('remove','idiomas',id,order);
    }
  },
  data () {
    return {
      optionsIdioma:['Inglês','Espanhol'],
    }
  }
}
</script>
