export class TrasferenciaExterna {
    constructor(
        public id: number,
        public id_movimiento: number,
        public entidad_destino: string,
        public cuenta_destino: string
    ) { }
}