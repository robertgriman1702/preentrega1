document.addEventListener('DOMContentLoaded', () => {
    const openModalBtn = document.getElementById('sesion');
    const closeModal = document.querySelectorAll('.close-modal');
    const modal = document.querySelector('.modal');
    const loginForm = document.getElementById('Login-Form');
    const OpenRegistrarse = document.getElementById('otro-modal');
    const registro = document.getElementById('register-form');
    const volverALogin = document.getElementById('vueltaModal');
    const userStatusContainer = document.getElementById('user-status');
    const loginMessage = document.createElement('div');
    const registerMessage = document.createElement('div');

    loginMessage.className = 'message';
    registerMessage.className = 'message';
    loginForm.prepend(loginMessage);
    registro.prepend(registerMessage);

    loginForm.classList.remove('hidden');
    registro.classList.remove('active');
    
    checkLoginStatus();

    openModalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        loginForm.classList.remove('hidden');
        registro.classList.remove('active');
        loginMessage.textContent = '';
        registerMessage.textContent = '';
    });

    closeModal.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    OpenRegistrarse.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.add('hidden');
        registro.classList.add('active');
        loginMessage.textContent = '';
        registerMessage.textContent = '';
    });

    volverALogin.textContent = '¿Ya tienes cuenta? Inicia sesión';
    volverALogin.addEventListener('click', (e) => {
        e.preventDefault();
        registro.classList.remove('active');
        loginForm.classList.remove('hidden');
        loginMessage.textContent = '';
        registerMessage.textContent = '';
    });

    registro.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const userData = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            usuario: formData.get('usuario'),
            contraseña: formData.get('contraseña')
        };

        if (!userData.nombre || !userData.email || !userData.usuario || !userData.contraseña) {
            registerMessage.textContent = 'Por favor completa todos los campos';
            registerMessage.className = 'message error';
            return;
        }

        localStorage.setItem('userData', JSON.stringify(userData));
        
        registro.classList.remove('active');
        loginForm.classList.remove('hidden');
        
        loginMessage.textContent = 'Registro exitoso. Ahora puedes iniciar sesión.';
        loginMessage.className = 'message success';
        
        event.target.reset();
    });

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const loginUsuario = formData.get('usuario');
        const loginContraseña = formData.get('contraseña');

        if (!loginUsuario || !loginContraseña) {
            loginMessage.textContent = 'Por favor ingresa usuario y contraseña';
            loginMessage.className = 'message error';
            return;
        }

        const savedUserData = JSON.parse(localStorage.getItem('userData'));

        if (!savedUserData) {
            loginMessage.textContent = 'No hay usuarios registrados. Por favor regístrate primero.';
            loginMessage.className = 'message error';
            return;
        }

        if (loginUsuario === savedUserData.usuario && loginContraseña === savedUserData.contraseña) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify(savedUserData));
            
            modal.classList.remove('active');
            checkLoginStatus();
            
            const welcomeMessage = document.createElement('div');
            welcomeMessage.className = 'message success';
            welcomeMessage.textContent = `Bienvenido ${savedUserData.nombre}!`;
            userStatusContainer.prepend(welcomeMessage);
            
            setTimeout(() => {
                welcomeMessage.remove();
            }, 3000);
            
            event.target.reset();
        } else {
            loginMessage.textContent = 'Usuario o contraseña incorrectos';
            loginMessage.className = 'message error';
        }
    });

    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (isLoggedIn && currentUser) {
            userStatusContainer.innerHTML = `
                <span>Bienvenido, ${currentUser.nombre}</span>
                <button id="logout">Cerrar sesión</button>
            `;
            
            document.getElementById('logout').addEventListener('click', logout);
        } else {
            userStatusContainer.innerHTML = '<button id="sesion">Iniciar sesión</button>';
            
            document.getElementById('sesion').addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
                loginForm.classList.remove('hidden');
                registro.classList.remove('active');
                loginMessage.textContent = '';
                registerMessage.textContent = '';
            });
        }
    };

    function logout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        checkLoginStatus();
        
        const goodbyeMessage = document.createElement('div');
        goodbyeMessage.className = 'message success';
        goodbyeMessage.textContent = 'Has cerrado sesión correctamente';
        userStatusContainer.prepend(goodbyeMessage);
        
        setTimeout(() => {
            goodbyeMessage.remove();
        }, 3000);
    };
})