// Form validation for registration
document.getElementById('registrationForm')?.addEventListener('submit', function(e) {
    const password = document.getElementById('password').value;
    if(password.length < 8) {
        alert('Password must be at least 8 characters long');
        e.preventDefault();
    }
});

// Toggle password visibility
document.querySelectorAll('.password-toggle').forEach(button => {
    button.addEventListener('click', function() {
        const input = this.previousElementSibling;
        input.type = input.type === 'password' ? 'text' : 'password';
        this.textContent = input.type === 'password' ? 'Show' : 'Hide';
    });
});
