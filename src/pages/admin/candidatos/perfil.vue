<template>
   <div class="q-pa-md full-width">
        <!--:selected.sync="selected"-->
         <!-- :filter="filter" -->
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
        style="text-transform:uppercase"
      >
    
      <template v-slot:item="props" >
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-12 col-lg-12 grid-style-transition"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card :class="props.selected ? 'bg-grey-2' : ''" class="text-weight-medium">
           
            
            <q-card-section horizontal>
              <q-card-section class=" flex flex-center"  style="width: 100px">
                 <q-img :src="props.row.foto"  class="rounded-borders"  />
              </q-card-section>
              <q-card-section class="col q-pt-xs">
                <div class="text-caption"><q-badge>{{ optionsVagas | categVagas(props.row.vaga_id) }}</q-badge></div>
                <div class="text-h5 q-mt-sm q-mb-xs">{{ props.row.nome }}, <template v-if="props.row.dataNascimento">{{  props.row.dataNascimento | getIdade() }}</template></div>
                <div class="text-caption text-grey">
                 {{ props.row.nacionalidade }}, {{  props.row.estadoCivil }}<br/>
                  {{props.row.endereco}}<br/>{{props.row.cidade}}
                </div>
               
               
              </q-card-section>
               <div class="col-auto  q-pa-md">
                  <q-radio keep-color v-model="props.row.status" :val="1"  @input="atualizaStatus(props.row)"  color="teal" />
                  <q-radio keep-color v-model="props.row.status" :val="2"  @input="atualizaStatus(props.row)" color="orange" />
                  <q-radio keep-color v-model="props.row.status" :val="3"  @input="atualizaStatus(props.row)" color="red" />
                </div>
            </q-card-section>
           
            <q-separator />
            <q-card-actions>

              <q-btn  flat disable>
                <q-icon name="settings_cell" color="primary"></q-icon>
              {{ props.row.telefoneCelular }}
              </q-btn>
              <q-btn  flat>
                <q-icon name="mail" color="primary"></q-icon>
                {{ props.row.email }}
              </q-btn>
              <q-btn  flat disable>
                 <q-icon name="phone"  color="primary"></q-icon>
                {{ props.row.telefoneResidencial }}
              </q-btn>
              <q-btn  flat disable>
                 <q-icon name="contact_phone"  color="primary"></q-icon>
                {{ props.row.telefoneRecado }}
              </q-btn>
               <q-item>
                  <q-item-section avatar>
                    <q-icon name="drive_eta" color="primary"></q-icon>

                    <!-- <q-item-label>{{ props.cols[4].label}}</q-item-label> -->
                  </q-item-section>
                  <q-item-section>
                    <q-item-label  class="text-weight-medium" > 
                      <template v-if="props.row.cnh"> 

                          Cat. {{ props.row.categoria }}/
                          <template v-if="props.row.dirige"> 
                            Dirijo
                          </template>
                          <template v-else> 
                          Não Dirijo
                          </template>/
                          <template v-if="props.row.veiculoProprio"> 
                            tenho veículo
                          </template>
                          <template v-else> 
                            não tenho veículo
                          </template>
                        
                          
                        </template>
                      <template v-else>Não</template></q-item-label>
                  </q-item-section side>
                    <q-avatar icon="check" color="positive" text-color="white" size="24px" />
                  </q-item-section>
                </q-item>
                
            </q-card-actions>
            <q-separator />
            <q-card-section  horizontal>
              <q-card-section class="col">
                <q-list   separator>
                  <q-item  :disable="props.row.formacoes.length == 0 ? true:false">
                      <q-item-section avatar>
                        <q-avatar color="primary" text-color="white" size="24px">
                          {{ props.row.formacoes.length }}
                        </q-avatar>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Formação</q-item-label>
                        <q-item-label  caption lines="2">{{ props.row.formacao }},
                          <template v-if="props.row.completo == 1">completo</template>
                          <template v-else>Não completo</template>
                        </q-item-label>
                      </q-item-section>
                  </q-item>
                 
                  <q-item 
                    v-for="(item, index) in props.row.formacoes"
                    :key="index">
                    <q-item-section>
                      <q-item-label>{{item.curso}}, <span class="text-caption">{{item.instituicao}}</span></q-item-label>
                      <q-item-label caption>Ano de conclusão: {{item.anoConclusao}}</q-item-label>
                      <q-item-label caption lines="2"> {{item.habilidades}}</q-item-label>
                    </q-item-section>
                   
                  
                  </q-item>
                </q-list>
              </q-card-section>

              <q-separator vertical />

              <q-card-section class="col">
                <q-list separator> 
                  <q-item :disable="props.row.cursos.length == 0 ? true:false">
                      <q-item-section avatar>
                        <q-avatar color="primary" text-color="white" size="24px">
                          {{ props.row.cursos.length }}
                        </q-avatar>
                      </q-item-section>
                      <q-item-section>
                        Cursos 
                      </q-item-section>
                    </q-item>
                    <q-item 
                      v-for="(item, index) in props.row.cursos"
                      :key="index">
                    <q-item-section>
                      <q-item-label>{{item.curso}}, <span class="text-caption">{{item.instituicao}}</span></q-item-label>
                      <q-item-label caption>Ano de conclusão: {{item.anoConclusao}} - Carga horária: {{item.cargaHoraria}}</q-item-label>
                      <q-item-label caption lines="2"> {{item.habilidades}}</q-item-label>
                    </q-item-section>
                    </q-item>
                  </q-list>
              </q-card-section>
              <q-card-section class="col-3">
                <q-list   separator>
                  <q-item dense :disable="props.row.idiomas.length == 0 ? true:false">
                  
                    <q-item-section avatar>
                      <q-avatar color="primary" text-color="white" size="24px">
                        {{ props.row.idiomas.length }}
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      Idiomas
                    </q-item-section>
                  </q-item>
                  <q-item 
                    v-for="(item, index) in props.row.idiomas"
                    :key="index">
                    <q-item-section>
                      <q-item-label>{{item.idioma}}</q-item-label>
                      <q-item-label caption>{{item.instituicao}}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <div class="row items-center">
                        <q-icon name="star" v-if="item.fluencia=='Básico' || item.fluencia == 'Intermediário'" color="orange" size="24px" />
                        <q-icon name="star" v-if="item.fluencia=='Intermediário' || item.fluencia=='Avançado'" color="orange" size="24px" />
                        <q-icon name="star" v-if="item.fluencia=='Avançado'" color="orange" size="24px" />
                      </div> 
                    </q-item-section>
                  
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card-section>
            <q-separator />
            <q-card-section  horizontal>
              

              <q-separator vertical />

              <q-card-section class="col">
                <q-list separator> 
                  <q-item dense :disable="props.row.experiencias.length == 0 ? true:false">
                    <q-item-section avatar>
                      <q-avatar color="primary" text-color="white" size="24px">
                        {{ props.row.experiencias.length }}
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      Experiências
                    </q-item-section>
                  </q-item>
                  <q-item 
                    v-for="(item, index) in props.row.experiencias"
                    :key="index">
                    <q-item-section>
                      <q-item-label>{{item.cargo}}, <span class="text-caption">{{item.empresa}}</span></q-item-label>
                      <q-item-label caption>{{item.responsabilidades}}</q-item-label>
                      <q-item-label caption lines="5">{{item.comente}}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption>entrada</q-item-label>
                      <q-item-label >{{item.anoEntrada}}</q-item-label>
                    <q-item-label v-if="item.atual == '1'" caption>Emprego atual</q-item-label>
                    <template v-else>
                      <q-item-label caption>saída</q-item-label>
                      <q-item-label >{{item.anoSaida}}</q-item-label>
                    </template>
                    </q-item-section>
                  </q-item>
                </q-list>
               
              </q-card-section>
              <q-separator vertical />
              <q-card-section  class="col">
                 <q-list separator>
                   <q-item >
                    <q-item-section>
                      Pesquisa
                    </q-item-section>
                   </q-item>
                    <q-item >
                      <q-item-section>
                        <q-item-label>Como ficou sabendo da vaga?</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-item-label>{{props.row.pesquisa1}}</q-item-label>
                         <q-item-label v-if="props.row.pesquisa1_texto1">{{props.row.pesquisa1_texto1}}</q-item-label>
                        <q-item-label v-if="props.row.pesquisa1_texto2">{{props.row.pesquisa1_texto2}}</q-item-label>

                      </q-item-section>
                    </q-item>
                    <q-item >
                      <q-item-section>
                        <q-item-label>Está disposto a mudar de cidade?</q-item-label>
                      </q-item-section>
                      <q-item-section  side >
                        
                         <q-icon name="check" color="primary" v-if="props.row.pesquisa2 == 1"  />
                         <q-icon name="close" color="negative" v-if="props.row.pesquisa2 == 0"  />
                        
                      </q-item-section>
                    </q-item>
                    <q-item >
                      <q-item-section>
                        <q-item-label>Tem recursos próprios para isso?</q-item-label> 
                      </q-item-section>
                      <q-item-section  side >
                         <q-icon name="check" color="primary" v-if="props.row.pesquisa3 == 1"  />
                         <q-icon name="close" color="negative" v-if="props.row.pesquisa3 == 0"  />
                         
                      </q-item-section>
                    </q-item>
                    <q-item >
                      <q-item-section>
                        <q-item-label>Tem amigos ou familiares em Blumenau ou proximidades?</q-item-label>
                      </q-item-section>
                      <q-item-section  side >
                         <q-icon name="check" color="primary" v-if="props.row.pesquisa4 == 1"  />
                         <q-icon name="close" color="negative" v-if="props.row.pesquisa4 == 0"  />  
                      </q-item-section>
                    </q-item>
                    <q-item >
                      <q-item-section>
                        <q-item-label>Fuma?</q-item-label>
                        
                      </q-item-section>
                      <q-item-section  side >
                         <q-icon name="check" color="primary" v-if="props.row.pesquisa5 == 1"  />
                         <q-icon name="close" color="negative" v-if="props.row.pesquisa5 == 0"  />  
                      </q-item-section>
                    </q-item>
                    <q-item >
                      <q-item-section>
                        <q-item-label>Pratica exercícios físicos regularmente?</q-item-label>
                        
                      </q-item-section>
                      <q-item-section  side >
                         <q-icon name="check" color="primary" v-if="props.row.pesquisa6 == 1"  />
                         <q-icon name="close" color="negative" v-if="props.row.pesquisa6 == 0"  />  
                      </q-item-section>
                    </q-item>
                    <q-item >
                      <q-item-section>
                        <q-item-label>Teve contato direto com o Corona</q-item-label>
                      </q-item-section>
                      <q-item-section  side >
                         <q-icon name="check" color="primary" v-if="props.row.pesquisa7 == 1"  />
                         <q-icon name="close" color="negative" v-if="props.row.pesquisa7 == 0"  />  
                      </q-item-section>
                    </q-item>
                    
                  </q-list>
              </q-card-section>
            </q-card-section>
            <q-separator />
            <q-card-actions align="right">
              <q-btn flat type="a" icon="fab fa-whatsapp" color="primary" :disabled="props.row.whatsapp ? false:true" :href="props.row.whatsapp ? 'https://api.whatsapp.com/send?phone=+55'+ props.row.whatsapp +'&text=Olá' : ''" target="_blank"  />
              <q-btn flat type="a" icon="fab fa-facebook" color="blue" :disabled="props.row.facebook ? false:true" :href="props.row.facebook | formataLink('face')" target="_blank"   />
              <q-btn flat type="a" icon="fab fa-linkedin" color="blue-10" :disabled="props.row.linkedin ? false:true" :href="props.row.linkedin | formataLink('linke')" target="_blank"    />
              <q-btn flat type="a" icon="fab fa-instagram" color="pink" :disabled="props.row.instagram ? false:true" :href="props.row.instagram  | formataLink('insta')" target="_blank"    />
            </q-card-actions>
          </q-card>
        </div>
         
      </template>
        <template v-slot:pagination="scope">
          
          <q-page-sticky position="top-left" :offset="[18, 300]">
              <q-btn
                icon="chevron_left"
                color="secondary"
                round
                :disable="scope.isFirstPage"
                @click="scope.prevPage"
              />
          </q-page-sticky>
          <q-page-sticky position="top-right" :offset="[18, 300]">
             
              <q-btn
                icon="chevron_right"
                color="secondary"
                round
                
                :disable="scope.isLastPage"
                @click="scope.nextPage"
              />

          </q-page-sticky>
            <div class="q-pa-sm">
              <span style=" font-family: Arial, Helvetica, sans-serif; ">{{scope.pagination.page}}</span> de <span style=" font-family: Arial, Helvetica, sans-serif; ">{{scope.pagination.rowsNumber}}</span>
            </div>
            <q-btn
              icon="chevron_left"
              color="grey-8"
              round
              dense
              flat
              
              :disable="scope.isFirstPage"
              @click="scope.prevPage"
            />

            <q-btn
              icon="chevron_right"
              color="grey-8"
              round
              dense
              flat
              :disable="scope.isLastPage"
              @click="scope.nextPage"
            />
           
            
      </template>
      </q-table>

    <q-dialog v-model="dialog.persistent"  persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-red text-white"   style="width: 320px">
        <q-card-section class="column no-wrap flex-center">
          <q-icon name="fa fa-trash" size="30px"/>
          <p>{{ dialog.tituloRemove }}</p>
          <div class="text-h6">{{ dialog.nome }}</div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-red">
          <q-btn flat  label=" cancelar " v-close-popup/>
          <q-btn flat  label="remover " @click="removeItem()" v-close-popup/>
        </q-card-actions>
      </q-card>
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
.q-table__bottom{
  
  border-radius:5px;
  background-color:#fff;
 
}
</style>
 
