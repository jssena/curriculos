<template>
  <q-page class="q-pa-md bg-primary">
    <q-toolbar>
      <q-space />
      <q-btn round color="secondary" icon="fas fa-sign-out-alt" @click="logout()" />
     
    </q-toolbar>
       
      <q-card class="q-pa-lg">
        <div class="row">
          <div class="col-md-2">
            
          </div>
          <div class="col-md-8" style="padding-bottom:20px">
            <q-media-player
              type="video"
              :sources=" [
                {
                  src:   global.baseURL+'assets/videos/Video-Villa-do-Vale-RH-etapa-2.mp4',
                  //src:  'http://localhost:3333/files/'+e.videos[0].url,
                  type: 'video/mp4'
                }
              ]"
              background-color='primary'
              />
          </div>
         
          <div class="col-md-12" >
              <p>Muito bem <strong>{{ formulario.nome | getFirstName() }}</strong>, você chegou até aqui e esse é um grande passo em direção à equipe do Villa do Vale. Parabéns.<br/>
                  Esta é a segunda etapa do nosso processo seletivo e agora queremos conhecer o rosto e a voz de cada currículo que selecionamos.<br/>
                  Grave um vídeo do seu celular falando um pouco de quem você é e o porquê você quer trabalhar no Villa do Vale.
                  Para que dê tudo certo, siga essas instruções:</p>
              <p> <span class="titulo">1</span> – Escolha um lugar tranquilo que tenha o mínimo de interferências de sons e ruídos externos;<br>
                  <span class="titulo">2</span> – <strong>Grave com o celular na horizontal</strong> e procure olhar para a câmera enquanto estiver falando;<br>
                  <span class="titulo">3</span> – Não precisa ser de corpo inteiro, o ideal é que seja apenas da cintura para cima, mas tome cuidado para centralizar em sua imagem pessoal;<br>
                  <span class="titulo">4</span> – O limite de tempo deve ser de no <strong>mínimo 1 e no máximo 2 minutos</strong>;<br>
                <span class="titulo"> 5</span> – Assista seu vídeo antes de enviar para ter certeza de que o som e a imagem estejam corretos. Estamos recebendo muitos vídeos e podemos não ter a possibilidade de lhe dar oportunidade de correções.</p>

            <p>Pronto, agora é só subir o vídeo na plataforma.<br/>
            <strong>Pode demorar um pouco para subir o vídeo, tenha calma,<br/>
            quando terminar irá aparecer um botão para você visualizar o vídeo e um botão também para poder apagar e subir novamente, se for necessário</strong><br/>
            Boa sorte!</p>
          </div>
          <div class="col-md-12 q-gutter-sm">
            <q-btn icon="fas fa-upload" color="primary"  @click="dialogUpload.persistent = true" padding="40px 15px" label="Upload video"/>
            <q-btn icon="fas fa-video"  color="secondary" @click="abreGravador()"  padding="40px 15px" label="Gravar video"/>
          </div>
          <div class="col-md-12">
            <template v-if="porcentagem > 0">
              {{porcentagem}}%
            </template>
            <template >
              <strong>  {{mensagem}}</strong>
            </template>
            
            <q-linear-progress :value="progress" class="q-mt-md" /> 
        
 
          </div>
         
        </div>
        <q-card-actions align="right" class="bg-white " :class="`text-red`">
            <q-btn flat icon="fas fa-play" label="ver seu vídeo" color="blue" v-if="formulario.videos.length > 0" :disabled="formulario.videos.length > 0 ? false:true"   @click="dialogVideoClick(formulario)"     />
            <q-btn flat icon="fas fa-trash" label="apagar o vídeo" color="red" v-if="formulario.videos.length > 0"    @click="dialogDeleteVideo(formulario)"     />
          </q-card-actions>
    </q-card>
   
    <q-dialog v-model="dialogVideo.persistent"  transition-show="scale" transition-hide="scale">
      <q-media-player
        type="video"
        :sources="dialogVideo.sources"
        background-color='primary'
        />
    />
    </q-dialog>

    <q-dialog v-model="dialog.persistent"  persistent transition-show="scale" transition-hide="scale">
      <q-card class="text-white" :class="`bg-red`"  style="width: 320px">
        <q-card-section class="column no-wrap flex-center">
          <q-icon name="fa fa-trash" size="30px"/>
          <p>Quer realmente apagar esse video?</p>
        </q-card-section>

        <q-card-actions align="right" class="bg-white " :class="`text-red`">
          <q-btn flat  label="cancelar" v-close-popup />
          <q-btn flat  label="confirmar" @click="deleteVideo(dialog)" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogGravacao.persistent"  persistent transition-show="scale" class="row" transition-hide="scale">
     
      <q-card class="text-white col"    style="width: 800px">
        <q-card-actions align="right"  >
          <q-btn flat icon="close" color="black" @click="fechaGravador()" />
        </q-card-actions>
        <div>
        <video id="myVideo" playsinline class="video-js vjs-default-skin">
            <p class="vjs-no-js">
                To view this video please enable JavaScript, or consider upgrading to a
                web browser that
                <a href="https://videojs.com/html5-video-support/" target="_blank">
                    supports HTML5 video.
                </a>
            </p>
        </video>
        </div>
        <q-card-actions align="left" class="bg-white "  >
          <q-btn round dense flat icon="fas fa-play" color="cyan" @click.prevent="startRecording()" v-if="!isStartRecording" id="btnStart"> Começar</q-btn>
          <q-btn round  dense  flat icon="fas fa-stop" color="cyan" @click.prevent="stopRecording()" v-if="!isStopDisabled" id="btnStop"> Parar</q-btn>
          <q-btn round dense   flat icon="fas fa-redo-alt" color="secondary" @click.prevent="retakeVideo()" v-if="!isRetakeDisabled" id="btnRetake">Regravar</q-btn>
          <q-space />
         
          <q-btn  type="button"  dense icon="send"   flat color="positive"  @click.prevent="submitVideo()" v-bind:disabled="isSaveDisabled" id="btnSave" v-close-popup>Enviar vídeo</q-btn>
         
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogUpload.persistent"  persistent transition-show="scale" transition-hide="scale">
   
      <q-card class="text-white"    style="width: 800px">
        <q-file standout="bg-primary text-white" bottom-slots
          :disable="formulario.videos.length > 0 ? true:false"
          v-model="files" style="max-width:700px"
          accept="video/*"
          :max-total-size="250 * 1024 * 1024"
          label="Clique aqui para anexar o seu vídeo (tamanho máximo do arquivo: 250mb)" 
          @rejected="onRejected"  >
          <template v-slot:prepend>
            <q-icon name="movie" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click.stop="model = null" class="cursor-pointer" />
          </template>
         
        </q-file>
        <q-card-actions align="right" class="bg-white " :class="`text-red`">
          <q-btn flat  label="cancelar" v-close-popup />
          <q-btn 
            dense
            flat
            icon="send"
            color="primary"
            label="subir vídeo"
            :disabled="(formulario.videos.length > 0 || files==null) ? true:false"
            :loading="submitting"
            @click="upload()"
            v-close-popup
          >
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
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
import global from 'boot/global'
import candidato from "../models/candidato.js";

