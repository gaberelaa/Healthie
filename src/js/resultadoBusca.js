import { conectaApi } from "./conectaApi.js";
import novoProduto from "./mostrarProdutos.js";

const resultado = localStorage.getItem('resultadoDaBusca');

if (resultado !== null) {
    const resultadoRecuperado = JSON.parse(resultado);
    const resultadoContainer = document.querySelector('[data-result]');

    function mostrarProdutos(produtos) {
        resultadoContainer.innerHTML = '';
        produtos.forEach(elemento => resultadoContainer.appendChild(novoProduto(elemento.nome, elemento.imageURL, elemento.preco, elemento.categoria)));
    }

    if (resultadoRecuperado.length > 0) {
        mostrarProdutos(resultadoRecuperado);
    } else {
        resultadoContainer.textContent = "Nenhum produto encontrado.";
        resultadoContainer.style.height = '500px';
    }

    localStorage.removeItem('resultadoDaBusca');
} 