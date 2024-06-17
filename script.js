document.addEventListener('DOMContentLoaded', () => {
    const entidade = document.getElementById('entidade');
    const formCampos = document.getElementById('formCampos');

    const saveData = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
        console.log(`Dados salvos para ${key}:`, data); // Mensagem de depuração
    };

    const loadData = (key) => {
        const data = JSON.parse(localStorage.getItem(key)) || [];
        console.log(`Dados carregados para ${key}:`, data); // Mensagem de depuração
        return data;
    };

    const createSelectOptions = (items, valueKey, textKey) => {
        if (items.length === 0) {
            console.log(`Nenhum item encontrado para ${valueKey} e ${textKey}.`); // Mensagem de depuração
            return '<option value="">Nenhum dado disponível</option>';
        }

        const options = items.map(item => {
            if (item[valueKey] && item[textKey]) {
                return `<option value="${item[valueKey]}">${item[textKey]}</option>`;
            } else {
                console.error(`Erro nos dados do item:`, item); // Mensagem de depuração
                return '<option value="">Dados inválidos</option>';
            }
        }).join('');
        
        console.log(`Opções criadas:`, options); // Mensagem de depuração
        return options;
    };

    const displayAlunos = (codigoTurma) => {
        const turmas = loadData('turmas');
        const alunos = loadData('alunos');
        const turma = turmas.find(turma => turma.codigo === codigoTurma);
        
        if (turma) {
            const alunosTurma = alunos.filter(aluno => turma.alunos.includes(aluno.cpf));
            let alunosHTML = '';
            alunosTurma.forEach(aluno => {
                alunosHTML += `
                    <div>
                        <label for="nota_${aluno.cpf}">${aluno.nome} (${aluno.cpf}):</label>
                        <input type="number" id="nota_${aluno.cpf}" name="nota_${aluno.cpf}" required>
                    </div>
                `;
            });
            document.getElementById('alunosNotas').innerHTML = alunosHTML;
            return alunosTurma.map(aluno => aluno.cpf);
        } else {
            document.getElementById('alunosNotas').innerHTML = '<p>Turma não encontrada.</p>';
            return [];
        }
    };

    entidade.addEventListener('change', (e) => {
        switch(e.target.value) {
            case 'aluno':
                formCampos.innerHTML = `
                    <label for="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" required>
                    <label for="cpf">CPF:</label>
                    <input type="text" id="cpf" name="cpf" required>
                    <label for="endereco">Endereço:</label>
                    <input type="text" id="endereco" name="endereco" required>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                    <label for="contato">Contato:</label>
                    <input type="text" id="contato" name="contato" required>
                    <label for="curso">Curso:</label>
                    <input type="text" id="curso" name="curso" required>
                `;
                break;
            case 'professor':
                formCampos.innerHTML = `
                    <label for="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" required>
                    <label for="cpf">CPF:</label>
                    <input type="text" id="cpf" name="cpf" required>
                    <label for="carteira">Carteira de Trabalho:</label>
                    <input type="text" id="carteira" name="carteira" required>
                    <label for="endereco">Endereço:</label>
                    <input type="text" id="endereco" name="endereco" required>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                    <label for="contato">Contato:</label>
                    <input type="text" id="contato" name="contato" required>
                    <label for="titulos">Títulos:</label>
                    <input type="text" id="titulos" name="titulos" required>
                    <label for="especializacao">Especialização:</label>
                    <input type="text" id="especializacao" name="especializacao" required>
                `;
                break;
            case 'turma':
                const alunos = loadData('alunos');
                const professores = loadData('professores');

                console.log("Professores carregados:", professores); // Mensagem de depuração

                const alunoOptions = createSelectOptions(alunos, 'cpf', 'nome');
                const professorOptions = createSelectOptions(professores, 'cpf', 'nome');

                console.log("Opções de professores:", professorOptions); // Mensagem de depuração

                formCampos.innerHTML = `
                    <label for="codigo">Código:</label>
                    <input type="text" id="codigo" name="codigo" required>
                    <label for="nomeTurma">Nome da Turma:</label>
                    <input type="text" id="nomeTurma" name="nomeTurma" required>
                    <label for="alunos">Alunos Participantes:</label>
                    <select id="alunos" name="alunos" multiple required>
                        ${alunoOptions}
                    </select>
                    <label for="horario">Horário das Aulas:</label>
                    <input type="text" id="horario" name="horario" required>
                    <label for="local">Local das Aulas:</label>
                    <input type="text" id="local" name="local" required>
                    <label for="professor">Professor Responsável:</label>
                    <select id="professor" name="professor" required>
                        ${professorOptions}
                    </select>
                    <label for="status">Status:</label>
                    <select id="status" name="status" required>
                        <option value="ativo">Ativo</option>
                        <option value="inativo">Inativo</option>
                    </select>
                `;
                break;
            case 'atividade':
                formCampos.innerHTML = `
                    <label for="titulo">Título da Atividade:</label>
                    <input type="text" id="titulo" name="titulo" required>
                    <label for="descricao">Descrição:</label>
                    <input type="text" id="descricao" name="descricao" required>
                    <label for="dataInicio">Data de Início:</label>
                    <input type="date" id="dataInicio" name="dataInicio" required>
                    <label for="dataTermino">Data de Término:</label>
                    <input type="date" id="dataTermino" name="dataTermino" required>
                    <label for="pontuacao">Pontuação Máxima:</label>
                    <input type="text" id="pontuacao" name="pontuacao" required>
                    <label for="anexos">Anexos:</label>
                    <input type="file" id="anexos" name="anexos">
                    <label for="tipo">Tipo de Atividade:</label>
                    <select id="tipo" name="tipo" required>
                        <option value="questionario">Questionário Avaliativo</option>
                        <option value="upload">Upload de Arquivo</option>
                    </select>
                `;
                break;
            case 'usuario':
                formCampos.innerHTML = `
                    <label for="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" required>
                    <label for="cpf">CPF:</label>
                    <input type="text" id="cpf" name="cpf" required>
                    <label for="telefone">Telefone:</label>
                    <input type="text" id="telefone" name="telefone" required>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                    <label for="perfil">Perfil:</label>
                    <select id="perfil" name="perfil" required>
                        <option value="professor">Professor</option>
                        <option value="aluno">Aluno</option>
                        <option value="administrador">Administrador</option>
                    </select>
                    <label for="senha">Senha:</label>
                    <input type="password" id="senha" name="senha" required>
                `;
                break;
            case 'aviso':
                formCampos.innerHTML = `
                    <label for="tituloAviso">Título do Aviso:</label>
                    <input type="text" id="tituloAviso" name="tituloAviso" required>
                    <label for="descricaoAviso">Descrição:</label>
                    <input type="text" id="descricaoAviso" name="descricaoAviso" required>
                    <label for="prioridade">Prioridade:</label>
                    <select id="prioridade" name="prioridade" required>
                        <option value="alta">Alta</option>
                        <option value="media">Média</option>
                        <option value="baixa">Baixa</option>
                    </select>
                    <label for="notificacoes">Notificações:</label>
                    <select id="notificacoes" name="notificacoes" required>
                        <option value="sim">Enviar Notificação Imediata</option>
                        <option value="nao">Não Enviar Notificação Imediata</option>
                    </select>
                    <label for="anexosAviso">Anexos:</label>
                    <input type="file" id="anexosAviso" name="anexosAviso">
                `;
                break;
            case 'nota':
                const turmas = loadData('turmas');
                const turmaOptions = createSelectOptions(turmas, 'codigo', 'nomeTurma');

                formCampos.innerHTML = `
                    <label for="codigoTurma">Código da Turma:</label>
                    <select id="codigoTurma" name="codigoTurma" required>
                        ${turmaOptions}
                    </select>
                    <button type="button" id="buscarAlunos">Buscar Alunos</button>
                    <div id="alunosNotas"></div>
                `;
                document.getElementById('buscarAlunos').addEventListener('click', () => {
                    const codigoTurma = document.getElementById('codigoTurma').value;
                    const alunosTurma = displayAlunos(codigoTurma);
                    formCampos.dataset.alunos = JSON.stringify(alunosTurma);
                });
                break;
            default:
                formCampos.innerHTML = '';
        }
    });

    const cadastroForm = document.getElementById('cadastroForm');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const entidadeValue = entidade.value;
            let data = {};

            switch(entidadeValue) {
                case 'aluno':
                    data = {
                        nome: document.getElementById('nome').value,
                        cpf: document.getElementById('cpf').value,
                        endereco: document.getElementById('endereco').value,
                        email: document.getElementById('email').value,
                        contato: document.getElementById('contato').value,
                        curso: document.getElementById('curso').value
                    };
                    break;
                case 'professor':
                    data = {
                        nome: document.getElementById('nome').value,
                        cpf: document.getElementById('cpf').value,
                        carteira: document.getElementById('carteira').value,
                        endereco: document.getElementById('endereco').value,
                        email: document.getElementById('email').value,
                        contato: document.getElementById('contato').value,
                        titulos: document.getElementById('titulos').value,
                        especializacao: document.getElementById('especializacao').value
                    };
                    let professores = loadData('professores'); // Carregar dados existentes
                    professores.push(data); // Adicionar novo professor
                    saveData('professores', professores); // Salvar dados atualizados
                    console.log("Professor cadastrado:", data); // Mensagem de depuração
                    break;
                case 'turma':
                    data = {
                        codigo: document.getElementById('codigo').value,
                        nomeTurma: document.getElementById('nomeTurma').value,
                        alunos: Array.from(document.getElementById('alunos').selectedOptions).map(option => option.value),
                        horario: document.getElementById('horario').value,
                        local: document.getElementById('local').value,
                        professor: document.getElementById('professor').value,
                        status: document.getElementById('status').value
                    };
                    break;
                case 'atividade':
                    data = {
                        titulo: document.getElementById('titulo').value,
                        descricao: document.getElementById('descricao').value,
                        dataInicio: document.getElementById('dataInicio').value,
                        dataTermino: document.getElementById('dataTermino').value,
                        pontuacao: document.getElementById('pontuacao').value,
                        anexos: document.getElementById('anexos').files[0],
                        tipo: document.getElementById('tipo').value
                    };
                    break;
                case 'usuario':
                    data = {
                        nome: document.getElementById('nome').value,
                        cpf: document.getElementById('cpf').value,
                        telefone: document.getElementById('telefone').value,
                        email: document.getElementById('email').value,
                        perfil: document.getElementById('perfil').value,
                        senha: document.getElementById('senha').value
                    };
                    break;
                case 'aviso':
                    data = {
                        tituloAviso: document.getElementById('tituloAviso').value,
                        descricaoAviso: document.getElementById('descricaoAviso').value,
                        prioridade: document.getElementById('prioridade').value,
                        notificacoes: document.getElementById('notificacoes').value,
                        anexosAviso: document.getElementById('anexosAviso').files[0]
                    };
                    break;
                case 'nota':
                    const codigoTurma = document.getElementById('codigoTurma').value;
                    const alunosTurma = JSON.parse(formCampos.dataset.alunos);
                    let notas = loadData('notas');
                    
                    alunosTurma.forEach(cpf => {
                        const nota = document.getElementById(`nota_${cpf}`).value;
                        notas.push({ turma: codigoTurma, aluno: cpf, nota: nota });
                    });

                    saveData('notas', notas);
                    alert(`Notas cadastradas com sucesso!`);
                    cadastroForm.reset();
                    formCampos.innerHTML = '';
                    return; // Skip the default save action
                default:
                    break;
            }

            let key = `${entidadeValue}s`;
            let dataList = loadData(key);
            dataList.push(data);
            saveData(key, dataList);

            alert(`${entidadeValue.charAt(0).toUpperCase() + entidadeValue.slice(1)} cadastrado com sucesso!`);
            cadastroForm.reset();
        });
    }

    const emitirTipo = document.getElementById('emitirTipo');
    const emitirCampos = document.getElementById('emitirCampos');

    emitirTipo.addEventListener('change', (e) => {
        switch(e.target.value) {
            case 'notas':
                emitirCampos.innerHTML = `
                    <label for="turmaNotas">Código da Turma:</label>
                    <input type="text" id="turmaNotas" name="turmaNotas" required>
                `;
                break;
            case 'relatorio':
                emitirCampos.innerHTML = `
                    <label for="codigoTurma">Código da Turma:</label>
                    <input type="text" id="codigoTurma" name="codigoTurma" required>
                    <label for="atividade">Atividade:</label>
                    <input type="text" id="atividade" name="atividade" required>
                    <label for="professorRelatorio">Professor:</label>
                    <input type="text" id="professorRelatorio" name="professorRelatorio" required>
                `;
                break;
            default:
                emitirCampos.innerHTML = '';
        }
    });
});
