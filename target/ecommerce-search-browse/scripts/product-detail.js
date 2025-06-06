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
function fetchProduct(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`/api/product?id=${encodeURIComponent(productId)}`);
        if (!res.ok)
            return null;
        return yield res.json();
    });
}
function updateNavBarProductDetail() {
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
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    updateNavBarProductDetail();
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    if (!productId)
        return;
    const product = yield fetchProduct(productId);
    if (!product)
        return;
    document.getElementById('productTitle').textContent = `${product.productName} - FashionHub`;
    document.getElementById('productImage').src = product.imageUrl;
    document.getElementById('productImage').alt = product.productName;
    document.getElementById('productName').textContent = product.productName;
    document.getElementById('productBrand').textContent = `by ${product.brand}`;
    document.getElementById('productPrice').textContent = `₹${product.price}`;
    if (product.originalPrice && product.discountPercent) {
        document.getElementById('productOriginalPrice').textContent = `₹${product.originalPrice}`;
        document.getElementById('productOriginalPrice').style.display = "inline";
        document.getElementById('productDiscount').textContent = `(${product.discountPercent}% OFF)`;
        document.getElementById('productDiscount').style.display = "inline";
    }
    const offersList = document.getElementById('offersList');
    offersList.innerHTML = '';
    product.offers.forEach(offer => {
        const li = document.createElement('li');
        li.textContent = offer;
        offersList.appendChild(li);
    });
    const sizesContainer = document.getElementById('sizesContainer');
    sizesContainer.innerHTML = '';
    product.sizes.forEach(size => {
        const btn = document.createElement('button');
        btn.className = 'size-btn';
        btn.textContent = size;
        sizesContainer.appendChild(btn);
    });
    document.getElementById('stockInfo').textContent =
        `Only ${product.quantityInStock} items left in stock. Hurry up!`;
}));
