<template>
  <q-page class="q-pa-md bg-primary">
    <q-toolbar>
      <q-space />
      <q-btn round color="secondary" icon="fas fa-sign-out-alt" @click="logout()" />
     
    </q-toolbar>
      <q-stepper
        v-model="step_fase3"
        ref="stepperFase3"
        color="primary"
      >
        <q-step
          :name="1"
          title="Bem-vindo a próxima fase"
          icon="person"
        >
          <p>Você está evoluindo em nosso processo seletivo, parabéns.<br>Estamos muito confiantes que faremos uma parceria de trabalho produtiva e evolutiva, <br>por isso pedimos que nos dê algumas informações mais específicas sobre sua trajetória profissional.<br/>
            Por favor, responda as seguintes perguntas:</p>
          <p><strong> 1 -	Qual foi sua maior contribuição para uma empresa em sua trajetória profissional? <br/>Em que momento isso aconteceu e em que empresa você estava?</strong></p>
          <q-input
          filled
          type="textarea"
          v-model="formulario.questionario1"
          label=""
          reactive-rules
        />
      </q-step>
      <q-step
        :name="2"
        title="Pergunta 2"
        icon="person"
      >
        <p><strong>2 -	Quais são os elogios mais frequentes que você costuma ouvir no trabalho e por que acha que eles são merecidos?</strong></p>
        <q-input
          filled
          type="textarea"
          v-model="formulario.questionario2"
          label=""
          reactive-rules
        /> 
      </q-step>
      <q-step
        :name="3"
        title="Pergunta 3"
        icon="person"
      >
        <p><strong>3 -	O que você espera de um líder?</strong></p>
        <q-input
          filled
          type="textarea"
          v-model="formulario.questionario3"
          label=""
          reactive-rules
        /> 
      </q-step>
      <q-step
        :name="4"
        title="Pergunta 4"
        icon="person"
      >
        <p><strong>4 -	Qual sua maior falha profissional, em que momento ela aconteceu, em que empresa você estava e o que você aprendeu com ela?</strong></p>
        <q-input
          filled
          type="textarea"
          v-model="formulario.questionario4"
          label=""
          reactive-rules
        /> 
      </q-step>
      <q-step
        :name="5"
        title="Pergunta 5"
        icon="person"
      >
        <p><strong>5 -	Quais comportamentos pessoais você já identificou que precisam ser modificados e/ou melhorados para se tornar um profissional mais produtivo e excelente?</strong></p>
        <q-input
          filled
          type="textarea"
          v-model="formulario.questionario5"
          label=""
          reactive-rules
        /> 
      </q-step>
      <q-step
        :name="6"
        title="Questionario"
        icon="person"
        
      >
        <div class="row">
          <q-card 
          v-for="(item, index) in disc"
          class="col-6"
          :key="index">
          <q-card-section>
            <div class="text-subtitle2">{{ item.label }}</div>
          </q-card-section>
          <q-card-section>
            <q-option-group
              :options="item.opcoes"
              label="Notifications"
              v-model="item.resposta"
              @input="respostaDisc()"
            />
          </q-card-section>
        </q-card>   
        </div>
        
      </q-step>
       <template v-slot:navigation>
       
        <q-stepper-navigation class="row q-my-md justify-end">
          {{ resposta }}
          <q-btn @click="salvarQuestionario()" color="positive"  :label="step_fase3 === 6 ? 'Salvar' : 'Salvar e continuar'" />
          <q-btn v-if="step_fase3 > 1" flat color="primary" @click="$refs.stepperFase3.previous()" label="Voltar" class="q-ml-sm" />
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
 
import { LocalStorage } from 'quasar'
import axios from 'axios'

import candidato from "../models/candidato.js";
import disc from "../models/disc.js";
import discResultado from "../models/discResultado.js";
export default {
  name: 'PageIndex',
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
      this.form.d = this.resposta.d
      this.form.i = this.resposta.i
      this.form.s = this.resposta.s
      this.form.c = this.resposta.c
    },
    salvarQuestionario(){
      this.parseCandidato(this.formulario)
      this.$store.dispatch("user/updateCandidato", this.form).then(()=>{
        this.$refs.stepperFase3.next()
      })
    },
    getPerfil(){
      this.$store.dispatch("user/perfil").then(resp => { 
      this.formulario = resp.data
        
    });
    },
    respostaDisc (){
        let teste=[]
        this.disc.forEach(element => {
          teste.push(element.resposta)
        });
        this.resposta = teste.reduce(function(allItem, item){
              if (item in allItem) { 
                allItem[item]++;
              }
              else {
                allItem[item] = 1;
              }
             // allItem[item] = allItem[item]*5
              return allItem;
               
          }, {});
      if(this.resposta.d > this.resposta.i && this.resposta.d > this.resposta.s &&  this.resposta.d > this.resposta.c ){
        this.pf = 0;
      }else if (this.resposta.i > this.resposta.d && this.resposta.i > this.resposta.s &&  this.resposta.i > this.resposta.c){
        this.pf = 1;
      }else if(this.resposta.s > this.resposta.d && this.resposta.s > this.resposta.i &&  this.resposta.s > this.resposta.c){
        this.pf = 2;
      }else{
         this.pf = 3;
      }
    }
    
  },
  data () {
    return {
      mensagem:'',
      submitting: false,
      form:{}, 
      step_fase3:1,
      reset:false,
      optionsEstadoCivil:['Casado','Solteiro'],
      dialog: {
        id: 0,
        url: '',
        persistent: false,
      },
      formulario: candidato,
      data:[],
      horarios:null,
      disc: disc.disc,
      resultado: discResultado.resultado,
      pf:0,
      resposta:[],
    }
  },
  created () {
     
    this.getPerfil()
  },
 
  
   
}
</script>
