async function listaProdutos() {
    const conexao = await fetch('https://64bac2165e0670a501d6a06b.mockapi.io/produtos');
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

async function buscaProduto(termoDeBusca) {
    const conexao = await fetch(`https://64bac2165e0670a501d6a06b.mockapi.io/produtos?q=${termoDeBusca}`);
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

async function criaProduto(imageURL, nome, descricao, preco, categoria) {
    const conexao = await fetch('https://64bac2165e0670a501d6a06b.mockapi.io/produtos', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            imageURL: imageURL,
            nome: nome,
            descricao: descricao,
            preco: preco,
            categoria: categoria
        })
    });

    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

async function removeProduto(id) {
    try {
        const conexao = await fetch(`https://64bac2165e0670a501d6a06b.mockapi.io/produtos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });

        if (conexao.ok) {
            console.log('Produto removido com sucesso!');
        } else {
            throw new Error('Erro ao remover o produto da API');
        }
    } catch (error) {
        console.error('Erro ao remover o produto:', error);
    }
}

export const conectaApi = {
    listaProdutos,
    buscaProduto,
    criaProduto,
    removeProduto
}