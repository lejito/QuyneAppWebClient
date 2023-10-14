import axios from "axios";
import { AlertService } from "./AlertService";
import { url } from "./Global";
import { TrasferenciaExterna } from "~/models/TransferenciaExterna";

export const TrasferenciaExternaService = {
    async generate(transferencia: TrasferenciaExterna) {
        try {
            const response = await axios.post(`${url}external_transactions`, transferencia);
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