const squareContainer = document.querySelector(".square-container");

let containerSize = 16;

for (let x = 0; x < containerSize; x++) {
    let singleLine = document.createElement("div");
    squareContainer.appendChild(singleLine);   
    for (let i = 0; i < containerSize; i++) {
        let singleSquare = document.createElement("div");
        singleSquare.textContent = "o";
        singleLine.appendChild(singleSquare);
    }
}