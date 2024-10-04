document.addEventListener('DOMContentLoaded', function () {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbw0slY3-HzeN8bhmT6jqXi2lWMq0KjkqoZcmYnvZZ4oYG_aY-zNdjHJujAbZ4uabPeF1Q/exec';
    const form = document.forms['contact-form'];

    form.addEventListener('submit', e => {
        e.preventDefault();

        const nome = form.nome.value;
        const email = form.email.value;
        // const numero = form.numero.value;

        // Coletar todos os checkboxes de categorias
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        const categorias = Array.from(checkboxes).map(checkbox => checkbox.value);
        
        // Coletar o gênero usando o nome correto
        const genero = document.querySelector('input[name="options"]:checked');

        // Log dos valores
        // console.log('Nome:', nome);
        // console.log('Email:', email);
        // console.log('Número:', numero);
        // console.log('Categorias:', categorias);
        // console.log('Gênero:', genero ? genero.value : 'Nenhum selecionado');

        // Validações
        if (!validarNome(nome)) {
            alert("Nome inválido.");
            return;
        }
        // if (!validarNumero(numero)) {
        //     alert("Número deve ter exatamente 11 dígitos.");
        //     return;
        // }
        if (!validarEmail(email)) {
            alert("Email inválido.");
            return;
        }
        if (!validarCategorias(categorias)) {
            alert("Selecione pelo menos uma categoria.");
            return;
        }
        if (!genero) {
            alert("Selecione um gênero.");
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

    // function validarNumero(numero) {
    //     const regex = /^\d{11}$/;
    //     return regex.test(numero);
    // }

    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validarCategorias(categorias) {
        return categorias.length > 0;
    }
});
