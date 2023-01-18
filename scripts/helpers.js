function generateArray(n) {
    arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(Math.floor(Math.random() * 100) + 1);
    }
}

function enableButtons() {
    bubbleSortButton.disabled = false;
    selectionSortButton.disabled = false;
    insertionSortButton.disabled = false;
    mergeSortButton.disabled = false;
    quickSortButton.disabled = false;
    sortButton.disabled = false;
    arraySizeRange.disabled = false;
}

function disableButtons() {
    bubbleSortButton.disabled = true;
    selectionSortButton.disabled = true;
    insertionSortButton.disabled = true;
    mergeSortButton.disabled = true;
    quickSortButton.disabled = true;
    sortButton.disabled = true;
    arraySizeRange.disabled = true;
}

function clearSelectedRectangles() {
    twoRectSelected = false;
    selectedRectangles = [];
}

function prepareToSort() {
    loadSwaps();
    if(done) {
        generateArray(arraySize);
        sortButton.disabled = false;
        done = false;
    }
}

function finishSort() {
    done = true;
    enableButtons();
    sortGenerator = undefined;
    sortButton.disabled = true;
    pauseButton.disabled = true;
    currentPair = [-1, -1];
    started = false;
    clearSelectedRectangles();
}

function loadSwaps() {
    nextSwapsIndex = 0;
    nextSwaps = [];
    copyArr = [...arr];
    copyArrSize = copyArr.length;
    sortButton.disabled = false;
    currentPair = [-1, -1];
    clearSelectedRectangles();
    if (bubbleSortButton.checked) {
        bubbleSortSwaps();
        sortGenerator = bubbleSort();
    }
    else if (selectionSortButton.checked) {
        selectionSortSwaps();
        sortGenerator = selectionSort();
    }
    else if (insertionSortButton.checked) {
        insertionSortSwaps();
        sortGenerator = insertionSort();
    }
    else if (mergeSortButton.checked) {
        mergeSortSwaps();
        sortGenerator = mergeSort();
    }
    else if(quickSortButton.checked) {
        quickSortSwaps();
        sortGenerator = quickSort();
    }
    if (nextSwaps.length === 0) { // if generated random array is already sorted
        setup();
    }
}