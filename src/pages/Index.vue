<template>
  <q-page class="flex flex-center column bg-primary">
   <img src="~assets/images/logo-top-villa-do-vale-boutique-hotel-e-bistro.png" />
   <h3 class="titulo text-secondary text-center">Trabalhe Conosco</h3>
   <div class="q-pa-md">
   
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-card>
        <q-tabs
          v-model="tab"
           
          class="bg-grey-3 text-grey-7 titulo"
          active-color="secondary"
          indicator-color="secondary"
          align="justify"
        >
          <q-tab name="cadastre" label="Cadastre-se" />
          <q-tab name="login" label="Faça o seu login" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated class="bg-white text-grey">
          <q-tab-panel name="cadastre">
            <q-form  ref="formCadastro" @reset.prevent.stop="onReset" class="q-gutter-md">
              <div class="text-h5 titulo text-secondary">Cadastre o seu currículo no nosso sistema</div>
                <q-select filled 
                  v-model="cadastro.vaga_id"
                  option-value="id"
                  option-label="nome"
                  option-disable="disponivel"
                  emit-value
                  map-options
                  :options="optionsVagas" 
                  lazy-rules
                  :rules="[$rules.required('Selecione a vaga')]"
                  label="Vagas disponíveis" />
                <q-input
                  filled
                  v-model="cadastro.email"
                  label="E-mail *"
                  lazy-rules
                  :rules="[
                    $rules.required('Digite seu e-mail'),
                    $rules.email('E-mail inválido')
                  ]"
                >
                </q-input>
                <q-input
                  ref="senhaCadastro"
                  filled
                  v-model="cadastro.senha"
                  label="Senha *"
                  lazy-rules
                  :type="isPwd1 ? 'password' : 'text'"
                  :rules="[
                    $rules.required('Digite a senha'),
                    $rules.minLength(5, 'Sua senha deve ter ao menos 5 letras'),
                    $rules.maxLength(10, 'Sua senha não pode ser maior que 10 letras') 
                  ]"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd1 ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd1 = !isPwd1"
                    />
                  </template>
                </q-input>
                <q-input
                  filled
                  ref="confirmaSenha"
                  v-model="confirma_senha"
                  label="Confirme a senha *"
                  lazy-rules
                  :type="isPwd2 ? 'password' : 'text'"
                  :rules="[
                    $rules.required('Confirme a sua senha'),
                    $rules.minLength(5, 'Sua senha deve ter ao menos 5 letras'),
                    $rules.maxLength(10, 'Sua senha não pode ser maior que 10 letras'), 
                    $rules.sameAs(this.cadastro.senha,'A senha está diferente')
                  ]"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd2 ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd2 = !isPwd2"
                    />
                  </template>
                </q-input>
              <div class="row justify-end">
                <q-btn
                  type="submit"
                  :loading="submitting"
                  @click.prevent.stop="onSubmitCadastro"
                  label="Cadastrar"
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
          </q-tab-panel>

          <q-tab-panel name="login">
            <q-form ref="formLogin"  @reset.prevent.stop="onReset" class="q-gutter-md">
              <div class="text-h6 titulo text-secondary">Acesse o nosso painel para você atualizar seu currículo</div>
              <q-input
                filled
                v-model="login.email"
                label="E-mail *"
                lazy-rules
                :rules="[
                  $rules.required('Digite o seu e-mail'),
                  $rules.email('E-mail inválido')
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="mail" />
                </template>
  
              </q-input>
              <q-input
                ref="password"
                filled
                class="q-mt-md"
                v-model="login.senha"
                label="Senha"
                :type="isPwd ? 'password' : 'text'"
                lazy-rules
                :rules="[
                  $rules.required('Digite a sua senha'),
                  $rules.minLength(5, 'Sua senha deve ter ao menos 5 letras'),
                  $rules.maxLength(10, 'Sua senha não pode ser maior que 10 letras') 
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              <router-link to="/esqueci-senha">
               esqueci a senha
              </router-link>
              <div class="row justify-end">
                <q-btn
                  type="submit"
                  :loading="submitting"
                  @click.prevent.stop="onSubmitLogin"
                  label="Entrar"
                  class="q-mt-md titulo"
                  color="primary"
                  text-color="secondary"
                >
                  <template v-slot:loading>
                    <q-spinner-facebook />
                  </template>
                </q-btn>
              </div>
            </q-form>
          </q-tab-panel>
 
        </q-tab-panels>
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
      isPwd:'password',
      isPwd1:'password',
      isPwd2:'password',
      tab: 'cadastre',
      submitting: false,
      confirma_senha: '',
      cadastro:{
        vaga_id: '',
        email: '',
        senha: ''
      },
      login:{
        email: '',
        senha: ''
      },
      optionsVagas: [],
    }
  },
  methods: {
    confirmaSenha(val) {
       
      return val => val != this.$refs.senha.value || 'Sua senha deve ser > que 5 caracteres'
   
    },
    isValidEmail (val) {
    const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
    return emailPattern.test(val) || 'E-mail inválido';
    },
    onSubmitCadastro() {
     this.submitting = true
     this.$refs.formCadastro.validate().then(success => {
        if (success) {
          // yay, models are correct
          let cadastro = this.cadastro;
          this.$store.dispatch('user/cadastrar', { cadastro })
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
          this.submitting = false
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
              //console.log(resp)
               this.submitting = false
              if (resp.data.error) {
                this.$q.notify({
                  icon: 'warning',
                  color: 'negative',
                  message: resp.data.error
                })
               
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
          this.submitting = false
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
