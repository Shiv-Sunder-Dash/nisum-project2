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
const registerForm = document.getElementById('registrationForm');
registerForm === null || registerForm === void 0 ? void 0 : registerForm.addEventListener('submit', function (e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const formData = new FormData(registerForm);
        const password = formData.get('password');
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
        const res = yield fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = yield res.json();
        if (result.success) {
            window.location.href = 'login.html?registration=success';
        }
        else if (errorDisplay) {
            errorDisplay.textContent = result.error || 'Registration failed.';
            errorDisplay.style.display = 'block';
        }
    });
});
const passwordToggleButtons = document.querySelectorAll('.password-toggle');
passwordToggleButtons.forEach(button => {
    button.addEventListener('click', function () {
        const input = this.previousElementSibling;
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
function updateNavBarRegister() {
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
document.addEventListener('DOMContentLoaded', updateNavBarRegister);
