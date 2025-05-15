
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
import LoginDTO from '@/models/LoginUser'
import { EnvironmentVariablesEnum, getEnvironmentVariable } from '@/helpers/EnvironmentVariablesHelpers';
import type RegisterUser from '@/models/RegisterUser';


export const useJWTStore = defineStore('jwt', () => {
  var jwt = ref('')
  var usuario = ref()
  const router = useRouter()
  const baseUrl = getEnvironmentVariable(EnvironmentVariablesEnum.API_URL)+'/JwtAuth'

  function loginUser(loginUser: LoginDTO) {
    fetch(baseUrl+'/Login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginUser)
    })
      .then(res => res.json())
      .then(data => {
        jwt.value = data[0].Value
        // getUser()
      })
      .catch(error => console.log(error))
  }

  function registerUser(registroUser: RegisterUser) {
    fetch(baseUrl + "/Register", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registroUser)
    })
      .then(res => res.text())
      .then(data => {
        console.log(data)
        jwt.value = data
        console.log(`Token: ${jwt}`)
        // getUser()
      })
      .catch(error => console.log(error))
  }

  function logOut() {
    // usuario.value = new UsuarioDTO()
    jwt.value = ""
    router.push('/')
  }

  return { jwt, usuario, loginUser, registerUser, logOut }
}, { persist: true })
