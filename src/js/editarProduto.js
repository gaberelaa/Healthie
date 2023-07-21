async function buscaProdutoPorId(id) {
    const conexao = await fetch(`https://healthie-api.vercel.app/produtos/${id}`);
    const produto = await conexao.json();
    return produto;
}

function exibirProduto(produto) {
    const produtoSection = document.querySelector('[data-produto]');

    const content = `
        <div class="card__produtoEdita d-flex flex-column align-items-center justify-content-center gap-2">
            <img src="${produto.imageURL}" class="card__imgEdita" alt="imagem do produto">
            <div class="card__editaTexto d-flex flex-column align-items-center">
                <h5 class="fw-bold text-uppercase">${produto.nome}</h5>
                <span class="fw-bold text-uppercase">R$${produto.preco},00</span>
            </div>
        </div>
    `;

    produtoSection.innerHTML = content;
}


async function carregarProdutoParaEdicao() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        alert("ID do produto não fornecido!");
        return;
    }

    try {
        const produto = await buscaProdutoPorId(productId);
        if (produto) {
            preencherFormulario(produto);
            exibirProduto(produto);
        } else {
            alert("Produto não encontrado!");
        }
    } catch (error) {
        console.error("Erro ao buscar produto para edição:", error);
        alert("Erro ao buscar produto para edição!");
    }
}

function preencherFormulario(produto) {
    const form = document.querySelector('[data-formulario]');
    form.querySelector('[data-img]').value = produto.imageURL;
    form.querySelector('[data-titulo]').value = produto.nome;
    form.querySelector('[data-categoria]').value = produto.categoria;
    form.querySelector('[data-preco]').value = produto.preco;
    form.querySelector('[data-descricao]').value = produto.descricao;
}

async function atualizarProduto(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const productId = new URLSearchParams(window.location.search).get('id');

    const produto = {
        imageURL: form.querySelector('[data-img]').value,
        nome: form.querySelector('[data-titulo]').value,
        categoria: form.querySelector('[data-categoria]').value,
        preco: form.querySelector('[data-preco]').value,
        descricao: form.querySelector('[data-descricao]').value
    };

    try {
        await atualizarProdutoNaApi(productId, produto);
        alert("Produto atualizado com sucesso!");
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        alert("Erro ao atualizar produto!");
    }
}

async function atualizarProdutoNaApi(id, produto) {
    const conexao = await fetch(`https://healthie-api.vercel.app/produtos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
    });

    if (!conexao.ok) {
        throw new Error('Erro ao atualizar o produto na API.');
    }
}

window.addEventListener('load', carregarProdutoParaEdicao);


const form = document.querySelector('[data-formulario]');
form.addEventListener('submit', atualizarProduto);
