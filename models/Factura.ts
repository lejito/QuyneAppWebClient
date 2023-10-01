export class Factura {
    constructor(
        public id: number,
        public id_movimiento: number,
        public descripcion: string,
        public referencia: string
    ) { }
}