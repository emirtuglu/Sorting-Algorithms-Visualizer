document.addEventListener("DOMContentLoaded", () => {
    const changeArrayButton = document.getElementById("changeArrayButton");
    const bubbleSortButton = document.getElementById("bubbleSortButton");
    const selectionSortButton = document.getElementById("selectionSortButton");
    const insertionSortButton = document.getElementById("insertionSortButton");
    const mergeSortButton = document.getElementById("mergeSortButton");
    const quickSortButton = document.getElementById("quickSortButton");
    const sortButton = document.getElementById("sortButton");
    const pauseButton = document.getElementById("pauseButton");
    const arraySizeRange = document.getElementById("arraySizeRange");
    const sortingSpeedRange = document.getElementById("sortingSpeedRange");
    const descriptionText = document.getElementById("descriptionText");

    changeArrayButton.addEventListener("click", () => {
        done = false;
        enableButtons();
        generateArray(arraySize);
        loadSwaps();
        clearSelectedRectangles();
        currentPair = [-1, -1];
        started = false;
        descriptionText.style.visibility = "visible";
        pauseButton.disabled = true;
        if (paused) {
            paused = false;
            pauseButton.value = "Pause";
        }
    });

    bubbleSortButton.addEventListener("click", () => {
        loadSwaps();
    });

    selectionSortButton.addEventListener("click", () => {
        loadSwaps();
    });

    insertionSortButton.addEventListener("click", () => {
        loadSwaps();
    });

    mergeSortButton.addEventListener("click", () => {
        loadSwaps();
    });

    quickSortButton.addEventListener("click", () => {
        loadSwaps();
    });

    sortButton.addEventListener("click", () => {
        started = true;
        pauseButton.disabled = false;
        descriptionText.style.visibility = "hidden";
    });

    pauseButton.addEventListener("click", () => {
        if (paused) {
            paused = false;
            pauseButton.value = "Pause";
        }
        else {
            paused = true;
            pauseButton.value = "Continue";
        }
    });

    arraySizeRange.addEventListener("input", () => {
        arraySize = Math.floor(arraySizeRange.value);
        generateArray(arraySize);
        clearSelectedRectangles();
        loadSwaps();
        pauseButton.disabled = true;
        done = false;
    });

    sortingSpeedRange.addEventListener("input", () => {
        frameRate(Math.floor(sortingSpeedRange.value));
    });

});