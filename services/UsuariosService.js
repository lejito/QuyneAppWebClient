import axios from "axios";
import { AlertService } from "./AlertService";
import { Global } from './Global';

export const UsuariosService = {
  crearUsuarioYCuenta: async (tipoDocumento, numeroDocumento, primerNombre, segundoNombre, primerApellido, segundoApellido, fechaNacimiento, correoElectronico, clave, numeroTelefono) => {
    try {
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
    } catch (error) {
      AlertService.error("Error", "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.");
      return false;
    }
  },

  iniciarSesion: async (tipoDocumento, numeroDocumento, clave) => {
    try {
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
    } catch (error) {
      AlertService.error("Error", "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.");
      return false;
    }
  }
}
