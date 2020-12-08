<template>
  <q-page class="q-pa-md bg-primary">
    <q-toolbar>
      <q-space />
      <q-btn round color="secondary" icon="fas fa-sign-out-alt" @click="logout()" />
     
    </q-toolbar>
    <q-dialog v-model="dialogAgendamento.persistent"  persistent transition-show="scale" transition-hide="scale">
      <q-card class="text-white" :class="`bg-red`"  style="width: 220px">
        <q-card-section class="column no-wrap flex-center">
          <q-icon :name="`fa fa-trash`" size="30px"/>
          <p>Deseja realmente apagar essa agendamento?</p>
        </q-card-section>
        <q-card-actions align="right" class="bg-white " :class="`text-red`">
          <q-btn flat  label="cancelar" v-close-popup />
          <q-btn flat  label="confirmar" @click="deleteAgendamento()" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-stepper
        v-model="step_fase4"
        ref="stepperFase4"
        color="primary"
      >
        <q-step
          :name="1"
          title="Bem-vindo ao agendamento da entrevista"
          icon="person"
        >
          <div class="row flex flex-start">
            <div  class="col-4 q-pa-md">
              <q-card>
                <q-list dense bordered separator class="bg-primary text-white">
                  <q-item tag="label" v-ripple>
                    <q-item-section>
                      <q-item-label class="titulo">Escolha o dia da entrevista</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>  
                <q-date 
                style="width:100%"
                v-model="days"
                :options="optionsData"
                @input="optionsFn"
                mask="DD/MM/YYYY"  />
                 
              </q-card>
            </div>
            <div class="col-4 q-pa-md">
              <q-card style="min-height:400px">
              <q-list dense bordered separator>
                <q-item tag="label" v-ripple class="bg-primary text-white">
                  <q-item-section>
                    <q-item-label class="titulo">Escolha um horário</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item 
                  tag="label"
                  v-for="(horario,idx) in optionsHorarios"
                  :key="idx"
                  v-ripple
                  :disabled="horario.status ==1"
                >
                  <q-item-section>
                    <q-item-label>{{ horario.horario }}</q-item-label>
                  </q-item-section>
                  <q-item-section side top>
                    <q-toggle color="primary" :true-value="horario" :disable="horario.status ==1" v-model="horarios" :val="horario" />
                  </q-item-section>
                </q-item>
              </q-list>
              </q-card>
            </div>
            <div class="col-4 q-pa-md">
              <q-card class="bg-primary text-white  content-center" v-if="days || horarios">
                <q-card-section>
                  <div class="text-h6">A data escolhida para entrevista</div>
                  
                </q-card-section>
                <q-item>
                  <q-item-section avatar>
                    <q-avatar>
                      <q-icon name="event" color="white" />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label style="font-size:20px">Dia <strong>{{days}}</strong></q-item-label>
                    <q-item-label  style="font-size:15px" class="text-white " caption>Horário <strong v-if="horarios">  {{horarios.horario}}</strong></q-item-label>
                  </q-item-section>
                </q-item>
 
                 <q-separator />
                <q-card-actions align="right">
                  <q-btn @click="addAgendamento()" flat  :disabled="!horarios" label="Enviar agendamento" />
                </q-card-actions>
              </q-card>

            </div>
          </div>          
        </q-step>
        <q-step
          :name="2"
          title="Confirmação do agendamento"
          icon="person"
        >
         <div class="row flex flex-start">
            <div  class="col-4 q-pa-md">
              <q-card class="bg-primary text-white  content-center" v-if="formulario.agendamento">
                <q-card-section>
                  <div class="text-h6" v-if="formulario.agendamento[0].confirmacao === 0">Esperando confirmação</div>
                  <div class="text-h6" v-if="formulario.agendamento[0].confirmacao === 1">Agendamento confirmado</div>
                </q-card-section>
                <q-item>
                  <q-item-section avatar>
                    <q-avatar>
                      <q-icon name="event" color="white" />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label style="font-size:20px">Dia <strong>{{formulario.agendamento[0].data}}</strong></q-item-label>
                    <q-item-label  style="font-size:15px" class="text-white " caption>Horário <strong v-if="formulario.agendamento[0].horario">  {{formulario.agendamento[0].horario}}</strong></q-item-label>
                  </q-item-section>
                   <q-item-section side>
                    <q-avatar>
                      <q-icon :name="formulario.agendamento[0].confirmacao === 1 ? 'fas fa-check':'fas fa-spinner fa-spin'" color="white" />
                    </q-avatar>
                  </q-item-section>
                </q-item>
 
                 <q-separator />
                <q-card-actions align="right">
                  <q-btn @click="dialogAgendamento.persistent=true" flat  :disabled="!formulario.agendamento[0].horario" label="Cancelar agendamento" />
                </q-card-actions>
              </q-card>
            </div>
          </div>
        </q-step>
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
    getAgenda(){
      this.$store.dispatch('admin/getAgenda')
        .then((resp) => {
          this.data = resp.data.result
          
          setTimeout(()=>{
            this.optionsData = []
            this.data.map(value => {
              this.optionsData.push(this.convertDigitIn(value.data))
            })
          },300)
        })    
    },
    convertDigitIn(str){ 
      return str.split('/').reverse().join('/');
    },
    async optionsFn (value, reason, details) {
      console.log(value,reason,details)
      let find = this.data.find(element => element.data === value)
      this.optionsHorarios = find.horarios
      console.log(this.optionsHorarios)
    },
    addAgendamento(){
      let form = {}
      form = this.horarios
      form.status = 1
      
      this.$store.dispatch('user/addAgendamento', form)
        .then((resp) => {
          this.$refs.stepperFase4.next()
          this.getPerfil()
        })    
      
    },
    deleteAgendamento(){
      let form = {}
      form.id = this.formulario.agendamento[0].id
      form.horario_id = this.formulario.agendamento[0].horario_id

      this.$store.dispatch('user/deleteAgendamento', form)
        .then((resp) => {

          this.$refs.stepperFase4.previous()
          this.days=''
          this.horarios = null
          this.optionsHorarios= []
          this.getPerfil()
          this.getAgenda()
          
        })  
       
    },
    getPerfil(){
      this.$store.dispatch("user/perfil").then(resp => { 
      this.formulario = resp.data
        if(this.formulario.agendamento[0]){
          
          this.step_fase4 = 2
        }else{
          this.step_fase4 =1
        }
    });
    }
  },
  data () {
    return {
      mensagem:'',
      submitting: false,
      form:{},
      step_fase4:1,
      reset:false,
      dialog: {
        id: 0,
        url: '',
        persistent: false,
      },
      dialogAgendamento:{
        persistent:false
      },
      formulario: candidato,
      days: '',
      optionsData:[],
      optionsHorarios:[],
      data:[],
      horarios:null,
    }
  },
  created () {
    this.getPerfil()
    this.getAgenda()
      
  },
 
  
   
}
</script>
