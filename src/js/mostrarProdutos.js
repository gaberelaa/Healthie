import { conectaApi } from "./conectaApi.js"

const divProdutos = document.querySelector('[data-products]');

export default function novoProduto(nome, imageURL, preco, categoria) {
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
    divProdutos.innerHTML = '';
    listaApi.forEach(elemento => divProdutos.appendChild(novoProduto(elemento.nome, elemento.imageURL, elemento.preco, elemento.categoria)));
}

listaProdutos();


//Filtrar produtos pelos botões

const btnFiltrarTodos = document.querySelector('.btn__filtro-todos');
btnFiltrarTodos.addEventListener('click', listaProdutos); //Todos

//Frutas, vegetais e saudável
const buttons = document.querySelectorAll('.btn__filtro');

buttons.forEach(btn => btn.addEventListener('click', btnFiltrar));

async function btnFiltrar() {
    const listaApi = await conectaApi.listaProdutos();
    const elementoBtn = document.getElementById(this.id);
    const categoria = elementoBtn.value;

    let produtosFiltrados = listaApi.filter(elemento => elemento.categoria == categoria);

    divProdutos.innerHTML = '';

    produtosFiltrados.forEach(elemento => divProdutos.appendChild(novoProduto(elemento.nome, elemento.imageURL, elemento.preco, elemento.categoria)));
};
