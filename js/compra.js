import obtenerUser from './sesion.js';

function verificarUser(user){
    if (user.length>0){
        alert(`Su usuario ${user[0]} esta registrado puede continuar con su compra`);
        return true;
    }
    else{
        alert("por favor inicie sesion antes de comprar");
        return false;
    }
}
function convertirNumero(mensaje){
    let validar= false;
    let numero;
    while (!validar){
        let valor = prompt(mensaje);
        numero  = Number(valor);
        if (!isNaN(numero)) {
            validar= true;
        }
        else {
            alert("El valor ingresado no es un numerico")
        }
    }
    return numero;
}

const compraBoleto = document.getElementById("compra");

compraBoleto.addEventListener("click", function(){
    const user = obtenerUser();
    if (!verificarUser(user)){
        return;
    }
    let dinero = convertirNumero("Ingrese el dinero disponible que usted posee");
    alert("El precio de la entrada es de 5$");
    let entradas = convertirNumero("Cuantas entradas desea");
    let costoTotal = entradas * 5;

    if (dinero >= costoTotal) {
        alert(`Su compra ha sido exitosa. Ha comprado ${entradas} entradas por un total de ${costoTotal}`);
    } else{
        alert("no tiene suficiente dinero")
    }


})