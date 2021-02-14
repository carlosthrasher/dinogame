const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
let isJumping = false;
let position = 0;
let score = 0;

//cria evento que pula ao precionar o espaça
function handleKey(event) {
    if (event.keyCode === 32){
        if (!isJumping){
        jump();
    }
    }
}

function jump(){
    isJumping = true;
    let upInterval = setInterval(() => {
        //parada da subida
        if (position >= 160){
        clearInterval(upInterval);
        
        //descendo
        let downInterval = setInterval(() =>{
           //para da descida
            if (position <=1){
                clearInterval(downInterval);
                isJumping = false;
            }
            position -= 3;
            dino.style.bottom = position + "px";
        })
        
        } else {
        //subindo
        position += 30;
        dino.style.bottom = position + "px";
    }
    }, 50)
}

function createCactus(){
    
    const cactus = document.createElement("div");
    let cactusPosition = window.innerWidth;
    let randomTime = Math.random() * 6000;
    
    cactus.classList.add("cactus");
    cactus.style.left = 1000 + "px";
    background.appendChild(cactus);

    let leftInterval = setInterval(() =>{
        if (cactusPosition < -60){
            clearInterval(leftInterval);
            score += 100;
            background.removeChild(cactus)
        }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1>'
            var textScore = document.createElement('div');
            textScore.innerHTML = '<h2 class="finalScore">Pontuação: '+score+'</h2>';
            document.body.appendChild(textScore);
        }else {
        cactusPosition -= 10;
        cactus.style.left = cactusPosition + "px";
    }
    }, 15)
    setTimeout(createCactus,randomTime);
}



createCactus();
document.addEventListener("keydown", handleKey);