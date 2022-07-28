const playerTurn = document.querySelector(".game_turn")
const replayBtn = document.querySelector(".replay-button");
const gridCells = document.querySelectorAll(".grid_cell");
const xPlayerRes = document.querySelector(".x_player_wins .result");
const oPlayerRes = document.querySelector(".o_player_wins .result");
const tiesRes = document.querySelector(".ties .result")
const overlayBackground=document.querySelector(".overlay_background");
const resultsScreen = document.querySelector(".results_container");
const nextTurnBtn = document.querySelector('.btn-replay')
const quitBtn = document.querySelector('.btn-quit');
let turnsCounter=0;
let gameEnd = false;
function displayResults(){
    overlayBackground.classList.remove('invisible')
    resultsScreen.classList.remove('invisible')
}
nextTurnBtn.addEventListener("click", ()=>{
reset(gridCells)
overlayBackground.classList.add('invisible');
resultsScreen.classList.add('invisible');
});
let turn =playerTurn.innerText.slice(' ')[0]
replayBtn.addEventListener('click',()=>{
    reset(gridCells)
})
gridCells.forEach((grid,i,grids)=>{

    grid.addEventListener("click",(e)=>{
    if(grid.innerText===''){
    turnsCounter++;
    e.target.innerHTML=`<span>${turn}</span>`
    if(turnsCounter>=3){
        if(checkForWinner(grids))
        {
            gameEnd=true
        }
    }
    if(!gameEnd){
    rotateTurn()
    playerTurn.innerText=`${turn} turn`
    }
    else {

        if(turn==='X')
        xPlayerRes.innerText=Number(xPlayerRes.innerText)+1
        else oPlayerRes.innerText=Number(oPlayerRes.innerText)+1
        displayResults()
    }
    if(turnsCounter===9){
        displayResults()
        tiesRes.innerText=Number(tiesRes.innerText)+1
    }
}
    });
})
function reset(grids){
    grids.forEach(grid => {grid.innerText=''})
    turnsCounter=0
    gameEnd=false
    playerTurn.innerText='X turn'
    
}
function rotateTurn(){
    turn = turn==='X' ? 'O':'X';
}
function checkForWinner(grids){  
    // Check for matching columns
    for(let i=0;i<3;i++){
        if(grids[i].innerText===grids[i+3].innerText && grids[i+6].innerText===grids[i+3].innerText && grids[i].innerText!==''){
         return true;
        }
     }
      // Check for matching rows
    for(let i=0;i<grids.length;i+=3){

        if(grids[i].innerText===grids[i+1].innerText && grids[i+1].innerText===grids[i+2].innerText && grids[i].innerText!=='')
        {
         return true;
        }
     }
     // Check for matching diagonals
        if((grids[0].innerText===grids[4].innerText && grids[8].innerText===grids[4].innerText && grids[0].innerText!=='') ||
        (grids[2].innerText===grids[4].innerText && grids[6].innerText===grids[4].innerText && grids[4].innerText!=='')){
         return true;
        }
        return false;
     
}