const squareContainer = document.querySelector(".square-container");

let containerSize;


let selectedMode = "click-mode";
let allModesArr = document.querySelectorAll("input[name='selected-mode']");

for (const mode of allModesArr) {
    mode.addEventListener("change", () => {
        selectedMode = mode.id;
    })    
};

//default size
createBoard(16);
boardReset();





function createBoard(number) {
    let squareSize = 500 / number;
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
                singleLine.appendChild(singleSquare);                     
            }
        }
    let allSquaresArr = document.querySelectorAll(".single-square");

    for (let square of allSquaresArr) {
        if (selectedMode == "click-mode") {
            squareClick(square);
        } else if (selectedMode == "hover-mode") {
            squareHover(square);
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


function squareHover(element) {
    element.addEventListener("mouseover", () => {
        element.style.backgroundColor = "black";
    });
}

function squareClick(element) {
    element.addEventListener("click", () => {
        element.style.backgroundColor = "black";
    });
}


//TO DO
//add color selection