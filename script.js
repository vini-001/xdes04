// Arrays para armazenar dados
let alunos = [];
let professores = [];
let turmas = [];
let avisos = [];
let notas = [];
let frequencias = [];

// Funções para adicionar dados

function addAluno(event) {
    event.preventDefault();
    const nome = document.getElementById('nome-aluno').value;
    const cpf = document.getElementById('cpf-aluno').value;
    const telefone = document.getElementById('telefone-aluno').value;
    const perfil = document.getElementById('perfil-aluno').value;
    const email = document.getElementById('email-aluno').value;
    const senha = document.getElementById('senha-aluno').value;

    alunos.push({ nome, cpf, telefone, perfil, email, senha });
    atualizarListaAlunos();
    document.getElementById('form-aluno').reset();
    alert(`Aluno "${nome}" cadastrado com sucesso!`);
}

function addProfessor(event) {
    event.preventDefault();
    const nome = document.getElementById('nome-professor').value;
    const cpf = document.getElementById('cpf-professor').value;
    const telefone = document.getElementById('telefone-professor').value;
    const perfil = document.getElementById('perfil-professor').value;
    const email = document.getElementById('email-professor').value;
    const senha = document.getElementById('senha-professor').value;

    professores.push({ nome, cpf, telefone, perfil, email, senha });
    atualizarListaProfessores();
    document.getElementById('form-professor').reset();
    alert(`Professor "${nome}" cadastrado com sucesso!`);
}

function addTurma(event) {
    event.preventDefault();
    const codigo = document.getElementById('codigo-turma').value;
    const nome = document.getElementById('nome-turma').value;
    const alunosParticipantes = Array.from(document.getElementById('alunos-participantes').selectedOptions).map(option => option.value);
    const horario = document.getElementById('horario-aulas').value;
    const local = document.getElementById('local-aulas').value;
    const professor = document.getElementById('professor-responsavel').value;
    const status = document.getElementById('status-turma').value;

    turmas.push({ codigo, nome, alunos: alunosParticipantes, horario, local, professor, status });
    atualizarListaTurmas();
    document.getElementById('form-turma').reset();
    alert(`Turma "${nome}" cadastrada com sucesso!`);
}

function addAviso(event) {
    event.preventDefault();
    const titulo = document.getElementById('titulo-aviso').value;
    const descricao = document.getElementById('descricao-aviso').value;
    const data = document.getElementById('data-aviso').value;
    const autor = document.getElementById('autor-aviso').value;
    const turma = document.getElementById('turma-aviso').value;

    avisos.push({ titulo, descricao, data, autor, turma });
    atualizarListaAvisos();
    document.getElementById('form-aviso').reset();
    alert(`Aviso "${titulo}" cadastrado com sucesso!`);
}

// Funções para lançar notas e frequências

function lancarNota(event) {
    event.preventDefault();
    const aluno = document.getElementById('aluno-nota').value;
    const disciplina = document.getElementById('disciplina-nota').value;
    const nota = parseFloat(document.getElementById('nota').value);

    notas.push({ aluno, disciplina, nota });
    atualizarRelatorioNotas();
    document.getElementById('form-nota').reset();
    alert("Nota lançada com sucesso!");
}

function lancarFrequencia(event) {
    event.preventDefault();
    const aluno = document.getElementById('aluno-frequencia').value;
    const disciplina = document.getElementById('disciplina-frequencia').value;
    const presenca = document.getElementById('presenca').value;

    frequencias.push({ aluno, disciplina, presenca });
    atualizarRelatorioFrequencias();
    document.getElementById('form-frequencia').reset();
    alert("Frequência lançada com sucesso!");
}

// Funções para atualizar listas e relatórios

function atualizarListaAlunos() {
    const selectAlunos = document.getElementById('alunos-participantes');
    selectAlunos.innerHTML = '';
    alunos.forEach(aluno => {
        const option = document.createElement('option');
        option.value = aluno.nome;
        option.text = aluno.nome;
        selectAlunos.appendChild(option);
    });
}

function atualizarListaProfessores() {
    const selectProfessores = document.getElementById('professor-responsavel');
    selectProfessores.innerHTML = '';
    professores.forEach(professor => {
        const option = document.createElement('option');
        option.value = professor.nome;
        option.text = professor.nome;
        selectProfessores.appendChild(option);
    });
}

