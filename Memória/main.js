sessionStorage.getItem('vitorias') == undefined ? sessionStorage.setItem('vitorias', 0) : false

document.getElementById('vitorias').innerText = sessionStorage.getItem('vitorias')

//Array com todas as fontes de imagem
var srcList = [ 
    'bola.png', 'lápis.png', 'pato.png', 'sorriso.png', 'carro.png', 'árvore.png',
    'bola.png', 'lápis.png', 'pato.png', 'sorriso.png', 'carro.png', 'árvore.png'
]

//Array com todos as cartas (div)
const card = document.getElementsByClassName('card')

//Definição aleatória das figuras
for(let i = 0; srcList.length > 0; i++)
{
    let rnd = Math.floor(Math.random()*(srcList.length-1))
    card[i].actualimg = 'carta.png'
    card[i].turnimg = srcList[rnd]
    srcList.splice(rnd, 1)
}

//comporta dois elementos a serem comparados / boolean que define se o jogador pode executar o movimento
var comparator = [], cooldown = false, attempt = 5

//checagem de envio de usuário
function control(x)
{
    if(card[x].actualimg == 'carta.png' && comparator.length < 2 && !cooldown)
    { 
        cooldown = true
        turncard(x)
        comparator.push(x)
        comparator.length == 2 ? comparate() : cooldown = false
    }
}

//função que compara os dois elementos do comparator, se iguais, permanecem desvirados
function comparate()
{
    setTimeout(function(){
        if(card[comparator[0]].actualimg != card[comparator[1]].actualimg)
        {
            turncard(comparator[0])
            turncard(comparator[1])
            attempt--
            document.querySelector('p').innerText = 'Tentativas restantes: '+attempt
            //:(
            if(attempt <= 0)
            {
                document.querySelector('p').style.color = 'white'
                document.querySelector('p').innerText = 'Bad Ending: Você cai acidentalmente nas backrooms'
                document.querySelector('p').style.backgroundColor = 'black'
                document.querySelector('img').style.display = 'none'
                document.getElementsByClassName('container')[0].style.display = 'none'
                document.body.style.backgroundImage = 'url("src/backrooms.jpg")'
                document.body.style.backgroundSize = 'cover'
                document.body.style.backgroundRepeat = 'no-repeat'
                document.querySelectorAll('audio')[1].play()
            }
        }
        else
        {
            card[comparator[0]] = undefined
            card[comparator[1]] = undefined
            let chk = true
            for(let i = 0; i < card.length; i++)
            {
                card[i].actualimg == 'carta.png' ? chk = false : false
            }
            //vitória
            if(chk)
            {
                sessionStorage.setItem('vitorias', parseInt(sessionStorage.getItem('vitorias'))+1)
                document.querySelector('p').style.color = 'white'
                document.querySelector('p').innerText = 'Você venceu o jogo. Parabéns.'
                document.querySelector('p').style.backgroundColor = 'black'
                document.querySelector('img').style.display = 'none'
                document.getElementsByClassName('container')[0].style.display = 'none'
                document.body.style.backgroundImage = 'url("src/saulgoodman.gif")'
                document.body.style.backgroundSize = 'cover'
                document.body.style.backgroundRepeat = 'no-repeat'
                document.querySelectorAll('audio')[0].play()
            }
        }
        comparator = []
        cooldown = false
    }, 500)
}

//função de virar/desvirar carta + envio de usuário
function turncard(x)
{
    let y = card[x].actualimg
    card[x].actualimg = card[x].turnimg
    card[x].turnimg = y
    let scale = 1
    var e = setInterval(function(){
            if(scale > 0)
            {
                scale -= 0.2
                card[x].style.transform = 'scale('+scale+', 1)'
            }
            else
            {
                card[x].style.backgroundImage = 'url("src/'+card[x].actualimg+'")'
                clearInterval(e)
                e = setInterval(function(){
                    if(scale < 1)
                    {
                        scale += 0.2
                        card[x].style.transform = 'scale('+scale+', 1)'
                    }
                    else clearInterval(e)
                }, 10)
            }
        }, 10)
}