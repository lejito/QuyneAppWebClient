import axios from "axios";
import { User } from "~/models/User";
const url = "http://localhost:3001/";
import { AlertService } from "./AlertService";
export const UserService = {
    getUsers: async () => {
        try {
            const response = await axios.get(`${url}users`);
            return response.data;
        } catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }
    },
    async register(newUser: User, confirmPassword: String) {
        const users = await this.getUsers();

        const emailExists = users.some((user: User) => user.email === newUser.email);

        if (emailExists) {
            AlertService.error("Error de autenticacion", "El correo ingresado ya se encuentra registrado en la aplicacion")
        } else if (newUser.password !== confirmPassword) {
            AlertService.error("Error de autenticacion", "Las contraseñas no coindicen")
        } else {
            // Generate a unique sequential ID for the new user (the actual db do it, just while using fake api)
            const userId = Date.now();
            newUser.id = userId;

            // Add the user to the server
            await this.addUser(newUser);
            AlertService.success("Registro exitoso");
        }
    },
    async addUser(user: User) {
        try {
            const response = await axios.post(`${url}users`, user);
        } catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }
    },
    async login(document: string, docType: string, password: string) {
        const users = await this.getUsers();
        const foundUser: User = users.find(
            (user: User) =>
                user.document === document && user.password === password && user.docType === docType
        );

        if (foundUser) {
            AlertService.success(`Inicio de sesion exitoso, bienvenido ${foundUser.firstName}  ${foundUser.firstLastName}`);
            navigateTo('/inicio');
        } else {
            AlertService.error("Error de autenticacion", 'Credenciales incorrectas. Inicio de sesión fallido.')
        }
    }
}
