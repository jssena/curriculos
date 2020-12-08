<template>
  <div> 
    <div v-for="(item, index) in formulario.formacoes"
        :key="index"
         class='row wrap justify-start items-start content-start '
      > 
      <div class="row q-pa-sm col-xs-11 col-sm-11 col-md-11">
        
        <div class="q-pa-sm col-xs-12 col-sm-12 col-md-4" >
        
          <q-input
            filled
            type="text"
            v-model="item.instituicao"
            label="Instituição"
            lazy-rules

          />
        </div>
        <div class="q-pa-sm col-xs-12 col-sm-12 col-md-4">
          <q-input
            filled
            type="text"
            v-model="item.curso"
            label="Curso"
            lazy-rules
          
          />
        </div>
        <div class="q-pa-sm col-xs-12 col-sm-12 col-md-4">
          <q-input
            filled
            type="text"
            v-model="item.anoConclusao"
            label="Ano de conclusão"
            lazy-rules
          
          />
        </div>
        <div class="q-pa-sm col-xs-12 col-sm-12 col-md-12">
          <q-input
            type="textarea"
            label="Habilidades desenvolvidas no curso"
            filled
            v-model="item.habilidades"
          />
        </div>
        
      </div>
      <q-separator vertical />
      <q-btn round color="negative" :disabled="index ==0" class="self-center  q-ml-md"  icon="remove"   @click="remove(item.id,item.order)" />
       <q-separator  />
    </div>
  </div>
</template>
<style lang="scss">
 
</style>
<script>
export default {
  name: 'detalhamentoFormacao',
   props: {
    formulario: Object
  },
  methods:{
    
    remove(id,order) {
        this.$emit('remove','formacoes',id,order);
    }
  }
  
}
</script>
