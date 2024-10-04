document.addEventListener('DOMContentLoaded', function () {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbw0slY3-HzeN8bhmT6jqXi2lWMq0KjkqoZcmYnvZZ4oYG_aY-zNdjHJujAbZ4uabPeF1Q/exec';
    const form = document.forms['contact-form'];

    form.addEventListener('submit', e => {
        e.preventDefault(); // Previne o envio padrão do formulário

        const checkboxes = document.querySelectorAll('input[name="categories"]:checked');
        const categories = Array.from(checkboxes).map(checkbox => checkbox.value);
        const categoriesString = categories.join(', ');

        console.log('Categorias selecionadas:', categoriesString); // Depuração

        const formData = new FormData(form);
        formData.append('categoriesString', categoriesString);

        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => {
                if (response.ok) {
                    alert("Dado enviado com Sucesso!");
                    form.reset();
                } else {
                    throw new Error('Erro ao enviar os dados.');
                }
            })
            .catch(error => console.error('Error!', error.message));
    });
});
