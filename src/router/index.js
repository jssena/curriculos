import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function ( { store } ) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth) === true) {
     

      if (store.getters['user/isLoggedIn'] === true) {

        store.dispatch("user/fases").then(resp => { 
          let formulario = {}
          formulario = resp.data
          if(formulario.status == null){
            next('/formulario')
          }else if(formulario.status == 1){
            if(formulario.fase2 == null){
              next('/fase2')
            }else if(formulario.fase2 == 1){
              if(formulario.fase3 == null){
                next('/fase3')
              }else if(formulario.fase3 == 1){
                
                  next('/fase4')
              }else{
                next('/fase3')
              }
             
            }else{
              next('/fase2')
            }
            
          }else{
            next('/formulario')
          }
            
        });
        next()
        return
      }
      
      if(store.getters['admin/isLoggedIn'] === true){
        next()
        return
      } 
      else next('/admin')
    } else {
      next()
    }
  })

  return Router
}
