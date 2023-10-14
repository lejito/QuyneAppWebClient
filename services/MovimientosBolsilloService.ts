import axios from "axios";
import { AlertService } from "./AlertService";
import { url } from "./Global";

export const MovimientosBolsilloService = {
    async getMovimientosByPocket(id: number) {
        try {
            const response = await axios.get(`${url}pocket_transactions/${id}`);
            return response.data.info

        } catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }
    }

}