<template>
  <q-page class="flex flex-center column bg-primary">
   <img src="~assets/images/logo-top-villa-do-vale-boutique-hotel-e-bistro.png" />
   <h3 class="titulo text-secondary text-center">Trabalhe Conosco</h3>
   <div class="q-pa-md">
   
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-card class="q-pa-md">
        <q-form  ref="formCadastro" @reset.prevent.stop="onReset" class="q-gutter-md" v-if="!atualizacao_ok">
          <div class="text-h5 titulo text-secondary">Cadastre a nova senha</div>
            <p class="titulo text-secondary">{{this.$route.params.email}}</p>
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
              label="Cadastrar nova senha"
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
        <div v-if="atualizacao_ok">
          <q-card-section  class="column content-center">
            <div class="text-h6 titulo text-secondary">Senha atualizada com sucesso</div>
            <q-btn to="/" text-color="secondary" class="titulo" color="primary">ir a área de login</q-btn>
          </q-card-section>
        </div>
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
      atualizacao_ok:false,
      cadastro:{
        email: this.$route.params.email,
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
    onSubmitCadastro() {
     this.submitting = true
     this.$refs.formCadastro.validate().then(success => {
        if (success) {
          // yay, models are correct
          let cadastro = this.cadastro;
          this.$store.dispatch('user/alterarSenha', { cadastro })
            .then((resp) => {
               
               this.atualizacao_ok= true;this.submitting = false;
              // if (resp.data.error) {
              //   console.log(resp)
              //   this.$q.notify({
              //     icon: 'warning',
              //     color: 'negative',
              //     message: resp.data.error
              //   })
              //   this.submitting = false
              //   this.$refs.formCadastro.resetValidation()
                 
              // } else {
                
                
               
              // }
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
    }
  
  }
  
  
}
</script>
