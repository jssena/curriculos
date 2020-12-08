<template>
<div class="row">
<q-list class=" col"  bordered>
  <q-item>
    <q-item-section>
      Como ficou sabendo da vaga?*
    </q-item-section>
  </q-item>
  <q-item>
    <q-item-section>
      <q-radio v-model="formulario.pesquisa1" val="facebook" label="Facebook" :rules="[$rules.required('Campo obrigatório')]" />
      <q-radio v-model="formulario.pesquisa1" val="whatsapp" label="Whatsapp" />
      <q-radio v-model="formulario.pesquisa1" val="instagram" label="Instagram" />
      <q-radio v-model="formulario.pesquisa1" val="linkedin" label="Linkedin" />
      <q-radio v-model="formulario.pesquisa1" val="indicação" label="Indicação" />
       <q-input
          filled
          type="text"
          v-model="formulario.pesquisa1_texto1"
          :disable="formulario.pesquisa1 == 'indicação' ? false : true"
          label="Nome da indicação*"
          reactive-rules
          :rules="formulario.pesquisa1 == 'indicação' ? [$rules.required('Campo obrigatório')] : []"
        />
      <q-radio v-model="formulario.pesquisa1" val="alguém da empresa" label="Alguém da empresa" />
      <q-input
          filled
          type="text"
          v-model="formulario.pesquisa1_texto2"
          :disable="formulario.pesquisa1 == 'alguém da empresa' ? false : true"
          label="Nome da pessoa*"
          reactive-rules
          :rules="formulario.pesquisa1 == 'alguém da empresa' ? [$rules.required('Campo obrigatório')] : []"
          
        />
      <q-radio v-model="formulario.pesquisa1" val="outros" label="Outros" />
    </q-item-section>
  </q-item>
  <q-separator />
  <q-item>
    <q-item-section>
      Fuma?
    </q-item-section>
  </q-item>
   <q-item>
   <q-btn-toggle
      v-model="formulario.pesquisa5"
      rounded
      push
      glossy
      color="grey-2"
      text-color="primary"
      toggle-color="secondary"
      :options="[
        {label: 'Sim', value: 1},
        {label: 'Não', value: 0},
      ]"
    />
  </q-item>
  <q-separator />
  <q-item>
    <q-item-section>
      Pratica exercícios físicos regularmente?
    </q-item-section>
  </q-item>
   <q-item>
   <q-btn-toggle
      v-model="formulario.pesquisa6"
      rounded
      push
      glossy
      color="grey-2"
      text-color="primary"
      toggle-color="secondary"
      :options="[
        {label: 'Sim', value: 1},
        {label: 'Não', value: 0},
      ]"
    />
  </q-item>
  
  
  
</q-list>
<q-list  class=" col" bordered>
  <q-item>
    <q-item-section>
      Está disposto a mudar de cidade?
    </q-item-section>
  </q-item>
  <q-item>
   <q-btn-toggle
      v-model="formulario.pesquisa2"
      rounded
      push
      glossy
      color="grey-2"
      text-color="primary"
      toggle-color="secondary"
      :options="[
        {label: 'Sim', value: 1},
        {label: 'Não', value: 0},
      ]"
    />
  </q-item>
  <q-item>
    <q-item-section>
      Sendo necessário mudar de cidade, tem recursos próprios para isso?
    </q-item-section>
  </q-item>
  <q-item>
   <q-btn-toggle
      v-model="formulario.pesquisa3"
      rounded
      push
      glossy
      color="grey-2"
      text-color="primary"
      toggle-color="secondary"
      :options="[
        {label: 'Sim', value: 1},
        {label: 'Não', value: 0},
      ]"
    />
  </q-item>
  <q-item>
    <q-item-section>
      Tem amigos ou familiares residindo em Blumenau ou em suas proximidades?
    </q-item-section>
  </q-item>
  
  <q-item>
   <q-btn-toggle
      v-model="formulario.pesquisa4"
      rounded
      push
      glossy
      color="grey-2"
      text-color="primary"
      toggle-color="secondary"
      :options="[
        {label: 'Sim', value: 1},
        {label: 'Não', value: 0},
      ]"
    />
  </q-item>
  <q-separator />
  <q-item>
    <q-item-section>
      <p>
      Teve contato direto com o <q-badge   class="bg-primary text-white q-px-sm" >Corona vírus <q-icon name="warning" color="white" class="q-ml-xs" /> <q-tooltip  content-class="bg-primary text-body2">
          marque sim, 
          caso você tenha testado positivo para Covid-19 e também caso alguém de seu contato diário<br/> (mesma residência ou local de trabalho) tenha testado positivo
        </q-tooltip> </q-badge> durante a pandemia?</p>
       
    </q-item-section>
  </q-item>
  <q-item>
   <q-btn-toggle
      v-model="formulario.pesquisa7"
      rounded
      push
      glossy
      color="grey-2"
      text-color="primary"
      toggle-color="secondary"
      :options="[
        {label: 'Sim', value: 1},
        {label: 'Não', value: 0},
      ]"
    />
  </q-item>
 
</q-list>
</div>
</template>
<style lang="scss">
 
</style>
<script>

export default {
   
  name: 'pesquisa',
  props: {
    formulario: Object
  } 
   
}
</script>
