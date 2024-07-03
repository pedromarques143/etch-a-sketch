const squareContainer = document.querySelector(".square-container");
const SQUARELEN = 400;

let containerSize;
let allModesArr = document.querySelectorAll("input[name='selected-mode']");

let stopClick = false;
let stopHover = true;

//default size
createBoard(16);
boardReset();

//color pallete
const colorContainer = document.querySelector(".color-container");

for (let i = 0; i < 8; i++) {
    let colorLine = document.createElement("div");
    colorContainer.appendChild(colorLine);
    for (let x = 0; x < 2; x++) {
        let colorSquare = document.createElement("div");
        colorSquare.className = "color-square";
        colorSquare.style.width = `${SQUARELEN / 8 - 1}px`;
        colorSquare.style.height = `${SQUARELEN / 8 - 1}px`;
        colorSquare.style.marginTop = "-1px";
        colorSquare.style.marginLeft = "-1px";
        colorSquare.style.backgroundColor = "white";
        colorSquare.style.borderStyle = "solid";
        colorSquare.style.borderWidth = "1px";
        colorLine.appendChild(colorSquare);
    }
}

//function declarations
function createBoard(number) {
    let squareSize = SQUARELEN / number;
    for (let x = 0; x < number; x++) {
        let singleLine = document.createElement("div");
        squareContainer.appendChild(singleLine);
        
        for (let i = 0; i < number; i++) {
            let singleSquare = document.createElement("div");
            singleSquare.className = "single-square"; 
            singleSquare.style.width = `${squareSize - 1}px`;
            singleSquare.style.height = `${squareSize - 1}px`;
            singleSquare.style.borderStyle = "solid";
            singleSquare.style.borderWidth = "1px"
            singleSquare.style.marginTop = "-1px";
            singleSquare.style.marginLeft = "-1px";
            singleSquare.style.backgroundColor = "white";
            singleLine.appendChild(singleSquare);                     
        }
    }
    let allSquaresArr = document.querySelectorAll(".single-square");

    for (let square of allSquaresArr) {
        squareClick(square);
        
        let radioButtons = document.querySelectorAll("input[type='radio']");

        for (let radio of radioButtons) {
            radio.addEventListener("change", () => {
                if (radio.id == "click-mode") {
                    stopClick = false;
                    stopHover = true;
                    squareClick(square);                    
                } else {
                    stopClick = true;
                    stopHover = false;
                    squareHover(square);
                }
            });
        }
    }
}


function boardReset() {
    const changeForm = document.querySelector(".size-form");
    changeForm.addEventListener("submit", () => {
        event.preventDefault(); 
        
        let input = document.getElementById("square-size");
        let inputValue = Number(input.value);

        if (inputValue <= 100 && inputValue > 0 && typeof inputValue == "number") {
            containerSize = inputValue;
            squareContainer.innerHTML = "";
            createBoard(containerSize);                
        } else {
            alert("Enter a number between 1 and 100!");   
        }       
    });
}


function squareClick(element) {
    element.addEventListener("click", () => {
        if (!stopClick) {
            element.style.backgroundColor = "black";
        }
    });
}


function squareHover(element) {
    element.addEventListener("mouseover", () => {
        if (!stopHover) {
            element.style.backgroundColor = "black";
        }
    });
}





//TO DO
//add color selection
//create oppacity
//create random