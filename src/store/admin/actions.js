import axios from 'axios'
import global from 'boot/global'
import { LocalStorage, Notify } from 'quasar'
export const cadastrar = ({ commit }, form) => {
  return new Promise((resolve, reject) => {
     
    axios.post(`cadastrar`, form)
      .then(resp => {
       
          resolve(resp)
        
      })
      .catch(err => {
        global.showError(err)
        commit('authError')
        LocalStorage.remove('authorization-admin')
        //LocalStorage.remove('darkMode')
        reject(err)
      })
  })
}
export const login = ({ commit }, user) => {
  return new Promise((resolve, reject) => {
    commit('authRequest')
    axios.post(`login`, user)
      .then(resp => {
        if (resp.data.auth === true) {
          
          const authorization = resp.data.token
          console.log(authorization)
          LocalStorage.set('authorization-admin', authorization)
           
          axios.defaults.headers.common['authorization-admin'] = authorization
          commit('authSuccess', authorization)
          resolve(resp)
        } else {
          // global.showError(resp.data.erro)
          commit('authError')
          LocalStorage.remove('authorization-admin')
          resolve(resp)
        }
      })
      .catch(err => {
        global.showError(err)
        commit('authError')
        LocalStorage.remove('authorization-admin')
        //LocalStorage.remove('darkMode')
        reject(err)
      })
  })
}

export const list = ({ commit }, params) => {
  return new Promise((resolve, reject) => {
   //commit('authRequest')
    
    axios.get(`${params.pagina}/${params.offset}/${params.limit}`)
      .then(resp => {
          resolve(resp)
      })
      .catch(err => {
        global.showError(err)
        commit('authError')
        LocalStorage.remove('authorization-admin')
        //LocalStorage.remove('darkMode')
        reject(err)
      })
  })
}
export const create = ({ commit }, params) => {
  return new Promise((resolve, reject) => {
   //commit('authRequest')
     
    axios.post(`${params.pagina}`, params)
      .then(resp => {
          resolve(resp)
      })
      .catch(err => {
        global.showError(err)
        commit('authError')
        LocalStorage.remove('authorization-admin')
        //LocalStorage.remove('darkMode')
        reject(err)
      })
  })
}
export const update = ({ commit }, params) => {
  return new Promise((resolve, reject) => {
   //commit('authRequest')
     
    axios.put(`${params.pagina}`, params)
      .then(resp => {
          resolve(resp)
      })
      .catch(err => {
        global.showError(err)
        commit('authError')
        LocalStorage.remove('authorization-admin')
        //LocalStorage.remove('darkMode')
        reject(err)
      })
  })
}
export const updateAnotacoes = ({ commit }, params) => {
  return new Promise((resolve, reject) => {
   //commit('authRequest')
     
    axios.put(`candidatoAnotacoes`, params)
      .then(resp => {
        // Notify.create({
        //   icon: 'check',
        //   color: 'positive',
        //   message: 'Anotação feita com sucesso'
        // })
         resolve()
      })
      .catch(err => {
        global.showError(err)
        commit('authError')
        LocalStorage.remove('authorization-admin')
        //LocalStorage.remove('darkMode')
        reject(err)
      })
  })
}
export const deleteRow = ({ commit }, params) => {
  return new Promise((resolve, reject) => {
    axios.delete(`${params.pagina}/`+params.id+'/'+params.pagina)
      .then(resp => {
        Notify.create({
          icon: 'check',
          color: 'positive',
          message: 'Deletado com sucesso'
        })
         resolve()
      })
      .catch(err => {
        global.showError(err)
        //LocalStorage.remove('darkMode')
        reject(err)
      })
  })
}

export const curriculos = ({ commit }, params) => {
  return new Promise((resolve, reject) => {
   //commit('authRequest')
    
    axios.get(`curriculos/${params.offset}/${params.limit}/${params.vaga_id}/${params.status}`)
      .then(resp => {
          resolve(resp)
      })
      .catch(err => {
        global.showError(err)
        commit('authError')
        LocalStorage.remove('authorization-admin')
        //LocalStorage.remove('darkMode')
        reject(err)
      })
  })
}
export const fases = ({ commit }, params) => {
  return new Promise((resolve, reject) => {
   //commit('authRequest')
    
    axios.get(`fases/${params.offset}/${params.limit}/${params.vaga_id}/${params.status}/${params.tipoFase}`)
      .then(resp => {
          resolve(resp)
      })
      .catch(err => {
        global.showError(err)
        commit('authError')
        LocalStorage.remove('authorization-admin')
        //LocalStorage.remove('darkMode')
        reject(err)
      })
  })
}
export const mailingFase2 = ({ commit }, params) => {
  return new Promise((resolve, reject) => {
   //commit('authRequest')
   axios.defaults.headers.common['Access-Control-Allow-Origin'] = "https://villadovalehotel.com.br"
    axios.post(`/mailingFase2`, params)
      .then(resp => {
        Notify.create({
          icon: 'check',
          color: 'positive',
          message: 'Emails enviados com sucesso'
        })
         resolve()
      })
      .catch(err => {
        global.showError(err)
        commit('authError')
        LocalStorage.remove('authorization-admin')
        //LocalStorage.remove('darkMode')
        reject(err)
      })
  })
}
export const mailingAvulso = ({ commit }, params) => {
  return new Promise((resolve, reject) => {
   //commit('authRequest')
   axios.defaults.headers.common['Access-Control-Allow-Origin'] = "https://villadovalehotel.com.br"
    axios.post(`/mailingAvulso`, params)
      .then(resp => {
        Notify.create({
          icon: 'check',
          color: 'positive',
          message: 'Email enviado com sucesso'
        })
         resolve()
      })
      .catch(err => {
        global.showError(err)
        commit('authError')
        LocalStorage.remove('authorization-admin')
        //LocalStorage.remove('darkMode')
        reject(err)
      })
  })
}
export const perfil = ({ commit }) => {
  return new Promise((resolve, reject) => {
    axios.get(`perfil`)
      .then(resp => {
        resolve(resp)
        
      })
      .catch(err => {
        global.showError(err)
        commit('authError')
        LocalStorage.remove('authorization-admin')
        //LocalStorage.remove('darkMode')
        reject(err)
      })
  })
}
 
 
export const verificaLogin = ({ commit }) => {
  return new Promise((resolve, reject) => {
  //  commit('authRequest')
    axios.get(`verificaLogin`)
      .then(resp => {
       resolve(resp)
      })
      .catch(err => {
        global.showError(err)
         
        LocalStorage.remove('authorization')
        //LocalStorage.remove('darkMode')
        reject(err)
      })
  })
} 

