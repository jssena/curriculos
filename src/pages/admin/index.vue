<template>
  <q-page class="flex flex-center column bg-primary">
   <img src="~assets/images/logo-top-villa-do-vale-boutique-hotel-e-bistro.png" />
   <h2 class="titulo text-secondary">Painel de controle</h2>
   <div class="q-pa-md">
   
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-card class="q-pa-md">
          <q-form ref="formLogin" class="q-gutter-md">
              <div class="text-h6 titulo text-secondary">Faça seu login</div>
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
      </q-card>
    </div>
  </div>
  </q-page>
</template>

<script>
export default {
  name: 'AdminIndex',
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

      submitting: false,
      confirma_senha: '',
      login:{
        email: '',
        senha: ''
      },
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
    onSubmitLogin () {
      this.submitting = true
      //his.$refs.myForm.resetValidation()
      //console.log(this.$refs.formLogin)
      this.$refs.formLogin.validate().then(success => {
        if (success) {
          // yay, models are correct
          let login = this.login;
          this.$store.dispatch('admin/login',  login )
            .then((resp) => {
              console.log(resp)
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
                this.$router.push('admin/area-restrita/candidatos')
                
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
        }
      })
    }
  }
}
</script>
