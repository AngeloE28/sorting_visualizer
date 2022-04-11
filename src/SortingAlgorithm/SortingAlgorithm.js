export function mergeSort(arr) {    
    const anims = [];
    if(arr.length <= 1)
        return arr;
    
    const auxiliaryArr = arr.slice();
    mergeSortHelper(arr, 0, arr.length - 1, auxiliaryArr, anims);
    return anims;
}

function mergeSortHelper(
    mainArr,
    startIdx,
    endIdx,
    auxiliaryArr,
    anims) {
        if(startIdx === endIdx) 
            return;
                                
        const middleIdx = Math.floor((startIdx + endIdx) / 2);
        mergeSortHelper(auxiliaryArr, startIdx, middleIdx, mainArr, anims);
        mergeSortHelper(auxiliaryArr, middleIdx + 1, endIdx, mainArr, anims);
        merge(mainArr, startIdx, middleIdx, endIdx, auxiliaryArr, anims);
}

function merge(
    mainArr, 
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArr,
    anims) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while(i <= middleIdx && j <= endIdx) {
        // Values being compared, push them once to change their color
        anims.push([i, j]);
        // Values being compared, push them again to revert their color
        anims.push([i, j]);                        
        if(auxiliaryArr[i] <= auxiliaryArr[j]) {
            // Overwrite the value at k in the original array with the value
            // at i in the aux array
            anims.push([k, auxiliaryArr[i]]);                
            mainArr[k++] = auxiliaryArr[i++];
        } else {
            // Overwrite the value at k in the original array with the value
            // at j in the aux array
            anims.push([k, auxiliaryArr[j]]);
            mainArr[k++] = auxiliaryArr[j++];
        }            
    }
    while(i <= middleIdx) {
        // Repeat first while loop, compare i to middleIdx and overwrite
        // k with i
        anims.push([i, i]);            
        anims.push([i, i]);            
        anims.push([k, auxiliaryArr[i]]);
        mainArr[k++] = auxiliaryArr[i++];
    }
    while(j <= endIdx) {
        // Repeat second while loop, for value j and the endIdx
        anims.push([j, j]);            
        anims.push([j, j]);     
        anims.push([k, auxiliaryArr[j]]);            
        mainArr[k++] = auxiliaryArr[j++];
    }
}

export function bubbleSort(arr) {
    const anims = [];
    if(arr.length <= 1)
        return arr;

    const auxArr = arr.slice();
    bubble(auxArr, anims);
    return anims;     
}

function bubble(mainArr, anims) {
    const length = mainArr.length;    
    let swapped;
    let i, j;
    for(i = 0; i < length - 1; i++) {
        swapped = false;
        for(j = 0; j < length - i - 1; j++) {
            // Values being compared, push them twice to change the color once
            // Then revert their color
            anims.push([j, j + 1]);
            anims.push([j, j + 1]);
            if(mainArr[j] > mainArr[j + 1]) {            
                // Values that are swapped             
                anims.push([j, mainArr[j + 1]]);
                anims.push([j + 1, mainArr[j]]);
                swap(mainArr, j, j+1); 
                swapped = true;
            } else {
                // Values to be ignored for the animation
                anims.push([-1, -1]);
                anims.push([-1, -1]);
            }            
        }
        if(!swapped){
            break;
        }
    }
}

export function heapSort(arr) {
    const anims = [];
    if(arr.length <= 1)
        return arr;

    const auxArr = arr.slice();
    heap(auxArr, anims);
    return anims;     
}

function heap(mainArr, anims) {
    const length = mainArr.length;    

    // Find the maximum number and move it to the root node
    // Which is 0 in the array
    for (let i = Math.floor(length/2) - 1; i >= 0; i--) {        
        // Build the max heap
        maxHeapify(mainArr, length, i, anims);
    }

    // Move the maximum number to the last largest number - 1 index in the array
    // or the end of the array (array length - 1) if its the largest number
    for(let i = length - 1; i > 0; i--) {
        // Values being compared, push them twice to change the color once
        // Then revert their color
        // The root node and an element in the heap
        anims.push([0, i]);
        anims.push([0, i]);

        // Values for animation
        // Swapping the root node and an element in the heap
        anims.push([0, mainArr[i]]);
        anims.push([i, mainArr[0]]);
        swap(mainArr, 0, i);               
        
        // Call the max heapify on the reduced heap
        maxHeapify(mainArr, i , 0, anims);
    }    
}

function maxHeapify(mainArr, length, idx, anims) {
    let largest = idx;
    let left = 2 * idx + 1;
    let right = 2 * idx + 2;     
       
    // Check if the left child is larger than the root node
    if(left < length && mainArr[left] > mainArr[largest]) {                        
        largest = left;
    }    
    
    // Check if the right child is larger than the root node
    if(right < length && mainArr[right] > mainArr[largest]) {                
        largest = right;        
    }
    
    // Check if the largest child is not the root node
    if (largest !== idx) {
        // Values being compared for animations
        // The parent and the largest child
        anims.push([idx, largest]);
        anims.push([idx, largest]);

        // Values being compared for animations
        // Swapping the parent with the largest child
        anims.push([idx, mainArr[largest]]);
        anims.push([largest, mainArr[idx]]);
        swap(mainArr, idx, largest);
        
        // Recursively heapify the affected sub tree
        maxHeapify(mainArr, length, largest, anims);
    }
}

export function quickSort(arr) {
    const anims = [];
    if(arr.length <= 1)
        return arr;

    const auxArr = arr.slice();
    quick(auxArr, anims);   
    return anims;
}

function quick(mainArr, anims) {
    const low = 0;
    const high = mainArr.length - 1;
    quickSortHelper(mainArr, low, high, anims);
}

function quickSortHelper(mainArr, low, high, anims) {
    
    if(low > high)
        return;
    
    // Get the partition index
    let partIdx = partition(mainArr, low, high, anims);

    // Sort elements before and  after partition
    quickSortHelper(mainArr, low, partIdx - 1, anims);
    quickSortHelper(mainArr, partIdx + 1, high, anims);    
}

function partition(mainArr, low, high, anims) {    
        
    let pivot = mainArr[high];

    // Index of smaller elements
    // Inidcates the right position of pivot found so far
    let idx = (low - 1);

    for(let j = low; j <= high - 1; j++) {
        
        // Current element is smaller than pivot
        if(mainArr[j] < pivot){
            // Values being compared for animation
            // Index of smaller element and current element
            anims.push([idx, j]);
            anims.push([idx, j]);

            // Values being compared for animation
            // Index of smaller element and current element being swapped
            idx++;
            anims.push([idx, mainArr[j]]);
            anims.push([j, mainArr[idx]]);
            swap(mainArr, idx, j);
        }
    }
    // Values being compared for animation
    // Index of smaller element and the ending index
    anims.push([idx + 1, high]);
    anims.push([idx + 1, high]);    

    // Values being compared for animation
    // Index of smaller element and the ending index swapped
    anims.push([idx + 1, mainArr[high]]);
    anims.push([high, mainArr[idx + 1]]);
    swap(mainArr, idx + 1, high);
    return (idx + 1);
}

function swap(mainArr, item1, item2) {
    let temp = mainArr[item1];
    mainArr[item1] = mainArr[item2];
    mainArr[item2] = temp;   
}