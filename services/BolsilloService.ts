import { Bolsillo } from "~/models/Bolsillo";
import axios from "axios";
import { AlertService } from "./AlertService";
import { url } from "./Global";
import { Cuenta } from "~/models/Cuenta";
import { CuentaService } from "./CuentaService";

export const BolsilloService = {
    async getBolsillosAll() {
        try {
            const response = await axios.get(`${url}Bolsillos`);
            return response.data;
        } catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }
    },
    async getBolsillos(id_cuenta: number) {
        const Bolsillos = await this.getBolsillosAll();
        const BolsillosFiltrados = Bolsillos.filter((bolsillo: Bolsillo) => { return bolsillo.id_cuenta === id_cuenta })
        return BolsillosFiltrados;
    },
    async addBolsillo(bolsillo: Bolsillo) {
        try {
            const response = await axios.post(`${url}Bolsillos`, bolsillo);
            AlertService.success("El bolsillo ha sido creado exitosamente.");
        } catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }
    },
    async deleteBolsillo(bolsillo: Bolsillo) {
        try {
            const confirmacion = await AlertService.withConfirmation("Eliminar bolsillo", "El bolsillo no podra volver a ser accedido y el dinero volvera a la cuenta, ¿desea continuar?");
            if (confirmacion) {

                const cuenta = CuentaService.getCuentaActual();
                if (cuenta) {
                    cuenta.saldo_disponible += bolsillo.saldo_disponible;
                    CuentaService.updateCuenta(cuenta);
                    CuentaService.SaveCuentaStorage(cuenta);
                }
                const response = await axios.delete(`${url}Bolsillos/${bolsillo.id}`);

                return response.data;
            }
        } catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }
    },
    async updateBolsillo(bolsillo: Bolsillo) {
        try {
            const response = await axios.post(`${url}Bolsillos/${bolsillo.id}`, bolsillo);
            return response.data;
        } catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }
    },
    async updateBolsilloSaldo(bolsillo: Bolsillo, amount: number) {
        try {
            const cuenta = CuentaService.getCuentaActual();
            if (cuenta) {
                cuenta.saldo_disponible -= bolsillo.saldo_disponible;
                CuentaService.updateCuenta(cuenta);
                CuentaService.SaveCuentaStorage(cuenta);
            }
            bolsillo.saldo_disponible += amount;
            const response = await axios.post(`${url}Bolsillos/${bolsillo.id}`, bolsillo);
            return response.data;
        } catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }
    }
}