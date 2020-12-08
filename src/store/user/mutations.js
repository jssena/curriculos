import { LocalStorage } from 'quasar'
export const authRequest = (state) => {
  state.status = 'loading'
}
export const authSuccess = (state, token) => {
  state.status = 'success'
  state.authorization = token
  //state.darkMode = darkMode
}
export const darkMode = (state, darkMode) => {
  state.darkMode = darkMode
}
export const updateStep = (state, step) => {
 // let newStep = LocalStorage.setItem('step',step)
  state.step = step
}
export const authError = (state) => {
  state.status = 'error'
}
export const logout = (state) => {
  state.status = ''
  state.authorization = ''
  //state.darkMode = false
 // state.listaMenu = {}
}
