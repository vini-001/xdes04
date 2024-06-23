document.addEventListener('DOMContentLoaded', () => {

    // Função para exibir mensagem
    function showMessage(message) {
        alert(message);
    }

    // Função para salvar no localStorage
    function saveToLocalStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    // Função para carregar do localStorage
    function loadFromLocalStorage(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }

    // Inicializar "banco de dados" local
    const database = {
        alunos: loadFromLocalStorage('alunos'),
        professores: loadFromLocalStorage('professores'),
        turmas: loadFromLocalStorage('turmas')
    };

    // Funções para Aluno
    function cadastrarAluno(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const aluno = Object.fromEntries(formData.entries());
        aluno.notas = []; // Inicializa o vetor de notas
        database.alunos.push(aluno);
        saveToLocalStorage('alunos', database.alunos);
        console.log('Aluno cadastrado:', aluno);
        showMessage('Aluno cadastrado com sucesso!');
        event.target.reset();
    }

    function buscarAluno(cpf) {
        return database.alunos.find(aluno => aluno.cpf === cpf);
    }

    function preencherFormAluno(aluno) {
        if (aluno) {
            document.getElementById('nome').value = aluno.nome;
            document.getElementById('endereco').value = aluno.endereco;
            document.getElementById('email').value = aluno.email;
            document.getElementById('contato').value = aluno.contato;
            document.getElementById('curso').value = aluno.curso;
        } else {
            showMessage('Aluno não encontrado!');
        }
    }

    function editarAluno(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const alunoCPF = formData.get('cpf');
        const alunoDados = Object.fromEntries(formData.entries());
        const index = database.alunos.findIndex(aluno => aluno.cpf === alunoCPF);
        if (index !== -1) {
            alunoDados.notas = database.alunos[index].notas; // Preserva as notas existentes
            database.alunos[index] = alunoDados;
            saveToLocalStorage('alunos', database.alunos);
            console.log('Aluno editado:', alunoCPF, alunoDados);
            showMessage('Aluno editado com sucesso!');
        } else {
            showMessage('Aluno não encontrado!');
        }
    }

    function removerAluno(event) {
        event.preventDefault();
        const alunoCPF = event.target.querySelector('#cpf').value;
        const index = database.alunos.findIndex(aluno => aluno.cpf === alunoCPF);
        if (index !== -1) {
            database.alunos.splice(index, 1);
            saveToLocalStorage('alunos', database.alunos);
            console.log('Aluno removido:', alunoCPF);
            showMessage('Aluno removido com sucesso!');
        } else {
            showMessage('Aluno não encontrado!');
        }
    }

    // Funções para Professor
    function cadastrarProfessor(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const professor = Object.fromEntries(formData.entries());
        database.professores.push(professor);
        saveToLocalStorage('professores', database.professores);
        console.log('Professor cadastrado:', professor);
        showMessage('Professor cadastrado com sucesso!');
        event.target.reset();
    }

    function buscarProfessor(cpf) {
        return database.professores.find(professor => professor.cpf === cpf);
    }

    function preencherFormProfessor(professor) {
        if (professor) {
            document.getElementById('nome').value = professor.nome;
            document.getElementById('carteira').value = professor.carteira;
            document.getElementById('endereco').value = professor.endereco;
            document.getElementById('email').value = professor.email;
            document.getElementById('contato').value = professor.contato;
            document.getElementById('titulos').value = professor.titulos;
            document.getElementById('especializacao').value = professor.especializacao;
        } else {
            showMessage('Professor não encontrado!');
        }
    }

    function editarProfessor(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const professorCPF = formData.get('cpf');
        const professorDados = Object.fromEntries(formData.entries());
        const index = database.professores.findIndex(professor => professor.cpf === professorCPF);
        if (index !== -1) {
            database.professores[index] = professorDados;
            saveToLocalStorage('professores', database.professores);
            console.log('Professor editado:', professorCPF, professorDados);
            showMessage('Professor editado com sucesso!');
        } else {
            showMessage('Professor não encontrado!');
        }
    }

    function removerProfessor(event) {
        event.preventDefault();
        const professorCPF = event.target.querySelector('#cpf').value;
        const index = database.professores.findIndex(professor => professor.cpf === professorCPF);
        if (index !== -1) {
            database.professores.splice(index, 1);
            saveToLocalStorage('professores', database.professores);
            console.log('Professor removido:', professorCPF);
            showMessage('Professor removido com sucesso!');
        } else {
            showMessage('Professor não encontrado!');
        }
    }

    // Funções para Turma
    function cadastrarTurma(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const turma = Object.fromEntries(formData.entries());
        turma.alunos = formData.getAll('alunos');
        turma.professor = formData.get('professor');
        database.turmas.push(turma);
        saveToLocalStorage('turmas', database.turmas);
        console.log('Turma cadastrada:', turma);
        showMessage('Turma cadastrada com sucesso!');
        event.target.reset();
    }

    function buscarTurma(codigo) {
        return database.turmas.find(turma => turma.codigo === codigo);
    }

    function preencherFormTurma(turma) {
        if (turma) {
            document.getElementById('nome').value = turma.nome;
            document.getElementById('curso').value = turma.curso;
            document.getElementById('local').value = turma.local;
            document.getElementById('periodo').value = turma.periodo;
            document.getElementById('status').value = turma.status;
            document.getElementById('professor').value = turma.professor;
            const alunosSelect = document.getElementById('alunos');
            for (const option of alunosSelect.options) {
                option.selected = turma.alunos.includes(option.value);
            }
        } else {
            showMessage('Turma não encontrada!');
        }
    }

    function editarTurma(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const turmaCodigo = formData.get('codigo');
        const turmaDados = Object.fromEntries(formData.entries());
        turmaDados.alunos = formData.getAll('alunos');
        turmaDados.professor = formData.get('professor');
        const index = database.turmas.findIndex(turma => turma.codigo === turmaCodigo);
        if (index !== -1) {
            database.turmas[index] = turmaDados;
            saveToLocalStorage('turmas', database.turmas);
            console.log('Turma editada:', turmaCodigo, turmaDados);
            showMessage('Turma editada com sucesso!');
        } else {
            showMessage('Turma não encontrada!');
        }
    }

    function removerTurma(event) {
        event.preventDefault();
        const turmaCodigo = event.target.querySelector('#codigo').value;
        const index = database.turmas.findIndex(turma => turma.codigo === turmaCodigo);
        if (index !== -1) {
            database.turmas.splice(index, 1);
            saveToLocalStorage('turmas', database.turmas);
            console.log('Turma removida:', turmaCodigo);
            showMessage('Turma removida com sucesso!');
        } else {
            showMessage('Turma não encontrada!');
        }
    }

    // Funções para lançar notas
    function lancarNota(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const turmaCodigo = formData.get('codigo');
        const turma = buscarTurma(turmaCodigo);
        if (turma) {
            turma.alunos.forEach(cpf => {
                const nota = parseFloat(formData.get(`nota_${cpf}`));
                const aluno = buscarAluno(cpf);
                if (!isNaN(nota) && aluno) {
                    aluno.notas.push(nota);
                    saveToLocalStorage('alunos', database.alunos);
                }
            });
            console.log('Notas lançadas:', turma);
            showMessage('Notas lançadas com sucesso!');
        } else {
            showMessage('Turma não encontrada!');
        }
    }

    // Função para gerar relatórios
    function gerarRelatorio(event) {
        event.preventDefault();
        const tipoRelatorio = event.target.querySelector('#tipoRelatorio').value;
        const relatorioList = document.getElementById('relatorioList');
        relatorioList.innerHTML = '';

        if (tipoRelatorio === 'alunos') {
            const table = document.createElement('table');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Endereço</th>
                        <th>Email</th>
                        <th>Contato</th>
                        <th>Curso</th>
                        <th>Notas</th>
                        <th>Média</th>
                    </tr>
                </thead>
                <tbody>
                ${database.alunos.map(aluno => `
                    <tr>
                        <td>${aluno.nome}</td>
                        <td>${aluno.cpf}</td>
                        <td>${aluno.endereco}</td>
                        <td>${aluno.email}</td>
                        <td>${aluno.contato}</td>
                        <td>${aluno.curso}</td>
                        <td>${aluno.notas.join(', ')}</td>
                        <td>${(aluno.notas.reduce((a, b) => a + b, 0) / aluno.notas.length).toFixed(2)}</td>
                    </tr>`).join('')}
                </tbody>
            `;
            relatorioList.appendChild(table);
        } else if (tipoRelatorio === 'professores') {
            const table = document.createElement('table');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Carteira de Trabalho</th>
                        <th>Endereço</th>
                        <th>Email</th>
                        <th>Contato</th>
                        <th>Títulos</th>
                        <th>Especialização</th>
                    </tr>
                </thead>
                <tbody>
                ${database.professores.map(professor => `
                    <tr>
                        <td>${professor.nome}</td>
                        <td>${professor.cpf}</td>
                        <td>${professor.carteira}</td>
                        <td>${professor.endereco}</td>
                        <td>${professor.email}</td>
                        <td>${professor.contato}</td>
                        <td>${professor.titulos}</td>
                        <td>${professor.especializacao}</td>
                    </tr>`).join('')}
                </tbody>
            `;
            relatorioList.appendChild(table);
        } else if (tipoRelatorio === 'turmas') {
            const table = document.createElement('table');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Curso</th>
                        <th>Local</th>
                        <th>Período</th>
                        <th>Status</th>
                        <th>Professor</th>
                        <th>Alunos</th>
                    </tr>
                </thead>
                <tbody>
                ${database.turmas.map(turma => `
                    <tr>
                        <td>${turma.codigo}</td>
                        <td>${turma.nome}</td>
                        <td>${turma.curso}</td>
                        <td>${turma.local}</td>
                        <td>${turma.periodo}</td>
                        <td>${turma.status}</td>
                        <td>${turma.professor}</td>
                        <td>${turma.alunos.join(', ')}</td>
                    </tr>`).join('')}
                </tbody>
            `;
            relatorioList.appendChild(table);
        } else if (tipoRelatorio === 'notas') {
            const table = document.createElement('table');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Notas</th>
                        <th>Média</th>
                    </tr>
                </thead>
                <tbody>
                ${database.alunos.map(aluno => `
                    <tr>
                        <td>${aluno.nome}</td>
                        <td>${aluno.cpf}</td>
                        <td>${aluno.notas.join(', ')}</td>
                        <td>${(aluno.notas.reduce((a, b) => a + b, 0) / aluno.notas.length).toFixed(2)}</td>
                    </tr>`).join('')}
                </tbody>
            `;
            relatorioList.appendChild(table);
        }
    }

    // Carregar alunos e professores no formulário de cadastro de turmas
    function carregarAlunosProfessores() {
        const alunosSelect = document.getElementById('alunos');
        const professorSelect = document.getElementById('professor');

        database.alunos.forEach(aluno => {
            const option = document.createElement('option');
            option.value = aluno.cpf;
            option.textContent = aluno.nome;
            alunosSelect.appendChild(option);
        });

        database.professores.forEach(professor => {
            const option = document.createElement('option');
            option.value = professor.cpf;
            option.textContent = professor.nome;
            professorSelect.appendChild(option);
        });
    }

    // Carregar alunos no formulário de lançamento de notas
    function carregarAlunosNotas(turma) {
        const alunosContainer = document.getElementById('alunosContainer');
        alunosContainer.innerHTML = '';
        if (turma) {
            turma.alunos.forEach(cpf => {
                const aluno = buscarAluno(cpf);
                if (aluno) {
                    const alunoDiv = document.createElement('div');
                    alunoDiv.innerHTML = `
                        <label for="nota_${cpf}">${aluno.nome} (${cpf}):</label>
                        <input type="number" id="nota_${cpf}" name="nota_${cpf}" min="0" max="10">
                    `;
                    alunosContainer.appendChild(alunoDiv);
                }
            });
        }
    }

    // Adicionando Event Listeners para Aluno
    const cadastrarAlunoForm = document.getElementById('cadastrarAlunoForm');
    if (cadastrarAlunoForm) {
        cadastrarAlunoForm.addEventListener('submit', cadastrarAluno);
    }

    const editarAlunoForm = document.getElementById('editarAlunoForm');
    if (editarAlunoForm) {
        editarAlunoForm.addEventListener('submit', editarAluno);
        document.getElementById('cpf').addEventListener('blur', (event) => {
            const aluno = buscarAluno(event.target.value);
            preencherFormAluno(aluno);
        });
    }

    const removerAlunoForm = document.getElementById('removerAlunoForm');
    if (removerAlunoForm) {
        removerAlunoForm.addEventListener('submit', removerAluno);
    }

    // Adicionando Event Listeners para Professor
    const cadastrarProfessorForm = document.getElementById('cadastrarProfessorForm');
    if (cadastrarProfessorForm) {
        cadastrarProfessorForm.addEventListener('submit', cadastrarProfessor);
    }

    const editarProfessorForm = document.getElementById('editarProfessorForm');
    if (editarProfessorForm) {
        editarProfessorForm.addEventListener('submit', editarProfessor);
        document.getElementById('cpf').addEventListener('blur', (event) => {
            const professor = buscarProfessor(event.target.value);
            preencherFormProfessor(professor);
        });
    }

    const removerProfessorForm = document.getElementById('removerProfessorForm');
    if (removerProfessorForm) {
        removerProfessorForm.addEventListener('submit', removerProfessor);
    }

    // Adicionando Event Listeners para Turma
    const cadastrarTurmaForm = document.getElementById('cadastrarTurmaForm');
    if (cadastrarTurmaForm) {
        carregarAlunosProfessores();
        cadastrarTurmaForm.addEventListener('submit', cadastrarTurma);
    }

    const editarTurmaForm = document.getElementById('editarTurmaForm');
    if (editarTurmaForm) {
        carregarAlunosProfessores();
        editarTurmaForm.addEventListener('submit', editarTurma);
        document.getElementById('codigo').addEventListener('blur', (event) => {
            const turma = buscarTurma(event.target.value);
            preencherFormTurma(turma);
        });
    }

    const removerTurmaForm = document.getElementById('removerTurmaForm');
    if (removerTurmaForm) {
        removerTurmaForm.addEventListener('submit', removerTurma);
    }

    const lancarNotaForm = document.getElementById('lancarNotaForm');
    if (lancarNotaForm) {
        lancarNotaForm.addEventListener('submit', lancarNota);
        document.getElementById('codigo').addEventListener('blur', (event) => {
            const turma = buscarTurma(event.target.value);
            carregarAlunosNotas(turma);
        });
    }

    const relatorioForm = document.getElementById('relatorioForm');
    if (relatorioForm) {
        relatorioForm.addEventListener('submit', gerarRelatorio);
    }

});
