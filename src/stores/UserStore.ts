import { defineStore } from "pinia";
import { useJWTStore } from "./JwtStore";
import { Usuario } from "@/models/Usuario";
import { ref } from "vue";
import { EnvironmentVariablesEnum, getEnvironmentVariable } from "@/helpers/EnvironmentVariablesHelpers";

export const useUserStore = defineStore('user', () => {
    const jwtStore = useJWTStore()
    const user = ref(new Usuario())
    const baseUrl = getEnvironmentVariable(EnvironmentVariablesEnum.API_URL) + "/User"

    function getUser() {
        fetch(baseUrl + "/Auth", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + jwtStore.jwt }
        })
            .then(res => res.json())
            .then(data => {
                console.log("USUARIO RECIBIDO : ", data)
            })
            .catch(ex => console.error(`ERROR : ${ex}`))
    }
return {user, getUser}
}, {persist: true})