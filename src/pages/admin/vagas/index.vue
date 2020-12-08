<template>
   <div class="q-pa-md full-width">
        <!--:selected.sync="selected"-->
      <q-table
        
        :data="data"
        :columns="columns"
        color="amber"
        :filter="filter"
        :selected-rows-label="getSelectedString"
        :pagination.sync="pagination"
        :loading="loading"
        row-key="id"
        @request="onRequest"
        :grid="list"
        :grid-header="list"
      >
        <template v-slot:top="props">
          <q-btn color="primary"     icon="add" round >
           <q-popup-edit v-model="form"  @save="salvar(form)" buttons>
             <q-input  v-model="form.nome" dense autofocus counter>
              <template v-slot:append>
                <q-icon name="edit" />
              </template>
            </q-input>
            <q-toggle
              v-model="form.disponivel"
              color="green"
              :false-value="0"
              :true-value="1"
            />
          </q-popup-edit>
          </q-btn>
          <q-space />
          <q-btn-toggle
            v-model="list"
            class="q-ma-sm"
            push
            size="10px"
            toggle-color="primary"
            :options="[
              {icon:'fas fa-list', value: false},
              {icon:'fas fa-grip-vertical', value: true}
            ]"
          />
      </template>
      <template v-slot:item="props" v-if="list">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card :class="props.selected ? 'bg-grey-2' : ''" class="text-weight-medium">
            
            <q-item>

              <q-item-section>
                <q-item-label>{{ props.row.nome }} 
                  <q-popup-edit v-model="props.row.nome" @save="update(props.row)" buttons>
                <q-input type="text" v-model="props.row.nome"  dense autofocus />
              </q-popup-edit></q-item-label>
              </q-item-section>
              <q-item-section side>
                  <q-toggle
                    v-model="props.row.disponivel"
                    color="green"
                    :false-value="0"
                    :true-value="1"
                    @input="update(props.row)"
                  />
                </q-item-section>
              </q-item>
            
          </q-card>
        </div>
      </template>
      <template v-slot:body="props"  v-if="!list">
        <q-tr :props="props">
            <!-- <q-td auto-width >
                <q-checkbox v-model="props.selected" />
            </q-td> -->
             
            <q-td key="nome" :props="props">
                {{ props.row.nome }}
              <q-popup-edit v-model="props.row.nome" @save="update(props.row)" buttons>
                <q-input type="text" v-model="props.row.nome"  dense autofocus />
              </q-popup-edit>
            </q-td>
            <q-td key="disponivel" :props="props">
               <q-toggle
                  v-model="props.row.disponivel"
                  color="green"
                  :false-value="0"
                  :true-value="1"
                  @input="update(props.row)"
                />
                <!-- {{ props.row.disponivel}} -->
            </q-td>
             
            <!-- <q-td>
              <div class="botoes"  >
                <q-btn round size="sm" class="q-mr-sm" color="primary" icon="edit" @click="enviaObjParaEditar(props.row)" :to="`${pagina}/edit`" />  
                <q-btn round size="sm" class="q-mr-sm" color="negative" icon="fas fa-trash" @click="dialogItem(props.row.nome,props.row.id)" /> 
              </div>
            </q-td> -->
        </q-tr>
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

export default {
  name: 'PageIndex',
  
  data () {
    return {
      pagina:'vagas',
      dialog: {
        id: 0,
        nome: '',
        persistent: false,
        tituloRemove: this.$t('temCertezaRemover')
      },
      list: false,
      optionsCategoria: [],
      selected: [],
      filter: '',
      text: '',
      loading: false,
      tituloRemove: this.$t('temCertezaRemover'),
      form:{
        id:0,
        nome:'',
        disponivel:0
      },
      pagination: {
        sortBy: 'nome',
        descending: false,
        page: 1,
        rowsPerPage: 50,
        rowsNumber: 50
      },
      columns: [
       
        {
          name: 'nome',
          required: true,
          label: 'Vaga',
          align: 'left',
          
        },
         {
          name: 'disponivel',
          required: true,
          label: 'Disponivel',
          align: 'left',
         
        }
      ],
      data: []
    }
  },
  methods: {
    enviaObjParaEditar (obj) {
      // console.log(obj);
      this.$store.commit('admin/editarObjeto',obj)
    },
    dialogItem (e, id) {
      this.dialog.persistent = true
      this.dialog.nome = e
      this.dialog.id = id
    },
    salvar(value){
      console.log(value)
      this.$store.dispatch('admin/create', { nome:value.nome, disponivel:value.disponivel, pagina:this.pagina })
        .then((resp) => {
          this.requestPagination()
        })
    },
    update(value){
      this.$store.dispatch('admin/update', { id: value.id, nome:value.nome, disponivel:value.disponivel, pagina:this.pagina })
        .then((resp) => {
          this.requestPagination()
        })
    },
    removeItem () {
      this.$store.dispatch('admin/deleteRow', { id: this.dialog.id, pagina: this.pagina} )
        .then((resp) => {
          console.log(resp);
          this.requestPagination()
         
        })
    },
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
    },
    requestPagination () {
      this.onRequest({
        pagination: this.pagination
      })
    },
    onRequest (props) {
      let { page, rowsPerPage, rowsNumber, sortBy, descending } = props.pagination
      // let filter = props.filter

      this.loading = true
      // update rowsCount with appropriate value
      // this.pagination.rowsNumber = this.getRowsNumberCount(filter)
      // get all rows if "All" (0) is selected
      let fetchCount = rowsPerPage === 0 ? rowsNumber : rowsPerPage

      // calculate starting row of data
       let startRow = (page - 1)
       console.log(page)
      // axios.defaults.headers.common['token'] = LocalStorage.getItem('token')
      this.$store.dispatch(`admin/list`,{ pagina: this.pagina, offset: startRow, limit: fetchCount}).then((resp) => {
        console.log(resp)
        // fetch data from "server"
        let returnedData = resp.data.list
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
    
    this.requestPagination()
  }
}
</script>
