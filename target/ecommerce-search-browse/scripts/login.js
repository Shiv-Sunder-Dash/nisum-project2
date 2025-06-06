"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
window.addEventListener('DOMContentLoaded', () => {
    const errorParam = new URLSearchParams(window.location.search).get('error');
    const errorMsg = document.getElementById('errorMsg');
    if (errorParam && errorMsg) {
        errorMsg.textContent = decodeURIComponent(errorParam);
        errorMsg.style.display = 'block';
    }
});
const loginForm = document.getElementById('loginForm');
loginForm === null || loginForm === void 0 ? void 0 : loginForm.addEventListener('submit', function (e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const payload = {
            email: formData.get('email'),
            password: formData.get('password')
        };
        const res = yield fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = yield res.json();
        const errorMsg = document.getElementById('errorMsg');
        if (result.success) {
            window.location.href = 'index.html';
        }
        else if (errorMsg) {
            errorMsg.textContent = result.error || 'Login failed.';
            errorMsg.style.display = 'block';
        }
    });
});
function updateNavBarLogin() {
    return __awaiter(this, void 0, void 0, function* () {
        const navBar = document.getElementById('navBar');
        if (!navBar)
            return;
        navBar.innerHTML = '';
        // Always add "Browse Products" at the beginning
        const browse = document.createElement('a');
        browse.href = 'search-browse.html';
        browse.textContent = 'Browse Products';
        navBar.appendChild(browse);
        const res = yield fetch('/api/session');
        const session = yield res.json();
        if (session.loggedIn) {
            const welcome = document.createElement('span');
            welcome.textContent = `Welcome, ${session.firstName}`;
            navBar.appendChild(welcome);
            const logoutBtn = document.createElement('a');
            logoutBtn.textContent = 'Logout';
            logoutBtn.href = '#';
            logoutBtn.onclick = (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                yield fetch('/api/logout', { method: 'POST' });
                window.location.reload();
            });
            navBar.appendChild(logoutBtn);
        }
        else {
            const login = document.createElement('a');
            login.href = 'login.html';
            login.textContent = 'Login';
            navBar.appendChild(login);
            const register = document.createElement('a');
            register.href = 'register.html';
            register.textContent = 'Register';
            navBar.appendChild(register);
        }
    });
}
document.addEventListener('DOMContentLoaded', updateNavBarLogin);
