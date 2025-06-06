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
function fetchAndDisplayCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch('/api/categories');
        if (!res.ok)
            return;
        const categories = yield res.json();
        const container = document.getElementById('categoryContainer');
        if (!container)
            return;
        container.innerHTML = '';
        categories.forEach((cat) => {
            const card = document.createElement('div');
            card.className = 'category-card';
            card.innerHTML = `
            <h3>${cat.categoryName}</h3>
            <p>${cat.description || ''}</p>
            <a href="search-browse.html?categoryId=${cat.categoryId}">Browse</a>
        `;
            container.appendChild(card);
        });
        // If you want, re-add the click event for category cards here:
        const categoryCards = container.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            const anchor = card.querySelector('a');
            anchor === null || anchor === void 0 ? void 0 : anchor.addEventListener('click', (e) => {
                e.preventDefault();
                if (anchor.href) {
                    window.location.href = anchor.href;
                }
            });
        });
    });
}
function renderNavBar() {
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
document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayCategories();
    renderNavBar();
});
