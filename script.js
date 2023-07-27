
document.addEventListener("DOMContentLoaded", function() {
    const slider = document.getElementById("grid-slider");
    const output = document.getElementById("grid-size");
    createGrid(slider.value);
   
    slider.oninput = function() {
        output.innerHTML = `${this.value}x${this.value}`;

        document.querySelector(".canvas").replaceChildren();
        createGrid(this.value);
    }
})

function createGrid(gridSize) { 
    for(x = 0; x < gridSize; x++) {
        const column = document.createElement("div");
        const canvas = document.querySelector(".canvas");

        canvas.appendChild(column);

        for(y = 0; y < gridSize; y++) {
            const cell = document.createElement("div");
            const cellDimension = (700/gridSize);
            
            cell.setAttribute("class", "cell");
            
            cell.style.height = `${cellDimension}px`;
            cell.style.width = `${cellDimension}px`;

            if(x === 0) {
                cell.classList.add("cell-left");
            }

            if(y === gridSize - 1) {
                cell.classList.add("cell-bottom");
            }
    
            column.appendChild(cell);

        }
    }
}



