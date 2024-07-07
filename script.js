const squareContainer = document.querySelector(".square-container");
const SQUARELEN = 400;
const COLORPALLETE = ["#FFFFFF", "#D35400", "#FF7F50", "#F39C12", "#F1C40F", "#66CDAA", "#2ECC71", "#16A085", "#3498DB", "#2980B9", "#8E44AD", "#DE3163", "#E74C3C", "#C0392B", "#000000", "#553E93"];
let selectedColor = "black";

let selectedOpacity = 1;
let oppacityCheckBtn = document.querySelector("input[type='checkbox']");
let oppacityCheck = false;

oppacityCheckBtn.addEventListener("change", () => {
    oppacityCheck = oppacityCheckBtn.checked ? true : false; 
});

let containerSize = 16;
let allModesArr = document.querySelectorAll("input[name='selected-mode']");

let stopClick = false;
let stopHover = true;
let stopClickHover = false;
let randomMode = false;

//default size
createBoard(containerSize);
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
randomColorSquare.style.color = "white";
randomColorSquare.style.borderColor = "black"
randomColorSquare.style.fontSize = "10px"
randomColorSquare.style.textAlign = "center";
randomColorSquare.style.display = "flex";
randomColorSquare.style.alignItems = "center";
randomColorSquare.style.justifyContent = "center";

let blackColorSquare = colorSquareArr[colorSquareArr.length - 3];
blackColorSquare.style.color = "#FFFFFF";
blackColorSquare.style.borderColor = "black";

let isColorSelected = false;

//color picker
for (let square of colorSquareArr) {
    square.addEventListener("click", () => {
        selectedColor = square.style.backgroundColor;
        randomMode = false;

        if (isColorSelected == false) {            
            square.setAttribute("id", "previous-color");
            square.textContent = "•";
            square.style.textAlign = "center";
            square.style.display = "flex";
            square.style.alignItems = "center";
            square.style.justifyContent = "center";
            square.style.fontSize = "50px";
            isColorSelected = true;
        } else {
            let previousColor = document.getElementById("previous-color");
            previousColor.textContent = "";
            previousColor.removeAttribute('id');

            square.textContent = "•";
            square.style.textAlign = "center";
            square.style.display = "flex";
            square.style.alignItems = "center";
            square.style.justifyContent = "center";
            square.style.fontSize = "50px";
            square.setAttribute("id", "previous-color");
        }
                        
    });   
};

randomColorSquare.addEventListener("click", () => {
    randomMode = true;   
});

//opacity slider
let colorOpacitySlider = document.querySelector("input[type='range']");
let colorOpacityLevel = document.querySelector(".opacity-level");
colorOpacityLevel.innerHTML = "100%";

colorOpacitySlider.addEventListener("change", () => {
    selectedOpacity = Number(colorOpacitySlider.value) / 100;
    colorOpacityLevel.innerHTML = `${colorOpacitySlider.value}%`
})

//reset button
const resetButton = document.querySelector(".reset-button");

resetButton.addEventListener("click", () => {
    squareContainer.innerHTML = "";
    createBoard(containerSize);
});

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
            singleSquare.style.opacity = 1;
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
                    stopClickHover = true;
                    squareClick(square);                    
                } else if (radio.id == "hover-mode") {
                    stopClick = true;
                    stopHover = false;
                    stopClickHover = true;
                    squareHover(square);
                } else if (radio.id == "click-hover-mode") {
                    stopClick = true;
                    stopHover = true;
                    stopClickHover = false;
                    squareClickHover(square);
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
            element.style.opacity = selectedOpacity;                           
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
            element.style.opacity = selectedOpacity;
        }
    });
}

let isClicked = false;

function squareClickHover(element) {
    element.addEventListener("mousedown", () => {
        isClicked = true;
    });

    element.addEventListener("mouseup", () => {
        isClicked = false;
    })

    element.addEventListener("mousemove", () => {
        if (isClicked) {
            if (randomMode) {
                let randomColorNumber = Math.floor(Math.random() * 15);
                selectedColor = COLORPALLETE[randomColorNumber];
            }
    
            if (!stopClickHover) {
                element.style.backgroundColor = selectedColor;
                element.style.opacity = selectedOpacity;
            }
        }
    });
}
//TO DO
//Finish accumulative opacity (oppacityCheck)