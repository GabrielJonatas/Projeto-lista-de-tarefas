const inputTarefa = document.querySelector('.input-tarefa');
const submitTarefa = document.querySelector('.btn-add');
const tarefas = document.querySelector('.tarefas');

// Função para criar a lista de tarefas
function criaLi() {
    const li = document.createElement('li');
    li.setAttribute('class','lista');
    return li;
}

// Listener para a tecla enter submeter a tarefa
inputTarefa.addEventListener('keypress', function(e) {
    if(e.keyCode == 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});

// Listener para o submit submeter a tarefa
submitTarefa.addEventListener('click', function() {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});

// Função para criar a tarefa 
function criaTarefa(textoInput) {
    const checkBox = criaCheckbox();
    const li = criaLi();
    li.appendChild(checkBox);
    li.innerHTML += textoInput; //innerText ou textContent
   tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
}

// função para salvar as tarefas na base de dados do navegador
function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

// função para adicionar as tarefas novamente quando a pagina for recarregada
function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    
    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}

// função para criar o botaão apagar ao lado do item da lista
function criaBotaoApagar (li){
    li.innerHTML += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerHTML = 'Apagar';
    botaoApagar.setAttribute('class','apagar');
    botaoApagar.setAttribute('title','Apagar esta tarefa');
    li.appendChild(botaoApagar);
}

function criaCheckbox () {
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type','checkbox');
    checkBox.setAttribute('class','checkbox');
    return checkBox;
}

// função para limpar o input após submeter a tarefa
function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}

// chamar a função que adiciona tarefas previamente salvas
adicionaTarefasSalvas();

// listener para executar a ação de apagar tarefas
document.addEventListener('click', function(e) {
    const el = e.target;
    if (el.classList.contains('apagar')) {
       el.parentElement.remove();
       salvarTarefas();
    }
    if (el.classList.contains('checkbox')) {
        if (el.checked) {
            el.parentElement.style.color = 'red';
        } else {
            el.parentElement.style.color = 'black';
        }
    }
});






