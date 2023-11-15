import axios from "axios";
import { Global } from "./Global";
import { UtilsService } from "./UtilsService";
import { AlertService } from "./AlertService";

export const BolsillosService = {
  consultar: async () => {
    try {
      const token = UtilsService.getSessionToken();
      const { data } = await axios.get(`${Global.APIURL}/bolsillos/consultar`, {
        headers: { Authorization: token },
      });

      if (data.error) {
        AlertService.error("Error", data.message);
        return null;
      } else {
        const bolsillos = data.data.bolsillos;
        return bolsillos;
      }
    } catch (error) {
      AlertService.error(
        "Error",
        "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde."
      );
      return null;
    }
  },

  cargar: async (idBolsillo, monto) => {
    try {
      const token = UtilsService.getSessionToken();
      const { data } = await axios.post(
        `${Global.APIURL}/bolsillos/cargar`,
        { idBolsillo, monto },
        { headers: { Authorization: token } }
      );

      if (data.error) {
        AlertService.error("Error", data.message);
        return null;
      } else {
        const movimiento = data.data.movimiento;
        return movimiento;
      }
    } catch (error) {
      AlertService.error(
        "Error",
        "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde."
      );
      return null;
    }
  },

  descargar: async (idBolsillo, monto) => {
    try {
      const token = UtilsService.getSessionToken();
      const { data } = await axios.post(
        `${Global.APIURL}/bolsillos/descargar`,
        { idBolsillo, monto },
        { headers: { Authorization: token } }
      );

      if (data.error) {
        AlertService.error("Error", data.message);
        return null;
      } else {
        const movimiento = data.data.movimiento;
        return movimiento;
      }
    } catch (error) {
      AlertService.error(
        "Error",
        "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde."
      );
      return null;
    }
  },

  crear: async (nombre, saldoObjetivo) => {
    try {
      const token = UtilsService.getSessionToken();
      const { data } = await axios.post(
        `${Global.APIURL}/bolsillos/crear`,
        { nombre, saldoObjetivo },
        { headers: { Authorization: token } }
      );

      if (data.error) {
        AlertService.error("Error", data.message);
        return false;
      } else {
        AlertService.success("Éxito", "¡Bolsillo creado correctamente!");
        return true;
      }
    } catch (error) {
      AlertService.error(
        "Error",
        "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde."
      );
      return false;
    }
  },

  editar: async (idBolsillo, nombre, saldoObjetivo) => {
    try {
      const token = UtilsService.getSessionToken();
      saldoObjetivo = !saldoObjetivo ? null : saldoObjetivo;
      const { data } = await axios.put(
        `${Global.APIURL}/bolsillos/editar`,
        { idBolsillo, nombre, saldoObjetivo },
        { headers: { Authorization: token } }
      );

      if (data.error) {
        AlertService.error("Error", data.message);
        return false;
      } else {
        AlertService.success("Éxito", "¡Bolsillo editado correctamente!");
        return true;
      }
    } catch (error) {
      AlertService.error(
        "Error",
        "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde."
      );
      return false;
    }
  },

  verificarSaldoSuficiente: async (idBolsillo, monto) => {
    try {
      const token = UtilsService.getSessionToken();
      const { data } = await axios.post(
        `${Global.APIURL}/bolsillos/verificar-saldo-suficiente`,
        { idBolsillo, monto },
        { headers: { Authorization: token } }
      );

      if (data.data) {
        return data.data.saldoSuficiente;
      } else {
        AlertService.error("Error", data.message);
        return null;
      }
    } catch (error) {
      AlertService.error(
        "Error",
        "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde."
      );
      return null;
    }
  },

  eliminar: async (idBolsillo) => {
    try {
      const token = UtilsService.getSessionToken();

      const saldoSuficiente = await BolsillosService.verificarSaldoSuficiente(
        idBolsillo,
        1
      );

      if (saldoSuficiente === null) {
        throw Error("Error al verificar el saldo del bolsillo.");
      }

      if (saldoSuficiente) {
        AlertService.warning(
          "Advertencia",
          "El bolsillo tiene saldo disponible. Antes de eliminarlo, debes descargar el saldo."
        );
        return false;
      } else {
        const { data } = await axios.delete(
          `${Global.APIURL}/bolsillos/eliminar`,
          { data: { idBolsillo }, headers: { Authorization: token } }
        );

        if (data.error) {
          AlertService.error("Error", data.message);
          return false;
        } else {
          AlertService.success("Éxito", "¡Bolsillo eliminado correctamente!");
          return true;
        }
      }
    } catch (error) {
      AlertService.error(
        "Error",
        "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde."
      );
      return false;
    }
  },

  consultarUltimosMovimientos: async (idBolsillo) => {
    try {
      const token = UtilsService.getSessionToken();
      const { data } = await axios.post(
        `${Global.APIURL}/bolsillos/consultar-ultimos-movimientos`,
        { idBolsillo },
        { headers: { Authorization: token } }
      );

      if (data.error) {
        AlertService.error("Error", data.message);
        return null;
      } else {
        const movimientos = data.data.movimientos;
        return movimientos;
      }
    } catch (error) {
      AlertService.error(
        "Error",
        "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde."
      );
      return null;
    }
  },
};
