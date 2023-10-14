export class Bolsillo {
    constructor(
        public id_bolsillo: number,
        public id_cuenta: number,
        public nombre: string,
        public saldo_disponible: number,
        public saldo_objetivo?: number
    ) { }
}