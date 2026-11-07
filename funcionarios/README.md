# Gestão de Funcionários

Atividade EC02 da disciplina Tecnologia e Construção de Software: sistema de cadastro de funcionários com HTML e JavaScript.

## Funcionalidades

- Cadastrar, listar, editar e excluir funcionários
- Classe `Funcionario` com construtor, métodos `get`/`set` e `toString()`
- Eventos com funções anônimas e operações com arrow functions
- Relatórios de salários acima de R$ 5.000, média salarial, cargos únicos e nomes em maiúsculo

Os dados ficam em memória e são apagados ao atualizar a página.

## Executar com Docker

Na pasta que contém `compose.yaml`, execute:

```bash
docker compose up --build
```

Abra http://localhost:8080 no navegador.

Para encerrar, pressione Ctrl+C no terminal.

## Exemplo de função anônima e arrow function

```javascript
const somar = function (a, b) {
    return a + b;
};

const somarArrow = (a, b) => a + b;
```
