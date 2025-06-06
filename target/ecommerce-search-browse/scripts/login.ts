window.addEventListener('DOMContentLoaded', () => {
    const errorParam = new URLSearchParams(window.location.search).get('error');
    const errorMsg = document.getElementById('errorMsg');

    if (errorParam && errorMsg) {
        errorMsg.textContent = decodeURIComponent(errorParam);
        errorMsg.style.display = 'block';
    }
});

const loginForm = document.getElementById('loginForm') as HTMLFormElement | null;
loginForm?.addEventListener('submit', async function (e: Event) {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const payload = {
        email: formData.get('email'),
        password: formData.get('password')
    };
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    const result = await res.json();
    const errorMsg = document.getElementById('errorMsg');
    if (result.success) {
        window.location.href = 'index.html';
    } else if (errorMsg) {
        errorMsg.textContent = result.error || 'Login failed.';
        errorMsg.style.display = 'block';
    }
});

async function updateNavBarLogin() {
    const navBar = document.getElementById('navBar');
    if (!navBar) return;
    navBar.innerHTML = '';

    // Always add "Browse Products" at the beginning
    const browse = document.createElement('a');
    browse.href = 'search-browse.html';
    browse.textContent = 'Browse Products';
    navBar.appendChild(browse);

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

document.addEventListener('DOMContentLoaded', updateNavBarLogin);
