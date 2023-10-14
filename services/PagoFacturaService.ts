import axios from "axios";
import { AlertService } from "./AlertService";
import { url } from "./Global";
import { Factura } from "~/models/Factura";

export const PagoFacturaService = {
    async generate(bill: Factura) {
        try {
            const response = await axios.post(`${url}bills`, bill);
            if (response.data.ok) {
                AlertService.message("El pago de su factura se ha relizado exitosamente");
            }
            else {
                AlertService.error("Error transaccion", response.data.message);

            }

        } catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }
    }

}