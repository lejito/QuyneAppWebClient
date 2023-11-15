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
      const { data } = await axios.get(
        `${Global.APIURL}/cuentas/consultar-datos`,
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

      const { data } = await axios.get(
        `${Global.APIURL}/cuentas/consultar-saldo`,
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

      const { data } = await axios.put(
        `${Global.APIURL}/cuentas/activar-saldo-oculto`,
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

      const { data } = await axios.put(
        `${Global.APIURL}/cuentas/desactivar-saldo-oculto`,
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

  verificarExistenciaNumeroTelefono: async (numeroTelefono) => {
    try {
      const token = UtilsService.getSessionToken();

      const { data } = await axios.post(
        `${Global.APIURL}/cuentas/verificar-existencia-numero-telefono`,
        { numeroTelefono },
        { headers: { "Authorization": token } }
      );

      if (data.error) {
        return null;
      } else {
        const cuentaExistente = data.data.cuentaExistente;
        return cuentaExistente;
      }
    } catch (error) {
      return null;
    }
  },

  verificarSaldoSuficiente: async (monto) => {
    try {
      const token = UtilsService.getSessionToken();

      const { data } = await axios.post(
        `${Global.APIURL}/cuentas/verificar-saldo-suficiente`,
        { monto },
        { headers: { "Authorization": token } }
      );

      if (data.error) {
        return null;
      } else {
        const saldoSuficiente = data.data.saldoSuficiente;
        return saldoSuficiente;
      }
    } catch (error) {
      return null;
    }
  }
}
