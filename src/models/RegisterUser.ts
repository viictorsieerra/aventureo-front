export default class RegisterUser{
    constructor(
        public nombre?: string,
        public apellidos?: string,
        public fecNacimiento?: Date,
        public email?: string,
        public contrasena?: string
    ){}
}