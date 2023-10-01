import { Movimiento } from "~/models/Movimiento";
import axios from "axios";
import { AlertService } from "./AlertService";
import { url } from "./Global";
export const MovimientoService = {
    async getMovimientosAll() {
        try {
            const response = await axios.get(`${url}movimientos`);
            return response.data;
        } catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }
    },
    async getMovimientos(id_cuenta: number) {
        const movimientos = await this.getMovimientosAll();
        const movimientosFiltrados = movimientos.filter((Movimiento: Movimiento) => { return Movimiento.cuenta_origen === id_cuenta })
        return movimientosFiltrados;
    },
    async addMovimiento(movimiento: Movimiento) {
        try {
            const response = await axios.post(`${url}movimientos`, movimiento);
            return response.data;
        } catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }
    }
}