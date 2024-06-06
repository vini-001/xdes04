let alunos = [];
let professores = [];
let turmas = [];
let avisos = [];

function addTurma(event) {
    event.preventDefault();
    const codigoTurma = document.getElementById('codigo-turma').value;
    const nomeTurma = document.getElementById('nome-turma').value;
    const alunosParticipantes = Array.from(document.getElementById('alunos-participantes').selectedOptions).map(option => option.text);
    const horarioAulas = document.getElementById('horario-aulas').value;
    const localAulas = document.getElementById('local-aulas').value;
    const professorResponsavel = document.getElementById('professor-responsavel').selectedOptions[0].text;
    const statusTurma = document.getElementById('status-turma').value;

    const turma = {
        codigo: codigoTurma,
        nome: nomeTurma,
        alunos: alunosParticipantes,
        horario: horarioAulas,
        local: localAulas,
        professor: professorResponsavel,
        status: statusTurma
    };
    turmas.push(turma);
    atualizarListaTurmas();

    document.getElementById('nova-turma').innerText = `Turma "${nomeTurma}" cadastrada com sucesso!`;
    document.getElementById('form-turma').reset();
}

function addAluno(event) {
    event.preventDefault();
    const nomeAluno = document.getElementById('nome-aluno').value;
    const cpfAluno = document.getElementById('cpf-aluno').value;
    const telefoneAluno = document.getElementById('telefone-aluno').value;
    const perfilAluno = document.getElementById('perfil-aluno').value;
    const emailAluno = document.getElementById('email-aluno').value;
    const senhaAluno = document.getElementById('senha-aluno').value;
    
    alunos.push({ nome: nomeAluno, cpf: cpfAluno, telefone: telefoneAluno, perfil: perfilAluno, email: emailAluno, senha: senhaAluno });
    atualizarListaAlunos();

    document.getElementById('novo-aluno').innerText = `Aluno "${nomeAluno}" cadastrado com sucesso!`;
    document.getElementById('form-aluno').reset();
}

function addProfessor(event) {
    event.preventDefault();
    const nomeProfessor = document.getElementById('nome-professor').value;
    const cpfProfessor = document.getElementById('cpf-professor').value;
    const telefoneProfessor = document.getElementById('telefone-professor').value;
    const perfilProfessor = document.getElementById('perfil-professor').value;
    const emailProfessor = document.getElementById('email-professor').value;
    const senhaProfessor = document.getElementById('senha-professor').value;

    professores.push({ nome: nomeProfessor, cpf: cpfProfessor, telefone: telefoneProfessor, perfil: perfilProfessor, email: emailProfessor, senha: senhaProfessor });
    atualizarListaProfessores();

    document.getElementById('novo-professor').innerText = `Professor "${nomeProfessor}" cadastrado com sucesso!`;
    document.getElementById('form-professor').reset();
}

function addAviso(event) {
    event.preventDefault();
    const tituloAviso = document.getElementById('titulo-aviso').value;
    const descricaoAviso = document.getElementById('descricao-aviso').value;
    const dataAviso = document.getElementById('data-aviso').value;
    const autorAviso = document.getElementById('autor-aviso').value;
    const turmaAviso = document.getElementById('turma-aviso').value;

    const aviso = {
        titulo: tituloAviso,
        descricao: descricaoAviso,
        data: dataAviso,
        autor: autorAviso,
        turma: turmaAviso
    };
    avisos.push(aviso);
    atualizarListaAvisos();

    document.getElementById('novo-aviso').innerText = `Aviso "${tituloAviso}" cadastrado com sucesso!`;
    document.getElementById('form-aviso').reset();
}

function removeTurma(element) {
    const turmaIndex = element.getAttribute('data-index');
    turmas.splice(turmaIndex, 1);
    atualizarListaTurmas();
}

function editTurma(element) {
    const turmaIndex = element.getAttribute('data-index');
    const turma = turmas[turmaIndex];
    
    const codigoTurma = prompt("Editar Código da Turma:", turma.codigo);
    const nomeTurma = prompt("Editar Nome da Turma:", turma.nome);
    const alunosParticipantes = prompt("Editar Alunos Participantes (separar por vírgulas):", turma.alunos.join(","));
    const horarioAulas = prompt("Editar Horário das Aulas:", turma.horario);
    const localAulas = prompt("Editar Local das Aulas:", turma.local);
    const professorResponsavel = prompt("Editar Professor Responsável:", turma.professor);
    const statusTurma = prompt("Editar Status da Turma (Ativa/Inativa):", turma.status);
    
    turma.codigo = codigoTurma;
    turma.nome = nomeTurma;
    turma.alunos = alunosParticipantes.split(",").map(aluno => aluno.trim());
    turma.horario = horarioAulas;
    turma.local = localAulas;
    turma.professor = professorResponsavel;
    turma.status = statusTurma;
    
    atualizarListaTurmas();
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

function atualizarListaAlunos() {
    const selectAlunos = document.getElementById('alunos-participantes');
    selectAlunos.innerHTML = '';
    alunos.forEach(aluno => {
        const option = document.createElement('option');
        option.value = aluno.cpf;
        option.text = aluno.nome;
        selectAlunos.appendChild(option);
    });
}

function atualizarListaProfessores() {
    const selectProfessores = document.getElementById('professor-responsavel');
    selectProfessores.innerHTML = '';
    professores.forEach(professor => {
        const option = document.createElement('option');
        option.value = professor.cpf;
        option.text = professor.nome;
        selectProfessores.appendChild(option);
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

function emitirRelatorioTurmas() {
    const relatorioTurmas = document.getElementById('relatorio-turmas');
    relatorioTurmas.innerHTML = `
        <h3>Relatório de Turmas</h3>
        <table>
            <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Alunos Participantes</th>
                <th>Horário das Aulas</th>
                <th>Local das Aulas</th>
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

function emitirRelatorioAlunos() {
    const relatorioAlunos = document.getElementById('relatorio-alunos');
    relatorioAlunos.innerHTML = `
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
