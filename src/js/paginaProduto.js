async function buscaProdutoPorId(id) {
    const conexao = await fetch(`http://localhost:3000/produtos/${id}`);
    const produto = await conexao.json();
    return produto;
}

function preencherDetalhesDoProduto(produto) {
    const produtoSection = document.querySelector('[data-produto]');

    const content = `
        <div class="container d-flex justify-content-between align-items-center my-5">
            <div class="produto__infos d-flex flex-column flex-lg-row gap-4">
                <img src="${produto.imageURL}" alt="Imagem do produto" class="produto__infos-img">

                <div class="produto__infos-texto d-flex flex-column justify-content-center">
                    <h1>${produto.nome}</h1>
                    <span class="fw-bold">R$${produto.preco},00</span>
                    <p class="fw-medium">${produto.descricao}</p>
                </div>
            </div>
        </div>
    `;

    produtoSection.innerHTML = content;
}

async function carregarProduto() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        return;
    }

    try {
        const produto = await buscaProdutoPorId(productId);
        if (produto) {
            preencherDetalhesDoProduto(produto);
        } else {
            console.log("Produto não encontrado!");
        }
    } catch (error) {
        console.log("Erro ao buscar produto:", error);
    }
}

window.addEventListener('load', carregarProduto);
