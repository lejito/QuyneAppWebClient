import axios from "axios";
import { AlertService } from "./AlertService";
import { url } from "./Global";
import { Cuenta } from "~/models/Cuenta";
export const CuentaService = {
    async getCuentas() {
        try {
            const response = await axios.get(`${url}cuentas`);
            return response.data;
        } catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }
    },
    async getCuenta(id_usuario: Number) {
        const cuentas = await this.getCuentas();
        const cuenta = cuentas.find((value: Cuenta) => value.id_usuario === id_usuario);
    },
    async addCuenta(cuenta: Cuenta) {
        try {
            const response = await axios.post(`${url}cuentas`, cuenta);
            return true;
        } catch (error) {
            return false;
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }
    },
    async updateCuenta(update: Cuenta) {
        try {
            const response = await axios.put(`${url}cuentas`, update);
            return true
        } catch (error) {
            return false;
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }
    }
}