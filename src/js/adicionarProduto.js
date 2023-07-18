import { conectaApi } from "./conectaApi.js";

const formAddProduto = document.querySelector('[data-formulario]');

async function adicionarProduto(event) {
    event.preventDefault();

    const imageURL = document.querySelector('[data-img]').value;
    const nome = document.querySelector('[data-titulo]').value;
    const descricao = document.querySelector('[data-descricao]').value;
    const preco = document.querySelector('[data-preco]').value;
    const categoria = document.querySelector('[data-categoria]').value;

    await conectaApi.criaProduto(imageURL, nome, descricao, preco, categoria);

    window.location.href = '../pages/perfil.html'
};

formAddProduto.addEventListener('submit', adicionarProduto);