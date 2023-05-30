const Container = document.querySelector('.container');
const ContainerDetails = document.querySelector('.container .details');
const ContainerBoard = document.querySelector('.container .gameBoard');
const ContainerResult = document.querySelector('.container .result');
var PlayerOne = document.querySelector('.one');
var PlayerTwo = document.querySelector('.two');
var startGameBtn = document.querySelector(".container .details .buttonGo");
var AlertText = document.querySelector(".alert");
var statsOnename = document.querySelector(".gameBoard .playerNames .oneName");
var statsTwoname = document.querySelector(".gameBoard .playerNames .twoName");
var Box = document.querySelectorAll(".gameBoard .board .box");
var time = document.querySelector(".time");
var turnText = document.querySelector(".turnText");
var WinText = document.querySelector(".winTxt");
var Restart = document.querySelectorAll(".restBtn");
var WinTitle = document.querySelector(".winTitle");

let turns = ["X", "O"];
let randomeindex = Math.floor(Math.random() * turns.length);
let currentTurn = turns[randomeindex];
let allBoxes = [];
let condition, winner;
let PlayerOneTurn = currentTurn, 
    PlayerTwoTurn = (currentTurn == "X" ? "O" : "X");
let PlayerOneName, PlayerTwoName;

const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];


const CheckNames = () =>{

    if(PlayerOne.value == '' & PlayerTwo.value == '')
    {
        AlertText.style.opacity = '1';
        AlertText.style.visibility = 'visible';
        AlertText.innerText = 'Please enter player names First ??';
    }
    else if(PlayerOne.value == '')
    {
        AlertText.style.opacity = '1';
        AlertText.style.visibility = 'visible';
        AlertText.innerText = 'Please enter Player One First ??';
    }
    else if(PlayerTwo.value == '')
    {
        AlertText.style.opacity = '1';
        AlertText.style.visibility = 'visible';
        AlertText.innerText = 'Please enter Player Two First ??';
    }
    else
    {
        AlertText.style.opacity = '0';
        AlertText.style.visibility = 'hidden';
        AlertText.innerText = '';
    }

}

const checkTie = () =>{
    
    for(let i = 0; i < 9; i++)
    {
        allBoxes.push(Box[i]);
    }
    
    condition = allBoxes.every(e => e.innerText != '');

    if(condition){
        winner = false;
        ContainerDetails.style.transform = 'translate(-350%, -50%)';
        ContainerBoard.style.transform = 'translate(-50%, -300%)';
        ContainerResult.style.transform = 'translate(-50%, -50%)';
        
        ContainerDetails.style.transition = '.3s ease-in-out';
        ContainerBoard.style.transition = '.3s ease-in-out';
        ContainerResult.style.transition = '.3s ease-in-out';


        WinTitle.textContent = 'Try Next Time :('

        WinText.textContent = "Its A Draw 50/50 !";

    }
    
}


const checkWin = () => {

        let first, second, third;

        for(let i = 0; i < winningCombos.length; i++){
            [first, second, third] = winningCombos[i];


            if((Box[first].textContent, Box[second].textContent, Box[third].textContent) != '' ){
                if(Box[first].textContent && (Box[first].textContent == Box[second].textContent && Box[first].textContent == Box[third].textContent)){
                    winner = true;
                }
            }
        }

        
        if(winner){

            ContainerDetails.style.transform = 'translate(-350%, -50%)';
            ContainerBoard.style.transform = 'translate(-50%, -300%)';
            ContainerResult.style.transform = 'translate(-50%, -50%)';
            
            ContainerDetails.style.transition = '.3s ease-in-out';
            ContainerBoard.style.transition = '.3s ease-in-out';
            ContainerResult.style.transition = '.3s ease-in-out';
            
            if(currentTurn){
                WinText.textContent = `The Player ${PlayerOneName} (${PlayerOneTurn}) Wins !!`
            }
            else{
                WinText.textContent = `The Player ${PlayerTwoName} (${PlayerTwoTurn}) Wins !!`
            }
        }
        else{
            return;
        }
      
}

const changeTurn = () =>{

    turnText.innerText = 'Turn for '+ statsOnename.innerText + ' (' + currentTurn +') !';
    

    if(currentTurn == "X")
    {
        turnText.innerText = 'Turn for '+ statsOnename.innerText + ' (' + currentTurn +') !'
        currentTurn = "O";
    }
    else
    {
        turnText.innerText = 'Turn for '+ statsTwoname.innerText + ' (' + currentTurn +') !'
        currentTurn = "X";
    }


    return currentTurn;

}




const StartGame = () =>{
    
    statsOnename.innerText = PlayerOne.value;
    statsTwoname.innerText = PlayerTwo.value;

    PlayerOneName = statsOnename.innerText;
    PlayerTwoName = statsTwoname.innerText;
    
    if(PlayerOne.value != '' & PlayerTwo.value != '')
    {
        ContainerDetails.style.transform = 'translate(-350%, -50%)';
        ContainerBoard.style.transform = 'translate(-50%, -50%)';
        
        ContainerDetails.style.transition = '.3s ease-in-out';
        ContainerBoard.style.transition = '.3s ease-in-out';
    }
        
}



startGameBtn.addEventListener('click', ()=>{

    CheckNames();

    StartGame();
    
    changeTurn();

})


Box.forEach(e => e.addEventListener('click', ()=>{
    
    changeTurn();
    
    e.innerText = currentTurn;
    e.style.pointerEvents = 'none';

    if(e.textContent){
        checkWin();
        
        checkTie();
    }
    
    
}));

const restartGame = () =>{
    Box.forEach((e) =>{
        e.innerText = '';
        e.style.pointerEvents = "all";
    });

    PlayerOne.value = '';
    PlayerTwo.value = '';

    ContainerDetails.style.transform = 'translate(-50%, -50%)';
    ContainerBoard.style.transform = 'translate(-50%, -300%)';
    ContainerResult.style.transform = 'translate(300%, -50%)';
    
    ContainerResult.transition = '.3s ease-in-out';
    ContainerDetails.style.transition = '.3s ease-in-out';
    ContainerBoard.style.transition = '.3s ease-in-out';

    winner = null;

}

Restart.forEach(e => e.addEventListener('click', restartGame));