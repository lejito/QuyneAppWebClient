import axios from "axios";
import { Global } from './Global';
import { UtilsService } from "./UtilsService";
import { AlertService } from "./AlertService";

export const CuentasService = {
  consultarIdCuentaIdUsuario: async () => {
    try {
      const token = UtilsService.getSessionToken();

      const { data } = await axios.get(`${Global.APIURL}/cuentas/consultar-id-cuenta-id-usuario`, {
        headers: { "Authorization": token }
      });

      if (data.error) {
        AlertService.error("Error", data.message);
        return null;
      } else {
        const idCuenta = data.data.idCuenta;
        return idCuenta;
      }
    } catch (error) {
      AlertService.error("Error", "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.");
      return null;
    }
  },

  consultarDatos: async () => {
    try {
      const token = UtilsService.getSessionToken();
      const { data } = await axios.post(
        `${Global.APIURL}/cuentas/consultar-datos`,
        { },
        { headers: { "Authorization": token } }
      );

      if (data.error) {
        AlertService.error("Error", data.message);
        return null;
      } else {
        const cuenta = data.data.cuenta;
        return cuenta;
      }
    } catch (error) {
      AlertService.error("Error", "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.");
      return null;
    }
  },

  consultarSaldo: async () => {
    try {
      const token = UtilsService.getSessionToken();

      const { data } = await axios.post(
        `${Global.APIURL}/cuentas/consultar-saldo`,
        { },
        { headers: { "Authorization": token } }
      );

      if (data.error) {
        AlertService.error("Error", data.message);
        return null;
      } else {
        const cuenta = data.data.cuenta;
        return cuenta;
      }
    } catch (error) {
      AlertService.error("Error", "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.");
      return null;
    }
  },

  activarSaldoOculto: async () => {
    try {
      const token = UtilsService.getSessionToken();

      const { data } = await axios.post(
        `${Global.APIURL}/cuentas/activar-saldo-oculto`,
        { },
        { headers: { "Authorization": token } }
      );

      if (data.error) {
        AlertService.error("Error", data.message);
        return null;
      } else {
        const cuenta = data.data.cuenta;
        return cuenta;
      }
    } catch (error) {
      AlertService.error("Error", "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.");
      return null;
    }
  },

  desactivarSaldoOculto: async () => {
    try {
      const token = UtilsService.getSessionToken();

      const { data } = await axios.post(
        `${Global.APIURL}/cuentas/desactivar-saldo-oculto`,
        { },
        { headers: { "Authorization": token } }
      );

      if (data.error) {
        AlertService.error("Error", data.message);
        return null;
      } else {
        const cuenta = data.data.cuenta;
        return cuenta;
      }
    } catch (error) {
      AlertService.error("Error", "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.");
      return null;
    }
  }
}
