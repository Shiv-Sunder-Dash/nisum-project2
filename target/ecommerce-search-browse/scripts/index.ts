async function fetchAndDisplayCategories() {
    const res = await fetch('/api/categories');
    if (!res.ok) return;
    const categories = await res.json();
    const container = document.getElementById('categoryContainer');
    if (!container) return;
    container.innerHTML = '';
    categories.forEach((cat: any) => {
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
        const anchor = card.querySelector('a') as HTMLAnchorElement | null;
        anchor?.addEventListener('click', (e: Event) => {
            e.preventDefault();
            if (anchor.href) {
                window.location.href = anchor.href;
            }
        });
    });
}

async function renderNavBar() {
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

document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayCategories();
    renderNavBar();
});