<template>
  <div class="q-pa-md full-width row content-start bg-white">
    
    <q-date v-model="days" multiple mask="DD-MM-YYYY"  />
    <div class="q-pa-md" style="max-width: 350px">
    <q-list bordered>
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
          <q-toggle color="primary" v-model="horarios" :val="horario.horario" />
        </q-item-section>
      </q-item>
     
    </q-list>
     Model: {{ days }},{{horarios}}
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
    
      {
        horario:'13:30',
      },
    
  }
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
      selectedDate: [],
      days:[],
      horarios:[]
    }
  },
  methods: {
    getAgenda (day) {
      return this.agenda[parseInt(day.weekday, 10)]
    },
   
  },
  created () {
    // get initial data from server (1st page)
       
  
  }
}
</script>
