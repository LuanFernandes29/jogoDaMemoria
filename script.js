(function () {
  let mathces = 0;
  let images = [];
  let flippedCards = [];
  let modalGameOver = document.querySelector("#modalGameOver")
  let imgmatchSign = document.querySelector("#imgMatchSign");

  for (let i = 0; i < 16; i++) {
    let img = {
      src: "img/" + i + ".jpg",
      id: i % 8,
    };
    images.push(img);
  }

  startGame();

  function startGame() {

    mathces = 0;
    flippedCards = [];
    images = randomSort(images);
    let frontFaces = document.getElementsByClassName("front");
    let backFaces = document.getElementsByClassName("back");

    //separa as cartas qeu estao uma sobre a outra no html atraves da função for
    for (let i = 0; i < 16; i++) {
      frontFaces[i].classList.remove("flipped", "match");
      backFaces[i].classList.remove("flipped", "match");

      let card = document.querySelector("#card" + i);
      card.style.left = i % 8 == 0 ? 5 + "px" : (i % 8) * 165 + 5 + "px";
      card.style.top = i < 8 ? 5 + "px" : 250 + "px";

      card.addEventListener("click", flipCard, false);

      frontFaces[i].style.background = "url('" + images[i].src + "')";
      frontFaces[i].setAttribute("id", images[i].id);
    }
    modalGameOver.style.zIndex = -2;
    modalGameOver.removeEventListener("click", startGame, false);

  }
  //sortear as cartas
  function randomSort(oldArray) {
    //cria um array novo para armazenar as cartas embaralhadas
    let newArray = [];
    //roda o while enquanto o array novo nao tiver o mesmo numero de elementos do array antigo
    while (newArray.length !== oldArray.length) {
      //gera um indice aleatorio
      let i = Math.floor(Math.random() * oldArray.length);
      //confere se o indice que foi gerado ja esta presente no array novo
      if (newArray.indexOf(oldArray[i]) < 0) {
        //se nao existir adiciona o indice ao novo array,
        newArray.push(oldArray[i]);
      }
    }
    return newArray;
  }

  function flipCard() {
    if (flippedCards.length < 2) {
      let faces = this.getElementsByClassName("face");

      if (faces[0].classList.length > 2) {
        return;
      }

      faces[0].classList.toggle("flipped");
      faces[1].classList.toggle("flipped");
      flippedCards.push(this);

      if (flippedCards.length === 2) {
        if (
          flippedCards[0].childNodes[3].id === flippedCards[1].childNodes[3].id
        ) {
          flippedCards[0].childNodes[1].classList.toggle("match");
          flippedCards[0].childNodes[3].classList.toggle("match");
          flippedCards[1].childNodes[1].classList.toggle("match");
          flippedCards[1].childNodes[3].classList.toggle("match");

          matchCardSign();
          mathces++;
          flippedCards = [];
          if (mathces === 8) {
            gameOver();
          }
        }
      }
    } else {
      flippedCards[0].childNodes[1].classList.toggle("flipped");
      flippedCards[0].childNodes[3].classList.toggle("flipped");
      flippedCards[1].childNodes[1].classList.toggle("flipped");
      flippedCards[1].childNodes[3].classList.toggle("flipped");

      flippedCards = [];
    }
  }

  function gameOver(){
    modalGameOver.style.zIndex  = 10;
    modalGameOver.addEventListener("click", startGame, false);
  }

  function matchCardSign() {
    imgmatchSign.style.zIndex = 1;
    imgmatchSign.style.top = 150 + "px";
    imgmatchSign.style.opacity = 0;
    setTimeout(function () {
      imgmatchSign.style.zIndex = -1;
      imgmatchSign.style.top = 250 + "px";
      imgmatchSign.style.opacity = 1;
    }, 1500);
  }
})();
