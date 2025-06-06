const form = document.getElementById('registrationForm') as HTMLFormElement | null;
form?.addEventListener('submit', function (e: Event) {
    const passwordInput = document.getElementById('password') as HTMLInputElement | null;
    if (passwordInput && passwordInput.value.length < 8) {
        alert('Password must be at least 8 characters long');
        e.preventDefault();
    }
});

const toggleButtons = document.querySelectorAll('.password-toggle');
toggleButtons.forEach(button => {
    button.addEventListener('click', function (this: HTMLButtonElement) {
        const input = this.previousElementSibling as HTMLInputElement;
        if (input && input.type) {
            input.type = input.type === 'password' ? 'text' : 'password';
            this.textContent = input.type === 'password' ? 'Show' : 'Hide';
        }
    });
});