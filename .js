// --- 1. MATRIZES DE DADOS EM MEMÓRIA ---
let pacientes = [
    { nome: "BENTO AFONSO DE BRITO FERNANDES", resp: "Maria Fernandes", nasc: "2021-03-12", convenio: "Unimed", status: "Ativo" },
    { nome: "HELOISA DE MATHIA MARCHIORETTO", resp: "Carlos Marchioretto", nasc: "2020-07-22", convenio: "Bradesco", status: "Ativo" },
    { nome: "ISABELA GOMES RODRIGUES", resp: "Paula Gomes", nasc: "2019-11-05", convenio: "Particular", status: "Ativo" }
];

let profissionais = [
    { nome: "Dr(a). Cyntia Arruda", esp: "Fonoaudiólogo(a)", nasc: "1988-04-14" },
    { nome: "Dr(a). Wyllyan Lima", esp: "Psicólogo(a) Infantil", nasc: "1991-09-27" }
];

let dadosGrafico = [25, 45, 35, 0]; 
let chartClinico;

// --- 2. SISTEMA DE TRANSIÇÃO SPA ---
document.querySelectorAll('.menu-item, .submenu-item').forEach(item => {
    item.addEventListener('click', function(e) {
        if(this.classList.contains('toggle-submenu')) {
            e.preventDefault();
            document.querySelector('.submenu').classList.toggle('open');
            return;
        }
        e.preventDefault();
        
        document.querySelectorAll('.menu-item, .submenu-item').forEach(l => {
            l.classList.remove('active');
            l.classList.remove('sub-active');
        });
        
        this.classList.contains('submenu-item') ? this.classList.add('sub-active') : this.classList.add('active');
        
        const target = this.getAttribute('data-target');
        document.querySelectorAll('.app-section').forEach(section => {
            section.classList.remove('active');
            if(section.id === target) section.classList.add('active');
        });
    });
});

function irParaAba(idAba) {
    document.querySelectorAll('.app-section').forEach(s => s.classList.remove('active'));
    const secaoAlvo = document.getElementById(idAba);
    if(secaoAlvo) secaoAlvo.classList.add('active');
    
    document.querySelectorAll('.menu-item, .submenu-item').forEach(l => {
        l.classList.remove('active'); l.classList.remove('sub-active');
        if(l.getAttribute('data-target') === idAba) {
            l.classList.contains('submenu-item') ? l.classList.add('sub-active') : l.classList.add('active');
        }
    });
}

// --- 3. COMUNICAÇÃO DINÂMICA ENTRE COMPONENTES ---
function atualizarTelasESelects() {
    // Contadores da Home
    document.getElementById('dash-pacientes-ativos').textContent = pacientes.length;
    document.getElementById('dash-profissionais-count').textContent = profissionais.length;

    // Tabela de Alunos / Pacientes
    const tbodyPacientes = document.getElementById('listaPacientes');
    tbodyPacientes.innerHTML = '';
    pacientes.forEach(p => {
        tbodyPacientes.innerHTML += `<tr><td><strong>${p.nome}</strong></td><td>${p.resp}</td><td>${p.nasc}</td><td>${p.convenio}</td><td><span class="status-badge done">${p.status}</span></td></tr>`;
    });

    // Tabela de Profissionais
    const tbodyProf = document.getElementById('listaProfissionais');
    tbodyProf.innerHTML = '';
    profissionais.forEach(pr => {
        tbodyProf.innerHTML += `<tr><td><strong>${pr.nome}</strong></td><td>${pr.esp}</td><td>${pr.nasc}</td></tr>`;
    });

    // Tabela Unificada na Aba de Pessoas
    const tbodyPessoas = document.getElementById('tabela-unificada-pessoas');
    tbodyPessoas.innerHTML = '';
    pacientes.forEach(p => tbodyPessoas.innerHTML += `<tr><td><strong>${p.nome}</strong></td><td>Paciente (Cliente)</td><td>contato@clinica.com</td></tr>`);
    profissionais.forEach(pr => tbodyPessoas.innerHTML += `<tr><td><strong>${pr.nome}</strong></td><td>Profissional Clínico</td><td>registro@clinica.com</td></tr>`);

    // Alimentar seletores (Selects) dinamicamente
    const selectPacAtribuir = document.getElementById('selectPacienteAtribuir');
    const selectPacRelatorio = document.getElementById('selectPacienteRelatorio');
    selectPacAtribuir.innerHTML = '<option value="">-- Selecione o Paciente --</option>';
    selectPacRelatorio.innerHTML = '';
    
    pacientes.forEach(p => {
        selectPacAtribuir.innerHTML += `<option value="${p.nome}">${p.nome}</option>`;
        selectPacRelatorio.innerHTML += `<option value="${p.nome}">${p.nome}</option>`;
    });

    const selectProfAtribuir = document.getElementById('selectProfissionalAtribuir');
    selectProfAtribuir.innerHTML = '<option value="">-- Selecione o Terapeuta --</option>';
    profissionais.forEach(pr => {
        selectProfAtribuir.innerHTML += `<option value="${pr.nome}">${pr.nome}</option>`;
    });

    // --- SINCRONIZAÇÃO DE ANIVERSARIANTES NO DASHBOARD ---
    const hoje = new Date();
    const mesAtual = hoje.getMonth() + 1;
    const diaAtual = hoje.getDate();
    
    let htmlHoje = '';
    let htmlSemana = '';
    
    // Junta Pacientes e Profissionais em uma lista só para checar os aniversários
    [...pacientes, ...profissionais].forEach(pessoa => {
        if (!pessoa.nasc) return;
        
        const [ano, mes, dia] = pessoa.nasc.split('-');
        const m = parseInt(mes);
        const d = parseInt(dia);
        
        if (m === mesAtual && d === diaAtual) {
            htmlHoje += `<li>🎉 <strong>${pessoa.nome}</strong></li>`;
        } else if (m === mesAtual && d > diaAtual && d <= diaAtual + 7) {
            htmlSemana += `<li>${pessoa.nome} (${dia}/${mes})</li>`;
        }
    });
    
    // Atualiza as listas lá na tela do Dashboard
    const listaNiverHoje = document.querySelector('#dashboard .form-row > div:nth-child(1) .birthday-list');
    const listaNiverSemana = document.querySelector('#dashboard .form-row > div:nth-child(2) .birthday-list');
    
    if (listaNiverHoje) listaNiverHoje.innerHTML = htmlHoje || '<li style="color: #64748b; font-style: italic;">Nenhum aniversariante hoje.</li>';
    if (listaNiverSemana) listaNiverSemana.innerHTML = htmlSemana || '<li style="color: #64748b; font-style: italic;">Nenhum na próxima semana.</li>';
}

