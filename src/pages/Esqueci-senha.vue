<template>
  <q-page class="flex flex-center column bg-primary">
   <img src="~assets/images/logo-top-villa-do-vale-boutique-hotel-e-bistro.png" />
   <h3 class="titulo text-secondary text-center">Trabalhe Conosco</h3>
   <div class="q-pa-md">
   
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-card class="q-pa-md">
 
            <q-form  ref="formCadastro" @reset.prevent.stop="onReset" class="q-gutter-md">
              <div class="text-h5 titulo text-secondary">Digite seu e-mail cadastrado</div>
                
                <q-input
                  filled
                  v-model="email"
                  label="E-mail *"
                  lazy-rules
                  :rules="[
                    $rules.required('Digite seu e-mail'),
                    $rules.email('E-mail inválido')
                  ]"
                >
                </q-input>
               
              <div class="row justify-end">
                <q-btn
                  type="submit"
                  :loading="submitting"
                  @click.prevent.stop="onSubmitVerificaEmail"
                  label="Verificar"
                  class="q-mt-md q-mt-md titulo"
                  color="primary"
                  text-color="secondary"
                >
                  <template v-slot:loading>
                    <q-spinner-facebook />
                  </template>
                </q-btn>
              </div>
            </q-form>
      </q-card>
    </div>
  </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  computed:{
    
    requiredSenha() {
      return [
        (val) => val && val.length > 5 || 'Sua senha deve ser > que 5 caracteres'
      ]
    }
  },
  data () {
    return {
      submitting: false,
      email: ''
    }
  },
  methods: {

    onSubmitVerificaEmail() {
     this.submitting = true
     this.$refs.formCadastro.validate().then(success => {
        if (success) {
          // yay, models are correct
          let email = this.email;
          this.$store.dispatch('user/verificaEmail', { email })
            .then((resp) => {
               console.log(resp)
              if (resp.data.error) {
                console.log(resp)
                this.$q.notify({
                  icon: 'warning',
                  color: 'negative',
                  message: resp.data.error
                })
                this.submitting = false
                this.$refs.formCadastro.resetValidation()
                 
              } else {
                console.log(email)
                this.$router.push({name:'recuperar-senha', params: { email: email }})
                
              }
            })
            .catch((err) => {
              console.log(err)
              this.submitting = false
            })
        }
        else {
           this.submitting = false
          console.log('entrou no erro')
          // oh no, user has filled in
          // at least one invalid value
        }
      })
    },
    onSubmitLogin () {
      this.submitting = true
      //his.$refs.myForm.resetValidation()
      console.log(this.$refs.formLogin)
      this.$refs.formLogin.validate().then(success => {
        if (success) {
          // yay, models are correct
          let login = this.login;
          this.$store.dispatch('user/login',  login )
            .then((resp) => {
              console.log(resp)
              if (resp.data.error) {
                this.$q.notify({
                  icon: 'warning',
                  color: 'negative',
                  message: resp.data.error
                })
                this.submitting = false
                this.$refs.formCadastro.resetValidation()
                 
              } else {
                // axios.defaults.headers.common['token'] = LocalStorage.getItem('token')
                // console.log(axios.defaults)
                this.$router.push('/formulario')
                
              }
            })
            .catch((err) => {
              console.log(err)
              this.submitting = false
            })
        }
        else {
          console.log('entrou no erro')
          
          // oh no, user has filled in
          // at least one invalid value
        }
      })
     
       
         
    }
  },
  created(){
    this.$axios.get(`vagasHome`)
      .then(resp => {
        this.optionsVagas = resp.data
      })
      .catch(err => {
       
        //LocalStorage.remove('darkMode')
       
      })
  }
}
</script>
