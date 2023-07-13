import { conectaApi } from "./conectaApi.js"; 
import novoProduto from "./mostrarProdutos.js";

const inputSearch = document.querySelector('[data-search]');
const btnSearch = document.querySelector('#btnSearch'); 
const divProdutos = document.querySelector('[data-products]');


btnSearch.addEventListener('click', buscarProduto);

async function buscarProduto(event) {
    event.preventDefault();

    let termoDeBusca = inputSearch.value;
    const busca = await conectaApi.buscaProduto(termoDeBusca); 
    
    divProdutos.innerHTML = '';
    busca.forEach(elemento => divProdutos.appendChild(novoProduto(elemento.nome, elemento.imageURL, elemento.preco, elemento.categoria)));
    inputSearch.value = '';
}
