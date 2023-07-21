import { conectaApi } from "./conectaApi.js"

const divProdutos = document.querySelector('[data-products]');

export default function novoProduto(id, nome, imageURL, preco, categoria) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.id = `${id}`
    card.style.width = '15rem';
    card.dataset.category = categoria;

    const content = `
        <img src="${imageURL}" class="card-img-top" alt="imagem do produto">
        <div class="card-body text-center d-flex flex-column align-items-center gap-2">
            <h5 class="card-title">${nome}</h5>
            <span class="price fw-bold">R$${preco},00</span>
            <a href="../pages/paginaProduto.html?id=${id}" class="btn btn__login">Ver produto</a>
        </div>`;

    card.innerHTML = content;

    return card;
}

export async function listaProdutos() {
    const listaApi = await conectaApi.listaProdutos();
    divProdutos.innerHTML = '';
    listaApi.forEach(elemento => divProdutos.appendChild(novoProduto(elemento.id, elemento.nome, elemento.imageURL, elemento.preco, elemento.categoria)));
}

listaProdutos();