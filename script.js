const squareContainer = document.querySelector(".square-container");

let containerSize = 16;

for (let x = 0; x < containerSize; x++) {
    let singleLine = document.createElement("div");
    squareContainer.appendChild(singleLine);

    for (let i = 0; i < containerSize; i++) {
        let singleSquare = document.createElement("div");
        singleSquare.style.width = "20px";
        singleSquare.style.height = "20px";
        singleSquare.style.borderStyle = "solid";
        singleSquare.style.borderWidth = "1px"
        singleLine.appendChild(singleSquare);
        singleSquare.className = "single-square";
        squareHover(singleSquare);
    }
}

function squareHover(element) {
    element.addEventListener("mouseover", () => {
        element.style.backgroundColor = "red";
    });
}  