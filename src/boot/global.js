import { Notify } from 'quasar'

export const userKey = ''
export const baseApiUrl_prod = 'https://backend.villadovalehotel.com.br/'
export const baseApiUrl_dev = 'http://localhost:3333/'
export const baseCrud = ''
export const baseURL = (process.env.NODE_ENV !== 'production') ? baseApiUrl_dev : baseApiUrl_prod
export function showError (e) {
  // or with a config object:
  if (e && e.response && e.response.data) {
    Notify.create({
      message: e
    })
  } else if (typeof e === 'string') {
    Notify.create({
      message: e
    })
  } else {
    Notify.create({
      icon: 'warning',
      color: 'warning',
      message: 'Erro de conexão'
    })
  }
}

export default {
  baseApiUrl_dev,
  baseApiUrl_prod,
  showError,
  userKey,
  baseCrud,
  baseURL
}
