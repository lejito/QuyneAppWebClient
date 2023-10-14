import axios from "axios";
import { AlertService } from "./AlertService";
import { CUENTA, url } from "./Global";
import { Cuenta } from "~/models/Cuenta";
import { CuentaLocal } from "~/models/CuentaLocal";
export const CuentaService = {
    async getCuentas() {
        try {
            const response = await axios.get(`${url}accounts`);
            return response.data.info;
        } catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }
    },
    async getCuenta(id_usuario: Number) {
        try {
            const response = await axios.get(`${url}accounts/${id_usuario}`);
            return response.data.info;
        } catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }

    }
    ,
    async updateCuenta(update: Cuenta, change: any) {
        try {
            const response = await axios.put(`${url}accounts/${update.id}`, change);
            AlertService.informative('Información sobre accion', response.data.message);
            return response.data.ok
        } catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
            return false;

        }
    },
    getCuentaActual() {
        const cuentaString = sessionStorage.getItem(CUENTA);
        if (!cuentaString) return;
        const cuenta: CuentaLocal = JSON.parse(cuentaString);
        return cuenta;
    },
    SaveCuentaStorage(cuenta: Cuenta, nombre_completo: string) {
        const cuentaString = JSON.stringify({ ...cuenta, nombre_completo });
        sessionStorage.setItem(CUENTA, cuentaString);
    }
}