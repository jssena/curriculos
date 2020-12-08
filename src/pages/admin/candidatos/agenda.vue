<template>
  <div class="q-pa-md full-width row content-start bg-white">
    <div class="q-pa-md col-md-4" >
    <q-date
      style="width:100%"
      v-model="days"
      :events="optionsData"
      @input="optionsFn"
      mask="DD/MM/YYYY"  />
    </div>
    <div class="q-pa-md  col-md-4 col-xs-12 row content-center "  >
      <q-list dense bordered separator style="width:100%">
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Horários</q-item-label>
          </q-item-section>
        </q-item>
        <q-item 
          tag="label"
          v-for="(horario,idx) in optionsHorarios"
          :key="idx"
          v-ripple
        >
          <q-item-section>
            <q-item-label>{{ horario.horario }}</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-toggle color="primary" :true-value="horario.horario" v-model="horarios" :val="horario.horario" />
          </q-item-section>
        </q-item>
         
      </q-list>
      <div class="flex col-xs-12 justify-end">
        <q-btn name="add" fill color="primary" @click="insertAgenda()" label="inserir na agenda" />
      </div>
      <!-- Model: {{ days }},{{horarios}} -->
     
      </div>
      <div class="q-pa-md  col-md-4 col-xs-12 row" >
       <q-table
        title="Datas cadastradas"
        class="col-md-12 col-xs-12"
        style="max-width:100%"
        dense
        :data="data"
        :columns="columns"
       
      >
        <template v-slot:body="props"  >
        <q-tr :props="props">
            <q-td  key="data">
              {{  props.row.data }}
            </q-td>
            <q-td  key="horarios">
              {{  props.row.horarios.length }}
            </q-td>
 
            <q-td key="opcoes" :props="props" class="q-gutter-sm" >
               
              <q-btn  dense flat  round size="sm" class="q-ml-md float-right" color="negative" icon="fas fa-trash" @click="deleteAgenda(props.row)"   />
             
            </q-td>
            
        </q-tr>
      </template>
      </q-table>
    </div>
       
  </div>
</template>

<style lang='stylus' >
 
</style>
 
<script>
import axios from 'axios'
import global from 'boot/global'
import { LocalStorage } from 'quasar'
import filters from "../../../filters/filters.js";
const horarios = [
  {
    horario:'13:30',
  },
  {
    horario:'14:00',
  },
  {
    horario:'14:30',
  },
  {
    horario:'15:00',
  },
  {
    horario:'15:30',
  },
  {
    horario:'16:00',
  },
  {
    horario:'16:30',
  },
  {
    horario:'17:00',
  },
  {
    horario:'17:30',
  },
]
export default {
  name: 'PageIndex',
  filters: filters,
  computed:{
    list: {
      get () {
        return this.$store.getters['admin/list']
      },
      set (value) {
       // console.log(value)
        this.$store.dispatch('admin/updateList', value)
      }
    }
  },
  data () {
    return {
      pagina:'agendamento',
      optionsHorarios:horarios,
      optionsData:[],
      days:'',
      horarios:[],
      data:[],
      columns: [
        {
          name: 'data',
          required: true,
          label: 'Data',
          align: 'left',
          field: row => row.data,
          format: val => `${val}`,
          
        },
        { name: 'horarios', align: 'left', label: 'Horários', field: row => row.horarios.length },
        { name: 'opcoes', align: 'left', label: 'Opcoes'},
        
      ],
    }
  },
  methods: {
    insertAgenda(){
      if(this.days === ''){
        this.$q.notify({
          icon: 'warning',
          color: 'positive',
          message: 'Escolha uma data'
        })
      }
      else{
        let form ={}
        form.data = this.days
        form.horarios = this.horarios
  
        this.$store.dispatch('admin/addAgenda', form)
          .then((resp) => {
          this.getAgenda()    
        }) 
      }
    },
    deleteAgenda(row){
      let form ={}
      form.id = row.id
      this.$store.dispatch('admin/deleteAgenda', form)
        .then((resp) => {
          this.getAgenda()
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

    },
  },
 
  created () {
    // get initial data from server (1st page)
    horarios.map(val => this.horarios.push(val.horario))
    this.getAgenda()
  }
}
</script>
