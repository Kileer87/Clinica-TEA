document.addEventListener('DOMContentLoaded', function() {

    const formCadastro = document.getElementById('formCadastroCliente');
    const formAgendamento = document.getElementById('formAgendamento');

    const areaCadastro = document.getElementById('area-cadastro');
    const areaAgendamento = document.getElementById('area-agendamento');

    // Lógica para o formulário de cadastro
    formCadastro.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o recarregamento da página

        const nomeResponsavel = document.getElementById('respNome').value;
        alert(`Olá, ${nomeResponsavel}! Seu cadastro foi realizado com sucesso. Agora você já pode marcar sua primeira consulta.`);

        // Esconde o formulário de cadastro e mostra o de agendamento
        areaCadastro.classList.add('hidden');
        areaAgendamento.classList.remove('hidden');
    });

    // Lógica para o formulário de agendamento
    formAgendamento.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Marcação confirmada! Nossa equipe entrará em contato em breve para finalizar os detalhes. Obrigado!');
    });

    // Registro do Service Worker (PWA)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js')
                .then(reg => console.log('SW Portal Cliente Registrado!', reg.scope))
                .catch(err => console.error('Erro SW Portal Cliente:', err));
        });
    }

});