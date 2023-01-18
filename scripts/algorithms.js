let copyArr;
let copyArrSize;

function swap (arr, i1, i2) {
    let temp = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = temp;
}

function* bubbleSort() {
    for (let i = 0; i < arraySize - 1; i++) {
        for (let j = 0; j < arraySize - i - 1; j++) {
            currentPair = [j, j + 1];  // Highlight current pair which is being compared
            yield;
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
            yield;
        }
    }
}

// Load swaps to sort the array with bubble sort algorithm
function bubbleSortSwaps() {
    for (let i = 0; i < copyArrSize - 1; i++) {
        for (let j = 0; j < copyArrSize - i - 1; j++) {
            if (copyArr[j] > copyArr[j + 1]) {
                nextSwaps.push([j, j + 1]);
                swap(copyArr, j, j + 1);
            }
        }
    }
}

function* selectionSort() {
    let i, j , minIndex;

    for (i = 0; i < arraySize - 1; i++) {
        minIndex = i;
        for (j = i + 1; j < arraySize;  j++) {
            currentPair = [minIndex, j];
            yield;
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            currentPair = [minIndex, i];
            yield;  
            swap(arr, minIndex, i);
            yield;
        }
    }
}

// Load swaps to sort the array with selection sort algorithm
function selectionSortSwaps() {
    let i, j , minIndex;

    for (i = 0; i < copyArrSize - 1; i++) {
        minIndex = i;
        for (j = i + 1; j < copyArrSize;  j++) {
            if (copyArr[j] < copyArr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            nextSwaps.push([minIndex, i]);
            swap(copyArr, minIndex, i);
        }
    }
}

function* insertionSort() 
{ 
    let i, key, j; 
    for (i = 1; i < arraySize; i++)
    { 
        key = arr[i]; 
        j = i - 1; 
        currentPair = [i, j];
        yield;
        while (j >= 0 && arr[j] > key)
        { 
            currentPair = [j, j + 1];
            yield;
            swap(arr, j, j + 1); 
            j--; 
            yield;
        } 
        yield;
    } 
} 

// Load swaps to sort the array with insertion sort algorithm
function insertionSortSwaps() {
    let i, key, j;

    for (i = 1; i < copyArrSize; i++) {
        key = copyArr[i];
        j = i - 1;

        while (j >= 0 && copyArr[j] > key) {
            nextSwaps.push([j, j + 1]);
            swap(copyArr, j, j + 1);
            j--;
        }
    }
}

function* mergeSort(l = 0, r = arraySize - 1) {
    if (r <= l) return arr;

    let middle = Math.floor((l + r) / 2);
    
    yield* mergeSort(l, middle);
    yield* mergeSort(middle + 1, r);
    yield* merge(l, middle, r);
}

function* merge(l, m, r) {
    let i = l;
    let j = m+1;

    while (i <= m && j <= r) {
        currentPair = [i, j];
        yield;
        if (arr[i] > arr[j]) {
            currentPair = [i, j];
            yield;
            for (var k = j - 1; k >= i; k--) {
                swap(arr, k, k+1);
            }
            i++;
            j++;
            m++;
            yield;
        }
        else {
            i++;
        }
    }
}

// Load swaps to sort the array with merge sort algorithm
function mergeSortSwaps(l = 0, r = arraySize - 1) {
    if (r <= l) return copyArr;

    let middle = Math.floor((l + r) / 2);
    
    mergeSortSwaps(l, middle);
    mergeSortSwaps(middle + 1, r);
    mergeSwaps(l, middle, r);
}

function mergeSwaps(l, m, r) {
    let i = l;
    let j = m+1;

    while (i <= m && j <= r) {
        if (copyArr[i] > copyArr[j]) {
            nextSwaps.push([i, j]);
            for (var k = j - 1; k >= i; k--) {
                swap(copyArr, k, k + 1);
            }
            i++;
            j++;
            m++;
        }
        else {
            i++;
        }
    }
}

function* quickSort(low = 0, high = arraySize - 1) {
    if (low < high) {
        let partitionIndex = yield* partition(low, high);

        yield* quickSort(low, partitionIndex - 1);
        yield* quickSort(partitionIndex + 1, high);
    }
}

function* partition(low, high) {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        currentPair = [j, high];
        yield;
        if (arr[j] < pivot) {
            i++;
            if (i !== j) {
                currentPair = [i, j];
                yield;
                swap(arr, i, j);
                yield;
            }
        }
    }
    if (i+1 !== high) {
        currentPair = [i + 1, high];
        yield;
        swap(arr, i + 1, high);
        yield;
    }
    return i + 1;
}

// Load swaps to sort the array with quick sort algorithm
function quickSortSwaps(low = 0, high = copyArrSize - 1) {
    if (low < high) {
        let partitionIndex = partitionSwaps(low, high);

        quickSortSwaps(low, partitionIndex - 1);
        quickSortSwaps(partitionIndex + 1, high);
    }
}

function partitionSwaps(low, high) {
    let pivot = copyArr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (copyArr[j] < pivot) {
            i++;
            if (i !== j) {
                nextSwaps.push([i, j]);
                swap(copyArr, i, j);
            }
        }
    }
    if (i+1 !== high) {
        nextSwaps.push([i+1, high]);
        swap(copyArr, i + 1, high);
    }
    return i + 1;
}