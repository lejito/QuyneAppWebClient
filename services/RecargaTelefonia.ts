import axios from "axios";
import { AlertService } from "./AlertService";
import { url } from "./Global";
import { RecargaTelefonia } from "~/models/RecargaTelefonia";

export const RecargaTelefoniaService = {
    async generate(transferencia: RecargaTelefonia) {
        try {
            const response = await axios.post(`${url}phone_recharges`, transferencia);
            if (response.data.ok) {
                AlertService.message("El pago de su recarga de telefonia se ha relizado exitosamente");
            }
            else {
                AlertService.error("Error transaccion", response.data.message);

            }

        } catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }
    }

}