<template>
   <div class="q-pa-md full-width" :key="fase">
        <!--:selected.sync="selected"-->
        {{ fase }}
      <q-table
        :filter="filter"
        :data="data"
        :columns="columns"
        color="amber"
        :selected-rows-label="getSelectedString"
        :pagination.sync="pagination"
        :loading="loading"
        row-key="id"
        @request="onRequest"
        :grid="list"
        :hide-header="list"
        selection="multiple"
        :selected.sync="selected"
        style="text-transform:uppercase"
      >
        <template v-slot:header-selection="scope">
          <q-checkbox v-model="scope.selected" />
        </template>
 
        <template v-slot:top="props">
          
          <!-- <q-input  dense debounce="300" style="width:500px"  v-model="filter" standout="bg-primary" label-color="white"  label="Pesquisar">
            <template v-slot:append>
              <q-icon name="search" color="white" />
            </template>
          </q-input> -->
          <q-card class="full-width row">
            <q-select 
              dense
              outlined
              class="q-pa-md bg-white"
              v-model="filter.vaga"
              emit-value
              map-options
              :options="optionsVagas" 
              @input="onRequest"
              lazy-rules
              style="width:300px;"
              option-value="id"
              option-label="nome"
              option-disable="disponivel"
              :rules="[$rules.required('Selecione a vaga')]"
              label="Vagas disponíveis" />
            
             <!-- <q-input 
              dense
              outlined
              class="q-pa-md bg-white"
              v-model="filter.nome"
              style="width:300px;"
              label="Pesquisar por nome" /> -->
             
             
              <q-space />
             <div class="col float-left q-pa-md q-gutter-sm">
              <q-radio keep-color v-model="filter.status" val="2" color="orange" /> 
              <q-radio keep-color v-model="filter.status" val="3" color="red" />
              <q-radio keep-color v-model="filter.status" val="0" label="Todos" />
              <q-btn color="primary" @click="dialogWhats.persistent=true" :disabled="selected.length==0"  icon="send" label="enviar mensagens" /> 
            </div>
             
            <q-btn-toggle
              v-model="list"
              class="absolute-right"
              push
              :dark="list"
              size="10px"
              color="white"
              toggle-color="secondary"
              text-color="primary"
              :options="[
                {icon:'fas fa-list', value: false},
                {icon:'fas fa-grip-vertical', value: true}
              ]"
          />
          </q-card>
      </template>
      <template v-slot:item="props" v-if="list">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card :class="props.selected ? 'bg-grey-2' : ''" class="text-weight-medium">
            <q-card-section>
              <q-checkbox dense v-model="props.selected" :label="props.row.name" />
            </q-card-section>
            <q-separator />
            <q-card-actions align="right">
              <template v-if="fases =='fase2'">
                <q-radio keep-color v-model="props.row.fase2" :val="1"  @input="dialogItem(props.row)"  color="teal" />
                <q-radio keep-color v-model="props.row.fase2" :val="2"  @input="atualizaStatus(props.row)" color="orange" />
                <q-radio keep-color v-model="props.row.fase2" :val="3"  @input="dialogItem(props.row)" color="red" />
              </template>
              <template v-else-if="fases =='fase3'">
                <q-radio keep-color v-model="props.row.fase3" :val="1"  @input="dialogItem(props.row)"  color="teal" />
                <q-radio keep-color v-model="props.row.fase3" :val="2"  @input="atualizaStatus(props.row)" color="orange" />
                <q-radio keep-color v-model="props.row.fase3" :val="3"  @input="dialogItem(props.row)" color="red" />
              </template>
              <template v-else-if="fases =='fase4'">
                <q-radio keep-color v-model="props.row.fase4" :val="1"  @input="dialogItem(props.row)"  color="teal" />
                <q-radio keep-color v-model="props.row.fase4" :val="2"  @input="atualizaStatus(props.row)" color="orange" />
                <q-radio keep-color v-model="props.row.fase4" :val="3"  @input="dialogItem(props.row)" color="red" />
              </template>
            </q-card-actions> 
            <q-separator />
              <!-- {{props.rowIndex}} -->
            <q-item clickable   @click="openPerfil(props.row)" >
              <q-item-section avatar>
                <q-avatar>
                <img :src="props.row.foto" />
                
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ props.row.nome }}, <template v-if="props.row.dataNascimento">{{  props.row.dataNascimento | getIdade() }}</template></q-item-label>
                {{props.rowIndex}}
              </q-item-section>
               <q-item-section side>
                  <q-badge>{{ optionsVagas | categVagas(props.row.vaga_id) }}</q-badge>
                  <q-btn icon="house" flat color="primary" round size="14px"><q-tooltip content-class="bg-primary">{{props.row.endereco}}<br/>{{props.row.cidade}}</q-tooltip></q-btn>
                </q-item-section>
            </q-item>
            <q-separator />
            <q-item >
              <q-item-section avatar>
                <q-icon name="settings_cell" color="primary"></q-icon>
               </q-item-section>
              <q-item-section >
                <q-item-label>{{ props.row.telefoneCelular }}</q-item-label>
              </q-item-section>
               <q-item-section avatar>
                <q-icon name="phone"  color="primary"></q-icon>
                 
                </q-item-section>
                <q-item-section >
                  <q-item-label>{{ props.row.telefoneResidencial }}</q-item-label>
                </q-item-section>
                <q-item-section avatar>
                <q-icon name="contact_phone"  color="primary"></q-icon>
                 
              </q-item-section>
              <q-item-section  >
                <q-item-label>{{ props.row.telefoneRecado }}</q-item-label>
              </q-item-section>
            </q-item>
            <!-- <q-item v-if="props.row.telefoneResidencial">
             
            </q-item>
            <q-item v-if="props.row.telefoneRecado">
              
            </q-item> -->
            
             <q-list dense class="text-weight-medium">
              
               <q-item >
                <q-item-section avatar>
                  <q-icon name="mail" color="primary"></q-icon>
                </q-item-section>
                <q-item-section >
                  <q-item-label  class="text-weight-medium" >{{ props.row.email }}</q-item-label>
                </q-item-section>
              </q-item>
             
              <q-separator />
             

            </q-list>
          
            <q-card-actions align="right">
              <q-btn flat color="grey" round icon="email" class="q-ml-md" @click="openDialogHistorico(props.row)">
                <q-badge color="red" floating>{{props.row.historico.length}}</q-badge>
              </q-btn>
              <q-btn flat   icon="fab fa-whatsapp" color="primary"  @click="openDialogWhatsPerson(props.row)"    />
              <q-btn flat   icon="fas fa-play" color="blue" v-if="props.row.videos" :disabled="props.row.videos.length > 0 ? false:true"   @click="dialogVideoClick(props.row)"     />
               
            </q-card-actions>
          </q-card>
        </div>
      </template>
      <template v-slot:body="props"  v-if="!list">
        <q-tr :props="props">
            <q-td auto-width >
                <q-checkbox v-model="props.selected" />
            </q-td>  
            <q-td key="nome" :props="props" >
              <q-radio dense keep-color v-model="props.row.fase2" class="q-px-sm" :val="1"  @input="dialogItem(props.row)"  color="teal" />
              <q-radio  dense  keep-color v-model="props.row.fase2"   :val="2"  @input="atualizaStatus(props.row)" color="orange" />
              <q-radio  dense  keep-color v-model="props.row.fase2"  class="q-px-sm" :val="3"  @input="dialogItem(props.row)" color="red" />
              {{ props.row.nome }}, <template v-if="props.row.dataNascimento">{{  props.row.dataNascimento | getIdade() }}</template>
                   
                
                 <!-- {{  props.row.estadoCivil }} -->
             
            </q-td>
            
            <q-td  key="celular">
              {{  props.row.telefoneCelular }}
            </q-td>
            <q-td key="vaga" :props="props"> 
              <q-badge> {{ optionsVagas | categVagas(props.row.vaga_id) }} </q-badge>
            </q-td>
            <q-td key="email" :props="props" >
                {{  props.row.email }}
            </q-td>
            
            <q-td key="redesSociais" :props="props" class="q-gutter-sm" >
               
              <q-btn  dense  flat icon="fas fa-play" color="blue" v-if="props.row.videos" :disabled="props.row.videos.length > 0 ? false:true"   @click="dialogVideoClick(props.row)"     />
              <q-btn  dense  flat   icon="fab fa-whatsapp" color="primary"  @click="openDialogWhatsPerson(props.row)"    />
              <q-btn  dense  flat color="grey" round icon="email" class="q-ml-md" :disabled="props.row.historico.length == 0"  @click="openDialogHistorico(props.row)">
                <q-badge color="red" floating>{{props.row.historico.length}}</q-badge>
              </q-btn>
              <q-btn  dense  round size="sm" class="q-ml-md" color="primary" icon="fa fa-eye" @click="openPerfil(props.row)"   />
              <!-- <q-btn icon="fab fa-facebook" color="blue" :disabled="props.row.facebook ? false:true" :route="props.row.facebook" />
              <q-btn icon="fab fa-linkedin" color="blue-10" :disabled="props.row.linkedin ? false:true" :route="props.row.linkedin" />
              <q-btn icon="fab fa-instagram" color="pink" :disabled="props.row.instagram ? false:true" :route="props.row.instagram" />:to="{name: 'perfil', params: { id: [props.rowIndex+1], pagina:'fase2' }}"-->
            </q-td>
            
        </q-tr>
      </template>
      </q-table>

    <q-dialog v-model="dialog.persistent"  persistent transition-show="scale" transition-hide="scale">
      <q-card class="text-white" :class="`bg-${dialog.color}`"  style="width: 320px">
        <q-card-section class="column no-wrap flex-center">
          <q-icon :name="`fa fa-${dialog.icon}`" size="30px"/>
          <p>{{ dialog.nome }}, {{ dialog.titulo  }}</p>
        </q-card-section>

        <q-card-actions align="right" class="bg-white " :class="`text-${dialog.color}`">
          <q-btn flat  label="cancelar" v-close-popup />
          <q-btn flat  label="confirmar" @click="atualizaStatus(dialog)" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialogVideo.persistent"  transition-show="scale" transition-hide="scale">
       <q-media-player
          type="video"
          :sources="dialogVideo.sources"
          background-color='orange-8'
        />
    />
    </q-dialog>
  <!-- mensagem geral -->
    <q-dialog v-model="dialogWhats.persistent" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="fab fa-whatsapp" color="primary" text-color="white" />
          <span class="q-ml-sm">Você enviará essa mensagem para as <strong>{{ selected.length }}</strong> pessoas dessa lista.</span>
          <q-input type="textarea" v-model="dialogWhats.message" style="width:100%" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat color="primary" @click="sendEmails()" icon="mail" label="Enviar e-mails" />
          <q-btn flat  icon="send" @click="sendWhats()" label="Enviar Whats" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
   <!-- mensagem geral -->
   <!-- mensagem por pessoa -->
   <q-dialog v-model="dialogWhatsPerson.persistent"  >
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="fab fa-whatsapp" color="primary" text-color="white" />
          <span class="q-ml-sm"><strong>{{ dialogWhatsPerson.nome }}</strong> - {{dialogWhatsPerson.phone}}</span>
          <q-input type="textarea" v-model="dialogWhatsPerson.message" style="width:100%" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" @click="dialogWhatsPerson.persistent=false" v-close-popup />
          <q-btn flat label="Enviar" icon="send" @click="sendWhatsPerson(dialogWhatsPerson)" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  <!-- historico -->
    <q-dialog v-model="dialogHistorico.persistent"  >
      <q-card>
        <q-card-section class="row items-center">
          <q-chat-message
            style="font-family:Arial"
            v-for="(item, index) in dialogHistorico.historico"
            :key="index"
            :text="[item.message]"
            text-sanitize
            :stamp="item.data | formatData()"
            sent
            size="10"
            bg-color="amber-7"
          >
          <template v-slot:avatar>
            <q-btn flat icon="delete" color="red" @click="openDeleteHistorico(item.id,index)" />
          </template>
            
          </q-chat-message>
          <h5 v-if="dialogHistorico.historico.length == 0">Não há mensagem no histórico</h5>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK"  color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialogHistorico.persistentDelete"  persistent transition-show="scale" transition-hide="scale">
      <q-card class="text-white" :class="`bg-red`"  style="width: 220px">
        <q-card-section class="column no-wrap flex-center">
          <q-icon :name="`fa fa-trash`" size="30px"/>
          <p>Deseja realmente apagar essa mensagem?</p>
        </q-card-section>
        <q-card-actions align="right" class="bg-white " :class="`text-red`">
          <q-btn flat  label="cancelar" v-close-popup />
          <q-btn flat  label="confirmar" @click="deleteHistorico(dialogHistorico)" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialogPerfil.persistent"  full-height  full-width>
      <Perfil :perfil="perfil" />
    </q-dialog>
   
  </div>
