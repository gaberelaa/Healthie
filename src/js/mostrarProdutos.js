import { conectaApi } from "./conectaApi.js"

const divProdutos = document.querySelector('[data-products]');

function novoProduto(nome, imageURL, preco, categoria) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.style.width = '18rem';
    card.dataset.category = categoria;

    const content = `
        <img src="${imageURL}" class="card-img-top" alt="imagem do produto">
        <div class="card-body text-center d-flex flex-column align-items-center gap-2">
            <h5 class="card-title">${nome}</h5>
            <span class="price fw-bold">R$${preco},00</span>
            <a href="#" class="btn btn__login">Comprar</a>
        </div>`;

    card.innerHTML = content;

    return card;
}

async function listaProdutos() {
    const listaApi = await conectaApi.listaProdutos();

    listaApi.forEach(elemento => divProdutos.appendChild(novoProduto(elemento.nome, elemento.imageURL, elemento.preco, elemento.categoria)));
}

listaProdutos();