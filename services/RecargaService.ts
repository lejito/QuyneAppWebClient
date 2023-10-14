import axios from "axios";
import { AlertService } from "./AlertService";
import { url } from "./Global";
import { Recarga } from "~/models/Recarga";

export const RecargaService = {
    async generate(transferencia: Recarga) {
        try {
            const response = await axios.post(`${url}recharges`, transferencia);
            if (response.data.ok) {
                AlertService.message("El pago de su Recarga se ha relizado exitosamente");
            }
            else {
                AlertService.error("Error transaccion", response.data.message);

            }

        } catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }
    }

}