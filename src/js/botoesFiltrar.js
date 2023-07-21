import { conectaApi } from "./conectaApi.js"
import novoProduto from "./mostrarProdutos.js"
import { listaProdutos } from "./mostrarProdutos.js"

const divProdutos = document.querySelector('[data-products]');

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

    produtosFiltrados.forEach(elemento => divProdutos.appendChild(novoProduto(elemento.id, elemento.nome, elemento.imageURL, elemento.preco, elemento.categoria)));
};