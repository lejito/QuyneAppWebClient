import axios from "axios";
import moment from 'moment';
import { Global } from './Global';
import { UtilsService } from "./UtilsService";
import { AlertService } from "./AlertService";

export const UsuariosService = {
  crearUsuarioYCuenta: async (tipoDocumento, numeroDocumento, primerNombre, segundoNombre, primerApellido, segundoApellido, fechaNacimiento, correoElectronico, clave, numeroTelefono) => {
    try {
      if (numeroDocumento.length > 10) {
        AlertService.warning("Advertencia", "El número de documento no debe superar los 10 caracteres.");
        return false;
      } else if (primerNombre.length > 20 || segundoNombre.length > 20 || primerApellido.length > 20 || segundoApellido.length > 20) {
        AlertService.warning("Advertencia", "Los nombres y apellidos no deben superar los 20 caracteres.");
      } else if (correoElectronico.length > 120) {
        AlertService.warning("Advertencia", "El correo electrónico no debe superar los 120 caracteres.");
      } else if (moment().diff(moment(fechaNacimiento, 'yyyy-MM-DD'), 'years') < 14) {
        AlertService.warning("Advertencia", "Para crear una cuenta, debes ser mayor de 14 años.");
      } else if (numeroTelefono.length > 10) {
        AlertService.warning("Advertencia", "El número de teléfono no debe superar los 10 caracteres (Escríbelo sin prefijos).");
      } else if (clave.length < 8 || clave.length > 20) {
        AlertService.warning("Advertencia", "La contraseña debe tener entre 8 y 20 caracteres.");
        return false;
      } else {
        const usuario = { tipoDocumento, numeroDocumento, primerNombre, segundoNombre, primerApellido, segundoApellido, fechaNacimiento, correoElectronico, clave, numeroTelefono };

        const { data } = await axios.post(`${Global.APIURL}/usuarios/crear-usuario-cuenta`, usuario);

        if (data.error) {
          AlertService.error("Error", data.message);
          return false;
        } else {
          AlertService.success("¡Éxito!", data.message);
          navigateTo("/login");
          return true;
        }
      }
    } catch (error) {
      AlertService.error("Error", "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.");
      return false;
    }
  },

  iniciarSesion: async (tipoDocumento, numeroDocumento, clave) => {
    try {
      if (numeroDocumento.length > 10) {
        AlertService.warning("Advertencia", "El número de documento no debe superar los 10 caracteres.");
        return false;
      } else if (clave.length < 8 || clave.length > 20) {
        AlertService.warning("Advertencia", "La contraseña debe tener entre 8 y 20 caracteres.");
        return false;
      } else {
        const usuario = { tipoDocumento, numeroDocumento, clave };

        const { data } = await axios.post(`${Global.APIURL}/usuarios/iniciar-sesion`, usuario);

        if (data.error) {
          AlertService.error("Error", data.message);
          return false;
        } else {
          AlertService.success("¡Bienvenid@!", data.message);
          const token = data.data.token;
          sessionStorage.setItem("STK", token);
          navigateTo("/inicio");
          return true;
        }
      }
    } catch (error) {
      AlertService.error("Error", "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.");
      return false;
    }
  },

  cerrarSesion: async () => {
    try {
      const token = UtilsService.getSessionToken();

      const { data } = await axios.post(
        `${Global.APIURL}/usuarios/cerrar-sesion`,
        {},
        { headers: { "Authorization": token } }
      );

      if (data.error) {
        AlertService.error("Error", data.message);
        return false;
      } else {
        AlertService.success("¡Hasta pronto!", data.message);
        sessionStorage.removeItem("STK");
        navigateTo("/");
        return true;
      }
    } catch (error) {
      AlertService.error("Error", "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.");
      return false;
    }
  },

  consultarDatos: async () => {
    try {
      const token = UtilsService.getSessionToken();

      const { data } = await axios.post(
        `${Global.APIURL}/usuarios/consultar-datos`,
        {},
        { headers: { "Authorization": token } }
      );

      if (data.error) {
        AlertService.error("Error", data.message);
        return false;
      } else {
        return data.data.usuario;
      }
    } catch (error) {
      AlertService.error("Error", "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.");
      return false;
    }
  },
}
