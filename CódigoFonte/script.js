const cep = document.querySelector('#cep');
const logradouro = document.querySelector('#logradouro');
const bairro = document.querySelector('#bairro');
const localidade = document.querySelector('#localidade');
const messagem = document.querySelector('#messagem');

cep.addEventListener('focusout', async () =>{
        
    try{
        //VERIFICANDO SE O VALOR É SÓ NÚMEROS E SE TEM OS 8 NÚMEROS
        const apenasNumeros = /^[0-9]+$/;
        const cepValido = /^[0-9]{8}$/;

        if (!apenasNumeros.test(cep.value) || !cepValido.test(cep.value)){
            throw {cep_error: 'CEP INVÁLIDO'};
        }

        //FAZENDO A CHAMADA PARA A API
        const resposta = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`)

        if (!resposta.ok){
            throw await resposta.json();
        }

        const respostaCep = await resposta.json();
        
        // OBTENDO OS VALORES DA REQUISIÇÃO
        logradouro.value = respostaCep.logradouro;
        bairro.value = respostaCep.bairro; 
        localidade.value = respostaCep.localidade;
        
        //CASO DÊ ALGUM ERRO, O USUÁRIO SERÁ INFORMADO
    } catch (error){
        
        if(error?.cep_error){
            messagem.textContent = error.cep_error;
            //DEPOIS DE 5 SEGUNDOS A MENSAGEM SERÁ APAGADA
            setTimeout(() =>{
                messagem.textContent = "";
            }, 5000);
        }
        console.log(error);
    }
})