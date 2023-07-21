async function listaProdutos() {
    const conexao = await fetch('https://healthie-api.vercel.app/produtos');
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

async function buscaProduto(termoDeBusca) {
    const conexao = await fetch(`https://healthie-api.vercel.app/produtos?q=${termoDeBusca}`);
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

async function criaProduto(imageURL, nome, descricao, preco, categoria) {
    const conexao = await fetch('https://healthie-api.vercel.app/produtos', {
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
        const conexao = await fetch(`https://healthie-api.vercel.app/produtos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });

        if (!conexao.ok) {
            throw new Error('Erro ao remover o produto da API');
        }

        const resposta = await conexao.json();
        return resposta;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao remover o produto');
    }
}

export const conectaApi = {
    listaProdutos,
    buscaProduto,
    criaProduto,
    removeProduto
}