<template>
  <div >
     <div class="full-width  row ">
    <div class="q-pa-sm col-xs-12 col-sm-12 col-md-7">
      <p>Formação acadêmica</p>
      <q-btn-toggle
        v-model="formulario.formacao"
        rounded
        push
        glossy
        emit-value
        color="grey-2"
        text-color="primary"
        toggle-color="secondary"
        class="q-ma-sm"
        :options="[
          {label: 'Primeiro grau', value: 'Primeiro grau'},
          {label: 'Segundo grau', value: 'Segundo grau'},
          {label: 'Superior', value: 'Superior'},
          {label: 'Pós', value: 'Pós'},
          {label: 'MBA', value: 'MBA'}
        ]"
      />
    </div>
    <div class="q-pa-sm col-xs-12 col-sm-12 col-md-5">
    <p>Completo?</p>
      <q-btn-toggle
        v-model="formulario.completo"
        :disabled="!formulario.formacao"
        rounded
        push
        glossy
        emit-value
        color="grey-2"
        text-color="primary"
        toggle-color="secondary"
        class="q-ma-sm"
        :options="[
          {label: 'Sim', value: 1},
          {label: 'Não', value: 0}
        ]"
      />
    </div>
     </div>
  </div>
</template>
<style lang="scss">
 
</style>
<script>
export default {
  name: 'Formacao',
   props: {
    formulario: {
      type: Object
    }
  }
}
</script>
