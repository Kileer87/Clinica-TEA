document.getElementById('formAgendamentoCliente').addEventListener('submit', function(e) {
    e.preventDefault();

    const novaSolicitacao = {
        paciente: document.getElementById('nomeCrianca').value.toUpperCase(),
        data: document.getElementById('dataAgendamento').value,
        horario: document.getElementById('horaAgendamento').value,
        profissional: "A Alocar (Solicitado pelo Portal)",
        especialidade: "Terapia ABA",
        status: "Agendado"
    };

    // Puxa agendamentos já existentes ou cria uma lista vazia se for o primeiro
    let agendamentosExistentes = JSON.parse(localStorage.getItem('agendamentosCompartilhados')) || [];
    
    // Adiciona o novo agendamento enviado pelo cliente à lista
    agendamentosExistentes.push(novaSolicitacao);
    
    // Salva a lista atualizada de volta no localStorage do navegador
    localStorage.setItem('agendamentosCompartilhados', JSON.stringify(agendamentosExistentes));

    alert('Solicitação de agendamento enviada! O painel administrativo receberá seu horário imediatamente.');
    this.reset();
});