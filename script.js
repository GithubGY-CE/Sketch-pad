let penOn = false;

window.onload = () => {
    resetGrid();
    changeMode();
}

const selectedMode = document.getElementById("mode");
selectedMode.oninput = changeMode;

const slider = document.getElementById("grid-slider");
slider.oninput = resetGrid;

const clearButton = document.querySelector(".clear");
clearButton.onclick = resetGrid;

const grid = document.getElementById("toggle-grid");
grid.oninput = toggleGrid;

const backgroundColor = document.getElementById("background-color");
backgroundColor.oninput = resetGrid;

function toggleGrid() {
    
    const canvasCell = document.querySelectorAll(".cell");
    const gridValue = grid.value;
    if (gridValue === "Off") {
        canvasCell.forEach(cell => cell.style.border = "0");
    } else {
        canvasCell.forEach(cell => cell.style.border = "");
    }
}

function changeMode() {
    togglePen("Off");
    const canvasCell = document.querySelectorAll(".cell");
    const tipText = document.querySelector(".tooltiptext");

    if (selectedMode.value === "Paint") {
        canvasCell.forEach(cell => cell.removeEventListener("mousedown", togglePen));
        
        canvasCell.forEach(cell => cell.addEventListener("mouseover", paintMousedown));
        canvasCell.forEach(cell => cell.addEventListener("mousedown", paintCell));

        tipText.textContent = "Click on the canvas to paint.";
    } else {
        canvasCell.forEach(cell => cell.removeEventListener("mouseover", paintMousedown));

        canvasCell.forEach(cell => cell.addEventListener("mousedown", togglePen));
        canvasCell.forEach(cell => cell.addEventListener("mousedown", paintCell));

        tipText.textContent = "Click on the canvas to activate the hover brush. Click again to disable."
    }
}

function paintMousedown(e) {
    if (e.buttons == 1 || e.buttons == 3) {
        paintCell(e);
    }
}

function resetGrid() {
    const output = document.getElementById("grid-size");
    output.innerHTML = `${slider.value}x${slider.value}`;

    document.querySelector(".canvas").replaceChildren();
    createGrid(slider.value);
    toggleGrid();
    changeMode();
}

function createGrid(gridSize) {
    for (x = 0; x < gridSize; x++) {
        const column = document.createElement("div");
        const canvas = document.querySelector(".canvas");
        const backgroundColor = document.getElementById("background-color").value;

        canvas.appendChild(column);

        for (y = 0; y < gridSize; y++) {
            const cell = document.createElement("div");
            const cellDimension = (700 / gridSize);

            cell.setAttribute("class", "cell");

            cell.style.height = `${cellDimension}px`;
            cell.style.width = `${cellDimension}px`;
            cell.setAttribute("draggable", "false");
            cell.style.backgroundColor = backgroundColor;
            cell.setAttribute("ondragstart", "return false");

            if (x === 0) {
                cell.classList.add("cell-left");
            }
            if (y === gridSize - 1) {
                cell.classList.add("cell-bottom");
            }
            column.appendChild(cell);
        }
    }
}

function togglePen(state) {
    const canvasCell = document.querySelectorAll(".cell");
    if (state === "Off") {
        canvasCell.forEach(cell => cell.removeEventListener("mouseover", paintCell));
        penOn = false;
    } else if (!penOn) {
        canvasCell.forEach(cell => cell.addEventListener("mouseover", paintCell));
        penOn = true;
    } else {
        canvasCell.forEach(cell => cell.removeEventListener("mouseover", paintCell));
        penOn = false;
    }
}

function paintCell(e) {
    const brushColor = document.getElementById("brush-color").value;
    e.target.style.background = brushColor;
}   