import 'video.js/dist/video-js.css'
import 'videojs-record/dist/css/videojs.record.css'
import videojs from 'video.js'
import 'webrtc-adapter'
import RecordRTC from 'recordrtc'
import Record from 'videojs-record/dist/videojs.record.js'
import FFmpegjsEngine from 'videojs-record/dist/plugins/videojs.record.ffmpegjs.js';

export default {
  name: 'PageIndex',
  props: ['uploadUrl'],
  filters:{
    getFirstName(value){
      let newValue = value.split(' ')
     // console.log(newValue)
      return newValue[0]
    }
  },
  computed: {
   
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
   
    removeForm(objeto,id,order){
     // console.log(objeto,id,order)
      if(id) this.$store.dispatch(`user/deleteTab${objeto}`,id) ;
      this.formulario[objeto].splice(order-1,1);
    },
 
    sendNotificacao(icon, color, msg){
      this.$q.notify({
        icon: icon,
        color: color,
        message: msg
      })
    },
    upload () {
      let _this = this
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: function(progressEvent) {
          _this.porcentagem = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          _this.progress = ((progressEvent.loaded * 100) / progressEvent.total) / 100
          if(_this.porcentagem == 100){
            _this.mensagem = "comprimindo video aguarde..."
          }
        }
      }
      this.submitting = true
      // this.$store.dispatch('user/uploadVideo',{tipo:'fase2',files:this.files}).then(() => {
      //     this.submitting = false
      //     this.$store.dispatch("user/perfil").then(resp => { 
      //       this.formulario = resp.data
      //     });
      // })
      //loadProgressBar()

    let formData = new FormData();
    formData.append('file', this.files);
    axios.put(`upload/fase2`,formData,config )
      .then(resp => {
        this.$q.notify({
          icon: 'check',
          color: 'positive',
          message: 'Video salva com sucesso'
        })
        this.$store.dispatch("user/perfil").then(resp => {
          this.submitting = false
          this.mensagem = ''
          this.porcentagem = 0
          this.progress = 0
          this.formulario = resp.data
        });
         //resolve()
      })
      .catch(err => {
        this.$q.notify({
          icon: 'check',
          color: 'positive',
          message: 'Video salva com sucesso'
        })
         this.$store.dispatch("user/perfil").then(resp => {
          this.submitting = false
          this.mensagem = ''
          this.porcentagem = 0
          this.progress = 0
          this.formulario = resp.data
        });
        // resolve()
        //global.showError(err)
        //LocalStorage.remove('darkMode')
        //reject(err)
      })
      
    },
    dialogVideoClick (e) {
      this.dialogVideo.persistent = true;
      if(e.videos)
        this.dialogVideo.sources= [
          {
            src:  global.baseURL+'files/compress-'+e.videos[0].url,
            //src:  'http://localhost:3333/files/'+e.videos[0].url,
            type: 'video/mp4'
          }
        ] 
    },
    dialogDeleteVideo (e) {
      this.dialog.persistent = true;
      this.dialog.url = e.videos[0].url
      this.dialog.id = e.videos[0].id
      //console.log(this.dialog)
    },
    onRejected (rejectedEntries) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      this.$q.notify({
        type: 'negative',
        message: `Esse arquivo excedeu os 250 mb de tamanho`
      })
    },
    deleteVideo (e){
       this.$store.dispatch(`user/deleteVideo`,this.dialog).then(()=>{
         this.$store.dispatch("user/perfil").then(resp => {
            this.files = null;
            this.formulario = resp.data
          });
      }) ;
    },
    getPerfil(){
      this.$store.dispatch("user/perfil").then(resp => { 
        this.formulario = resp.data 
      });
    },
    abreGravador(){
      this.dialogGravacao.persistent = true
      setTimeout(()=>{
        
         this.player = videojs('myVideo', this.options, () => {
          // print version information at startup
          var msg = 'Using video.js ' + videojs.VERSION +
              ' with videojs-record ' + videojs.getPluginVersion('record') +
              ' and recordrtc ' + RecordRTC.version;
          videojs.log(msg);
      });
      // error handling
      this.player.on('deviceReady', () => {
          this.player.record().start();
          console.log('device ready:');
      });
      this.player.on('deviceError', () => {
          console.log('device error:', this.player.deviceErrorCode);
      });
      this.player.on('error', (element, error) => {
          console.error(error);
      });
      // user clicked the record button and started recording
      this.player.on('startRecord', () => {
          console.log('started recording!');
      });
      // user completed recording and stream is available
      this.player.on('finishRecord', () => {
          this.isSaveDisabled = false;
          if(this.retake == 0) {
              this.isRetakeDisabled = false;
          }
          // the blob object contains the recorded data that
          // can be downloaded by the user, stored on server etc.
          console.log('finished recording: ', this.player.recordedData);
      });

      },500)
     
    },
    fechaGravador(){
       this.dialogGravacao.persistent = false
      if (this.player) {
          this.player.dispose();
           this.player =''
           this.isStopDisabled =true
            this.isStartRecording = false
      }
    },
    startRecording() {
      this.isStopDisabled =false
      this.isStartRecording = true;
      this.player.record().getDevice();
    },
    stopRecording() {
      this.isSaveDisabled = false;
      this.isStopDisabled =true;
      this.isRetakeDisabled = false;
      this.retake += 1;
      this.player.record().stop();
    },
    submitVideo() {
      this.isSaveDisabled = true;
      this.isRetakeDisabled = true;
      var data = this.player.recordedData;
      var formData = new FormData();
      formData.append('file', data, data.name);
      this.submitText = "Uploading "+data.name;
      console.log('uploading recording:', data.name);
      this.player.record().stopDevice();
      let _this = this
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: function(progressEvent) {
          _this.porcentagem = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          _this.progress = ((progressEvent.loaded * 100) / progressEvent.total) / 100
          if(_this.porcentagem == 100){
            _this.mensagem = "comprimindo video aguarde..."
          }
        }
      }
      axios.put(`upload/fase2`,formData, config).then(
          success => {
              console.log('recording upload complete.');
              this.submitText = "Upload Complete";
              this.$q.notify({
                icon: 'check',
                color: 'positive',
                message: 'Video salva com sucesso'
              })
              this.$store.dispatch("user/perfil").then(resp => {
                this.submitting = false
                this.mensagem = ''
                this.porcentagem = 0
                this.progress = 0
                this.formulario = resp.data
                this.player.dispose();
                this.player =''
              });
          }
      ).catch(
          error =>{
              console.error('an upload error occurred!');
              this.submitText = "Upload Failed";
          }
      );
    },
    retakeVideo() {
      this.isSaveDisabled = true;
      this.isRetakeDisabled = true;
      this.isStopDisabled =false;
      this.retake += 1;
      this.player.record().start();
    }
    
  },
  data () {
    return {
      mensagem:'',
      porcentagem: 0,
      global:global,
      progress:0,
      files: null,
      submitting: false,
      form:{},
      step_fase2:1,
      reset:false,
      dialogVideo: {
        id: 0,
        url: '',
        persistent: false,
       
      },
      dialog: {
        id: 0,
        url: '',
        persistent: false,
      },
      dialogGravacao:{
        persistent:false
      },
      dialogUpload:{
        persistent:false
      },
      formulario: candidato,
      player: '',
      retake: 0,
      isSaveDisabled: true,
      isStopDisabled: true,
      isStartRecording: false,
      isRetakeDisabled: true,
      submitText: 'Submit',
      options: {
          controls: true,
          bigPlayButton: false,
          controlBar: {
              deviceButton: false,
              recordToggle: false,
              pipToggle: false
          },
          width: 500,
          height: 300,
          fluid: true,
          plugins: {
              record: {
                  pip: false,
                  audio: true,
                  video: true,
                  maxLength: 120,
                  debug: true
              }
          }
      }
    }
  },
  mounted() {
      
  },
  created () {
    this.getPerfil()
  },
  beforeDestroy() {
      if (this.player) {
          this.player.dispose();
      }
  }
   
}
</script>
