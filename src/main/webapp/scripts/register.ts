const registerForm = document.getElementById('registrationForm') as HTMLFormElement | null;
registerForm?.addEventListener('submit', async function (e: Event) {
    e.preventDefault();
    const formData = new FormData(registerForm);
    const password = formData.get('password') as string;
    const errorDisplay = document.getElementById('errorMsg');
    if (!password || password.length < 8) {
        if (errorDisplay) {
            errorDisplay.textContent = 'Password must be at least 8 characters long.';
            errorDisplay.style.display = 'block';
        }
        return;
    }
    const payload = {
        username: formData.get('username'),
        email: formData.get('email'),
        password,
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName')
    };
    const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    const result = await res.json();
    if (result.success) {
        window.location.href = 'login.html?registration=success';
    } else if (errorDisplay) {
        errorDisplay.textContent = result.error || 'Registration failed.';
        errorDisplay.style.display = 'block';
    }
});

const passwordToggleButtons = document.querySelectorAll('.password-toggle');
passwordToggleButtons.forEach(button => {
    button.addEventListener('click', function (this: HTMLButtonElement) {
        const input = this.previousElementSibling as HTMLInputElement;
        if (input && input.type) {
            input.type = input.type === 'password' ? 'text' : 'password';
            this.textContent = input.type === 'password' ? 'Show' : 'Hide';
        }
    });
});

const registerError = new URLSearchParams(window.location.search).get('error');
const errorDisplay = document.getElementById('errorMsg');
if (registerError && errorDisplay) {
    errorDisplay.textContent = decodeURIComponent(registerError);
    errorDisplay.style.display = 'block';
}

async function updateNavBar() {
    const navBar = document.getElementById('navBar');
    if (!navBar) return;
    navBar.innerHTML = '';
    const res = await fetch('/api/session');
    const session = await res.json();
    if (session.loggedIn) {
        const welcome = document.createElement('span');
        welcome.textContent = `Welcome, ${session.firstName}`;
        navBar.appendChild(welcome);
        const logoutBtn = document.createElement('a');
        logoutBtn.textContent = 'Logout';
        logoutBtn.href = '#';
        logoutBtn.onclick = async (e) => {
            e.preventDefault();
            await fetch('/api/logout', { method: 'POST' });
            window.location.reload();
        };
        navBar.appendChild(logoutBtn);
    } else {
        const login = document.createElement('a');
        login.href = 'login.html';
        login.textContent = 'Login';
        navBar.appendChild(login);
        const register = document.createElement('a');
        register.href = 'register.html';
        register.textContent = 'Register';
        navBar.appendChild(register);
    }
}

document.addEventListener('DOMContentLoaded', updateNavBar);
