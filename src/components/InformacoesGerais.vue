<template>
  <div class='row wrap'>
      <div class="q-pa-sm col-xs-12 col-sm-12  col-md-2 relative-position">
        <croppa
          ref="myCroppaRef"
          :width="150"
          :height="200"
          :quality="2"
          :accept="'image/jpeg'"
          @file-choose="selectPhoto = false"
          :placeholder="'Selecione a imagem'"
        >
           <img slot="initial" :src="formulario.foto" />
        </croppa>
        <q-btn 
          round
          icon="save"
          @click="generateImage()"
          class="absolute-top-left"
          :disabled="selectPhoto" 
          color="positive"   />
      </div>
      <div class="row col-md-10">
        <div class="q-pa-sm col-xs-12 col-sm-12 col-md-12">
          <q-input
            filled
            ref="nome"
            v-model="formulario.nome"
            label="Nome Completo *"
            reactive-rules
            :rules="[$rules.required('Campo obrigatório')]"
          />
        </div>
        <div class="q-pa-sm col-xs-12 col-sm-12  col-md-4"> 
          <q-input
            filled
            ref="nacionalidade"
            type="text"
            v-model="formulario.nacionalidade"
            reactive-rules
            label="Nacionalidade *"
            :rules="[$rules.required('Campo obrigatório')]"
          />
        </div>
        <div class="q-pa-sm col-xs-12 col-sm-12  col-md-4"> 
          <q-input
            filled
            ref="dataNascimento"
            type="text"
            mask="##/##/####"
            reactive-rules
            v-model="formulario.dataNascimento"
            label="Data de nascimento *"
            :rules="[$rules.required('Campo obrigatório')]"
          />
        </div>
        <div class="q-pa-sm col-xs-12 col-sm-12 col-md-4">
          <q-select 
            filled
            ref="estadoCivil"
            v-model="formulario.estadoCivil"
            :options="optionsEstadoCivil"
            label="Estado Civil"
            reactive-rules
            :rules="[$rules.required('Campo obrigatório')]"
           
            
          />
        </div>
      </div>
      
   
    
    <div class="q-pa-sm col-xs-12 col-sm-12 col-md-7">
        <q-input
          ref="endereco"
          filled
          type="text"
          v-model="formulario.endereco"
          label="Endereço Completo *"
          :rules="[$rules.required('Campo obrigatório')]"
         
        />
      </div>
      <div class="q-pa-sm col-xs-12 col-sm-12 col-md-5">
        <q-input
          filled
          ref="cidade"
          type="text"
          v-model="formulario.cidade"
          label="Cidade/UF *"
          :rules="[$rules.required('Campo obrigatório')]"
         
        />
      </div>
    <div class="q-pa-sm col-md-5">
      <p>Filhos?</p>
      <q-btn-toggle
        ref="filhos"
        v-model="formulario.filhos"
        rounded
        push
        glossy
        class="q-ma-sm"
        color="grey-2"
        text-color="primary"
        toggle-color="secondary"
        :rules="[$rules.required('Campo obrigatório')]"
        :options="[
          {label: 'Sim', value: 1},
          {label: 'Não', value: 0}
        ]"
      />
      <q-btn-toggle
        ref="filhosQuantos"
        v-model="formulario.filhosQuantos"
        :disabled="!formulario.filhos"
        rounded
        push
        glossy
        class="q-ma-sm"
        color="grey-2"
        text-color="primary"
        toggle-color="secondary"
        :rules="[$rules.required('Campo obrigatório')]"
        :options="[
          {label: 'Um', value: 1},
          {label: 'Dois', value: 2},
          {label: 'Três', value: 3},
          {label: 'Quatro', value: 4},
          {label: 'Cinco', value: 5}
        ]"
      />
      </div>
      <div class="q-pa-sm col-md-2">
      <p>CNH?</p>
      <q-btn-toggle
        ref="cnh"
        v-model="formulario.cnh"
        rounded
        push
        glossy
        class="q-ma-sm"
        color="grey-2"
        text-color="primary"
        toggle-color="secondary"
        :rules="[$rules.required('Campo obrigatório')]"
        :options="[
          {label: 'Sim', value: 1},
          {label: 'Não', value: 0}
        ]"
      />
    </div>
    <div class="q-pa-sm col-md-3">
      <p>Categoria</p>
      <q-btn-toggle
        ref="categoria"
        v-model="formulario.categoria"
        :disabled="!formulario.cnh"
        rounded
        push
        glossy
        class="q-ma-sm"
        color="grey-2"
        text-color="primary"
        toggle-color="secondary"
        :rules="[$rules.required('Campo obrigatório')]"
        :options="[
          {label: 'A', value: 'A'},
          {label: 'B', value: 'B'},
          {label: 'C', value: 'C'},
          {label: 'D', value: 'D'},
          {label: 'E', value: 'E'}
        ]"
      />
    </div>
    <div class="q-pa-sm col-md-2">
     <p>Dirige?</p>
      <q-btn-toggle
        ref="cnh"
        v-model="formulario.dirige"
        :disabled="!formulario.cnh"
        rounded
        push
        glossy
        class="q-ma-sm"
        color="grey-2"
        text-color="primary"
        toggle-color="secondary"
        :rules="[$rules.required('Campo obrigatório')]"
        :options="[
          {label: 'Sim', value: 1},
          {label: 'Não', value: 0},
        ]"
      />
    </div>
    <div class="q-pa-sm  col-xs-12 col-sm-12  col-md-2">
     <p>Veículo próprio?</p>
      <q-btn-toggle
        ref="cnh"
        v-model="formulario.veiculoProprio"
        :disabled="!formulario.cnh"
        rounded
        push
        glossy
        class="q-ma-sm"
        color="grey-2"
        text-color="primary"
        toggle-color="secondary"
        :rules="[$rules.required('Campo obrigatório')]"
        :options="[
          {label: 'Sim', value: 1},
          {label: 'Não', value: 0},
        ]"
      />
    </div>
    <div class="q-pa-sm  col-xs-12 col-sm-12 col-md-4">
      <q-input
        filled
        ref="telefoneCelular"
        type="text"
        mask="(##) #####-####"
        v-model="formulario.telefoneCelular"
        label="Telefone Celular *"
        :rules="[$rules.required('Campo obrigatório')]"
       
      />
     
    </div>
    <div class="q-pa-sm  col-xs-12 col-sm-12 col-md-4">
      <q-input
        filled
        type="text"
         mask="(##) ####-####"
        v-model="formulario.telefoneFixo"
        label="Telefone Fixo"
       
      />
    </div>
    <div class="q-pa-sm  col-xs-12 col-sm-12 col-md-2">
      <q-input
        filled
        type="text"
        v-model="formulario.telefoneRecado"
         mask="(##) #####-####"
        label="Telefone Recado"
       
      />
    </div>
    <div class="q-pa-sm  col-xs-12 col-sm-12 col-md-12">
      <q-input
        filled
        type="text"
        v-model="formulario.email"
        label="E-mail *"
       
      />
    </div>
    <div class="q-pa-sm  col-xs-12 col-sm-12 col-md-6">
      <q-input
        filled
        type="text"
        v-model="formulario.whatsapp"
        label="Whatsapp *"
       
      >
        <template v-slot:prepend>
          <q-icon name="fab fa-whatsapp" />
        </template>
      </q-input>
    </div>
    <div class="q-pa-sm  col-xs-12 col-sm-12 col-md-6">
      <q-input
        filled
        type="text"
        v-model="formulario.facebook"
        label="Página perfil do Facebook (ex: jesse.matheus)"
        prefix="https://www.facebook.com/"
       >
        <template v-slot:prepend>
          <q-icon name="fab fa-facebook-square" />
        </template>
      </q-input>
    </div>
    <div class="q-pa-sm  col-xs-12 col-sm-12 col-md-6">
      <q-input
        filled
        type="text"
        v-model="formulario.linkedin"
        label="Linkedin (ex: jesse-sena-0473b82b)"
        prefix="https://www.linkedin.com/"
      >
        <template v-slot:prepend>
          <q-icon name="fab fa-linkedin" />
        </template>
      </q-input>
    </div>
    <div class="q-pa-sm  col-xs-12 col-sm-12 col-md-6">
      <q-input
        filled
        type="text"
        v-model="formulario.instagram"
        label="Instagram (ex: joao.matheus)"
        prefix="https://www.instagram.com/"
      >
        <template v-slot:prepend>
          <q-icon name="fab fa-instagram" />
        </template>
      </q-input>
    </div>
    
  </div>
</template>
<style lang="scss">
 
</style>
<script>
export default {
  name: 'InformacoesGerais',
   props: {
    formulario: {
      type: Object
    }
  },
  
  data () {
    return {
      optionsEstadoCivil:['Casado(a)','Solteiro(a)','Divorciado(a)','Viúvo(a)'],
      myCroppa:{},
      imgUrl:'',
      selectPhoto:true,
      fotoCarregada:true,
    }
  },
  methods:{
    alterarFoto(){
      this.fotoCarregada = !this.fotoCarregada
      console.log(this.$refs.myCroppaRef)
      //.chooseFile();
    },
    generateImage () {
      let url = this.$refs.myCroppaRef.generateDataUrl('image/jpeg', 0.5)
      if (!url) {
        alert('no image')
        return
      }
      console.log(url)
      this.imgUrl = {foto: url}
      this.$store.dispatch("user/salvaFoto", this.imgUrl)
    }
    
   
  }
  
   
  
}
</script>
