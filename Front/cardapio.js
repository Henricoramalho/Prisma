fetch('http://localhost:3000/comida')
    .then(response => response.json())
    .then(data => console.table(data))

function cadastrar() {
    let dados = {
        nome: document.getElementById('nome').value,
        preco: parseFloat(document.getElementById('preco').value),
        imagemUrl: document.getElementById('imagemUrl').value
    }
    fetch('http://localhost:3000/comida',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
        .then(resp => resp.json())
        .then(resp => {
            alert("Comida cadastrada com sucesso!");
            window.location.reload();
        });
}

fetch('http://localhost:3000/comida')
.then(response => response.json())
.then(comidas => {
    const tabela = document.getElementById('comida'); 
    comidas.forEach(comida => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        card.innerHTML = `
            <img src="${comida.imagemUrl}" alt="${comida.nome}" class="card-img">
            <div class="card-content">
                <h3 class="card-title">${comida.nome}</h3>
                <p class="card-preco">R$ ${comida.preco}</p>
            </div>
        `;
        
        tabela.appendChild(card);
    });
})