import axios from "axios";
import { AlertService } from "./AlertService";
import { url } from "./Global";
import { TrasferenciaInterna } from "~/models/TrasferenciaInterna";

export const TrasferenciaInternaService = {
    async generate(transferencia: TrasferenciaInterna) {
        try {
            const response = await axios.post(`${url}internal_transactions`, transferencia);
            if (response.data.ok) {
                AlertService.message("Su trasferencia se ha relizado exitosamente");
            }
            else {
                AlertService.error("Error transaccion", response.data.message);

            }

        } catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }
    }

}