<script>
import axios from 'axios'
import global from 'boot/global'
export default {
  name: 'PageIndex',
  filters: {
    categVagas (value, v) {
      let needle = v
      let newValue = value.filter(i => i.value === needle)
      return newValue[0].label
    },
    getIdade (value) {
      let ano = value.split("/")
      return new Date().getFullYear() - ano[2];
    },
    formataLink(value,nome){
      console.log(value)
      var  newValue =value
      var  link;
      if(value){
        if(newValue.includes("http")  ){
          return value
        }
        if(nome == 'face') link = "https://facebook.com/"+value //.replace(/[\(\)\.\s-]+/g,'');
        else if(nome == 'insta')  link = "https://instagram.com/"+value
        else if(nome == 'linke')  link = "https://linkedin.com/in/"+value
        return link
      }else{
        return value
      }

     
    }
  },
   
  data () {
    return {
      pagina:'candidatos',
      funcao:'',
      vaga_id: 0,
      optionsVagas: [
        {
          value: 0,
          label: 'Todos',
        },
        {
          value: 1,
          label: 'Recepcionista',
        },
        {
          value: 2,
          label: 'Concierge',
        },
        {
          value: 3,
          label: 'Maleiro',
        },
        {
          value: 4,
          label: 'Manobrista',
        },
        {
          value: 5,
          label: 'Mensageiro',
        },
        {
          value: 6,
          label: 'Garçom',
        },
        {
          value: 7,
          label: 'Maitre',
        },
        {
          value: 8,
          label: 'Barman',
        },
        {
          value: 9,
          label: 'Cozinheiro',
        },
        {
          value: 10,
          label: 'Auxiliar de cozinha',
        },
        {
          value: 11,
          label: 'Camareira',
        },
        {
          value: 12,
          label: 'Governanta',
        },
        {
          value: 13,
          label: 'Auxiliar de limpeza',
        },
        {
          value: 14,
          label: 'Zelador',
        },
        {
          value: 15,
          label: 'Auxiliar de manutenção',
        }
      ],
      dialog: {
        id: 0,
        nome: '',
        persistent: false,
        tituloRemove: this.$t('temCertezaRemover')
      },
      list:true,
      optionsCategoria: [],
      selected: [],
      filter: { vaga:0, status:0 },
      text: '',
      loading: false,
      tituloRemove: this.$t('temCertezaRemover'),
      pagination: {
        sortBy: 'nome',
        descending: false,
        page: 1,
        rowsPerPage: 1,
        rowsNumber: 1,
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
          name: 'cnh',
          required: true,
          label: 'CNH/Categoria/Dirige?',
          align: 'left'
         
        },
         {
          name: 'redesSociais',
          required: true,
          label: 'Redes Sociais',
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
    atualizaStatus (value){
     this.$store.dispatch('admin/update', { id: value.id, status:value.status, pagina:'candidatosStatus' })
        .then((resp) => {
          this.requestPagination()
        }) 
    },
    dialogItem (e, id) {
      this.dialog.persistent = true
      this.dialog.nome = e
      this.dialog.id = id
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
       //console.log(page)
      // axios.defaults.headers.common['token'] = LocalStorage.getItem('token')
      this.$store.dispatch(`admin/curriculos`,{ offset: startRow, limit: fetchCount,vaga_id: filter.vaga,status: filter.status}).then((resp) => {
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
  
  created () {
    // get initial data from server (1st page)
    if(this.$route.params.pagina == 'fase2') this.filter.status =1
    if(this.$route.params.id) this.pagination.page =this.$route.params.id[0]
    this.requestPagination()
  }
}
</script>