export const deleteUsuario = ({ commit }, id) => {
  return new Promise((resolve, reject) => {
    axios.delete(`usuarios/`+id)
      .then(resp => {
        Notify.create({
          icon: 'check',
          color: 'positive',
          message: 'Deletado com sucesso'
        })
         resolve()
      })
      .catch(err => {
        global.showError(err)
        //LocalStorage.remove('darkMode')
        reject(err)
      })
  })
}

 
export const logout = ({ commit }) => {
  return new Promise((resolve, reject) => {
    commit('logout')
    LocalStorage.remove('authorization-admin')
    delete axios.defaults.headers.common['authorization-admin']

    resolve()
  })
}

export const updateList = ({ commit }, value) => {
  return new Promise((resolve, reject) => {
    LocalStorage.set('list', value)
    commit('updateList',value)
    resolve()
  })
}

export const getCodeWhats = ({ commit }, params) => {
  return new Promise((resolve, reject) => {
   //commit('authRequest')
    
    axios.get(`/getCodeWhats`)
      .then(resp => {
        console.log(resp)
         resolve(resp)
      })
      .catch(err => {
        global.showError(err)
        commit('authError')
        LocalStorage.remove('authorization-admin')
        //LocalStorage.remove('darkMode')
        reject(err)
      })
  })
}
export const sendWhats = ({ commit }, params) => {
  return new Promise((resolve, reject) => {
   //commit('authRequest')
    
    axios.post(`/sendWhats`,params)
      .then(resp => {
        Notify.create({
          icon: 'check',
          color: 'positive',
          message: 'enviado com sucesso'
        })
        resolve()
      })
      .catch(err => {
        global.showError(err)
        //commit('authError')
        //LocalStorage.remove('authorization-admin')
        //LocalStorage.remove('darkMode')
        reject(err)
      })
  })
}
export const sendWhatsPerson = ({ commit }, params) => {
  return new Promise((resolve, reject) => {
   //commit('authRequest')
    
    axios.post(`/sendWhatsPerson`,params)
      .then(resp => {
        Notify.create({
          icon: 'check',
          color: 'positive',
          message: 'enviado com sucesso'
        })
        resolve()
      })
      .catch(err => {
        global.showError(err)
        //commit('authError')
        //LocalStorage.remove('authorization-admin')
        //LocalStorage.remove('darkMode')
        reject(err)
      })
  })
}

export const deleteHistorico = ({ commit }, params) => {
  return new Promise((resolve, reject) => {
    axios.delete(`historico/`+params.id)
      .then(resp => {
        Notify.create({
          icon: 'check',
          color: 'positive',
          message: 'Deletado com sucesso'
        })
        resolve()
      })
      .catch(err => {
        global.showError(err)
        //LocalStorage.remove('darkMode')
        reject(err)
      })
  })
}

export const getAgenda = ({ commit }, params) => {
  return new Promise((resolve, reject) => {
    axios.get(`agenda`)
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        global.showError(err)
        //LocalStorage.remove('darkMode')
        reject(err)
      })
  })
}
export const addAgenda = ({ commit }, params) => {
  return new Promise((resolve, reject) => {
    axios.post(`agenda`,params)
      .then(resp => {
        Notify.create({
          icon: 'check',
          color: 'positive',
          message: 'Inserido com sucesso'
        })
        resolve(resp)
      })
      .catch(err => {
        global.showError(err)
        //LocalStorage.remove('darkMode')
        reject(err)
      })
  })
}

export const deleteAgenda = ({ commit }, params) => {
  return new Promise((resolve, reject) => {
    axios.delete(`agenda/`+params.id)
      .then(resp => {
        Notify.create({
          icon: 'check',
          color: 'positive',
          message: 'Deletado com sucesso'
        })
        resolve()
      })
      .catch(err => {
        global.showError(err)
        //LocalStorage.remove('darkMode')
        reject(err)
      })
  })
}
export const confirmarAgendamento = ({ commit }, params) => {
  return new Promise((resolve, reject) => {
    axios.put(`agendamento`, params)
      .then(resp => {
        Notify.create({
          icon: 'check',
          color: 'positive',
          message: 'Confirmação enviada com sucesso'
        })
        resolve()
      })
      .catch(err => {
        global.showError(err)
        //LocalStorage.remove('darkMode')
        reject(err)
      })
  })
}