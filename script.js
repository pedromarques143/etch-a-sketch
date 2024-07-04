const squareContainer = document.querySelector(".square-container");
const SQUARELEN = 400;
const COLORPALLETE = ["white", "pink", "red", "green", "blue", "yellow", "purple", "brown", "black", "orange", "gray", "#FF00FF", "#32CD32", "#66CDAA", "#D2691E", "white"];
let selectedColor = "black";
let colorOpacity = 1;

let containerSize;
let allModesArr = document.querySelectorAll("input[name='selected-mode']");

let stopClick = false;
let stopHover = true;
let randomMode = false;

//default size
createBoard(16);
boardReset();

//color pallete
const colorContainer = document.querySelector(".color-container");

for (let i = 0; i < 8; i++) {
    let colorLine = document.createElement("div");
    colorContainer.appendChild(colorLine);
    for (let x = 1; x < 2; x++) {
        let colorSquare = document.createElement("div");
        colorSquare.className = "color-square";
        colorSquare.style.width = `${SQUARELEN / 8 - 1}px`;
        colorSquare.style.height = `${SQUARELEN / 8 - 1}px`;
        colorSquare.style.marginTop = "-1px";
        colorSquare.style.marginLeft = "-1px";
        colorSquare.style.backgroundColor = COLORPALLETE[i * x];
        colorSquare.style.borderStyle = "solid";
        colorSquare.style.borderWidth = "1px";
        colorLine.appendChild(colorSquare);
    }

    for (let x = 1; x < 2; x++) {
        let colorSquare = document.createElement("div");
        colorSquare.className = "color-square";
        colorSquare.style.width = `${SQUARELEN / 8 - 1}px`;
        colorSquare.style.height = `${SQUARELEN / 8 - 1}px`;
        colorSquare.style.marginTop = "-1px";
        colorSquare.style.marginLeft = "-1px";
        colorSquare.style.backgroundColor = COLORPALLETE[(i + 8) * x];
        colorSquare.style.borderStyle = "solid";
        colorSquare.style.borderWidth = "1px";
        colorLine.appendChild(colorSquare);
    }
}

let colorSquareArr = document.querySelectorAll(".color-square");

let randomColorSquare = colorSquareArr[colorSquareArr.length - 1];
randomColorSquare.textContent = "RANDOM";
randomColorSquare.style.fontSize = "10px"
randomColorSquare.style.textAlign = "center";


//color picker
for (let square of colorSquareArr) {
    square.addEventListener("click", () => {
        selectedColor = square.style.backgroundColor;
    })   
}

randomColorSquare.addEventListener("click", () => {
    randomMode = true;
})

//opacity slider
let colorOpacitySlider = document.querySelector("input[type='range']");

colorOpacitySlider.addEventListener("change", () => {
    colorOpacity = Number(colorOpacitySlider.value) / 100;
})

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
        document.getElementById("click-mode").checked = true;
        stopClick = false;        
    });
}


function squareClick(element) {
    element.addEventListener("click", () => {
        if (randomMode) {
            let randomColorNumber = Math.floor(Math.random() * 15);
            selectedColor = COLORPALLETE[randomColorNumber];
        }
        
        if (!stopClick) {
            element.style.backgroundColor = selectedColor;
        }
    });
}


function squareHover(element) {
    element.addEventListener("mouseover", () => {
        if (randomMode) {
            let randomColorNumber = Math.floor(Math.random() * 15);
            selectedColor = COLORPALLETE[randomColorNumber];
        }

        if (!stopHover) {
            element.style.backgroundColor = selectedColor;
        }
    });
}





//TO DO
//Finish opacity

