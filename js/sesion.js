function evaluador(novacio){
    if (novacio == null){
        alert("el usuario ha cancelado");
        return false
        
    }
    
    if (novacio.trim().length === 0){
        alert("el campo no puede estar vacio");
        return null
    }
    else{
        return true
    }
}

const sesionBoton = document.getElementById("sesion");
let user= [];

sesionBoton.addEventListener("click", function () {
        let usuariovalido = false;
        let contraseñavalida = false;
        let usuario, contraseña;

        user.length=0;
        do {
            if (!usuariovalido) {
                usuario = prompt("Ingrese su nombre de usuario:");
                let cancelador = evaluador(usuario);
                if(cancelador === false){
                    break;
                }
                else if (cancelador === true){
                    usuariovalido= true
                    user.push(usuario)
                }
            }
            if (usuariovalido && !contraseñavalida) {
                contraseña = prompt("Ingrese su contraseña:");
                let canceladorContra = evaluador(contraseña);
                if (canceladorContra === false){
                    break;}
                else if(canceladorContra === true) {
                    contraseñavalida= true
                    user.push(contraseña)
                }
            }
        } while (!usuariovalido || !contraseñavalida);
        alert(`Bienvenido ${user[0]}`);
    });

    export default function obtenerUser() {
        return user;
    }

