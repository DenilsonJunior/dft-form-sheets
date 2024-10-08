document.addEventListener('DOMContentLoaded', function () {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbw0slY3-HzeN8bhmT6jqXi2lWMq0KjkqoZcmYnvZZ4oYG_aY-zNdjHJujAbZ4uabPeF1Q/exec';
    const form = document.forms['contact-form'];

    form.addEventListener('submit', e => {
        e.preventDefault();

        const nome = form.nome.value;
        const email = form.email.value;
        const numero = form.numero.value;

        // Coletar todos os checkboxes de categorias
        const checkboxes1 = document.querySelectorAll('.flexCategories input[type="checkbox"]:checked');
        const categorias = Array.from(checkboxes1).map(checkbox => checkbox.value);
        
        // Coletar o gênero usando o nome correto
        const checkboxes2 = document.querySelectorAll('.flexOptions input[type="checkbox"]:checked');
        const genero = Array.from(checkboxes2).map(checkbox => checkbox.value);

        // Log dos valores
        console.log('Nome:', nome);
        console.log('Email:', email);
        console.log('Número:', numero);
        console.log('Categorias:', categorias);
        console.log('Gênero:', genero);
        // console.log('Gênero:', genero ? genero.value : 'Nenhum selecionado');

        // Validações
        if (!validarNome(nome)) {
            alert("Nome inválido.");
            return;
        }
        if (!validarNumero(numero)) {
            alert("Número deve ter no minimo 10 e maximo de 11 dígitos.");
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

        // Envio do formulário
        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => {
                if (response.ok) {
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

    function validarNumero(numero) {
        // Permite entre 10 e 11 dígitos, mas ignora caracteres não numéricos
        const apenasNumeros = numero.replace(/\D/g, ''); // Remove tudo que não é número
        const regex = /^\d{10,11}$/; // Regex para 10 ou 11 dígitos
    
        if (regex.test(apenasNumeros)) {
            return true; // Válido
        } else {
            return false; // Inválido
        }
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
