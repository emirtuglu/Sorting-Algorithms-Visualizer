let arr;
let arraySize;
let gapFactor = 1.3;  // gap factor = (width of bar + gap between bars) / width of bar
let canvasContainer;
let widthOfBar;
let heightFactorOfBar;
let xPos;
let yPos;
let sortGenerator;  // variable storing generator which returned from sorting algorithms
let currentPair;
let done;
let paused;
let started;
let nextSwaps;
let nextSwapsIndex;
let selectedRectangles;
let twoRectSelected;

function setup() {
    // Inıtial settings
    canvasContainer = document.getElementById("canvasContainer");
    arraySize = arraySizeRange.value;
    generateArray(arraySize);
    currentPair = [-1, -1];
    selectedRectangles = [];
    done = false;
    paused = false;
    started = false;
    frameRate(Math.floor(sortingSpeedRange.value));
    let canvas = createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
    canvas.parent(canvasContainer);
    loadSwaps();
}

function draw() {
    widthOfBar = (canvasContainer.offsetWidth * 9 / 10) / (arraySize * gapFactor); 
    heightFactorOfBar = canvasContainer.offsetHeight / 120;
    xPos = canvasContainer.offsetWidth / 2 - (arraySize * widthOfBar * gapFactor / 2);  // xPos = canvas width/2 - totalw idth of bars/2
    yPos = canvasContainer.offsetHeight * 9 / 10;

    background(220);
    // Checking if sorting continues
    if (sortGenerator !== undefined && !paused && started) {
        disableButtons();
        
        // Check if there is remaining elements in generator
        done = sortGenerator.next().done;   
        if (done) {   
            finishSort();
        }
    }

    for (let i = 0; i < arr.length; i++) {
        if (i == currentPair[0] || i == currentPair[1]) {
            fill(153, 205, 204);  // current pair's color
        }
        else if (!started && !done && selectedRectangles.includes(i)) {
            if (twoRectSelected) {
                // Check if user selected the correct pair
                if ( (nextSwaps[nextSwapsIndex][0] == selectedRectangles[0] && nextSwaps[nextSwapsIndex][1] == selectedRectangles[1]) ||
                (nextSwaps[nextSwapsIndex][1] == selectedRectangles[0] && nextSwaps[nextSwapsIndex][0] == selectedRectangles[1]) ) {
                    // User started to sort
                    disableButtons();
                    sortButton.disabled = false;
                    
                    // If frame rate is less than 3, make it 3 to reduce lagging.
                    if (Math.floor(sortingSpeedRange.value) < 3) {
                        frameRate(3);
                    }

                    // Handle merge sort case since it has a different swapping mechanism
                    if (mergeSortButton.checked) {

                        // Ensure the least number is in index 0
                        if (selectedRectangles[1] < selectedRectangles[0]) {
                            swap(selectedRectangles, 0, 1);
                        }
                        // Swapping
                        for (var k = selectedRectangles[1] - 1; k >= selectedRectangles[0]; k--) {
                            swap(arr, k, k+1);
                        }
                    }
                    else {  // Swap normally if not merge sort
                        swap(arr, selectedRectangles[0], selectedRectangles[1]);
                    }
                    nextSwapsIndex++;
                    clearSelectedRectangles();
                    if (nextSwapsIndex == nextSwaps.length) {
                        // User completed sorting
                        finishSort();
                    }
                }
                else {
                    fill(245, 67 , 67);   // wrong answer color
                    setTimeout(clearSelectedRectangles, 500);
                }
            }
            else {
                fill(179, 113, 208);  // selected rectangle color
            }
        }
        else if (done) {
            fill(102, 204, 0);   // sorting is done, green color
        }
        else {
            fill(25, 25, 112);  // default color
        }
        textSize(window.innerWidth / 120)
        if (arraySize < 55) { text(arr[i], xPos + i * widthOfBar * gapFactor, yPos + 10); }
        rect(xPos + i * widthOfBar * gapFactor, yPos, widthOfBar, -arr[i] * heightFactorOfBar);
    }
}

function mouseClicked() {
     // Determining which rectangle user chose
     for (let i = 0; i < arr.length; i++) {
        if (mouseX > xPos + i * widthOfBar * gapFactor && mouseX < xPos + (i + 1) * widthOfBar * gapFactor &&
            mouseY > yPos - arr[i] * heightFactorOfBar && mouseY < yPos) {
            if (selectedRectangles.length === 0) {
                // First rectangle selected
                selectedRectangles[0] = i;
            }
            else if (selectedRectangles.length === 1) {
                // Second rectangle selected
                selectedRectangles[1] = i;
                twoRectSelected = true;
            }
            break;
        }
     }
}