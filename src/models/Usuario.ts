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