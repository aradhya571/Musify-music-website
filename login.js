function getAvatarSVG() {
    // Simple user profile SVG icon (gray background, white user)
    return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 24 24'><circle cx='12' cy='12' r='12' fill='%23999'/><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' fill='white'/></svg>`;
}

function saveUserAndRedirect(firstName, lastName, email) {
    localStorage.setItem('musifyUser', JSON.stringify({
        name: firstName + ' ' + lastName,
        email: email,
        img: getAvatarSVG(firstName)
    }));
    showToast('Welcome, ' + firstName + '!');
    setTimeout(() => window.location.href = 'index.html', 1200);
}

function login(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;

    if (!validateEmail(email)) {
        showToast('Please enter a valid email address.', false);
        return;
    }
    // Add your password check here if needed
    saveUserAndRedirect(firstName, lastName, email);
}

function signup(event) {
    event.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;

    if (!validateEmail(email)) {
        showToast('Please enter a valid email address.', false);
        return;
    }
    if (password.length < 8 || !/\d/.test(password) || !/[A-Za-z]/.test(password)) {
        showToast('Password must be at least 8 characters and include a letter and a number.', false);
        return;
    }
    if (password !== confirmPassword) {
        showToast('Passwords do not match.', false);
        return;
    }
    saveUserAndRedirect(firstName, lastName, email);
}