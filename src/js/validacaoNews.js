const inputEmail = document.querySelector('[data-email]');
const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const spanErro = document.querySelector('[data-alert]');
const formNews = document.querySelector('[data-news]');

formNews.addEventListener('submit', (event) => {
    event.preventDefault();

    validaEmailNews();
});


function validaEmailNews() {
    if (emailRegex.test(inputEmail.value)) {
        spanErro.classList.add('success');
        spanErro.innerText = 'Legal, agora você está participando da nossa Newsletter!';
        inputEmail.value = '';
        
    } else {
        spanErro.classList.remove('success');
        spanErro.classList.add('error');
        spanErro.innerText = 'Por favor, digite um e-mail válido.';
    }
}