</template>

<style lang='stylus' >
  transition  (value) {
    -webkit-transition: value
    -moz-transition: value
    -ms-transition: value
    -o-transition: value
    transition: value
  }

.my-sticky-header-table {
  thead tr:first-child th {
    position: sticky
    top: 0
    opacity: 1
    z-index: 1
  }
}
.q-table{
  font-size 14
  font-weight 500
}
td {
  position: relative
}

td .botoes {
  top: 10px
  position: absolute
  right: 0
  opacity: 0
  transition(opacity 0.3s ease-in-out)
}

tr:hover td .botoes {
  opacity: 1
}
</style>
 
<script>
import axios from 'axios'
import global from 'boot/global'
import Perfil from '../../../components/Perfil.vue'
import candidato from "../../../models/candidato.js";
import filters from "../../../filters/filters.js";
export default {
  name: 'PageIndex',
  filters: filters,
  props: ['fase'],
  components: {Perfil},
  computed:{
    list: {
      get () {
       
        return this.$store.getters['admin/list']
      },
      set (value) {
        console.log(value)
        this.$store.dispatch('admin/updateList', value)
      }
    }
  },
  data () {
    return {
      pagina:'candidatos',
      fases: 'fase2',
      vaga_id: 0,
      optionsVagas: [],
      selected: [],
      dialogPerfil:{
        persistent:false
      },
      perfil: candidato,
      dialog: {
        id: 0,
        nome: '',
        color: '',
        status:'' ,
        fase2:0,
        fase3:0,
        fase4:0,
        persistent: false,
        titulo: '',
        vaga_id:0,
      },
      dialogVideo: {
        id: 0,
        url: '',
        persistent: false,
       
      },
      dialogWhats:{
        persistent: false,
        message: 'Olá  {{nome}}, \nMeu nome é Jeanne e sou a orientadora profissional do Hotel Villa do Vale.\nQuero te dizer que recebemos seu currículo e temos interesse em te conhecer melhor.\nNeste momento, estamos procurando pessoas muito especiais para compor nossa equipe e acreditamos que você pode ser uma delas.\nPor isso, te convido para a próxima fase do nosso processo seletivo.\nPara participar é muito simples, grave um vídeo falando um pouco de você e do porquê você gostaria de trabalhar com a gente.\nTodas as orientações para que você faça seu vídeo da maneira correta já estão na plataforma, no mesmo lugar onde você inseriu os dados do seu currículo.\nFique tranquilo, o processo é muito simples e temos plena confiança em sua capacidade para executá-lo.\nJá estamos por aqui, aguardando seu vídeo.\nAté breve!'
      },
      dialogWhatsPerson:{
        id: '',
        nome: '',
        phone: '',
        message: '',
        persistent: false
      },
      dialogHistorico:{
        persistent:false,
        persistentDelete:false,
        historico:[],
        size: 0,
        id:0,
        index:0,
      },
      optionsCategoria: [],
      selected: [],
      filter: { vaga:0, status:'0', fase: this.fases},
      text: '',
      loading: false,
      pagination: {
        sortBy: 'nome',
        descending: false,
        page: 1,
        rowsPerPage: 0,
        rowsNumber: 1000,
      },
     columns: [
        {
          name: 'nome',
          required: true,
          label: 'Nome',
          align: 'left',
          field: row => row.nome,
          format: val => `${val}`
        },
         {
          name: 'celular',
          required: true,
          label: 'Celular',
          align: 'left', 
        },
        
        {
          name: 'vaga',
          required: true,
          label: 'Vaga',
          align: 'left', 
        },
        {
          name: 'email',
          required: true,
          label: 'E-mail',
          align: 'left',
          
        },
        
        
         {
          name: 'redesSociais',
          required: true,
          label: '',
          align: 'left'
         
        },
      ],
      data: []
    }
  },
  methods: {
    enviaObjParaEditar (obj) {
      // console.log(obj);
      this.$store.commit('admin/editarObjeto',obj)
    },
    dialogItem (e) {
      this.dialog.persistent = true;
      if(e.fase2 == 3){
        this.dialog.icon = 'trash';
        this.dialog.color = 'negative';
        this.dialog.titulo = 'será descartado';
      }
      else if(e.fase2 == 1){
        this.dialog.icon = 'check';
        this.dialog.color = 'positive';
        this.dialog.titulo = 'irá para fase 3';
      }
        
      this.dialog.nome = e.nome;
      this.dialog.id = e.id
      this.dialog.fase2 = e.fase2
      this.dialog.fase3 = e.fase3
      this.dialog.fase4 = e.fase4
      this.dialog.vaga_id = e.vaga_id
      e.fase2= 0;
    },
    dialogVideoClick (e) {
      this.dialogVideo.persistent = true;
      if(e.videos)
        this.dialogVideo.sources= [
          {
            src:  'https://backend.villadovalehotel.com.br/files/'+e.videos[0].url,
            type: 'video/mp4'
          }
        ]
        
    },
    openPerfil(value){
      this.dialogPerfil.persistent=true
      this.perfil = value
    },
    openDialogWhatsPerson(e){
      this.dialogWhatsPerson.persistent =true;
      this.dialogWhatsPerson.id = e.id;
      this.dialogWhatsPerson.nome = e.nome;
      
      this.dialogWhatsPerson.phone = e.telefoneCelular;
      let nome = this.dialogWhatsPerson.nome.split(' ');
      this.dialogWhatsPerson.message = `Olá ${nome[0]}, `
    },
    openDialogHistorico(e){
      this.dialogHistorico.persistent = true;
      this.dialogHistorico.historico = e.historico;
      this.dialogHistorico.historico.size = e.historico.size;

    },
    openDeleteHistorico(id,index){
      this.dialogHistorico.persistentDelete = true;
      this.dialogHistorico.id = id;
      this.dialogHistorico.index = index;
    },
    deleteHistorico(e){

      this.$store.dispatch('admin/deleteHistorico', {id:e.id})
        .then((resp) => {
          this.dialogHistorico.historico.splice(this.dialogHistorico.index, 1);
          this.requestPagination()
  
        })
    },
    atualizaStatus (value){
      let formStatus={}
      if(this.fase == 'fase2')
         formStatus = {
          id: value.id, fase2:value.fase2, vaga_id: value.vaga_id, pagina:'candidatosStatus'
        }
      else if(this.fase == 'fase3'){
        formStatus = {
          id: value.id, fase3:value.fase3, pagina:'candidatosStatus'
        }
      }else if(this.fase == 'fase4'){
        formStatus = {
          id: value.id, fase4:value.fase4, pagina:'candidatosStatus'
        }
      }
     this.$store.dispatch('admin/update', formStatus)
        .then((resp) => {
          this.requestPagination()
        }) 
    },
    removeItem () {
      this.$store.dispatch('admin/deleteUsuario', this.dialog.id )
        .then((resp) => {

          this.requestPagination()
        
         
        })
    },
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
    },
    sendEmails(){
       this.$store.dispatch('admin/mailingFase2',{lista:this.selected, message: this.dialogWhats.message})
        .then((resp) => {
          this.dialogWhats.persistent = false
          setTimeout(() => {
            this.requestPagination()
          }, 500); 
             
         
        }) 
    },
    getCode(){
       this.$store.dispatch('admin/getCodeWhats')
        .then((resp) => {
           
        }) 
    },
    sendWhats(){
       this.$store.dispatch('admin/sendWhats', {lista:this.selected, message: this.dialogWhats.message})
        .then((resp) => {
          this.dialogWhats.persistent = false
        }) 
    },
    sendWhatsPerson(item){
      item.phone = item.phone.replace(/[^\d]+/g,'')
       this.$store.dispatch('admin/sendWhatsPerson', item)
        .then((resp) => {
          this.dialogWhatsPerson.persistent = false
        }) 
    },
    requestPagination () {
      this.onRequest({
        pagination: this.pagination,
        filter: this.filter
      })
    },
     
    onRequest (props) {
      let descending = props.pagination.descending
      let page = props.pagination.page
      let rowsPerPage = props.pagination.rowsPerPage
      let rowsNumber = props.pagination.rowsNumber
      let sortBy = props.pagination.sortBy
      let filter = props.filter
      
      
      this.loading = true 

      
      // update rowsCount with appropriate value
      //this.pagination.rowsNumber = this.getRowsNumberCount(filter)
      // get all rows if "All" (0) is selected
      let fetchCount = rowsPerPage === 0 ? rowsNumber : rowsPerPage
       
      // calculate starting row of data
       let startRow = (page - 1) * rowsPerPage
       console.log(filter)
      // axios.defaults.headers.common['token'] = LocalStorage.getItem('token')
      this.$store.dispatch(`admin/fases`,{ offset: startRow, limit: fetchCount,vaga_id: filter.vaga,status: 1,tipoFase: filter.fase}).then((resp) => {
         // get all rows if "All" (0) is selected
        
        
        // fetch data from "server"
        let returnedData = resp.data.result
        let total = resp.data.total
        // clear out existing data and add new
        this.data.splice(0, this.data.length, ...returnedData)

        
        // don't forget to update local pagination object
        // console.log(startRow)
        this.pagination.rowsNumber = total
        this.pagination.page = page
        this.pagination.rowsPerPage = rowsPerPage
        this.pagination.sortBy = sortBy
        this.pagination.descending = descending

        // ...and turn of loading indicator
        this.loading = false
      })
    }
  },
 
  created() {
    // get initial data from server (1st page)
      this.filter.fase = this.fase
      this.$axios.get(`vagasHome`)
      .then(resp => {
      
        this.optionsVagas = resp.data;
        this.optionsVagas.push({nome:'Todos',id:0,disponivel:1})
      })
      .catch(err => {
       
        //LocalStorage.remove('darkMode')
       
      })
    this.requestPagination()
  
  }
}
</script>
