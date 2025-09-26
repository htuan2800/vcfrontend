
import { jwtDecode } from 'jwt-decode'
import { isJsonString } from './utils'

export const handleUserDecoded = () => {
  let storageData = localStorage.getItem('access_token')
  let decoded = {}
  if (storageData && isJsonString(storageData)) {
    storageData = JSON.parse(storageData)
    decoded = jwtDecode(storageData)
  }
  return { decoded, storageData }
}