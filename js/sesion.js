function validarInput(input) {
    if (input === null) {
        alert("Operación cancelada por el usuario");
        return false;
    }
    
    if (input.trim() === "") {
        alert("El campo no puede estar vacío");
        return null;
    }
    
    return true;
}

const sesionBoton = document.getElementById("sesion");
let user = [];

sesionBoton.addEventListener("click", function() {
    user = [];
    
    const usuario = prompt("Ingrese su nombre de usuario:");
    const usuarioValido = validarInput(usuario);
    
    if (usuarioValido === false) return; 
    if (usuarioValido === null) return; 
    
    const contraseña = prompt("Ingrese su contraseña:");
    const contraseñaValida = validarInput(contraseña);
    
    if (contraseñaValida === false) return;
    if (contraseñaValida === null) return;
    
    user.push(usuario.trim(), contraseña.trim());
    alert(`Bienvenido ${user[0]}`);
});

export default function obtenerUser() {
    return user;
}