import axios from "axios";
import { AlertService } from "./AlertService";
import { url } from "./Global";
import { RecargaCivica } from "~/models/RecargaCivica";

export const RecargaCivicaService = {
    async generate(transferencia: RecargaCivica) {
        try {
            const response = await axios.post(`${url}reload_civica`, transferencia);
            if (response.data.ok) {
                AlertService.message("El pago de su Recarga civica se ha relizado exitosamente");
            }
            else {
                AlertService.error("Error transaccion", response.data.message);

            }

        } catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }
    }

}