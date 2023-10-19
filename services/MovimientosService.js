import axios from "axios";
import { Global } from './Global';
import { UtilsService } from "./UtilsService";
import { AlertService } from "./AlertService";

export const MovimientosService = {
  consultarUltimos: async () => {
    try {
      const token = UtilsService.getSessionToken();
      const { data } = await axios.post(
        `${Global.APIURL}/movimientos/consultar-ultimos`,
        { },
        { headers: { "Authorization": token } }
      );

      if (data.error) {
        AlertService.error("Error", data.message);
        return null;
      } else {
        const movimientos = data.data.movimientos;
        return movimientos;
      }
    } catch (error) {
      AlertService.error("Error", "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.");
      return null;
    }
  }
}
