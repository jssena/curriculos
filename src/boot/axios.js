import Vue from 'vue'
import axios from 'axios'
import global from './global'
import { LocalStorage } from 'quasar'
Vue.prototype.$axios = axios

axios.defaults.baseURL = (process.env.NODE_ENV !== 'production') ? global.baseApiUrl_dev : global.baseApiUrl_prod
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

if(LocalStorage.getItem('authorization')) axios.defaults.headers.common['authorization'] = LocalStorage.getItem('authorization');
if(LocalStorage.getItem('authorization-admin')) axios.defaults.headers.common['authorization-admin'] = LocalStorage.getItem('authorization-admin');
// axios.interceptors.response.use((response) => {
//   // Do something with response data
//   // console.log(response)
//   return response
// }, (error) => {
//   // Do something with response error
//   // You can even test for a response code
//   // and try a new request before rejecting the promise
//   if (error.response.status === 401) {
//     const requestConfig = error.config
//     return axios(requestConfig)
//   }
//   return Promise.reject(error)
// })
 