import { conectaApi } from "./conectaApi.js";

const inputSearch = document.querySelector('[data-search]');
const btnSearch = document.querySelector('#btnSearch');

btnSearch.addEventListener('click', buscarProduto);

export default async function buscarProduto(event) {
    event.preventDefault();

    let termoDeBusca = inputSearch.value.trim(); // Remova espaços em branco no início e no fim
    if (termoDeBusca === '') {
        return; // Interrompe a função se o campo estiver vazio
    }

    const busca = await conectaApi.buscaProduto(termoDeBusca);

    const resultadosFiltrados = busca.filter((produto) => {
        return produto.nome.toLowerCase().includes(termoDeBusca.toLowerCase());
    });

    localStorage.setItem('resultadoDaBusca', JSON.stringify(resultadosFiltrados));

    window.location.href = '../pages/resultadoBusca.html';
}