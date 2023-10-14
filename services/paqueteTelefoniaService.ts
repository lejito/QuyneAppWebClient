import axios from "axios";
import { AlertService } from "./AlertService";
import { url } from "./Global";
import { PaqueteTelefonia } from "~/models/PaqueteTelefonia";

export const PaqueteTelefoniaService = {
    async generate(transferencia: PaqueteTelefonia) {
        try {
            const response = await axios.post(`${url}phone_bundles`, transferencia);
            if (response.data.ok) {
                AlertService.message("El pago de su paquete de telefonia se ha relizado exitosamente");
            }
            else {
                AlertService.error("Error transaccion", response.data.message);

            }

        } catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }
    }

}