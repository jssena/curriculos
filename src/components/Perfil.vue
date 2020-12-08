<template>
<q-card v-if="perfil"> 
  <q-toolbar>
    <q-toolbar-title>{{ perfil.nome }}, <template v-if="perfil.dataNascimento">{{  perfil.dataNascimento | getIdade() }} <q-badge>{{ optionsVagas | categVagas(perfil.vaga_id) }}</q-badge></template></q-toolbar-title>
    <q-space />
    <q-item>
      <q-item-section avatar>
        <q-icon name="drive_eta" color="primary"></q-icon>

        <!-- <q-item-label>{{ props.cols[4].label}}</q-item-label> -->
      </q-item-section>
      <q-item-section>
        <q-item-label  class="text-weight-medium" > 
          <template v-if="perfil.cnh"> 

              Cat. {{ perfil.categoria }}/
              <template v-if="perfil.dirige"> 
                Dirijo
              </template>
              <template v-else> 
              Não Dirijo
              </template>/
              <template v-if="perfil.veiculoProprio"> 
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
    <q-btn flat type="a" icon="fab fa-whatsapp" color="primary" :disabled="perfil.whatsapp ? false:true" :href="perfil.whatsapp ? 'https://api.whatsapp.com/send?phone=+55'+ perfil.whatsapp +'&text=Olá' : ''" target="_blank"  />
    <q-btn flat type="a" icon="fab fa-facebook" color="blue" :disabled="perfil.facebook ? false:true" :href="perfil.facebook | formataLink('face')" target="_blank"   />
    <q-btn flat type="a" icon="fab fa-linkedin" color="blue-10" :disabled="perfil.linkedin ? false:true" :href="perfil.linkedin | formataLink('linke')" target="_blank"    />
    <q-btn flat type="a" icon="fab fa-instagram" color="pink" :disabled="perfil.instagram ? false:true" :href="perfil.instagram  | formataLink('insta')" target="_blank"    />
  </q-toolbar>
  
  <q-separator />

  <q-card-section style="max-height: 75vh" class="scroll">
      
      <q-separator />
      <q-card-section  horizontal>
        <q-card-section class="col">
          <q-list   separator>
            <q-item  :disable="perfil.formacoes.length == 0 ? true:false">
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white" size="24px">
                    {{ perfil.formacoes.length }}
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Formação</q-item-label>
                  <q-item-label  caption lines="2">{{ perfil.formacao }},
                    <template v-if="perfil.completo == 1">completo</template>
                    <template v-else>Não completo</template>
                  </q-item-label>
                </q-item-section>
            </q-item>
            
            <q-item 
              v-for="(item, index) in perfil.formacoes"
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
            <q-item :disable="perfil.cursos.length == 0 ? true:false">
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white" size="24px">
                    {{ perfil.cursos.length }}
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  Cursos 
                </q-item-section>
              </q-item>
              <q-item 
                v-for="(item, index) in perfil.cursos"
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
            <q-item dense :disable="perfil.idiomas.length == 0 ? true:false">
            
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white" size="24px">
                  {{ perfil.idiomas.length }}
                </q-avatar>
              </q-item-section>
              <q-item-section>
                Idiomas
              </q-item-section>
            </q-item>
            <q-item 
              v-for="(item, index) in perfil.idiomas"
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
            <q-item dense :disable="perfil.experiencias.length == 0 ? true:false">
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white" size="24px">
                  {{ perfil.experiencias.length }}
                </q-avatar>
              </q-item-section>
              <q-item-section>
                Experiências
              </q-item-section>
            </q-item>
            <q-item 
              v-for="(item, index) in perfil.experiencias"
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
                  <q-item-label>{{perfil.pesquisa1}}</q-item-label>
                    <q-item-label v-if="perfil.pesquisa1_texto1">{{perfil.pesquisa1_texto1}}</q-item-label>
                  <q-item-label v-if="perfil.pesquisa1_texto2">{{perfil.pesquisa1_texto2}}</q-item-label>

                </q-item-section>
              </q-item>
              <q-item >
                <q-item-section>
                  <q-item-label>Está disposto a mudar de cidade?</q-item-label>
                </q-item-section>
                <q-item-section  side >
                  
                    <q-icon name="check" color="primary" v-if="perfil.pesquisa2 == 1"  />
                    <q-icon name="close" color="negative" v-if="perfil.pesquisa2 == 0"  />
                  
                </q-item-section>
              </q-item>
              <q-item >
                <q-item-section>
                  <q-item-label>Tem recursos próprios para isso?</q-item-label> 
                </q-item-section>
                <q-item-section  side >
                    <q-icon name="check" color="primary" v-if="perfil.pesquisa3 == 1"  />
                    <q-icon name="close" color="negative" v-if="perfil.pesquisa3 == 0"  />
                    
                </q-item-section>
              </q-item>
              <q-item >
                <q-item-section>
                  <q-item-label>Tem amigos ou familiares em Blumenau ou proximidades?</q-item-label>
                </q-item-section>
                <q-item-section  side >
                    <q-icon name="check" color="primary" v-if="perfil.pesquisa4 == 1"  />
                    <q-icon name="close" color="negative" v-if="perfil.pesquisa4 == 0"  />  
                </q-item-section>
              </q-item>
              <q-item >
                <q-item-section>
                  <q-item-label>Fuma?</q-item-label>
                  
                </q-item-section>
                <q-item-section  side >
                    <q-icon name="check" color="primary" v-if="perfil.pesquisa5 == 1"  />
                    <q-icon name="close" color="negative" v-if="perfil.pesquisa5 == 0"  />  
                </q-item-section>
              </q-item>
              <q-item >
                <q-item-section>
                  <q-item-label>Pratica exercícios físicos regularmente?</q-item-label>
                  
                </q-item-section>
                <q-item-section  side >
                    <q-icon name="check" color="primary" v-if="perfil.pesquisa6 == 1"  />
                    <q-icon name="close" color="negative" v-if="perfil.pesquisa6 == 0"  />  
                </q-item-section>
              </q-item>
              <q-item >
                <q-item-section>
                  <q-item-label>Teve contato direto com o Corona</q-item-label>
                </q-item-section>
                <q-item-section  side >
                    <q-icon name="check" color="primary" v-if="perfil.pesquisa7 == 1"  />
                    <q-icon name="close" color="negative" v-if="perfil.pesquisa7 == 0"  />  
                </q-item-section>
              </q-item>
              
            </q-list>
        </q-card-section>
      </q-card-section>
      <q-separator />
      <q-card-section  class="col" v-if="perfil.fase2==1">
            <q-list separator>
              <q-item >
              <q-item-section>
                Questionário
              </q-item-section>
              </q-item>
              <q-item >
                <q-item-section>
                  <q-item-label>1-	Qual foi sua maior contribuição para uma empresa em sua trajetória profissional? Em que momento isso aconteceu e em que empresa você estava?</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                    <q-item-label >{{perfil.questionario1}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item >
                <q-item-section>
                  <q-item-label>2-	Quais são os elogios mais frequentes que você costuma ouvir no trabalho e por que acha que eles são merecidos?</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                    <q-item-label >{{perfil.questionario2}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item >
                <q-item-section>
                  <q-item-label>3-	O que você espera de um líder?</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                    <q-item-label >{{perfil.questionario3}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item >
                <q-item-section>
                  <q-item-label>4-	Qual sua maior falha profissional, em que momento ela aconteceu, em que empresa você estava e o que você aprendeu com ela?</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                    <q-item-label >{{perfil.questionario4}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item >
                <q-item-section>
                  <q-item-label>5-	Quais comportamentos pessoais você já identificou que precisam ser modificados e/ou melhorados para se tornar um profissional mais produtivo e excelente?</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                    <q-item-label >{{perfil.questionario5}}</q-item-label>
                </q-item-section>
              </q-item>
 
            </q-list>
        </q-card-section>
      <q-card-actions align="right">
        
      </q-card-actions>
      
  </q-card-section>

  <q-separator />

  <q-card-actions align="right">
    <q-btn  flat disable>
      <q-icon name="house" color="primary"></q-icon>
      {{ perfil.endereco }}, {{ perfil.cidade }}
    </q-btn>
    <q-btn  flat disable>
      <q-icon name="settings_cell" color="primary"></q-icon>
      {{ perfil.telefoneCelular }}
    </q-btn>
    <q-btn  flat>
      <q-icon name="mail" color="primary"></q-icon>
      {{ perfil.email }}
    </q-btn>
    <q-btn  flat disable>
        <q-icon name="phone"  color="primary"></q-icon>
      {{ perfil.telefoneResidencial }}
    </q-btn>
    <q-btn  flat disable>
        <q-icon name="contact_phone"  color="primary"></q-icon>
      {{ perfil.telefoneRecado }}
    </q-btn>
    <q-btn flat label="fechar" color="primary" v-close-popup />
  </q-card-actions>
</q-card>
</template>
<style lang="scss">
 
</style>
<script>
import filters from "../filters/filters.js";
export default {
  name: 'perfil',
  filters: filters,
   props: {
    perfil:Object,
  
  },
  data () {
  return {
    optionsVagas:[]
  }
  },
  methods:{
     
  },
  created(){
     this.$axios.get(`vagasHome`)
      .then(resp => {
      
        this.optionsVagas = resp.data;
        this.optionsVagas.push({nome:'Todos',id:0,disponivel:1})
      })
  }
}
</script>
