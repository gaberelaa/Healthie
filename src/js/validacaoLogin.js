const form = document.querySelector('[data-form]');
const spanError = document.querySelectorAll('[data-error]');
const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (validaEmail() && validaSenha()) {
        window.location.href = '../pages/perfil.html';
    }
});

function validaEmail() {
    const email = document.querySelector('#email').value;

    if (emailRegex.test(email)) {
        spanError[0].innerText = '';
        return true;
    } else {
        spanError[0].classList.add('error');
        spanError[0].innerText = 'Por favor, digite um e-mail válido.';
        return false;
    }
}

function validaSenha() {
    const senha = document.querySelector('#senha').value;

    if (senha.length > 3) {
        spanError[1].innerText = '';
        return true;
    } else {
        spanError[1].classList.add('error');
        spanError[1].innerText = 'Digite a sua senha.';
        return false; 
    }
}
