// verificação dados
let lista = []
function carregarLista(){
    let dadosSalvos = localStorage.getItem("afazeres")
    if(dadosSalvos){
        lista = JSON.parse(dadosSalvos)
    }
}


// funções importantes de salvamento
function salvarLista(){
    localStorage.setItem("afazeres",JSON.stringify(lista))
}


// inicio
class Afazer {
    constructor(id, afazer, concluido = false) {
        this.id = id
        this.afazer = afazer
        this.concluido = concluido
    }
}
function criarId(){
    let uuid = crypto.randomUUID()
    return uuid
}

function adicionarAfazer(texto) {
    if (typeof texto === "string") {
        const novoAfazer = new Afazer(criarId(), texto, false)
        lista.push(novoAfazer)
        console.log(`Afazer Adicionado: ${texto}`)
    } else {
        console.log("Erro: Apenas textos são permitidos!")
    }
}

function removerAfazer(id) {
    const tamanhoLista = lista.length
    lista = lista.filter(tarefa => tarefa.id !== id)
    
    // posso tirar essa parte dps, é so pra testar, TAMBEM APAGAR A CONSTANTE ACIMA !!!
    if(lista.length < tamanhoLista) {
        console.log("Afazer removido com sucesso")
    }
}


function concluirAfazer(id) {
    lista.forEach((tarefa) => {
        if(tarefa.id === id){
            console.log("Tarefa concluida")
            tarefa.concluido = true
        }
    })
}

function removerConclusao(id) {
    lista.forEach((tarefa) => {
        if(tarefa.id === id){
            tarefa.concluido = false
        }
    })
}




// seção do html
const inputHtml = document.getElementById("campo-texto")
const ulHtml = document.getElementById("lista-visual")


function atualizarTela() {
    ulHtml.innerHTML = ""
    lista.forEach((tarefa) => {
        const li = document.createElement('li')
        if (tarefa.concluido === true) { 
            li.classList.add("tarefa-feita")
        }
        
        const span = document.createElement('span')
        span.textContent = tarefa.afazer

        const botoes = document.createElement('div')
        botoes.classList.add('grupo-icones')
        botoes.innerHTML = `
            <button class="lixo" onclick="dispararRemocao('${tarefa.id}')"><img src="img/lixo.png" alt="remover"></button>
            <button class="check" onclick="dispararConclusao('${tarefa.id}')"><img src="img/check.png" alt="check"></button>
        `
        li.appendChild(span)
        li.appendChild(botoes)

        ulHtml.appendChild(li) 
    })
}


function dispararAdicao(){
    const textoDigitado = inputHtml.value
    if (textoDigitado == 67){
        adicionarAfazer(textoDigitado)
        inputHtml.value = ""
        sixseven()
        salvarLista()
        atualizarTela()
    }
    else if (textoDigitado.trim() !== "") {
        adicionarAfazer(textoDigitado)
        inputHtml.value = ""
        salvarLista()
        atualizarTela()
    }
}

function dispararRemocao(id){
    removerAfazer(id)
    salvarLista()
    atualizarTela()
}

function dispararConclusao(id){
    const tarefaClicada = lista.find(tarefa => tarefa.id === id)
    if (tarefaClicada.concluido !== true) {
        concluirAfazer(id)
        console.log(`A tarefa ${tarefaClicada.afazer} foi concluida`)
    } 
    else {
        removerConclusao(id)
    }
    salvarLista()
    atualizarTela()
}

function bolsonaro(){
    const body = document.body
    body.classList.toggle("bolsonaro");
}

function sixseven() {
    const video = document.createElement("video")
    video.src = "img/videos/67.mp4"
    video.classList.add("sixseven")
    video.controls = true
    video.muted = true

    // o botao p sair do video
    const botaoFechar = document.createElement("button")
    botaoFechar.textContent = "❌"
    botaoFechar.classList.add("botaoFechar") 

    botaoFechar.addEventListener("click", () => {
        video.remove()
        botaoFechar.remove()
    })

    document.body.appendChild(video)
    document.body.appendChild(botaoFechar)
    video.play()
}


// tem q rodar
carregarLista()
atualizarTela()


// botões de adicionar
const botaoAdicionar = document.getElementById("botao")

if (botaoAdicionar) {
    botaoAdicionar.addEventListener("click", dispararAdicao)
}
inputHtml.addEventListener("keypress", function(evento) {
    if (evento.key === "Enter") {
        dispararAdicao()
    }
})