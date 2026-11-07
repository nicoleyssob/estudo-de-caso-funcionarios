class Funcionario {
    constructor(id, nome, idade, cargo, salario) {
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
        this.salario = salario;
    }

    getNome() {
        return this.nome;
    }

    setNome(nome) {
        this.nome = nome;
    }

    getIdade() {
        return this.idade;
    }

    setIdade(idade) {
        this.idade = idade;
    }

    getCargo() {
        return this.cargo;
    }

    setCargo(cargo) {
        this.cargo = cargo;
    }

    getSalario() {
        return this.salario;
    }

    setSalario(salario) {
        this.salario = salario;
    }

    toString() {
        return `${this.nome} - ${this.idade} anos - ${this.cargo} - R$ ${this.salario.toFixed(2)}`;
    }
}

let funcionarios = [];
let proximoId = 1;
let idEdicao = null;

const formulario = document.getElementById('formulario');
const tabela = document.getElementById('tabelaFuncionarios');
const relatorio = document.getElementById('relatorio');
const botaoSalvar = document.getElementById('salvar');
const botaoCancelar = document.getElementById('cancelar');

const buscarFuncionario = id => funcionarios.find(funcionario => funcionario.id === id);
const removerFuncionario = id => funcionarios.filter(funcionario => funcionario.id !== id);

const formatarSalario = valor => valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
});

function adicionarCelula(linha, valor) {
    const celula = document.createElement('td');
    celula.textContent = valor;
    linha.appendChild(celula);
}

function listarFuncionarios() {
    tabela.innerHTML = '';

    funcionarios.forEach(funcionario => {
        const linha = document.createElement('tr');
        adicionarCelula(linha, funcionario.getNome());
        adicionarCelula(linha, funcionario.getIdade());
        adicionarCelula(linha, funcionario.getCargo());
        adicionarCelula(linha, formatarSalario(funcionario.getSalario()));

        const acoes = document.createElement('td');
        const editar = document.createElement('button');
        editar.textContent = 'Editar';
        editar.addEventListener('click', function () {
            editarFuncionario(funcionario.id);
        });

        const excluir = document.createElement('button');
        excluir.textContent = 'Excluir';
        excluir.addEventListener('click', function () {
            excluirFuncionario(funcionario.id);
        });

        acoes.appendChild(editar);
        acoes.appendChild(excluir);
        linha.appendChild(acoes);
        tabela.appendChild(linha);
    });
}

function limparFormulario() {
    formulario.reset();
    idEdicao = null;
    botaoSalvar.textContent = 'Cadastrar';
    botaoCancelar.hidden = true;
}

function editarFuncionario(id) {
    const funcionario = buscarFuncionario(id);
    if (!funcionario) {
        return;
    }

    document.getElementById('nome').value = funcionario.getNome();
    document.getElementById('idade').value = funcionario.getIdade();
    document.getElementById('cargo').value = funcionario.getCargo();
    document.getElementById('salario').value = funcionario.getSalario();
    idEdicao = id;
    botaoSalvar.textContent = 'Salvar alterações';
    botaoCancelar.hidden = false;
}

function excluirFuncionario(id) {
    funcionarios = removerFuncionario(id);

    if (idEdicao === id) {
        limparFormulario();
    }

    listarFuncionarios();
    relatorio.textContent = '';
    alert('Funcionário excluído!');
}

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const idade = Number(document.getElementById('idade').value);
    const cargo = document.getElementById('cargo').value.trim();
    const salario = Number(document.getElementById('salario').value);

    if (!nome || !cargo || !Number.isInteger(idade) || idade <= 0 || !Number.isFinite(salario) || salario < 0) {
        alert('Preencha os campos corretamente.');
        return;
    }

    if (idEdicao === null) {
        const funcionario = new Funcionario(proximoId, nome, idade, cargo, salario);
        funcionarios.push(funcionario);
        proximoId++;
        alert('Funcionário cadastrado!');
    } else {
        const funcionario = buscarFuncionario(idEdicao);
        if (funcionario) {
            funcionario.setNome(nome);
            funcionario.setIdade(idade);
            funcionario.setCargo(cargo);
            funcionario.setSalario(salario);
            alert('Funcionário atualizado!');
        }
    }

    limparFormulario();
    listarFuncionarios();
    relatorio.textContent = '';
});

botaoCancelar.addEventListener('click', function () {
    limparFormulario();
});

function mostrarLista(titulo, itens) {
    relatorio.innerHTML = '';
    const subtitulo = document.createElement('h3');
    subtitulo.textContent = titulo;
    relatorio.appendChild(subtitulo);

    if (itens.length === 0) {
        const mensagem = document.createElement('p');
        mensagem.textContent = 'Nenhum resultado encontrado.';
        relatorio.appendChild(mensagem);
        return;
    }

    const lista = document.createElement('ul');
    itens.forEach(item => {
        const linha = document.createElement('li');
        linha.textContent = item;
        lista.appendChild(linha);
    });
    relatorio.appendChild(lista);
}

document.getElementById('salariosAltos').addEventListener('click', function () {
    const resultado = funcionarios
        .filter(funcionario => funcionario.getSalario() > 5000)
        .map(funcionario => funcionario.toString());
    mostrarLista('Funcionários com salário acima de R$ 5.000', resultado);
});

document.getElementById('mediaSalarial').addEventListener('click', function () {
    const soma = funcionarios.reduce((total, funcionario) => total + funcionario.getSalario(), 0);
    const media = funcionarios.length > 0 ? soma / funcionarios.length : 0;
    relatorio.textContent = `Média salarial: ${formatarSalario(media)}`;
});

document.getElementById('cargosUnicos').addEventListener('click', function () {
    const cargos = funcionarios.map(funcionario => funcionario.getCargo());
    const unicos = [...new Set(cargos)];
    mostrarLista('Cargos únicos', unicos);
});

document.getElementById('nomesMaiusculos').addEventListener('click', function () {
    const nomes = funcionarios.map(funcionario => funcionario.getNome().toUpperCase());
    mostrarLista('Nomes em maiúsculo', nomes);
});
