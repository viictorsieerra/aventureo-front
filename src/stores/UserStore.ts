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
        console.log("ESTE ES EL TOKEN: ", jwtStore.jwt)
        fetch(baseUrl + "/Auth", {
            headers: { 'Authorization': `Bearer ${jwtStore.jwt}` }
        })
            .then(res => res.json())
            .then(data => {
                user.value = data
            })
            .catch(ex => console.error(`ERROR : ${ex}`))
    }
    return { user, getUser }
}, { persist: true })