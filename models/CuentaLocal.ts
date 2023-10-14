export class CuentaLocal {
    constructor(
        public id: number,
        public id_usuario: number,
        public phone_number: string,
        public saldo_disponible: number,
        public habilitado: boolean,
        public saldo_oculto: boolean,
        public fecha_creacion: string,
        public nombre_completo: string
    ) { }
}