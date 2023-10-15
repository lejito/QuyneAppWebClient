import axios from "axios";
import { User } from "~/models/User";
import { url } from "./Global";
import { AlertService } from "./AlertService";
import { CuentaService } from "./CuentaService";
import { Cuenta } from "~/models/Cuenta";
import moment from "moment";
export const UserService = {
    getUsers: async () => {
        try {
            const response = await axios.get(`${url}users`);
            return response.data.info;
        } catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }
    },
    async register(newUser: User, confirmPassword: String, phone: string) {
        const users = await this.getUsers();
        const emailExists = users.some((user: User) => user.correo_electronico === newUser.correo_electronico);
        if (emailExists) {
            AlertService.error("Error de autenticacion", "El correo ingresado ya se encuentra registrado en la aplicacion")
        } else if (newUser.clave != confirmPassword) {
            AlertService.error("Error de autenticacion", "Las contraseñas no coindicen");
        } else {
            // Add the user to the server
            const info = await this.addUser(newUser, phone);
            if (info.ok) AlertService.success("Registro exitoso");
            else AlertService.error('Error durante la creacion', info.message);
        }
    },
    async addUser(user: User, phone: string) {
        try {

            const response = await axios.post(`${url}users`, { ...user, numero_telefono: phone });
            return response.data
        } catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }
    },
    async login(document: string, docType: string, password: string) {
        try {
            const valido = await axios.post(`${url}accounts/validate`, { "tipo_documento": docType, "numero_documento": document, "clave": password });
            if (!valido.data.ok) {
                AlertService.error("Error de autenticacion", 'Credenciales incorrectas. Inicio de sesión fallido.')
                return;
            }
            const response = await axios.get(`${url}users/${document}`)
            const foundUser: User = response.data.info

            const cuenta = await CuentaService.getCuenta(foundUser.id);
            const fullName = foundUser.primer_nombre + ` ${foundUser.primer_apellido}`

            CuentaService.setCuenta(cuenta, fullName);
            AlertService.success(`Inicio de sesion exitoso, bienvenido ${foundUser.primer_nombre}  ${foundUser.primer_apellido}`);
            navigateTo('/inicio');
        }
        catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }

    },
    logout() {
        CuentaService.logOut();
        navigateTo('/');
    }
}
