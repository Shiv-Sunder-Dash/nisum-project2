interface ProductPreview {
    productId: string;
    productName: string;
    categoryId: string;
    categoryName: string;
    price: number;
    discountPercent?: number;
    imageUrl: string;
}

async function fetchProducts(productId: string, categoryId: string): Promise<ProductPreview[]> {
    const params = new URLSearchParams();
    if (productId) params.append("productId", productId);
    if (categoryId) params.append("categoryId", categoryId);
    const res = await fetch(`/api/products?${params.toString()}`);
    if (!res.ok) return [];
    return await res.json();
}

function renderProducts(products: ProductPreview[]): void {
    const grid = document.getElementById("productGrid") as HTMLElement;
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

async function filterProducts(): Promise<void> {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("productId")?.toLowerCase() || "";
    const categoryId = params.get("categoryId") || "";

    (document.getElementById("productId") as HTMLInputElement).value = productId;
    (document.getElementById("categoryId") as HTMLSelectElement).value = categoryId;

    const products = await fetchProducts(productId, categoryId);

    renderProducts(products);
}

async function loadCategoryDropdown() {
    const res = await fetch('/api/categories');
    if (!res.ok) return;
    const categories = await res.json();
    const select = document.getElementById('categoryId') as HTMLSelectElement;
    if (!select) return;
    select.innerHTML = '<option value="">All Categories</option>';
    categories.forEach((cat: any) => {
        const option = document.createElement('option');
        option.value = cat.categoryId;
        option.textContent = cat.categoryName;
        select.appendChild(option);
    });
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

document.addEventListener('DOMContentLoaded', () => {
    loadCategoryDropdown();
    filterProducts();
    updateNavBar();
});
