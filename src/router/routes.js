
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: false
    },
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/formulario',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      { path: '', component: () => import('pages/Formulario.vue') }
    ]
  },
  {
    path: '/fase2',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      { path: '', component: () => import('pages/Fase2.vue') }
    ]
  },
  {
    path: '/fase3',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      { path: '', component: () => import('pages/Fase3.vue') }
    ]
  },
  {
    path: '/fase4',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      { path: '', component: () => import('pages/Fase4.vue') }
    ]
  },
  {
    path: '/esqueci-senha',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: false
    },
    children: [
      { path: '', component: () => import('pages/Esqueci-senha.vue') }
    ]
  },
  {
    path: '/recuperar-senha',
    //name:'recuperar-senha',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: false
    },
    children: [
      { path: '', name:'recuperar-senha', component: () => import('pages/Recuperar-senha.vue') }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    meta: {
      requiresAuth: false
    },
    children: [
      { path: '', component: () => import('pages/admin/Index.vue') },
      { path: 'area-restrita', component: () => import('pages/admin/area-restrita.vue'),
       meta: {
      requiresAuth: true
      },
        children:[
          { path: 'candidatos', component: () => import('pages/admin/candidatos/index.vue')},
          { path: 'perfil', name:'perfil',component: () => import('pages/admin/candidatos/perfil.vue')},
          //{ path: 'fase2', name:'fase2',component: () => import('pages/admin/candidatos/fase2.vue')},
          { path: 'fases2', name:'fases2',component: () => import('pages/admin/candidatos/fase2.vue')},
          { path: 'fases3', name:'fases3',component: () => import('pages/admin/candidatos/fase3.vue')},
          { path: 'fases4', name:'fases4',component: () => import('pages/admin/candidatos/fase4.vue')},
          { path: 'fases5', name:'fases5',component: () => import('pages/admin/candidatos/fase5.vue')},
          { path: 'vagas', component: () => import('pages/admin/vagas/index.vue')},
          { path: 'disc', component: () => import('pages/admin/disc/index.vue')},
          { path: 'agenda', component: () => import('pages/admin/candidatos/agenda.vue')},
          { path: 'usuarios', component: () => import('pages/admin/usuarios/index.vue')},
          { path: 'usuarios/add', component: () => import('pages/admin/usuarios/add.vue') }
        ] 
      }
    ]
  },
   

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
