import obtenerUser from './sesion.js';

function verificarUser(user) {
    if (user.length > 0) {
        alert(`Bienvenido ${user[0]}, puede continuar con su compra`);
        return true;
    } else {
        alert("Por favor inicie sesión antes de comprar");
        return false;
    }
}

function convertirNumero(mensaje) {
    while (true) {
        const input = prompt(mensaje);
        
        if (input === null) {
            console.log("El usuario ha cancelado");
            return null;
        }
        
        if (input.trim() === "") {
            alert("No puede dejar el espacio vacío");
            continue;
        }
        
        const numero = parseInt(input.trim(), 10);
        
        if (isNaN(numero)) {
            alert("Por favor ingrese un valor numérico válido");
            continue;
        }
        
        if (numero <= 0) {
            alert("El número debe ser mayor a 0");
            continue;
        }
        
        return numero;
    }
}

const compraBoleto = document.getElementById("compra");

compraBoleto.addEventListener("click", function() {
    const user = obtenerUser();
    if (!verificarUser(user)) {
        return;
    }
    
    const dinero = convertirNumero("Ingrese el dinero disponible que usted posee:");
    if (dinero === null) return;
    
    alert("El precio de la entrada es de $5");
    const entradas = convertirNumero("¿Cuántas entradas desea?");
    if (entradas === null) return;
    
    const costoTotal = entradas * 5;

    if (dinero >= costoTotal) {
        alert(`Compra exitosa. Ha comprado ${entradas} entradas por un total de $${costoTotal}`);
    } else {
        alert("No tiene suficiente dinero para esta compra");
    }
});

export { verificarUser, convertirNumero };