function atualizarListaTurmas() {
    const listaTurmas = document.getElementById('lista-turmas');
    listaTurmas.innerHTML = '';
    turmas.forEach((turma, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${turma.nome}
            <span>
                <button class="edit" data-index="${index}" onclick="editTurma(this)">Editar</button>
                <button class="remove" data-index="${index}" onclick="removeTurma(this)">Remover</button>
            </span>
        `;
        listaTurmas.appendChild(li);
    });
}

function atualizarListaAvisos() {
    const selectTurmas = document.getElementById('turma-aviso');
    selectTurmas.innerHTML = '';
    turmas.forEach(turma => {
        const option = document.createElement('option');
        option.value = turma.codigo;
        option.text = turma.nome;
        selectTurmas.appendChild(option);
    });
}

function atualizarRelatorioNotas() {
    const relatorioNotas = document.getElementById('relatorio-notas');
    if (relatorioNotas) {
        relatorioNotas.innerHTML = `
            <h3>Relatório de Notas</h3>
            <table>
                <tr>
                    <th>Aluno</th>
                    <th>Disciplina</th>
                    <th>Nota</th>
                </tr>
                ${notas.map(nota => `
                    <tr>
                        <td>${nota.aluno}</td>
                        <td>${nota.disciplina}</td>
                        <td>${nota.nota}</td>
                    </tr>
                `).join('')}
            </table>
        `;
    }
}

function atualizarRelatorioFrequencias() {
    const relatorioFrequencias = document.getElementById('relatorio-frequencias');
    if (relatorioFrequencias) {
        relatorioFrequencias.innerHTML = `
            <h3>Relatório de Frequências</h3>
            <table>
                <tr>
                    <th>Aluno</th>
                    <th>Disciplina</th>
                    <th>Presença</th>
                </tr>
                ${frequencias.map(frequencia => `
                    <tr>
                        <td>${frequencia.aluno}</td>
                        <td>${frequencia.disciplina}</td>
                        <td>${frequencia.presenca}</td>
                    </tr>
                `).join('')}
            </table>
        `;
    }
}

// Funções para emissão de relatórios

function emitirRelatorio(event) {
    event.preventDefault();
    const tipoRelatorio = document.getElementById('tipo-relatorio').value;
    const resultadoRelatorio = document.getElementById('resultado-relatorio');
    switch (tipoRelatorio) {
        case 'alunos':
            emitirRelatorioAlunos(resultadoRelatorio);
            break;
        case 'professores':
            emitirRelatorioProfessores(resultadoRelatorio);
            break;
        case 'turmas':
            emitirRelatorioTurmas(resultadoRelatorio);
            break;
        default:
            resultadoRelatorio.innerHTML = '<p>Selecione um tipo de relatório válido.</p>';
            break;
    }
}

function emitirRelatorioAlunos(container) {
    container.innerHTML = `
        <h3>Relatório de Alunos</h3>
        <table>
            <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Telefone</th>
                <th>Perfil</th>
                <th>Email</th>
            </tr>
            ${alunos.map(aluno => `
                <tr>
                    <td>${aluno.nome}</td>
                    <td>${aluno.cpf}</td>
                    <td>${aluno.telefone}</td>
                    <td>${aluno.perfil}</td>
                    <td>${aluno.email}</td>
                </tr>
            `).join('')}
        </table>
    `;
}

function emitirRelatorioProfessores(container) {
    container.innerHTML = `
        <h3>Relatório de Professores</h3>
        <table>
            <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Telefone</th>
                <th>Perfil</th>
                <th>Email</th>
            </tr>
            ${professores.map(professor => `
                <tr>
                    <td>${professor.nome}</td>
                    <td>${professor.cpf}</td>
                    <td>${professor.telefone}</td>
                    <td>${professor.perfil}</td>
                    <td>${professor.email}</td>
                </tr>
            `).join('')}
        </table>
    `;
}

function emitirRelatorioTurmas(container) {
    container.innerHTML = `
        <h3>Relatório de Turmas</h3>
        <table>
            <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Alunos Participantes</th>
                <th>Horário</th>
                <th>Local</th>
                <th>Professor Responsável</th>
                <th>Status</th>
            </tr>
            ${turmas.map(turma => `
                <tr>
                    <td>${turma.codigo}</td>
                    <td>${turma.nome}</td>
                    <td>${turma.alunos.join(", ")}</td>
                    <td>${turma.horario}</td>
                    <td>${turma.local}</td>
                    <td>${turma.professor}</td>
                    <td>${turma.status}</td>
                </tr>
            `).join('')}
        </table>
    `;
}

// Event listeners
document.getElementById('form-aluno').addEventListener('submit', addAluno);
document.getElementById('form-professor').addEventListener('submit', addProfessor);
document.getElementById('form-turma').addEventListener('submit', addTurma);
document.getElementById('form-aviso').addEventListener('submit', addAviso);
document.getElementById('form-nota').addEventListener('submit', lancarNota);
document.getElementById('form-frequencia').addEventListener('submit', lancarFrequencia);
document.getElementById('form-relatorio').addEventListener('submit', emitirRelatorio);

// Inicialização de listas
atualizarListaAlunos();
atualizarListaProfessores();
atualizarListaTurmas();
atualizarListaAvisos();
