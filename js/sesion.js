document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('auth-modal');
    const loginForm = document.getElementById('Login-Form');
    const registerForm = document.getElementById('register-form');
    const showRegisterButton = document.getElementById('show-register-form');
    const showLoginButton = document.getElementById('show-login-form');
    const userStatusContainer = document.getElementById('user-status');

    function clearMessages() {
        loginForm.reset();
        registerForm.reset();
    }

    function openLoginModal() {
        clearMessages();
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        modal.classList.add('active');
    }

    function switchToRegisterForm() {
        clearMessages();
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
    }

    function switchToLoginForm() {
        clearMessages();
        registerForm.classList.remove('active');
        loginForm.classList.add('active');
    }

    document.getElementById('sesion').addEventListener('click', openLoginModal);

    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => modal.classList.remove('active'));
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    showRegisterButton.addEventListener('click', switchToRegisterForm);
    showLoginButton.addEventListener('click', switchToLoginForm);

    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const nombre = event.target.nombre.value.trim();
        const email = event.target.email.value.trim();
        const usuario = event.target.usuario.value.trim();
        const contraseña = event.target.contraseña.value;

        if (!nombre || !email || !usuario || !contraseña) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Todos los campos son obligatorios.'
            });
            return;
        }

        try {
            localStorage.setItem('userData', JSON.stringify({
                nombre: nombre,
                email: email,
                usuario: usuario,
                contraseña: contraseña
            }));
            localStorage.setItem('isLoggedIn', 'false');
            switchToLoginForm();
            Swal.fire({
                icon: 'success',
                title: 'Registro Exitoso',
                text: 'Usuario registrado correctamente.'
            });
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al guardar los datos. Intenta de nuevo.'
            });
        }
    });

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const inputUsuario = event.target.usuario.value.trim();
        const inputContraseña = event.target.contraseña.value;

        if (!inputUsuario || !inputContraseña) {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Usuario y contraseña son requeridos.'
            });
            return;
        }

        const savedUserDataString = localStorage.getItem('userData');
        let loginSuccess = false;

        if (savedUserDataString) {
            try {
                const savedUserData = JSON.parse(savedUserDataString);
                if (inputUsuario === savedUserData.usuario && inputContraseña === savedUserData.contraseña) {
                    loginSuccess = true;
                }
            } catch (e) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al procesar datos de usuario.'
                });
                return;
            }
        }

        if (loginSuccess) {
            localStorage.setItem('isLoggedIn', 'true');
            modal.classList.remove('active');
            checkLoginStatus();
            loginForm.reset();
            Swal.fire({
                icon: 'success',
                title: 'Inicio de Sesión Exitoso',
                text: 'Bienvenido!'
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Usuario o contraseña incorrectos.'
            });
            localStorage.setItem('isLoggedIn', 'false');
        }
    });

    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userDataString = localStorage.getItem('userData');

        if (isLoggedIn && userDataString) {
            try {
                const userData = JSON.parse(userDataString);
                userStatusContainer.innerHTML = `
                    <span>Bienvenido, ${userData.nombre}</span>
                    <button id="logout">Cerrar sesión</button>
                `;
                document.getElementById('logout').addEventListener('click', () => {
                    localStorage.removeItem('isLoggedIn');
                    checkLoginStatus();
                    Swal.fire({
                        icon: 'info',
                        title: 'Sesión Cerrada',
                        text: 'Has cerrado sesión correctamente.'
                    });
                });
            } catch (e) {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userData');
                userStatusContainer.innerHTML = '<button id="sesion">Iniciar sesión</button>';
                document.getElementById('sesion').addEventListener('click', openLoginModal);
            }
        } else {
            if (isLoggedIn) localStorage.removeItem('isLoggedIn');
            userStatusContainer.innerHTML = '<button id="sesion">Iniciar sesión</button>';
            document.getElementById('sesion').addEventListener('click', openLoginModal);
        }
    }

    checkLoginStatus();
});