document.addEventListener('DOMContentLoaded', function () {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbw0slY3-HzeN8bhmT6jqXi2lWMq0KjkqoZcmYnvZZ4oYG_aY-zNdjHJujAbZ4uabPeF1Q/exec';
    const form = document.forms['contact-form'];
    const loadingElement = document.querySelector('.loading');

    form.addEventListener('submit', e => {
        loadingElement.style.display = 'flex';

        e.preventDefault();

        const nome = form.nome.value;
        const email = form.email.value;
        const numero = form.numero.value;
        const campanha = document.querySelector('.campanha').textContent;
        
        // Obtendo a data atual formatada
        const dataAtual = new Date();
        const dia = String(dataAtual.getDate()).padStart(2, '0');
        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
        const ano = dataAtual.getFullYear();
        const dataFormatada = `${dia}/${mes}/${ano}`;

        // Coletar todos os checkboxes de categorias
        const checkboxes1 = document.querySelectorAll('.flexCategories input[type="checkbox"]:checked');
        const categorias = Array.from(checkboxes1).map(checkbox => checkbox.value);
        
        // Coletar o gênero
        const checkboxes2 = document.querySelectorAll('.flexOptions input[type="checkbox"]:checked');
        const genero = Array.from(checkboxes2).map(checkbox => checkbox.value);

        // Validações
        if (!validarNome(nome)) {
            alert("Nome inválido.");
            return;
        }
        if (!validarNumero(numero)) {
            alert("Número deve ter no mínimo 10 e máximo de 11 dígitos.");
            return;
        }
        if (!validarEmail(email)) {
            alert("Email inválido.");
            return;
        }
        if (!validarCategorias(categorias)) {
            alert("Selecione pelo menos uma categoria.");
            return;
        }
        if (!validarGenero(genero)) {
            alert("Selecione pelo menos um gênero.");
            return;
        }

        // Se todas as validações passarem, prepara os dados para envio
        const categoriesString = categorias.join(', ');
        const formData = new FormData(form);
        formData.append('categoriesString', categoriesString);
        formData.append('campanha', campanha); // Adiciona a campanha
        formData.append('data', dataFormatada); // Adiciona a data

        // Envio do formulário
        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => {
                if (response.ok) {
                    loadingElement.style.display = 'none';
                    alert("Dado enviado com sucesso!");
                    form.reset();
                } else {
                    throw new Error('Erro ao enviar os dados.');
                }
            })
            .catch(error => console.error('Error!', error.message));
    });

    function validarNome(nome) {
        const regex = /^[A-Za-zÀ-ÿ\s]+$/;
        return nome.length >= 2 && regex.test(nome);
    }

    const inputTelefone = document.getElementById('telefone');

    inputTelefone.addEventListener('input', function() {
        let value = this.value; // Obtenha o valor atual do input
        if (!value) return; // Retorna se o valor estiver vazio

        value = value.replace(/\D/g, ''); // Remove não dígitos
        value = value.replace(/(\d{2})(\d)/, "($1) $2"); // Adiciona o código de área
        value = value.replace(/(\d)(\d{4})$/, "$1-$2"); // Adiciona o traço após os 4 dígitos

        this.value = value; // Atualiza o valor do input
    });

    function validarNumero(numero) {
        // Permite entre 10 e 11 dígitos, mas ignora caracteres não numéricos
        const apenasNumeros = numero.replace(/\D/g, ''); // Remove tudo que não é número
        const regex = /^\d{10,11}$/; // Regex para 10 ou 11 dígitos
    
        return regex.test(apenasNumeros); // Válido ou inválido
    }

    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validarCategorias(categorias) {
        return categorias.length > 0;
    }

    function validarGenero(genero) {
        return genero.length > 0;
    }
});

