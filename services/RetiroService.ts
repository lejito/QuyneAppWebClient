import axios from "axios";
import { AlertService } from "./AlertService";
import { url } from "./Global";
import { Retiro } from "~/models/Retiro";

export const RetiroService = {
    async generate(transferencia: Retiro) {
        try {
            const response = await axios.post(`${url}withdraws`, transferencia);
            if (response.data.ok) {
                AlertService.message("su retiro se ha relizado exitosamente");
            }
            else {
                AlertService.error("Error transaccion", response.data.message);

            }

        } catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }
    }

}