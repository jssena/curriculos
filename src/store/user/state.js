import { LocalStorage } from 'quasar'
let local = LocalStorage.getItem('authorization') || ''
let step = LocalStorage.getItem('step') || 1
export default {
  status: '',
  step: step,
  authorization: local
}
