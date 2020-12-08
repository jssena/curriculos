<template>
  <q-page class="q-pa-md bg-primary">
    <q-toolbar>
      <q-space />
      <q-btn round color="secondary" icon="fas fa-sign-out-alt" @click="logout()" />
     
    </q-toolbar>
   
   
    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
    >
      <q-step
        :name="1"
        title="Informações gerais"
        icon="person"
         
      >
        {{formulario.status}}
        <q-form ref="formInformacoes" class="full-width">
          <InformacoesGerais :formulario="formulario"></InformacoesGerais>
        </q-form>
      </q-step>

      <q-step
        :name="2"
        title="Formação"
        icon="library_books"
        
      >
          <Formacao :formulario="formulario"></Formacao>
          <DetalhamentoFormacao
            :formulario="formulario"
            @remove="removeForm"
          />
        <div class="row q-my-md justify-end">
          <q-btn   color="primary" icon="add" label="Adicionar formação" @click="addFormacao(formulario.formacoes.length)" />
        </div>
      </q-step>

      <q-step
        :name="3"
        title="Cursos"
        icon="library_books"
         
      >
        <Cursos
          :formulario="formulario"
          v-on:remove="removeForm"
        />
        <div class="row q-my-md justify-end">
         <q-btn  color="primary" icon="add" label="Adicionar curso"   @click="addCursos(formulario.cursos.length)" />
        </div>
      </q-step>

      <q-step
        :name="4"
        title="Idiomas"
        icon="add_comment"
         
      >
        <q-form ref="formIdiomas" class="full-width">
          <Idioma
            :formulario="formulario"
            @remove="removeForm"
          />
       
          <q-separator />
          <div class="row q-my-md justify-end">
            <q-btn  color="primary" icon="add" label="Adicionar idioma"   @click="addIdiomas(formulario.idiomas.length)" />
          </div>
        </q-form>
      </q-step>
      <q-step
        :name="5"
        title="Experiências"
        icon="add_comment"
         
      >
       <q-form ref="formExperiencias" class="full-width">
        <Experiencias
          :formulario="formulario"
          @remove="removeForm"
        />
        <div class="row q-my-md justify-end">
          <q-btn   color="primary" icon="add" label="Adicionar experiência" @click="addExperiencias(formulario.experiencias.length)" />
        </div>
        </q-form >
      </q-step>
      <q-step
        :name="6"
        title="Pesquisa"
        icon="add_comment"
         
      >
        <q-form ref="formPesquisa" class="full-width">
          <Pesquisa
            :formulario="formulario"
          />
        </q-form>
      </q-step>

      <template v-slot:navigation>
       
        <q-stepper-navigation class="row q-my-md justify-end">
          <q-btn @click="salvarFormulario()" color="positive"  :label="step === 6 ? 'Salvar' : 'Salvar e continuar'" />
          <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Voltar" class="q-ml-sm" />
        </q-stepper-navigation>
      </template>
    </q-stepper>
 
  </q-page>
</template>
<style lang="scss">
 .q-stepper__label{
    font-family: 'Didot 06';
    text-transform: uppercase;
 }
</style>
<script>
import InformacoesGerais from '../components/InformacoesGerais.vue'
import Formacao from '../components/Formacao.vue'
import DetalhamentoFormacao from '../components/DetalhamentoFormacao.vue'
import Cursos from '../components/Cursos.vue'
import Idioma from '../components/Idioma.vue'
import Experiencias from '../components/Experiencias.vue'
import Pesquisa from '../components/Pesquisa.vue'
import { LocalStorage } from 'quasar'
import axios from 'axios'

import candidato from "../models/candidato.js";