// --- 4. INTERCEPTADORES DE CADASTROS ---
document.getElementById('formPaciente').addEventListener('submit', function(e) {
    e.preventDefault();
    pacientes.push({
        nome: document.getElementById('nomePaciente').value.toUpperCase(),
        resp: document.getElementById('respPaciente').value,
        nasc: document.getElementById('nascPaciente').value,
        convenio: document.getElementById('convenioPaciente').value || "Particular",
        status: document.getElementById('statusPaciente').value
    });
    this.reset();
    atualizarTelasESelects();
    alert('Cadastro Concluído: Paciente inserido com sucesso!');
});

document.getElementById('formProfissional').addEventListener('submit', function(e) {
    e.preventDefault();
    profissionais.push({
        nome: document.getElementById('nomeProfissional').value,
        esp: document.getElementById('espProfissional').value,
        nasc: document.getElementById('nascProfissional').value
    });
    this.reset();
    atualizarTelasESelects();
    alert('Cadastro Concluído: Especialista adicionado ao quadro clínico!');
});

document.getElementById('formAtribuir').addEventListener('submit', function(e) {
    e.preventDefault();
    const pac = document.getElementById('selectPacienteAtribuir').value;
    const prog = document.getElementById('selectProgramaAtribuir').value;
    const prof = document.getElementById('selectProfissionalAtribuir').value;

    document.getElementById('listaVinculosProgramas').innerHTML += `<tr><td>${pac}</td><td>${prog}</td><td>${prof}</td></tr>`;
    this.reset();
    alert('Programa alocado e vinculado com sucesso!');
});

// --- 5. ENGENHARIA DE COLETA ABA E ATUALIZAÇÃO DO GRÁFICO ---
const niveisAjudaABA = [
    { sigla: "-",   peso: 0,   classe: "btn-erro" },
    { sigla: "+AT", peso: 10,  classe: "btn-aft"  },
    { sigla: "+AM", peso: 50,  classe: "btn-am"   },
    { sigla: "✓",   peso: 100, classe: "btn-ind"  }
];

function construirFolhaDeTentativas() {
    const box = document.getElementById('sessoes-treino');
    let html = '';
    for (let t = 1; t <= 3; t++) {
        let botoes = '';
        niveisAjudaABA.forEach(n => {
            botoes += `<button type="button" class="btn-prompt ${n.classe}" data-peso="${n.peso}">${n.sigla}</button>`;
        });
        html += `
            <div class="tentativa-linha" data-t="${t}">
                <span class="tentativa-numero">Tentativa ${t}</span>
                <div class="botoes-ajuda">${botoes}</div>
                <input type="text" class="tentativa-obs" placeholder="Observações comportamentais...">
            </div>
        `;
    }
    html += `<button type="button" class="btn" style="margin-top:20px;" id="btnCalcularMédiaSessao">Calcular e Sincronizar Gráfico</button>`;
    box.innerHTML = html;
    vincularCliquesBotoesPrompt();
}

function vincularCliquesBotoesPrompt() {
    document.querySelectorAll('.btn-prompt').forEach(btn => {
        btn.addEventListener('click', function() {
            const linha = this.closest('.tentativa-linha');
            linha.querySelectorAll('.btn-prompt').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    document.getElementById('btnCalcularMédiaSessao').addEventListener('click', function() {
        const selecionados = document.querySelectorAll('.btn-prompt.selected');
        if (selecionados.length < 3) {
            alert('Por favor, defina o nível de suporte das 3 tentativas antes de processar.');
            return;
        }
        let soma = 0;
        selecionados.forEach(b => soma += parseInt(b.getAttribute('data-peso')));
        let media = Math.round(soma / 3);

        dadosGrafico[3] = media;
        chartClinico.update();
        alert(`Sucesso! Desempenho autônomo calculado: ${media}%. Gráfico atualizado.`);
    });
}

function inicializarGrafico() {
    const ctx = document.getElementById('evolucaoChart').getContext('2d');
    chartClinico = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Sessão 1', 'Sessão 2', 'Sessão 3', 'Sessão Atual'],
            datasets: [{
                label: '% Autonomia Independente',
                data: dadosGrafico,
                borderColor: '#01493e',
                backgroundColor: 'rgba(1, 73, 62, 0.05)',
                borderWidth: 3,
                tension: 0.15,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { min: 0, max: 100 } }
        }
    });
}

// EXECUÇÃO INICIAL DO ECOSSISTEMA
atualizarTelasESelects();
construirFolhaDeTentativas();
inicializarGrafico();