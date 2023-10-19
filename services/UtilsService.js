const tiposDocumentos = [
  { name: "Cédula de ciudadanía", value: "CC" },
  { name: "Tarjeta de identidad", value: "TI" },
  { name: "Cédula de extranjería", value: "CE" },
  { name: "Pasaporte", value: "PP" }
]

const entidades = [
  { name: "Bancolombia", value: "Bancolombia" },
  { name: "Banco de Bogotá", value: "BancoDeBogota" },
  { name: "Davivienda", value: "Davivienda" },
  { name: "AVVillas", value: "AVVillas" },
  { name: "Banco de Occidente", value: "BancoDeOccidente" },
  { name: "Banco Popular", value: "BancoPopular" },
  { name: "Banco Caja Social", value: "BancoCajaSocial" },
  { name: "BBVA Colombia", value: "BBVAColombia" },
  { name: "Banco Agrario", value: "BancoAgrario" },
  { name: "Banco Falabella", value: "BancoFalabella" },
  { name: "F4Y", value: "F4Y" }
]

const operadores = [
  { name: "Claro", value: "Claro" },
  { name: "Tigo", value: "Tigo" },
  { name: "Movistar", value: "Movistar" },
  { name: "ETC", value: "ETB" },
  { name: "Movil Éxito", value: "MovilExito" },
  { name: "Virgin", value: "Virgin" },
  { name: "WOM", value: "WOM" }
]

const paquetes = [
  { name: "Ilimitado 30d", price: 65000 },
  { name: "Ilimitado 15d", price: 38000 },
  { name: "Ilimitado 7d", price: 20000 },
  { name: "Ilimitado 5d", price: 14000 },
  { name: "Todo Incluido 300GB 30d", price: 45000 },
  { name: "Todo Incluido 100GB 30d", price: 39000 },
  { name: "Todo Incluido 100GB 15d", price: 29000 },
  { name: "Todo Incluido 50GB 7d", price: 22000 },
  { name: "Todo Incluido 50GB 5d", price: 12000 },
  { name: "Todo Incluido 30GB 7d", price: 17000 },
  { name: "Todo Incluido 30GB 5d", price: 10000 },
  { name: "Empresarial 25GB + WFI 7d", price: 19000 },
  { name: "Empresarial 25GB + WFI 5d", price: 11000 },
  { name: "Empresarial 25GB + WFI 3d", price: 8500 },
  { name: "Empresarial 25GB 7d", price: 16000 },
  { name: "Empresarial 25GB 5d", price: 8500 },
  { name: "Empresarial 25GB 3d", price: 7000 },
  { name: "Personal 10GB + WFI 7d", price: 9800 },
  { name: "Personal 10GB + WFI 5d", price: 7600 },
  { name: "Personal 10GB + WFI 3d", price: 6500 },
  { name: "Personal 10GB + WFI 1d", price: 4600 },
  { name: "Personal 10GB 7d", price: 8500 },
  { name: "Personal 10GB 5d", price: 6300 },
  { name: "Personal 10GB 3d", price: 5200 },
  { name: "Personal 10GB 1d", price: 3500 },
  { name: "Personal 5GB + WFI 7d", price: 7200 },
  { name: "Personal 5GB + WFI 5d", price: 4900 },
  { name: "Personal 5GB + WFI 3d", price: 3700 },
  { name: "Personal 5GB + WFI 1d", price: 3100 },
  { name: "Personal 5GB 7d", price: 6500 },
  { name: "Personal 5GB 5d", price: 4500 },
  { name: "Personal 5GB 3d", price: 3300 },
  { name: "Personal 5GB 1d", price: 2300 },
  { name: "Basico 3GB 7d", price: 5500 },
  { name: "Basico 3GB 5d", price: 4000 },
  { name: "Basico 3GB 3d", price: 2200 },
  { name: "Basico 3GB 1d", price: 1600 },
  { name: "Redes Sociales WFI 7d", price: 3600 },
  { name: "Redes Sociales WFI 5d", price: 2800 },
  { name: "Redes Sociales WFI 3d", price: 2100 },
  { name: "Redes Sociales WFI 1d", price: 1100 }
]


export const UtilsService = {
  getTiposDocumentos() {
    return tiposDocumentos;
  },

  getEntidades() {
    return entidades;
  },

  getOperadores() {
    return operadores;
  },

  getPaquetes() {
    return paquetes;
  },

  getSessionToken() {
    return sessionStorage.getItem("STK");
  },

  formatToCOP(value) {
    return value.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
  }
}