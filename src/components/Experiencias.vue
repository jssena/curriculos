<template>
<div>
  <div 
    v-for="(item, index) in formulario.experiencias"
    :key="index"
  class='row wrap justify-start items-start content-start '> 
    <div class="row q-pa-sm col-xs-11 col-sm-11 col-md-11">
       <div class="q-pa-sm col-xs-12 col-sm-12 col-md-4">
        <p>Este é o seu emprego atual? Se não,<br/>
           informe o ano de saída da empresa.</p>
        <q-btn-toggle
          v-model="item.atual"
          rounded
          push
          glossy
          color="grey-2"
          text-color="primary"
          toggle-color="secondary"
          :options="[
            {label: 'Sim', value: '1'},
            {label: 'Não', value: '0'},
          ]"
        />
      </div>
      <div class="q-pa-sm col-xs-12 col-sm-12 col-md-4">
        <q-input
          filled
          type="text"
          v-model="item.empresa"
          label="Empresa *"
          reactive-rules
          :rules="[$rules.required('Campo obrigatório')]"
        />
      </div>
      <div class="q-pa-sm col-xs-12 col-sm-12 col-md-4">
        <q-input
          filled
          type="text"
          v-model="item.cargo"
          label="Cargo *"
          reactive-rules
          :rules="[$rules.required('Campo obrigatório')]"

        />
      </div>
      
      <div class="q-pa-sm col-xs-12 col-sm-12 col-md-4">
       <q-input
          filled
          type="text"
          v-model="item.responsabilidades"
          label="Principais tarefas/ responsabilidades *"
          :rules="[$rules.required('Campo obrigatório')]"
          reactive-rules

        />
      </div>
      <div class="q-pa-sm col-xs-12 col-sm-12 col-md-4">
       <q-input
          filled
          type="text"
           mask="##/####"
          v-model="item.anoEntrada"
          label="Ano de entrada da empresa (mm/aaaa) *"
          :rules="[$rules.required('Campo obrigatório')]"
          reactive-rules
        />
      </div>
      <div class="q-pa-sm col-xs-12 col-sm-12 col-md-4">
       <q-input
          filled
          type="text"
          mask="##/####"
          v-model="item.anoSaida"
          label="Ano de saída da empresa (mm/aaaa) *"
          :rules="item.atual == '1' ? [] : [$rules.required('Campo obrigatório')]"
          reactive-rules
          :disable="item.atual =='1' ? true:false"
        />
      </div>
     
      <div class="q-pa-sm col-xs-12 col-sm-12 col-md-12">
       <q-input
          filled
          type="textarea"
          v-model="item.comente"
          label="Comente sua experiência na empresa"
          reactive-rules
        />
      </div>
    </div>
    <q-separator vertical /> 
    <q-btn round color="negative" :disabled="index == 0" class="self-center  q-ml-md"  icon="remove"   @click="remove(item.id,item.order)" />

  </div>
</div>
</template>
<style lang="scss">
 
</style>
<script>
export default {
  name: 'experiencias',
   props: {
    formulario: Object
  },
  methods:{
    remove(id,order) {
      this.$emit('remove','experiencias',id,order);
    }
  }
   
}
</script>
