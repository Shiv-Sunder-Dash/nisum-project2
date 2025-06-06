"use strict";
const form = document.getElementById('registrationForm');
form === null || form === void 0 ? void 0 : form.addEventListener('submit', function (e) {
    const passwordInput = document.getElementById('password');
    if (passwordInput && passwordInput.value.length < 8) {
        alert('Password must be at least 8 characters long');
        e.preventDefault();
    }
});
const toggleButtons = document.querySelectorAll('.password-toggle');
toggleButtons.forEach(button => {
    button.addEventListener('click', function () {
        const input = this.previousElementSibling;
        if (input && input.type) {
            input.type = input.type === 'password' ? 'text' : 'password';
            this.textContent = input.type === 'password' ? 'Show' : 'Hide';
        }
    });
});
