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
function fetchProducts(productId, categoryId) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = new URLSearchParams();
        if (productId)
            params.append("productId", productId);
        if (categoryId)
            params.append("categoryId", categoryId);
        const res = yield fetch(`/api/products?${params.toString()}`);
        if (!res.ok)
            return [];
        return yield res.json();
    });
}
function renderProducts(products) {
    const grid = document.getElementById("productGrid");
    grid.innerHTML = "";
    for (const p of products) {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
      <img src="${p.imageUrl}" alt="${p.productName}" onerror="this.src='https://via.placeholder.com/200x200'">
      <h3>${p.productName}</h3>
      <p>ID: ${p.productId}</p>
      <p>Category: ${p.categoryName}</p>
      <p class="price">₹${p.price}</p>
      ${p.discountPercent ? `<p class="discount">${p.discountPercent}% OFF</p>` : ""}
      <a href="product-detail.html?id=${p.productId}" class="view-details">View Details</a>
    `;
        grid.appendChild(card);
    }
}
function filterProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const params = new URLSearchParams(window.location.search);
        const productId = ((_a = params.get("productId")) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || "";
        const categoryId = params.get("categoryId") || "";
        document.getElementById("productId").value = productId;
        document.getElementById("categoryId").value = categoryId;
        const products = yield fetchProducts(productId, categoryId);
        renderProducts(products);
    });
}
function loadCategoryDropdown() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch('/api/categories');
        if (!res.ok)
            return;
        const categories = yield res.json();
        const select = document.getElementById('categoryId');
        if (!select)
            return;
        select.innerHTML = '<option value="">All Categories</option>';
        categories.forEach((cat) => {
            const option = document.createElement('option');
            option.value = cat.categoryId;
            option.textContent = cat.categoryName;
            select.appendChild(option);
        });
    });
}
function updateNavBar() {
    return __awaiter(this, void 0, void 0, function* () {
        const navBar = document.getElementById('navBar');
        if (!navBar)
            return;
        navBar.innerHTML = '';
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
    loadCategoryDropdown();
    filterProducts();
    updateNavBar();
});
