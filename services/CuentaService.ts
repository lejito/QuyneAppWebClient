import axios from "axios";
import { AlertService } from "./AlertService";
import { url } from "./Global";
import { Cuenta } from "~/models/Cuenta";
import { CuentaLocal } from "~/models/CuentaLocal";
import { Subject, Observer } from "~/models/Observer";


class CuentaSubject implements Subject {
    value: CuentaLocal | undefined;
    observers: Observer[];
    constructor() {
        this.value = undefined;
        this.observers = new Array();
    }
    addObserver(observer: Observer): void {
        this.observers.push(observer);
    }
    removeObserver(observer: Observer): void {
        this.observers = this.observers.filter(obs => obs.id != observer.id);
    }
    cleanObservers(): void {
        this.observers = new Array()
    }
    notifyObservers(): void {
        this.observers.forEach(observer => observer.update(this));
    }

}

class CuentaObserver implements Observer {
    id: number;
    value: any;
    constructor(id: number, value: any) {
        this.id = id;
        this.value = value;
    }
    update(subject: Subject): void {
        this.value.value = subject.value;
    }

}

const CUENTA = new CuentaSubject();

export const CuentaService = {

    async getCuentas() {
        try {
            const response = await axios.get(`${url}accounts`);
            return response.data.info;
        } catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }
    },
    async getCuenta(id_usuario: Number) {
        try {
            const response = await axios.get(`${url}accounts/${id_usuario}`);
            return response.data.info;
        } catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
        }

    }
    ,
    async updateCuenta(update: Cuenta, change: any) {
        try {
            const response = await axios.put(`${url}accounts/${update.id}`, change);
            AlertService.informative('Información sobre accion', response.data.message);
            return response.data.ok
        } catch (error) {
            AlertService.error("Error de conexion", `No fue posible conectarse a la base de datos detalles: ${error}`);
            return false;

        }
    },
    getCuentaActual(reference: any) {

        if (typeof CUENTA.value === typeof undefined) return
        reference.value = CUENTA.value;
        let newObserver = new CuentaObserver(Date.now(), reference);
        CUENTA.addObserver(newObserver);
        return newObserver
    },
    setCuenta(cuenta: Cuenta, nombre_completo: string) {
        CUENTA.value = { ...cuenta, nombre_completo }
        CUENTA.notifyObservers();
    },
    unsuscribe(observer: Observer) {
        CUENTA.removeObserver(observer)
    },
    logOut() {
        CUENTA.cleanObservers();
        CUENTA.value = undefined;
    },
    getStateCuenta() {
        return CUENTA.value;
    }
}