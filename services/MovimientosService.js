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
  },

  realizarTransferenciaInterna: async () => {
    try {
      const token = UtilsService.getSessionToken();
      const { data } = await axios.post(
        `${Global.APIURL}/movimientos/realizar-transferencia-interna`,
        { },
        { headers: { "Authorization": token } }
      );

      if (data.error) {
        AlertService.error("Error", data.message);
        return null;
      } else {
        const movimiento = data.data.movimiento;
        return movimiento;
      }
    } catch (error) {
      AlertService.error("Error", "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.");
      return null;
    }
  },

  realizarTransferenciaExterna: async () => {
    try {
      const token = UtilsService.getSessionToken();
      const { data } = await axios.post(
        `${Global.APIURL}/movimientos/realizar-transferencia-externa`,
        { },
        { headers: { "Authorization": token } }
      );

      if (data.error) {
        AlertService.error("Error", data.message);
        return null;
      } else {
        const movimiento = data.data.movimiento;
        return movimiento;
      }
    } catch (error) {
      AlertService.error("Error", "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.");
      return null;
    }
  },

  realizarPagoFactura: async () => {
    try {
      const token = UtilsService.getSessionToken();
      const { data } = await axios.post(
        `${Global.APIURL}/movimientos/realizar-pago-factura`,
        { },
        { headers: { "Authorization": token } }
      );

      if (data.error) {
        AlertService.error("Error", data.message);
        return null;
      } else {
        const movimiento = data.data.movimiento;
        return movimiento;
      }
    } catch (error) {
      AlertService.error("Error", "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.");
      return null;
    }
  },

  realizarRecargaCivica: async () => {
    try {
      const token = UtilsService.getSessionToken();
      const { data } = await axios.post(
        `${Global.APIURL}/movimientos/realizar-recarga-civica`,
        { },
        { headers: { "Authorization": token } }
      );

      if (data.error) {
        AlertService.error("Error", data.message);
        return null;
      } else {
        const movimiento = data.data.movimiento;
        return movimiento;
      }
    } catch (error) {
      AlertService.error("Error", "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.");
      return null;
    }
  },

  realizarRecargaTelefonia: async () => {
    try {
      const token = UtilsService.getSessionToken();
      const { data } = await axios.post(
        `${Global.APIURL}/movimientos/realizar-recarga-telefonia`,
        { },
        { headers: { "Authorization": token } }
      );

      if (data.error) {
        AlertService.error("Error", data.message);
        return null;
      } else {
        const movimiento = data.data.movimiento;
        return movimiento;
      }
    } catch (error) {
      AlertService.error("Error", "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.");
      return null;
    }
  },

  realizarPagoPaqueteTelefonia: async () => {
    try {
      const token = UtilsService.getSessionToken();
      const { data } = await axios.post(
        `${Global.APIURL}/movimientos/realizar-pago-paquete-telefonia`,
        { },
        { headers: { "Authorization": token } }
      );

      if (data.error) {
        AlertService.error("Error", data.message);
        return null;
      } else {
        const movimiento = data.data.movimiento;
        return movimiento;
      }
    } catch (error) {
      AlertService.error("Error", "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.");
      return null;
    }
  }
}