export default {
  name: 'PageIndex',
  components: {InformacoesGerais, Formacao, DetalhamentoFormacao, Cursos, Idioma, Experiencias, Pesquisa},
  filters:{
    getFirstName(value){
      let newValue = value.split(' ')
     // console.log(newValue)
      return newValue[0]
    }
  },
  computed: {
    // step: {
    //   get () {
    //     return this.$store.getters['user/step']
    //   },
    //   set (value) {
    //     this.$store.dispatch('user/updateStep', value)
    //   }
    // }
  },
  methods:{
    logout () {
      this.$store.dispatch('user/logout').then(() => {
        this.$router.push('/')
      })
    },
    updateFormacoes(value){
      this.formulario.formacoes = value
    },
    addFormacao(num){
      this.formulario.formacoes.push({
        order: num+1,
        instituicao: '',
        curso:'',
        anoConclusao: '',
        habilidades: null
      })
    },
    addCursos(num){
      this.formulario.cursos.push({
        order: num+1,
        curso: '',
        cargaHoraria: '',
        instituicao: '',
        anoConclusao: '',
        habilidades: ''
      })
    },
    addIdiomas(num){
      this.formulario.idiomas.push({
        order: num+1,
        idioma: '',
        instituicao: '',
        fluencia: 'Básico',
      })
    },
    addExperiencias(num){
      this.formulario.experiencias.push({
        order: num+1,
        empresa: '',
        cargo: '',
        responsabilidades:'',
        anoEntrada: '',
        anoSaida: '',
        atual: 0,
        comente: ''
      })
    },
    removeForm(objeto,id,order){
     // console.log(objeto,id,order)
      if(id) this.$store.dispatch(`user/deleteTab${objeto}`,id) ;
      this.formulario[objeto].splice(order-1,1);
    },
    parseCandidato(value){
      this.form = {};
      this.form.nome = value.nome;
      this.form.nacionalidade = value.nacionalidade;   
      this.form.estadoCivil = value.estadoCivil;   
      this.form.filhos = value.filhos;
      this.form.filhosQuantos = value.filhosQuantos;
      this.form.dataNascimento = value.dataNascimento;
      this.form.endereco = value.endereco;
      this.form.cidade = value.cidade;
      this.form.cnh = value.cnh
      this.form.categoria = value.categoria;
      this.form.dirige = value.dirige
      this.form.veiculoProprio = value.veiculoProprio
      this.form.telefoneFixo = value.telefoneFixo;
      this.form.telefoneCelular = value.telefoneCelular;
      this.form.telefoneRecado = value.telefoneRecado;
      this.form.email = value.email;
      this.form.whatsapp = value.whatsapp;
      this.form.facebook = value.facebook;
      this.form.instagram = value.instagram;
      this.form.linkedin = value.linkedin;
      this.form.formacao = value.formacao;
      this.form.completo = value.completo;
      this.form.pesquisa1 = value.pesquisa1;
      this.form.pesquisa1_texto1 = value.pesquisa1_texto1;
      this.form.pesquisa1_texto2 = value.pesquisa1_texto2;
      this.form.pesquisa2 = value.pesquisa2;
      this.form.pesquisa3 = value.pesquisa3;
      this.form.pesquisa4 = value.pesquisa4;
      this.form.pesquisa5 = value.pesquisa5;
      this.form.pesquisa6 = value.pesquisa6;
      this.form.pesquisa7 = value.pesquisa7;
      this.form.questionario1 = value.questionario1;
      this.form.questionario2 = value.questionario2;
      this.form.questionario3 = value.questionario3;
      this.form.questionario4 = value.questionario4;
      this.form.questionario5 = value.questionario5;
    },
    parseFormacao(value){
      this.form = {};
      this.form.formacao = value.formacao;
      this.form.completo = value.completo;
      this.form.formacoes = value.formacoes;
    },
    parseCursos(value){
      this.form = {};
      this.form.cursos = value.cursos;
    },
    parseIdiomas(value){
      this.form = {};
      this.form.idiomas = value.idiomas;
    },
    parseExperiencias(value){
      this.form = {};
      this.form.experiencias = value.experiencias;
    },
    salvarFormulario(){
      
      if(this.step == 1){
         this.$refs.formInformacoes.validate().then(success => {
          if(success){
            this.parseCandidato(this.formulario)
            this.$store.dispatch("user/updateCandidato", this.form).then(()=>{
              if(this.step==1) this.$refs.stepper.next()
            })
          }else{
            this.sendNotificacao('warning','secondary','Preencha os campos solicitados')
          }
         })
       
      }else if(this.step == 2){
        this.parseFormacao(this.formulario)
        this.$store.dispatch("user/saveUpdateFormacao", this.form).then(()=>{
          this.$refs.stepper.next()
        })
      }else if(this.step == 3){
        this.parseCursos(this.formulario)
        this.$store.dispatch("user/saveUpdateCursos", this.form).then(()=>{
          this.$refs.stepper.next()
        })
      }else if(this.step == 4){
        this.$refs.formIdiomas.validate().then(success => {
          if(success){
            this.parseIdiomas(this.formulario)
            this.$store.dispatch("user/saveUpdateIdiomas", this.form).then(()=>{
              this.$refs.stepper.next()
            })
          }else{
            this.sendNotificacao('warning','secondary','Preencha os campos solicitados')
          }
        })
       
      }else if(this.step == 5){
        this.$refs.formExperiencias.validate().then(success => {
          if(success){
            this.parseExperiencias(this.formulario)
            this.$store.dispatch("user/saveUpdateExperiencias", this.form).then(()=>{
              this.$refs.stepper.next()
            })
          } else{
            this.sendNotificacao('warning','secondary','Preencha os campos solicitados')
          }
        })
      }else if(this.step == 6){
        this.$refs.formPesquisa.validate().then(success => {
          if(success){
            this.parseCandidato(this.formulario)
            this.$store.dispatch("user/updateCandidato", this.form)
          } else{
            this.sendNotificacao('warning','secondary','Preencha os campos solicitados')
          }
        })
      }
    },
    sendNotificacao(icon, color, msg){
      this.$q.notify({
        icon: icon,
        color: color,
        message: msg
      })
    },

    getPerfil(){
      this.$store.dispatch("user/perfil").then(resp => { 
        this.formulario = resp.data
       
      });
    }
  },
  data () {
    return {
      mensagem:'',
      submitting: false,
      form:{},
      step:1,
      myCroppa:{},
      imgURL: '',
      reset:false,
      optionsEstadoCivil:['Casado','Solteiro'],
       
      dialog: {
        id: 0,
        url: '',
        persistent: false,
      },
       
      formulario: candidato,
     
       
    }
  },
  created () {
    this.getPerfil()
   
  },
 
  
   
}
</script>
