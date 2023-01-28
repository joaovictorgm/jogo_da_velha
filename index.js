//elemento para pegar as regiões que serão clicadas 
//variavel game pegara todas as tags span do html
const game = document.querySelectorAll('#game span') 

//a variável vBoard criará um tabuleiro virtual fora da tela e gerencia o tabuleiro real da tela
let vBoard = [ ]
//variável para armazenar o nome dos jogadores 
let playerTurn = ''

//função para mostrar o jogador da vez 
function updateTitle () {
    //pega a variável que será armazenada os nomes dos jogadores
    const playerInput = document.getElementById(playerTurn)
    //pega o nome dos jogadores e adiciona ao titulo de quem é a vez
    document.getElementById('playerTurn').innerText = playerInput.value
}

function startGame () {
    //usado arrays bidimensionais para ser mostreado no console os elementos do tabuleiro que foram clicados 
     vBoard = [['', '',''], ['','',''], ['','','']]
    //player1 irá começar
    playerTurn = 'player1'
    //setar a tag html para mostra a mensagem de vencedor
    document.querySelector('h2').innerHTML = 'Vez de : <span id="playerTurn"></span>'
    //pegara o nome do player1 e exibira na tela 
    updateTitle()
    // aqui retirará toda a classe win e  o texto depois de haver uma vitória
    game.forEach(function (element) {
        element.classList.remove('win')
        element.innerText = ''
        //evento para adicionar o X ou O quando for clicado  
        element.addEventListener('click', clickHouse)
    })
   
}
//funçao para verificar as ordens dos botões clicados no jogo da velha
function getWinHouses() {
    const winHouses = []
    if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2] )
    winHouses.push("0.0", "0.1", "0.2")
    if (vBoard[1][0] && vBoard [1][0] === vBoard [1][1] && vBoard [1][0] === vBoard[1][2])
    winHouses.push("1.0", "1.1", "1.2")
    if (vBoard[2][0] && vBoard [2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
    winHouses.push("2.0", "2.1", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
    winHouses.push("0.0", "1.0", "2.0")
    if (vBoard[0][1] && vBoard[0][1] ===vBoard[1][1] && vBoard[0][1] === vBoard[2][1] )
    winHouses.push("0.1", "1.1", "2.1")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2] )
    winHouses.push("0.2", "1.2", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
    winHouses.push("0.0", "1.1", "2.2")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] == vBoard[2][0])
    winHouses.push("0.2", "1.1", "2.0")
    return winHouses
}
 //funçao para desabilitar a opção de clicar no botão duas vezes
function disableRegion (element) {
        element.classList.remove('cursor-pointer')
        element.removeEventListener('click', clickHouse)
        
    }
//função para marcar as casas vencedoras
function winner (houses) {
    houses.forEach(function (house) {
        document.querySelector('[data-region="' + house + '"]').classList.add('win')

    })
    const winnerName = document.getElementById(playerTurn).value
    //parâmetro para mostrar na tela o nome do vencedor
    document.querySelector|('h2').innerHtml + playerName + ' venceu!'
}

function disableAllregion (){

    game.forEach(function(house){
        console.log(house)
        house.classList.remove('cursor-pointer')
        house.removeEventListener('click', clickHouse)
    })



}
function clickHouse(ev) {
    //pega a tag span no html 
    const span = ev.currentTarget
    //currentTarget e o span pois e ele que aciona o evento
    //region é o valor do atributo data 
    const region = span.dataset.region//formato N.N
    //metódo split divide uma string transformando ela em um array nesse caso quando tiver um ponto irá quebrar um array
    const rowColumnPair = region.split('.')//["N","N"]
    //posição zero e posição um de "rowcolumnPair" e sera ignorado o ponto
    const line = rowColumnPair[0]
    const column = rowColumnPair[1]
    //condicional que possibilta adicionar 'X'ou 'O' de acordo com o jogador da vez
    if (playerTurn === 'player1') {
        span.innerText = 'X'
        vBoard[line][column] = 'X'
    }  else {
        span.innerText = 'O'
        vBoard[line][column] = 'O'
    }
    //limpa o console
    console.clear()
    //pega uma informação e tenta transformar em tabela
    console.table(vBoard)
    disableRegion(span)
    // variavel para marcar as vitórias
    const winHouses = getWinHouses()
        if (winHouses.length > 0){
            winner(winHouses)
            disableAllregion()
        
// o método flat faz uma compressão de sub-arrays tornando em um unico array
//com o include faz o array que tiver com um espaço vazio continuar o jogo 
        } else if (vBoard.flat().includes('')) {
            playerTurn = playerTurn === 'player1' ? 'player2' : 'player1'
            updateTitle()
        } else {
            document.querySelector('h2').innerHTML = 'Empate!'
        }
    }


//executará a função de troca de nome 
document.getElementById('reload').addEventListener('click', startGame)