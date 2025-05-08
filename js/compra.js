function verificarUser() {
    if (user && user.nombre) {
    Swal.fire({
        title: `Bienvenido ${user.nombre}`,
        text: 'Puede continuar con su compra',
        icon: 'success',
        confirmButtonColor: '#FFA400'
    });
    return true;
    }else {
    Swal.fire({
        title: 'Acceso requerido',
        text: 'Por favor inicie sesión antes de comprar',
        icon: 'warning',
        confirmButtonColor: '#FFA400'
    });
    return false;
}}

function convertirNumero(mensaje) {
    while (true) {
        const input = prompt(mensaje);
        
        if (input === null) {
            console.log("El usuario ha cancelado");
            return null;
        }
        
        if (input.trim() === "") {
            Swal.fire({
                title: 'Error',
                text: 'No puede dejar el espacio vacío',
                icon: 'error',
                confirmButtonColor: '#FFA400'
            });
            continue;
        }
        
        const numero = parseInt(input.trim(), 10);
        
        if (isNaN(numero)) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor ingrese un valor numérico válido',
                icon: 'error',
                confirmButtonColor: '#FFA400'
            });
            continue;
        }
        
        if (numero <= 0) {
            Swal.fire({
                title: 'Error',
                text: 'El número debe ser mayor a 0',
                icon: 'error',
                confirmButtonColor: '#FFA400'
            });
            continue;
        }
        
        return numero;
    }
}

const compraBoletoButton = document.getElementById("seleccionar"); 

if (compraBoletoButton && compraBoletoButton.id === "seleccionar") {

} else {
    const antiguoBotonCompra = document.getElementById("compra");
    if (antiguoCotonCompra) {
        antiguoCotonCompra.addEventListener("click", function() {
            if (!verificarUser()) {
                return;
            }
            
            const dinero = convertirNumero("Ingrese el dinero disponible que usted posee:");
            if (dinero === null) return;
            
            Swal.fire({
                title: 'Información',
                text: 'El precio de la entrada es de $5',
                icon: 'info',
                confirmButtonColor: '#FFA400'
            });
            const entradas = convertirNumero("¿Cuántas entradas desea?");
            if (entradas === null) return;
            
            const costoTotal = entradas * 5;

            if (dinero >= costoTotal) {
                Swal.fire({
                    title: 'Compra Exitosa',
                    text: `Ha comprado ${entradas} entradas por un total de $${costoTotal}`,
                    icon: 'success',
                    confirmButtonColor: '#FFA400'
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'No tiene suficiente dinero para esta compra',
                    icon: 'error',
                    confirmButtonColor: '#FFA400'
                });
            }
        });
    }
}