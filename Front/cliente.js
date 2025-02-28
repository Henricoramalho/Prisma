document.addEventListener("DOMContentLoaded", function () {
    fetchClientes(); // Buscar clientes ao carregar a página
});

// Função para buscar clientes na API e exibir na tabela
function fetchClientes() {
    fetch('http://localhost:3000/clientes')
        .then(response => {
            if (!response.ok) throw new Error("Erro ao buscar clientes.");
            return response.json();
        })
        .then(clientes => {
            console.log("Clientes recebidos:", clientes);
            
            const tabela = document.getElementById('clientes'); // Captura o <tbody>
            if (!tabela) {
                console.error("Elemento 'clientes' não encontrado no HTML.");
                return;
            }

            tabela.innerHTML = ""; // Limpa antes de preencher

            clientes.forEach(cliente => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${cliente.nome}</td>
                    <td>${cliente.cpf}</td>
                    <td>${cliente.email}</td>
                `;
                tabela.appendChild(linha);
            });
        })
        .catch(error => console.error("Erro ao buscar clientes:", error));
}

// Função para cadastrar cliente
function cadastrar() {
    let nome = document.getElementById('nome').value.trim();
    let cpf = document.getElementById('cpf').value.trim();
    let email = document.getElementById('email').value.trim();

    // Verificação de campos vazios
    if (!nome || !cpf || !email) {
        alert("Todos os campos são obrigatórios!");
        return;
    }

    let dados = { nome, cpf, email };
    console.log("Dados enviados:", dados);

    fetch('http://localhost:3000/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => {
        if (!response.ok) throw new Error("Erro ao cadastrar cliente.");
        return response.json();
    })
    .then(resp => {
        console.log("Resposta do servidor:", resp);
        alert("Cliente cadastrado com sucesso!");
        fetchClientes(); // Atualiza a tabela sem precisar recarregar a página
    })
    .catch(error => {
        console.error("Erro na requisição:", error);
        alert("Erro ao cadastrar cliente. Verifique o console.");
    });
}
