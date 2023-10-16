import { Bolsillo } from "~/models/Bolsillo";
import axios from "axios";
import { AlertService } from "./AlertService";
import { url } from "./Global";
import { Cuenta } from "~/models/Cuenta";
import { CuentaService } from "./CuentaService";

export const BolsilloService = {
    async getBolsillos(accountId: number) {
        try {

            const response = await axios.get(`${url}pockets/by_account/${accountId}`);
            return response.data.info;
        } catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }
    },
    async getBolsillo(id: number) {
        try {
            const response = await axios.get(`${url}pockets/${id}`);
            return response.data.info;
        } catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }
    },
    async addBolsillo(bolsillo: any) {
        try {

            const response = await axios.post(`${url}pockets`, bolsillo);
            AlertService.success("El bolsillo ha sido creado exitosamente.");
        } catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }
    },
    async deleteBolsillo(bolsillo: Bolsillo, bolsillos: any) {

        try {
            const confirmacion = await AlertService.withConfirmation("Eliminar bolsillo", "El bolsillo no podra volver a ser accedido y el dinero volvera a la cuenta, ¿desea continuar?");
            if (confirmacion) {
                const cuentaObserver = CuentaService.getCuentaActual({ value: null });
                const cuenta = cuentaObserver?.value;
                if (cuenta) {
                    if (bolsillo.saldo_disponible > 0) {
                        AlertService.informative("Eliminación de bolsillo", "Para poder eliminar el bolsillo porfavor, devuelva todo el dinero a la cuenta");
                        return;
                    }
                    const response = await axios.delete(`${url}pockets/${bolsillo.id_bolsillo}`);
                    bolsillos.value = bolsillos.value.filter((val: any) => val.id_bolsillo != bolsillo.id_bolsillo)
                    AlertService.success("La eliminación se ha realizado con exito");
                }
            }
        } catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }
    },
    async updateBolsillo(bolsillo: Bolsillo, changes: { amount: number | null, newName: string | null }) {
        try {
            const response = await axios.put(`${url}pockets/${bolsillo.id_bolsillo}`, changes);
            if (!response.data.ok) {
                AlertService.success(response.data.message);
                return;
            }
            AlertService.success(response.data.message);
            const cuentaObserver = CuentaService.getCuentaActual({ value: null });
            const current = cuentaObserver?.value;
            if (current) {
                if (!changes.amount) return
                let { id_usuario, nombre_completo } = current;
                const accountUpdate = await CuentaService.getCuenta(id_usuario);
                CuentaService.SaveCuentaStorage(accountUpdate, nombre_completo);
            }

        } catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }
    }
}