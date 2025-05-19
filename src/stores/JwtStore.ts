
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
  const baseUrl = getEnvironmentVariable(EnvironmentVariablesEnum.API_URL) + '/JwtAuth'

  function loginUser(loginUser: LoginDTO) {
    fetch(baseUrl + '/Login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginUser)
    })
      .then(res => {
        if (!res.ok) throw new Error("Error en login");
        return res.json();
      })
      .then(data => {
        console.log("Token recibido:", data);
        jwt.value = data.value;
        
        const payload = parseJwt(data.value);
        console.log("Payload decodificado:", payload);
        usuario.value = payload.name; 
      
        router.push('/') 
      })
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


  function parseJwt (token: string) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = decodeURIComponent(atob(base64Url).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(base64);
    } catch (e) {
      console.error("Error al parsear JWT:", e);
      return null;
    }
  }
  

  function logOut() {
    // usuario.value = new UsuarioDTO()
    jwt.value = ""
    router.push('/')
  }

  return { jwt, usuario, loginUser, registerUser, logOut }
}, { persist: true })
