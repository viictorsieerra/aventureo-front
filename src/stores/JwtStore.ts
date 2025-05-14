
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
import LoginDTO from '@/models/LoginUser'


export const useJWTStore = defineStore('jwt', () => {
  var jwt = ref('')
  var usuario = ref()
  const router = useRouter()

  function loginUser(loginUser: LoginDTO) {
    fetch("https://localhost:7053", {
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
/*
  function registerUser(registroUser: RegistroDTO) {
    fetch("https://moneykeeper-api.retocsv.es/api/JWT/Register", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          _idUsuario: 0,
          _nombre: registroUser._nombre,
          _apellido: registroUser._apellido,
          _correo: registroUser._correo,
          _contrasena: registroUser._contrasena,
          _dni: registroUser._dni,
          _fecNacimiento: registroUser._fecNacimiento
        }
      )
    })
      .then(res => res.text())
      .then(data => {
        console.log(data)
        jwt.value = data
        console.log(`Token: ${jwt}`)
        getUser()
      })
      .catch(error => console.log(error))
  }
*/
  function logOut() {
    // usuario.value = new UsuarioDTO()
    jwt.value = ""
    router.push('/')
  }

  return { jwt, usuario, loginUser, logOut }
}, { persist: true })
