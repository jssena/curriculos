import axios from 'axios'
import global from 'boot/global'
import { LocalStorage, Notify } from 'quasar'
import { loadProgressBar } from 'axios-progress-bar'
export const cadastrar = ({ commit }, form) => {
  return new Promise((resolve, reject) => {
    commit('authRequest')
    LocalStorage.remove('authorization')
    axios.defaults.headers.common['authorization'] = ''
    axios.post(`candidatos`, form)
      .then(resp => {
        if (resp.data.auth === true) {
          const authorization = resp.data.token
          LocalStorage.set('authorization', authorization)
          //LocalStorage.set('darkMode', darkMode)
         
          axios.defaults.headers.common['authorization'] = authorization
          commit('authSuccess', authorization)
          resolve(resp)
        }else{
          resolve(resp)
        }
      })
      .catch(err => {
        global.showError(err)
        commit('authError')
        LocalStorage.remove('authorization')
        //LocalStorage.remove('darkMode')
        reject(err)
      })
  })
}
export const login = ({ commit }, user) => {
  return new Promise((resolve, reject) => {
    commit('authRequest')
    axios.post(`candidatoLogin`, user)
      .then(resp => {
        if (resp.data.auth === true) {
          const authorization = resp.data.token
          LocalStorage.set('authorization', authorization)
           
          axios.defaults.headers.common['authorization'] = authorization
          commit('authSuccess', authorization)
          resolve(resp)
        } else {
          // global.showError(resp.data.erro)
          commit('authError')
          LocalStorage.remove('authorization')
          resolve(resp)
        }
      })
      .catch(err => {
        global.showError(err)
        commit('authError')
        LocalStorage.remove('authorization')
        
       // this.$q.loading.hide()
        dispatch('user/logout')
        //LocalStorage.remove('darkMode')
        reject(err)
      })
  })
}
export const alterarSenha = ({ commit }, dados) => {
  return new Promise((resolve, reject) => {
    axios.put(`alterarSenha`, dados)
      .then(resp => {
        Notify.create({
          icon: 'check',
          color: 'positive',
          message: 'Alteração salva com sucesso'
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
export const verificaEmail = ({ commit }, email) => {
  return new Promise((resolve, reject) => {
  //  commit('authRequest')
    axios.post(`verificaEmail`, email)
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        global.showError(err)
         
        
        reject(err)
      })
  })
}
export const verificaLogin = ({ commit }) => {
  return new Promise((resolve, reject) => {
  //  commit('authRequest')
    axios.get(`verificaLoginCandidato`)
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

export const perfil = ({ commit }) => {
  return new Promise((resolve, reject) => {
    delete axios.defaults.headers.common['authorization-admin']
     
    axios.get(`perfil`)
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        global.showError(err)
        commit('authError')
        LocalStorage.remove('authorization')
        //LocalStorage.remove('darkMode')
        reject(err)
      })
  })
}
export const fases = ({ commit }) => {
  return new Promise((resolve, reject) => {
    delete axios.defaults.headers.common['authorization-admin']
     
    axios.get(`fasesPerfil`)
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        global.showError(err)
        commit('authError')
        LocalStorage.remove('authorization')
        //LocalStorage.remove('darkMode')
        reject(err)
      })
  })
}
export const updateCandidato = ({ commit },dados) => {
  return new Promise((resolve, reject) => {
    axios.put(`candidatos`, dados)
      .then(resp => {
        Notify.create({
          icon: 'check',
          color: 'positive',
          message: 'Alterações salvas com sucesso'
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

export const saveUpdateFormacao = ({ commit }, dados, id) => {
  return new Promise((resolve, reject) => {
    axios.post(`formacao`, dados)
      .then(resp => {
        Notify.create({
          icon: 'check',
          color: 'positive',
          message: 'Alterações salvas com sucesso'
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

export const deleteTabformacoes = ({ commit }, id) => {
  return new Promise((resolve, reject) => {
    axios.delete(`formacao/`+id)
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

export const saveUpdateCursos = ({ commit }, dados) => {
  return new Promise((resolve, reject) => {
    axios.post(`cursos`, dados)
      .then(resp => {
        Notify.create({
          icon: 'check',
          color: 'positive',
          message: 'Alterações salvas com sucesso'
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

export const deleteTabcursos = ({ commit }, id) => {
  return new Promise((resolve, reject) => {
    axios.delete(`cursos/`+id)
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

export const saveUpdateIdiomas = ({ commit }, dados) => {
  return new Promise((resolve, reject) => {
    axios.post(`idiomas`, dados)
      .then(resp => {
        Notify.create({
          icon: 'check',
          color: 'positive',
          message: 'Alterações salvas com sucesso'
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

export const deleteTabidiomas = ({ commit }, id) => {
  return new Promise((resolve, reject) => {
    axios.delete(`idiomas/`+id)
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

export const saveUpdateExperiencias = ({ commit }, dados) => {
  return new Promise((resolve, reject) => {
    axios.post('experiencias', dados)
      .then(resp => {
        Notify.create({
          icon: 'check',
          color: 'positive',
          message: 'Alterações salvas com sucesso'
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

export const deleteTabexperiencias = ({ commit }, id) => {
  return new Promise((resolve, reject) => {
    axios.delete(`experiencias/`+id)
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

export const salvaFoto = ({ commit }, url) => {
  return new Promise((resolve, reject) => {
    
    axios.put(`salvaFoto`, url)
      .then(resp => {
        Notify.create({
          icon: 'check',
          color: 'positive',
          message: 'Imagem salva com sucesso'
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

export const uploadVideo = ({ commit }, url) => {
  return new Promise((resolve, reject) => {
    loadProgressBar()

    let formData = new FormData();
    formData.append('file', url.files);
    axios.post(`upload/${url.tipo}`,formData,
    {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
    })
      .then(resp => {
        Notify.create({
          icon: 'check',
          color: 'positive',
          message: 'Video salva com sucesso'
        })
         resolve()
      })
      .catch(err => {
        Notify.create({
          icon: 'check',
          color: 'positive',
          message: 'Video salva com sucesso'
        })
         resolve()
        //global.showError(err)
        //LocalStorage.remove('darkMode')
       // reject(err)
      })
  })
}
export const deleteVideo = ({ commit }, form) => {
  return new Promise((resolve, reject) => {
    axios.delete(`video/${form.id}/${form.url}`)
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
    LocalStorage.remove('authorization')
    delete axios.defaults.headers.common['authorization']

    resolve()
  })
}

export const updateStep = ({ commit }, value) => {
  return new Promise((resolve, reject) => {
    LocalStorage.set('step', value)
    commit('updateStep',value)
    resolve()
  })
}

export const addAgendamento = ({ commit }, params) => {
  return new Promise((resolve, reject) => {
    
    axios.post(`agendamento`, params)
      .then(resp => {
        Notify.create({
          icon: 'check',
          color: 'positive',
          message: 'Agendamento enviado com sucesso'
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
export const deleteAgendamento = ({ commit }, params) => {
  return new Promise((resolve, reject) => {
    
    axios.delete(`agendamento/${params.id}/${params.horario_id}`)
      .then(resp => {
        Notify.create({
          icon: 'check',
          color: 'positive',
          message: 'Agendamento foi deletado com sucesso'
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


// export const darkMode = ({ commit }, state) => {
//   return new Promise((resolve, reject) => {
//     LocalStorage.set('darkMode', state)
//     const darkMode = LocalStorage.getItem('darkMode')
//     commit('darkMode', darkMode)
//     resolve()
//   })
// }
