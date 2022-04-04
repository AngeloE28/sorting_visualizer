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
        // Repeat first while loop, compare i to i and overwrite
        // k with i
        anims.push([i, i]);            
        anims.push([i, i]);            
        anims.push([k, auxiliaryArr[i]]);
        mainArr[k++] = auxiliaryArr[i++];
    }
    while(j <= endIdx) {
        // Repeat second while loop, instead of value i, its value j
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
            // Values being compared, push them to change and rever their color
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

function swap(mainArr, item1, item2) {
    let temp = mainArr[item1];
    mainArr[item1] = mainArr[item2];
    mainArr[item2] = temp;   
}