export class Cuenta {
    constructor(
        public id: number,
        public phone_number: string,
        public saldo_disponible: number,
        public habilitado: boolean,
        public saldo_oculto: boolean,
        public fecha_creacion: number
    ) { }
}