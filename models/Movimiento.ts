export class Movimiento {
    constructor(
        public id: number,
        public cuenta_origen: number,
        public fecha: Date,
        public monto: number
    ) { }
}