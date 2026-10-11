
let lista = []
let proximoId = 1

class Afazer {
    constructor(id, afazer, concluido = false) {
        this.id = id
        this.afazer = afazer
        this.concluido = concluido
    }
}

function adicionarAfazer(texto) {
    if (typeof texto === "string") {
        const novoAfazer = new Afazer(proximoId, texto, false)
        lista.push(novoAfazer)
        proximoId++
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
        li.innerHTML = `
            <span>${tarefa.afazer}</span>
            <div class="grupo-icones">
                <button class="lixo" onclick="dispararRemocao(${tarefa.id})"><img src="img/lixo.png" alt="remover"></button>
                <button class="check" onclick="dispararConclusao(${tarefa.id})"><img src="img/check.png" alt="check"></button>
            </div>
            `
        ulHtml.appendChild(li) 
    })
}

function dispararAdicao(){
    const textoDigitado = inputHtml.value
    if (textoDigitado.trim() !== "") {
        adicionarAfazer(textoDigitado)
        inputHtml.value = ""
        atualizarTela()
    }                
}

function dispararRemocao(id){
    removerAfazer(id)
    atualizarTela()
}

function dispararConclusao(id){
    concluirAfazer(id)
    const tarefaClicada = lista.find(tarefa => tarefa.id === id)
    if (tarefaClicada.concluido === true) {
        console.log(`A tarefa ${tarefaClicada.afazer} foi concluida`)
    } 
    atualizarTela()
}