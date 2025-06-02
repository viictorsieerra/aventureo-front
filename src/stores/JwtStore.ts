
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
import LoginDTO from '@/models/LoginUser'
import { EnvironmentVariablesEnum, getEnvironmentVariable } from '@/helpers/EnvironmentVariablesHelpers';
import type {RegisterUser} from '@/models/RegisterUser';
import { useUserStore } from './UserStore';
import { Usuario } from '@/models/Usuario';


export const useJWTStore = defineStore('jwt', () => {
  var jwt = ref('')
  const userStore = useUserStore()
  const router = useRouter()
  const baseUrl = getEnvironmentVariable(EnvironmentVariablesEnum.API_URL) + '/JwtAuth'

function loginUser(loginUser: LoginDTO) {
  return fetch(baseUrl + '/Login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginUser)
  })
    .then(res => {
      if (!res.ok) throw new Error("Credenciales incorrectas");
      return res.json();
    })
    .then(data => {
      console.log("Token recibido:", data);

      if (!data.value) throw new Error("Token no recibido");

      jwt.value = data.value;
      userStore.getUser();
      router.push("/");
    });
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
        router.push("/")
        userStore.getUser()
      })
      .catch(error => console.log(error))
  }
  

  function logOut() {
    // userStore.user = new Usuario()
    jwt.value = ""
    router.push('/')
  }



  return { jwt, loginUser, registerUser, logOut }
}, { persist: true })
