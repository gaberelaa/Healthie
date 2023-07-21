
import { conectaApi } from "./conectaApi.js";

function novoProdutoAdicionado(id, nome, imageURL, preco, categoria) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.id = `${id}`;
    card.style.width = '15rem';
    card.dataset.category = categoria;

    const content = `
        <img src="${imageURL}" class="card-img-top" alt="imagem do produto">
        <div class="card-body text-center d-flex flex-column align-items-center gap-2">
            <h5 class="card-title">${nome}</h5>
            <span class="price fw-bold">R$${preco},00</span>
            <div class="btns__produto d-flex">
                <button class="remove__produto m-2 text-uppercase shadow-sm" id="btnRemove" data-id="${id}"><i class="bi bi-trash3-fill"></i></button>
                <button class="btn__banner edicao__produto  m-2 text-uppercase shadow-sm" id="btnEdit" data-id="${id}"><i class="bi bi-pencil-square"></i></button>
            </div>
        </div>`;

    card.innerHTML = content;

    return card;
}

async function exibirNovoProduto() {
    const divNovoProduto = document.querySelector('[data-novo]');

    const listaApi = await conectaApi.listaProdutos();
    divNovoProduto.innerHTML = '';

    listaApi.forEach((elemento) => {
        if (elemento.id > 18) {
            divNovoProduto.appendChild(novoProdutoAdicionado(elemento.id, elemento.nome, elemento.imageURL, elemento.preco, elemento.categoria));
        }
    });

    const btnDeletar = document.getElementById('btnRemove');
    btnDeletar.removeEventListener('click', deletarProduto);
    btnDeletar.addEventListener('click', deletarProduto);

    const btnEdit = document.querySelector('#btnEdit');
    btnEdit.removeEventListener('click', editarProduto);
    btnEdit.addEventListener('click', editarProduto);
}

exibirNovoProduto();

async function deletarProduto(event) {
    event.preventDefault();
    const idProduto = event.currentTarget.dataset.id;
    removerProduto(idProduto);
}

async function removerProduto(id) {
    conectaApi.removeProduto(id)
        .then(() => {
            const produtoParaRemover = document.getElementById(id);
            if (produtoParaRemover) {
                produtoParaRemover.remove();
            }
        })
        .catch((error) => {
            console.error("Erro ao deletar o produto:", error);
        });
}

function editarProduto(event) {
    event.preventDefault();
    const idProduto = event.currentTarget.dataset.id;
    
    // Redirecionar para a página editarProduto.html passando o idProduto como parâmetro
    window.location.href = `editarProduto.html?id=${idProduto}`;
}

async function buscaProdutoPorId(id) {
    const conexao = await fetch(`http://localhost:3000/produtos/${id}`);
    const produto = await conexao.json();
    return produto;
}
