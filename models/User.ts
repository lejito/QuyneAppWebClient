export class User {
    constructor(
        public id: number,
        public correo_electronico: string,
        public tipo_documento: string,
        public numero_documento: string,
        public fecha_nacimiento: Date,
        public clave: string,
        private fecha_creacion: number,
        public primer_nombre: string,
        public primer_apellido: string,
        public segundo_apellido?: string,
        public segundo_nombre?: string,
    ) { }
}