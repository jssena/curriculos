<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
 import axios from 'axios'
import { LocalStorage } from 'quasar'

export default {
  name: 'App',
  data () {
    return {
      validatingToken: true,
      
    }
  },
  methods: {
    async validateToken () {
      this.$q.loading.show({
        delay: 400 // ms
      })

      this.validatingToken = true

      const token = LocalStorage.getItem('authorization')
      console.log('token candidato',token)
      // const token = JSON.parse(json)
      // this.$store.commit('setUser', null)
      if (!token || token === 'undefined') {
        this.$q.loading.hide()
        this.validatingToken = false
        this.$store.dispatch('user/logout')
        return
      }
     // let itoken = token
      this.$store.dispatch('user/verificaLogin').then((res)=>{
        if (res.data.auth === true) {
          this.$q.loading.hide()
        // const token = res.data.key
        // const user = resp.data.user
        // LocalStorage.set('token', token)
        // axios.defaults.headers.common['token'] = token
        // this.$store.commit('user/authSuccess', token)
        } else {
          this.$q.notify.setDefaults({
            message: 'Tempo da sessão esgotado, por favor faça o login novamente.',
            icon: 'warning',
            position: 'top-right',
            timeout: 2500,
            textColor: 'white',
            actions: [{ icon: 'close', color: 'white' }]
          })
            this.$q.loading.hide()
            this.$store.dispatch('user/logout')
          }
        this.validatingToken = false
      }).catch((err)=>{
        this.$q.notify.setDefaults({
            message: 'Erro no servidor tente novamente',
            icon: 'warning',
            position: 'top-right',
            timeout: 2500,
            textColor: 'white',
            actions: [{ icon: 'close', color: 'white' }]
          })
          this.$q.loading.hide()
          this.$store.dispatch('user/logout')
      })

      
      
    },
    async validateTokenAdmin () {
      this.$q.loading.show({
        delay: 400 // ms
      })

      this.validatingToken = true

      const token = LocalStorage.getItem('authorization-admin')
      console.log('token admin',token)
      // const token = JSON.parse(json)
      // this.$store.commit('setUser', null)
      if (!token || token === 'undefined') {
        this.$q.loading.hide()
        this.validatingToken = false
        this.$store.dispatch('admin/logout')
        return
      }
     // let itoken = token
      this.$store.dispatch('admin/verificaLogin').then((res)=>{
        if (res.data.auth === true) {
          this.$q.loading.hide()
        // const token = res.data.key
        // const admin = resp.data.admin
        // LocalStorage.set('token', token)
        // axios.defaults.headers.common['token'] = token
        // this.$store.commit('admin/authSuccess', token)
        } else {
          this.$q.notify.setDefaults({
            message: 'Tempo da sessão esgotado, por favor faça o login novamente.',
            icon: 'warning',
            position: 'top-right',
            timeout: 2500,
            textColor: 'white',
            actions: [{ icon: 'close', color: 'white' }]
          })
          this.$q.loading.hide()
          this.$store.dispatch('admin/logout')
          }
        this.validatingToken = false
      }).catch((err)=>{
        this.$q.notify.setDefaults({
            message: 'Erro no servidor tente novamente',
            icon: 'warning',
            position: 'top-right',
            timeout: 2500,
            textColor: 'white',
            actions: [{ icon: 'close', color: 'white' }]
          })
          this.$q.loading.hide()
          this.$store.dispatch('admin/logout')
      })

      
      
    }
  },
  created: function () {
    
    this.validateToken();
    this.validateTokenAdmin();
  }
}
</script>
