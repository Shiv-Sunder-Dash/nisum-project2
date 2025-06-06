interface Product {
    productName: string;
    brand: string;
    price: number;
    originalPrice?: number;
    discountPercent?: number;
    imageUrl: string;
    offers: string[];
    sizes: string[];
    quantityInStock: number;
}

async function fetchProduct(productId: string): Promise<Product | null> {
    const res = await fetch(`/api/product?id=${encodeURIComponent(productId)}`);
    if (!res.ok) return null;
    return await res.json();
}

async function updateNavBarProductDetail() {
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

document.addEventListener('DOMContentLoaded', async () => {
    updateNavBarProductDetail();
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    if (!productId) return;
    const product = await fetchProduct(productId);
    if (!product) return;

    (document.getElementById('productTitle') as HTMLElement).textContent = `${product.productName} - FashionHub`;
    (document.getElementById('productImage') as HTMLImageElement).src = product.imageUrl;
    (document.getElementById('productImage') as HTMLImageElement).alt = product.productName;
    (document.getElementById('productName') as HTMLElement).textContent = product.productName;
    (document.getElementById('productBrand') as HTMLElement).textContent = `by ${product.brand}`;
    (document.getElementById('productPrice') as HTMLElement).textContent = `₹${product.price}`;

    if (product.originalPrice && product.discountPercent) {
        (document.getElementById('productOriginalPrice') as HTMLElement).textContent = `₹${product.originalPrice}`;
        (document.getElementById('productOriginalPrice') as HTMLElement).style.display = "inline";
        (document.getElementById('productDiscount') as HTMLElement).textContent = `(${product.discountPercent}% OFF)`;
        (document.getElementById('productDiscount') as HTMLElement).style.display = "inline";
    }

    const offersList = document.getElementById('offersList') as HTMLUListElement;
    offersList.innerHTML = '';
    product.offers.forEach(offer => {
        const li = document.createElement('li');
        li.textContent = offer;
        offersList.appendChild(li);
    });

    const sizesContainer = document.getElementById('sizesContainer') as HTMLElement;
    sizesContainer.innerHTML = '';
    product.sizes.forEach(size => {
        const btn = document.createElement('button');
        btn.className = 'size-btn';
        btn.textContent = size;
        sizesContainer.appendChild(btn);
    });

    (document.getElementById('stockInfo') as HTMLElement).textContent =
        `Only ${product.quantityInStock} items left in stock. Hurry up!`;
});
