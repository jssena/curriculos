import { LocalStorage } from 'quasar'
let local = LocalStorage.getItem('authorization-admin') || ''
let list = LocalStorage.getItem('list')
export default {
  status: '',
  list: list,
  //darkMode: LocalStorage.getItem('darkMode'),
  authorization: local
}
