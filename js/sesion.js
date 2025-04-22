document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('auth-modal');
    const loginForm = document.getElementById('Login-Form');
    const registerForm = document.getElementById('register-form');
    const showRegisterButton = document.getElementById('show-register-form');
    const showLoginButton = document.getElementById('show-login-form');
    const userStatusContainer = document.getElementById('user-status');
    const loginMessage = document.getElementById('login-message');
    const registerMessage = document.getElementById('register-message');

    function clearMessages() {
        loginMessage.textContent = '';
        loginMessage.className = 'message';
        registerMessage.textContent = '';
        registerMessage.className = 'message';
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
        clearMessages();
        const nombre = event.target.nombre.value.trim();
        const email = event.target.email.value.trim();
        const usuario = event.target.usuario.value.trim();
        const contraseña = event.target.contraseña.value;

        if (!nombre || !email || !usuario || !contraseña) {
             registerMessage.textContent = 'Todos los campos son obligatorios.';
             registerMessage.className = 'message error';
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
        } catch (e) {
             registerMessage.textContent = 'Error al guardar los datos. Intenta de nuevo.';
             registerMessage.className = 'message error';
        }
    });

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        clearMessages();
        const inputUsuario = event.target.usuario.value.trim();
        const inputContraseña = event.target.contraseña.value;

        if (!inputUsuario || !inputContraseña) {
            loginMessage.textContent = 'Usuario y contraseña son requeridos.';
            loginMessage.className = 'message error';
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
                loginMessage.textContent = 'Error al procesar datos de usuario.';
                loginMessage.className = 'message error';
                return;
            }
        }

        if (loginSuccess) {
            localStorage.setItem('isLoggedIn', 'true');
            modal.classList.remove('active');
            checkLoginStatus();
            loginForm.reset();
        } else {
            loginMessage.textContent = 'Usuario o contraseña incorrectos.';
            loginMessage.className = 'message error';
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