export class Usuario {
    constructor
        (
            public idUsuario?: number,
            public nombre?: string,
            public apellidos?: string,
            public email?: string,
            public fecNacimiento?: Date,
            public rolAdmin?: boolean
        ) { }
}

export interface IUsuario {
            idUsuario?: number,
            nombre?: string,
            apellidos?: string,
            email?: string,
            contrasena?: string,
            fecNacimiento?: Date,
            rolAdmin?: boolean
}