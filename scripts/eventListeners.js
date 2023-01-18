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
        pauseButton.disabled = true;
        generateArray(arraySize);
        loadSwaps();
        started = false;
        descriptionText.style.visibility = "visible";
        if (paused) {
            paused = false;
            pauseButton.value = "Pause";
        }
    });

    bubbleSortButton.addEventListener("click", () => {
        prepareToSort();
    });

    selectionSortButton.addEventListener("click", () => {
        prepareToSort();
    });

    insertionSortButton.addEventListener("click", () => {
        prepareToSort();
    });

    mergeSortButton.addEventListener("click", () => {
        prepareToSort();
    });

    quickSortButton.addEventListener("click", () => {
        prepareToSort();
    });

    sortButton.addEventListener("click", () => {
        started = true;
        pauseButton.disabled = false;
        descriptionText.style.visibility = "hidden";
        frameRate(Math.floor(sortingSpeedRange.value));
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
        loadSwaps();
        pauseButton.disabled = true;
        done = false;
    });

    sortingSpeedRange.addEventListener("input", () => {
        frameRate(Math.floor(sortingSpeedRange.value));
    });

});