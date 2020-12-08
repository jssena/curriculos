<template>
   <div class="q-pa-md full-width">
        <!--:selected.sync="selected"-->
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
        <template v-slot:top="props">
          <!-- <q-btn color="primary" @click="enviaObjParaEditar(null)" :to="`${pagina}/add`" icon="add" round /> -->
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
            <div class="col float-left q-pa-md">
             
              <q-radio keep-color v-model="filter.status" val="2"   color="orange" /> 
              <q-radio keep-color v-model="filter.status" val="3"    color="red" />
              <q-radio keep-color v-model="filter.status" val="0" label="Todos"    />
            </div>
             
            <q-space />
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
            <q-card-actions align="right">
              <q-btn icon="fas fa-comment-alt" class="q-mr-sm"  color="primary" round size="sm" flat @click="openDialogAnotacoes(props.row)" >
                <q-badge color="secondary" floating v-if="props.row.anotacoes != null && props.row.anotacoes != ''">!</q-badge>
              </q-btn>
              <q-radio keep-color v-model="props.row.status" :val="1"  @input="dialogItem(props.row)"  color="teal" />
              <q-radio keep-color v-model="props.row.status" :val="2"  @input="atualizaStatusStandBy(props.row)" color="orange" />
              <q-radio keep-color v-model="props.row.status" :val="3"  @input="dialogItem(props.row)" color="red" />
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
                <q-item-label caption> {{ props.row.nacionalidade }}, {{  props.row.estadoCivil }}</q-item-label>
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
              <q-item >
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
              <q-separator />
              <q-expansion-item dense :disable="props.row.formacoes.length == 0 ? true:false">
                <template v-slot:header>
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
                </template>
                <q-card>
                   
                    <q-list dense>
                      <q-item 
                        v-for="(item, index) in props.row.formacoes"
                        :key="index">
                        <q-item-section>
                          <q-item-label>{{item.curso}}, <span class="text-overline">{{item.instituicao}}</span></q-item-label>
                          <q-item-label caption>Ano de conclusão: {{item.anoConclusao}}</q-item-label>
                          <q-item-label caption lines="2"> {{item.habilidades}}</q-item-label>
                        </q-item-section>
                        
                      
                      </q-item>
                    </q-list>
                  
                </q-card>
              </q-expansion-item>
              <q-separator />
              <q-expansion-item dense :disable="props.row.cursos.length == 0 ? true:false">
              <template v-slot:header>
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white" size="24px">
                    {{ props.row.cursos.length }}
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  Cursos 
                </q-item-section>
              </template>
              <q-card>
                  <q-list separator> 
                    <q-item 
                      v-for="(item, index) in props.row.cursos"
                      :key="index">
                    <q-item-section>
                      <q-item-label>{{item.curso}}, <span class="text-overline">{{item.instituicao}}</span></q-item-label>
                      <q-item-label caption>Ano de conclusão: {{item.anoConclusao}} - Carga horária: {{item.cargaHoraria}}</q-item-label>
                      <q-item-label caption lines="2"> {{item.habilidades}}</q-item-label>
                    </q-item-section>
                    </q-item>
                  </q-list>
              </q-card>
            </q-expansion-item>
            <q-separator />
            <q-expansion-item dense :disable="props.row.idiomas.length == 0 ? true:false">
              <template v-slot:header>
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white" size="24px">
                    {{ props.row.idiomas.length }}
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  Idiomas
                </q-item-section>
                 
              </template>
              <q-card>
                <q-card-section>
                  <q-list>
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
              </q-card>
            </q-expansion-item>
            <q-separator />
            <q-expansion-item dense :disable="props.row.experiencias.length == 0 ? true:false">
              <template v-slot:header>
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white" size="24px">
                    {{ props.row.experiencias.length }}
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  Experiências
                </q-item-section>
                 
              </template>
              <q-card>
                 
                  <q-list>
                    <q-item 
                      v-for="(item, index) in props.row.experiencias"
                      :key="index">
                      <q-item-section>
                        <q-item-label>{{item.cargo}}, <span class="text-overline">{{item.empresa}}</span></q-item-label>
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
                
              </q-card>
            </q-expansion-item>
            <q-expansion-item dense :disable="props.row.experiencias.length == 0 ? true:false">
              <template v-slot:header>
                
                <q-item-section>
                 Pesquisa
                </q-item-section>
                 
              </template>
              <q-card>
                 
                  <q-list>
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
                
              </q-card>
            </q-expansion-item>

            </q-list>
          
            <q-card-actions align="right">
              <q-btn flat type="a" icon="fab fa-whatsapp" color="primary" :disabled="props.row.whatsapp ? false:true" :href="props.row.whatsapp ? 'https://api.whatsapp.com/send?phone=+55'+ props.row.whatsapp +'&text=Olá' : ''" target="_blank"  />
              <q-btn flat type="a" icon="fab fa-facebook" color="blue" :disabled="props.row.facebook ? false:true" :href="props.row.facebook | formataLink('face')" target="_blank"   />
              <q-btn flat type="a" icon="fab fa-linkedin" color="blue-10" :disabled="props.row.linkedin ? false:true" :href="props.row.linkedin | formataLink('linke')" target="_blank"    />
              <q-btn flat type="a" icon="fab fa-instagram" color="pink" :disabled="props.row.instagram ? false:true" :href="props.row.instagram  | formataLink('insta')" target="_blank"    />
            </q-card-actions>
          </q-card>
        </div>
      </template>
      <template v-slot:body="props"  v-if="!list">
        <q-tr :props="props">
            <!-- <q-td auto-width >
                <q-checkbox v-model="props.selected" />
            </q-td> -->
            <q-td key="nome" :props="props">
                
                  <q-avatar v-if="props.row.foto">
                    <img :src="props.row.foto" />
                  </q-avatar>
                   {{ props.row.nome }}, <template v-if="props.row.dataNascimento">{{  props.row.dataNascimento | getIdade() }}</template>
                
                 <!-- {{  props.row.estadoCivil }} -->
             
            </q-td>
            
            <q-td  key="celular">
              {{  props.row.telefoneCelular }}
            </q-td>
            <q-td key="vaga" :props="props"> 
              <q-badge> {{ optionsVagas | categVagas(props.row.vaga_id) }} </q-badge>
            </q-td>
            <q-td key="email" :props="props">
                {{  props.row.email }}
            </q-td>
            <q-td key="cnh" :props="props">
                <template v-if="props.row.cnh"> 
                  <q-chip>
                    <q-avatar icon="check" color="positive" text-color="white" />
                    <!-- Categoria {{ props.row.categoria }}/ -->
                    <!-- <template v-if="props.row.dirige"> 
                       Dirijo
                    </template>
                     <template v-else> 
                       Não Dirijo
                    </template> -->
                  </q-chip>
                    
                  </template>
                <template v-else>Não</template>
            </q-td>
            <q-td key="redesSociais" :props="props" class="q-gutter-sm">
              <q-btn flat icon="fab fa-whatsapp" color="primary" :disabled="props.row.whatsapp ? false:true" :route="props.row.whatsapp" />
            
            </q-td>
            <q-td key="opcoes" style="width:300px" :props="props">
                <q-btn icon="fas fa-comment-alt" class="q-mr-sm"  color="primary" round size="sm" flat @click="openDialogAnotacoes(props.row)" >
                  <q-badge color="secondary" floating v-if="props.row.anotacoes != null && props.row.anotacoes != ''">!</q-badge>
                </q-btn>
                <q-btn round size="sm" class="q-mr-sm"  flat color="primary" icon="fa fa-eye"  @click="openPerfil(props.row)"  />
                <q-radio keep-color v-model="props.row.status" :val="1"  @input="dialogItem(props.row)"  color="teal" />
                <q-radio keep-color v-model="props.row.status" :val="2"  @input="atualizaStatusStandBy(props.row)" color="orange" />
                <q-radio keep-color v-model="props.row.status" :val="3"  @input="dialogItem(props.row)" color="red" />
                 
                <!-- <q-btn round size="sm" class="q-mr-sm" color="negative" icon="fas fa-trash" @click="dialogItem(props.row.nome,props.row.id)" /> -->
              
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
    <q-dialog v-model="dialogPerfil.persistent"  full-height  full-width>
      <Perfil :perfil="perfil" />
    </q-dialog>

    <!-- anotacoes -->
    <q-dialog v-model="dialogAnotacoes.persistent" persistent>
      <q-card style="width: 320px">
        <q-card-section class="row items-center">
          <q-input type="textarea" label="Anotações" v-model="dialogAnotacoes.anotacoes" style="width:100%" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat color="primary" @click="updateAnotacoes(dialogAnotacoes)"   label="Salvar" />
          <!-- <q-btn flat  icon="send" @click="sendWhats()" label="Enviar Whats" color="primary" v-close-popup /> -->
        </q-card-actions>
      </q-card>
    </q-dialog>
   <!-- anotações -->

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
import { LocalStorage } from 'quasar'
import Perfil from '../../../components/Perfil.vue'
import candidato from "../../../models/candidato.js";
import frases from "../../../models/frases.js"
import filters from "../../../filters/filters.js";
export default {
  name: 'PageIndex',
  filters: filters,
  components:{Perfil}, 
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
      vaga_id: 0,
      optionsVagas: [],
      perfil: candidato,
     dialog: {
        color: '',
        candidato: null,
        persistent: false,
        titulo: '',
        nome: '',
      },
      dialogPerfil:{
        persistent:false
      },
      dialogAnotacoes:{
        persistent:false,
        anotacoes:'',
        id:''
      },
      optionsCategoria: [],
      selected: [],
      filter: { vaga:0, status:'0'},
      text: '',
      loading: false,
      
      pagination: {
        sortBy: 'nome',
        descending: false,
        page: 1,
        rowsPerPage: 30,
        rowsNumber: 30,
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
          label: 'CNH',
          align: 'left'
         
        },

        
         {
          name: 'redesSociais',
          required: true,
          label: '',
          align: 'left'
         
        },
        {
          name: 'opcoes',
          required: true,
          label: 'Opções',
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
      
      if(e.status == 3){
        this.dialog.icon = 'trash';
        this.dialog.color = 'negative';
        this.dialog.titulo = 'será descartado';
      }
      else if(e.status == 1){
        this.dialog.icon = 'check';
        this.dialog.color = 'positive';
        this.dialog.titulo = 'irá para próxima fase';
      }
      this.dialog.persistent = true;
      this.dialog.candidato = e;
      this.dialog.nome= e.nome;
      //e.status= 0;
    },
    atualizaStatusStandBy (value){
      let formStatus={}
      let message= ''
      let assunto= ''
      
      formStatus = {
        id: value.id,
        status: value.status, 
        pagina:'candidatosStatus'
      }
      this.$store.dispatch('admin/update', formStatus)
        .then((resp) => {
          setTimeout(()=>{
            this.requestPagination()
          },300)
       
      }) 
     
    },
    atualizaStatus (value){
      let formStatus={}
      let message= ''
      let assunto= ''
      
      formStatus = {
        id: value.candidato.id,
        status: value.candidato.status, 
        pagina:'candidatosStatus'
      }
     
      if(value.candidato.status==1){
        assunto = frases.fase1.assuntoPassou
        message=  frases.fase1.passou
        
      }else if(value.candidato.status == 3){
        assunto = frases.fase1.assuntoNaoPassou
        message =  frases.fase1.naoPassou
      }
       
      this.$store.dispatch('admin/update', formStatus)
        .then((resp) => {
          setTimeout(()=>{
            this.requestPagination()
          },500)
        this.$store.dispatch('admin/mailingAvulso',{lista: value.candidato, message: message,assunto:assunto, fase:value.candidato.fase2})
        .then((resp) => {
          setTimeout(()=>{
          this.requestPagination()
          },500)
        })
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
    requestPagination () {
      this.onRequest({
        pagination: this.pagination,
        filter: this.filter
      })
    },
    openPerfil(value){
      this.dialogPerfil.persistent=true
      this.perfil = value
    },
    openDialogAnotacoes (e) {
      this.dialogAnotacoes.persistent = true;
      this.dialogAnotacoes.anotacoes = e.anotacoes;
      this.dialogAnotacoes.id= e.id;
      //e.status= 0;
    },
    updateAnotacoes(e){
      let dados = {
        id: e.id,
        anotacoes: e.anotacoes
      }
      console.log(dados)
      this.$store.dispatch('admin/updateAnotacoes', dados)
        .then((resp) => { 
          this.dialogAnotacoes.persistent = false;
          setTimeout(()=>{
            this.requestPagination()
          }, 300)  
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
