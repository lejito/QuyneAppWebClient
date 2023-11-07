import axios from "axios";
import { Global } from './Global';
import { UtilsService } from "./UtilsService";
import { AlertService } from "./AlertService";
import { CuentasService } from "./CuentasService";

export const MovimientosService = {
  consultarUltimos: async () => {
    try {
      const token = UtilsService.getSessionToken();
      const { data } = await axios.post(
        `${Global.APIURL}/movimientos/consultar-ultimos`,
        {},
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

  realizarTransferenciaInterna: async (numeroTelefono, monto) => {
    try {
      const cuentaExistente = await CuentasService.verificarExistenciaNumeroTelefono(numeroTelefono);

      if (cuentaExistente) {
        const saldoSuficiente = await CuentasService.verificarSaldoSuficiente(monto);

        if (saldoSuficiente) {
          const token = UtilsService.getSessionToken();
          const { data } = await axios.post(
            `${Global.APIURL}/movimientos/realizar-transferencia-interna`,
            { numeroTelefono, monto },
            { headers: { "Authorization": token } }
          );

          if (data.error || data.type == 'warning') {
            AlertService.error("Error", data.message);
            return null;
          } else {
            const movimiento = data.data.movimiento;
            return movimiento;
          }
        } else {
          AlertService.warning("Atención", "No tienes saldo suficiente para hacer la transferencia.");

        }
      } else {
        AlertService.warning("Atención", "El número de teléfono no coincide con ninguna cuenta de QuyneApp.");
      }
    } catch (error) {
      console.log(error);
      AlertService.error("Error", "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.");
      return null;
    }
  },

  realizarTransferenciaExterna: async (entidadDestino, cuentaDestino, monto) => {
    try {
      const saldoSuficiente = await CuentasService.verificarSaldoSuficiente(monto);

      if (saldoSuficiente) {
        const token = UtilsService.getSessionToken();
        const { data } = await axios.post(
          `${Global.APIURL}/movimientos/realizar-transferencia-externa`,
          { entidadDestino, cuentaDestino, monto },
          { headers: { "Authorization": token } }
        );

        if (data.error) {
          AlertService.error("Error", data.message);
          return null;
        } else {
          const movimiento = data.data.movimiento;
          return movimiento;
        }
      } else {
        AlertService.warning("Atención", "No tienes saldo suficiente para hacer la transferencia.");

      }
    } catch (error) {
      AlertService.error("Error", "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.");
      return null;
    }
  },

  realizarPagoFactura: async (referencia, descripcion, monto) => {
    try {
      const saldoSuficiente = await CuentasService.verificarSaldoSuficiente(monto);
      if (!saldoSuficiente) {
        AlertService.warning("Atención", "No tienes saldo suficiente para hacer la transacción.");
        return;
      }
      const token = UtilsService.getSessionToken();
      const { data } = await axios.post(
        `${Global.APIURL}/movimientos/realizar-pago-factura`,
        { referencia, descripcion, monto },
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

  realizarRecargaCivica: async (tipoDocumento, numeroDocumento, monto) => {
    try {
      const token = UtilsService.getSessionToken();
      const { data } = await axios.post(
        `${Global.APIURL}/movimientos/realizar-recarga-civica`,
        { tipoDocumento, numeroDocumento, monto },
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

  realizarRecargaTelefonia: async (numeroTelefono, operador, monto) => {
    try {
      const token = UtilsService.getSessionToken();
      const { data } = await axios.post(
        `${Global.APIURL}/movimientos/realizar-recarga-telefonia`,
        { numeroTelefono, operador, monto },
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

  realizarPagoPaqueteTelefonia: async (operador, nombre, numeroTelefono, monto) => {
    try {
      const token = UtilsService.getSessionToken();
      const { data } = await axios.post(
        `${Global.APIURL}/movimientos/realizar-pago-paquete-telefonia`,
        { operador, nombre, numeroTelefono, monto },
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
