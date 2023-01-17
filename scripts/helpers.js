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