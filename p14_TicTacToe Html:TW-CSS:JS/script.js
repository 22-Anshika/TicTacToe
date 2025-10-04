const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

let winningPositions = [
       [0,1,2],
       [3,4,5],
       [6,7,8],
       [0,3,6],
       [1,4,7],
       [2,5,8],
       [0,4,8],
       [2,4,6]
]

//let's create a function to initialize the game -

function initGame(){
       currentPlayer = "X";
       gameGrid = ["", "", "", "", "", "", "", "", ""];

       //UI pe empty krna pdega saare boxes ko
       boxes.forEach((box, index) => {
              box.innerText = "";
              box.style.pointerEvents = "auto";

              // initialize old properties of css
              box.classList.remove("bg-green-400/70");
       });

       newGameBtn.classList.add("hidden");
       gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn(){
       currentPlayer = currentPlayer === "X" ? "O" : "X";

       //update UI
       gameInfo.innerText = `Current Player - ${currentPlayer}`;
}



function checkGameOver(){
       //check if any player has won
       let answer = "";

       winningPositions.forEach((position) => {
              if( (gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "" && gameGrid[position[2]] !== "")
                     && (gameGrid[position[0]] === gameGrid[position[1]])  &&  (gameGrid[position[1]] === gameGrid[position[2]]) 
              ){
                     //check if winner is X
                     if(gameGrid[position[0]] === "X"){
                            answer = "X";
                     }
                     else{
                            answer = "O";
                     }

                     //agr winner mil gaya then disable pointer events
                     boxes.forEach((box) =>{
                            box.style.pointerEvents = "none";
                     })

                     //now we know the winner so we will add green boxes
                     boxes[position[0]].classList.add("bg-green-400/70");
                     boxes[position[1]].classList.add("bg-green-400/70");
                     boxes[position[2]].classList.add("bg-green-400/70");

              }
       });

       // agr answer non-Empty hai it means we have a winner
       if(answer !== ""){
              //update UI
              gameInfo.innerText = `Player ${answer} Won 🥳`;

              //nd now also active the new game button
              newGameBtn.classList.remove("hidden");
              return;

       }

       //when there is a tie game
       let fillCount = 0;
       gameGrid.forEach((box) => {
              if(box !== ""){
                     fillCount++;
              }

              if (fillCount === 9){
                     gameInfo.innerText = "It's a tie 🤷🏻‍♀️";
                     newGameBtn.classList.remove("hidden");
              }
       })


}




function handleClick(index){
       if(gameGrid[index] === ""){
              boxes[index].innerText = currentPlayer;
              gameGrid[index] = currentPlayer;

              //pointer will remove if already filled
              boxes[index].style.pointerEvents = "none";

              //ab we will swap the player's Turn
              swapTurn();

              //now we'll check ki koi jeeta toh ni?
              checkGameOver();
       }

}


boxes.forEach((box, index) => {
       box.addEventListener("click", () => {
              handleClick(index);
       })
});

newGameBtn.addEventListener("click", initGame);
