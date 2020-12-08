<template>
  <q-page class="bg-primary"> 
    <q-toolbar>
      <img src="~assets/images/logo-top-villa-do-vale-boutique-hotel-e-bistro.png" class="col-xs-2" />
       <q-tabs v-model="tab" shrink stretch class='text-white'>
        <q-route-tab name="candidatos" to="/admin/area-restrita/candidatos" label="Candidatos" />
        <q-route-tab name="fase2"  to="/admin/area-restrita/fases2"   label="Fase 2" />
        <q-route-tab name="fase3"   to="/admin/area-restrita/fases3"  label="Fase 3" />
        <q-route-tab name="fase4"  to="/admin/area-restrita/fases4"  label="Fase 4" />
        <q-route-tab name="fase5"  to="/admin/area-restrita/fases5"  label="Fase 5" />
        <q-route-tab name="usuarios" to="/admin/area-restrita/usuarios" label="Usuários" />
        <q-route-tab name="vagas" to="/admin/area-restrita/vagas" label="Vagas" />
        <!-- <q-route-tab name="disc" to="/admin/area-restrita/disc" label="DISC" /> -->
        <q-route-tab name="agenda" to="/admin/area-restrita/agenda" label="Configurar agenda" />
      </q-tabs>
      <q-space />
      <q-btn round color="secondary" icon="fas fa-sign-out-alt" @click="logout()" />
    </q-toolbar>   
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-page>
</template>
<script>
export default {
  name: 'AdminIndex',
  data () {
    return {
      isPwd:'password',
      tab: 'candidatos',
      submitting: false,
      confirma_senha: '',
      login:{
        email: '',
        senha: ''
      },
    }
  },
  methods:{
    logout () {
      this.$store.dispatch('admin/logout').then(() => {
        this.$router.push('/admin')
      })
    },
    navigateFn(to, append, replace){

    }
  }
}
</script>
