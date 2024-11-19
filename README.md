# Descrição do Projeto
Este projeto é uma aplicação web simples que permite aos usuários inserir um código postal (ZIP code) e, em seguida, preenche automaticamente os campos de endereço correspondentes, como rua, bairro e cidade. A aplicação utiliza a API ViaCEP para buscar informações de endereço com base no código postal fornecido.

## Funcionalidades

- Validação de Entrada: O código postal inserido é validado para garantir que consiste apenas em números e possui exatamente 8 dígitos.
- Busca de Dados: Utiliza a API ViaCEP para buscar informações de endereço com base no código postal fornecido.
- Cache de Resultados: Implementa um sistema de cache para armazenar dados já buscados, evitando chamadas repetidas à API.
- Mensagens de Erro: Exibe mensagens de erro amigáveis ao usuário quando a validação do código postal falha ou quando ocorre um erro na busca de dados.
- Debounce: Implementa um mecanismo de debounce para limitar a frequência das chamadas à API, melhorando a performance da aplicação.

## Tecnologias Utilizadas
1. HTML
2. JavaScript (ES6)
3. [API ViaCEP](https://viacep.com.br/)

## Estrutura do Código

### Seleção de Elementos

```
    const zipCodeInput = document.querySelector('#zip');
    const streetInput = document.querySelector('#street');
    const neighborhoodInput = document.querySelector('#neighborhood');
    const cityInput = document.querySelector('#city');
    const messageDisplay = document.querySelector('#message');
```

### Cache

```
    const cache = {};
```

### Função de Busca de Dados

```
    async function fetchZipCodeData(zipCode) {
        // Lógica para buscar dados da API
    }
```

### Função Debounce

```
    function debounce(func, delay) {
        // Lógica para limitar a taxa de chamadas da função
    }
```

### Manipulação de Eventos

```
    const handleZipCodeFocusOut = async () => {
        // Lógica para lidar com a saída do foco do campo de código postal
    };
```

### Adicionando o Listener de Evento

```
    zipCodeInput.addEventListener('focusout', debounce(handleZipCodeFocusOut, 300));
```

## Como Usar
1. Clone este repositório em sua máquina local.
2. Abra o arquivo HTML em um navegador.
3. Insira um código postal válido no campo correspondente.
4. Os campos de rua, bairro e cidade serão preenchidos automaticamente com as informações correspondentes.

### Contribuições
Contribuições são bem-vindas! Se você deseja melhorar este projeto, sinta-se à vontade para abrir uma issue ou enviar um pull request.