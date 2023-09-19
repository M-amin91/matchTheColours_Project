
let seconds = '00';
let tens = '00';
let appendSeconds =  document.getElementById('seconds')
let appendTens = document.getElementById('tens')
let startButton =  document.getElementById('startButton')
let Interval;

function startTimer(){
    tens++;

    if(tens<9){
        appendTens.innerHTML = "0" + tens;
    }

    if (tens>9){
        appendTens.innerHTML = tens;
    }

    if (tens>60){
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
    }

    if (seconds>9){
        appendSeconds.innerHTML = seconds;
    }
}


const tilesContainer = document.querySelector(".tiles"); 
/*an array of colours, single instances of each colour */
const colours = ["aqua","purple","crimson","blue","dodgerblue","gold","orange","teal"];
// spread operator. duplicate the colours array so that each colour becomes duplicated for our game
const coloursPickList = [...colours,...colours]; //coloursPickList contains 2 colours array
const tileCount = coloursPickList.length; //reference to number of tiles to loop

//game state
let revealedCount = 0; //start with 0 cards revealed
let activeTile = null; // active tile selected by user and looking for the next tile to match
let awaitingEndOfMove = false; //turn over unmatched tiles

startButton.onclick = function() {
    Interval = setInterval(startTimer,10);



//build a new tile element and return it to the loop
function buildTile(colour){ 
const element = document.createElement("div"); //create a div element

element.classList.add("tile"); //add the 'tile' class
element.setAttribute("data-colour", colour) //set 'data-colour' attribute on the element to whatever colour passess in
//reveal colour once tile is clicked
element.addEventListener("click", () => {
    if (awaitingEndOfMove) {
        return;
    }
element.style.backgroundColor = colour;

if (!activeTile){
    activeTile = element;

    return;
}

const colourToMatch = activeTile.getAttribute("data-colour");

if (colourToMatch === colour){
    awaitingEndOfMove = false;
    activeTile = null;
    revealedCount += 2;

    if (revealedCount === tileCount){
        // alert("you win! Refresh to play again")
        let message1 = document.getElementById("message1");
        let message2 = document.getElementById("message2");
        let resetButton = document.getElementById("resetButton");
        resetButton.style.display="block"; 
        message1.innerHTML = "You got all the colours matched!"
        message2.innerHTML = "Your time was " + seconds + ":" + tens;
        clearInterval(Interval);
    }
    return;
}

awaitingEndOfMove = true;
setTimeout(() => {
     element.style.backgroundColor =null;
     activeTile.style.backgroundColor = null;

     awaitingEndOfMove = false;
     activeTile = null;
}, 1000);
});


return element;

}


// build up tiles
for(let i =0; i< tileCount; i++){
const randomIndex = Math.floor(Math.random() * coloursPickList.length); //pick a random index in the coloursPickList array
const colour = coloursPickList[randomIndex] //get the selected colour from the random index
const tile = buildTile(colour); 

coloursPickList.splice(randomIndex, 1); // remove the possibility of getting duplicate colours/get maximum of 2 colours
tilesContainer.appendChild(tile); //adding the element to the parent container 

}
};
