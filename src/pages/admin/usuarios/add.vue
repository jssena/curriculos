<template>
  <q-form  ref="formCadastro"  class="q-gutter-md">
    <div class="text-h5 titulo text-secondary">Cadastre o seu currículo no nosso sistema</div>
      <q-input
        filled
        v-model="cadastro.nome"
        label="Nome"
        lazy-rules
        :rules="[
          $rules.required('Digite seu e-mail')
        ]"
      >
      </q-input>
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
        
        :loading="submitting"
        to="/admin/area-restrita/usuarios"
        label="Voltar"
        flat
        class="q-mt-md q-mt-md titulo"
        color="primary"
        text-color="secondary"
      >
      </q-btn>
      <q-btn
        type="submit"
        :loading="submitting"
        @click.prevent.stop="onSubmitCadastro"
        label="Salvar"
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
</template>

<script>
export default {
  name: 'PageIndex',
  computed: {
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
        nome: '',
        email: '',
        senha: ''
      }
    }
  },
  methods: {
    onSubmitCadastro() {
     this.submitting = true
     this.$refs.formCadastro.validate().then(success => {
        if (success) {
          // yay, models are correct
          let cadastro = this.cadastro;
          this.$store.dispatch('admin/cadastrar', { cadastro })
            .then((resp) => {
             
              if (resp.data.error) {
                
                this.$q.notify({
                  icon: 'warning',
                  color: 'negative',
                  message: resp.data.error
                })
                this.submitting = false
              } else {
                this.cadastro = {
                  nome: '',
                  email: '',
                  senha: ''
                }
                this.confirma_senha= '';
                this.$refs.formCadastro.resetValidation()
                this.submitting = false
                
                this.$q.notify({
                  icon: 'check',
                  color: 'positive',
                  message: 'Cadastrado com sucesso'
                })
              
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
    },
     
   
  }
}
</script>
