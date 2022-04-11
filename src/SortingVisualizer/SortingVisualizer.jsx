import React from "react";
import './SortingVisualizer.css';
import * as Sorting_Algorithms from '../SortingAlgorithm/SortingAlgorithm';

export class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.val = 0;
        this.state = {
            array: [],   
            numberOfArrayBars: 100,
            animSpeedMS: 5,
        };
    }

    componentDidMount() {
        this.resetArray();        
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < this.state.numberOfArrayBars; i++){
            array.push(randIntFromInterVals(5, 700));                        
        }        
        this.setState({array: array});

        const arrBars = document.getElementsByClassName('array-bar');           
        for(let i = 0; i < arrBars.length; i++) {            
            arrBars[i].style.backgroundColor = 'orange';
            arrBars[i].style.width = `${600/this.state.numberOfArrayBars}px`;
        }

        // if(this.state.array.length !== this.state.numberOfArrayBars)
        //     this.resetArray();
    }

    setArrayBarCount() {  
        var input = document.getElementById("arrayRange");       
        
        var currentVal = input.value;
        this.setState({numberOfArrayBars: currentVal});        

        this.resetArray();                
    }

    setAnimSpeed() {
        var input = document.getElementById("animSpeed");        
        
        // The min-max values are reversed
        // Multiply by -1 to reset the values to positive
        var currentVal = input.value * -1; 
        this.setState({animSpeedMS: currentVal});        
    }

    // Test if the sorts are working properly
    // testSort() {
    //     for(let i = 0; i<100; i++) {
    //         const arr = [];
    //         const length = randIntFromInterVals(1, 1000);
    //         for(let i = 0; i < length; i++) {
    //             arr.push(randIntFromInterVals(-1000, 1000));
    //         }
    //         const jsSortedArr = arr.slice().sort((a, b) => a - b);
    //         const mergeSortArr = Sorting_Algorithms.quickSort(arr.slice());
    //         console.log(arraysEqual(jsSortedArr, mergeSortArr));
    //     }
    // }

    colorSort(color, arrBars, barOneIdx, barTwoIdx) {
        const barOneStyle = arrBars[barOneIdx].style;
        const barTwoStyle = arrBars[barTwoIdx].style;
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;                
    }

    finishedColorSort(arrBars, speedAdjuster){
        for(let j = 0; j < arrBars.length; j++) {
            setTimeout(() => {
                arrBars[j].style.backgroundColor = 'lightgreen';                            
            }, j * this.state.animSpeedMS * speedAdjuster * (this.state.numberOfArrayBars/100))
        }     
    }

    heightAnimSort(arrBars, barIdx, newHeight) {
        const barStyle = arrBars[barIdx].style;
        barStyle.height = `${newHeight}px`;         
    }

    revertAfterFinishedColorSort(arrBars){
        setTimeout(() => {                               
            for(let k = 0; k < arrBars.length; k++) {
                setTimeout(() => {
                    arrBars[k].style.backgroundColor = 'orange';                    
                }, k * this.state.animSpeedMS * (this.state.numberOfArrayBars/100))
            }
        }, 1500 * this.state.animSpeedMS/8);
    }
    
    mergeSort() {        
        const anims = Sorting_Algorithms.mergeSort(this.state.array);        
        this.val = 0;        
        for(let i = 0; i < anims.length; i++) {            
            const arrBars = document.getElementsByClassName('array-bar');        
            const isColorChange = i % 3 !== 2;
            setTimeout(() => {
                if(isColorChange) {
                    const color = i % 3 === 0 ? 'red' : 'orange';                
                    const[barOneIdx, barTwoIdx] = anims[i];                    
                    this.colorSort(color, arrBars, barOneIdx, barTwoIdx);
                } else {                
                    const [barIdx, newHeight] = anims[i];
                    this.heightAnimSort(arrBars, barIdx, newHeight);
                }                
                this.val++;
                if(this.val === anims.length) {
                    this.finishedColorSort(arrBars, 1);
                    this.revertAfterFinishedColorSort(arrBars);
                }
            }, i * this.state.animSpeedMS * (this.state.numberOfArrayBars/100))
        }      
    }

    quickSort() {
        const anims = Sorting_Algorithms.quickSort(this.state.array);                         
        this.val = 0;        
        let idxToChangeColor = 0;
        const maxAnimArrIter = 4; // Eighth value is the last value of the animation   
        for(let i = 0; i < anims.length; i++) {                  
            // Loop back to restart the animations
            if(idxToChangeColor >= maxAnimArrIter)
                idxToChangeColor = 0;
                    
            // Last two items is the height
            const isColorChange = i % maxAnimArrIter === idxToChangeColor &&
                                                        idxToChangeColor < maxAnimArrIter - 2;
            idxToChangeColor++;
            const arrBars = document.getElementsByClassName('array-bar');            
            setTimeout(() => {                
                if(isColorChange) {                                        
                    this.val++;                                             
                    const color = i % maxAnimArrIter === 0 ? 'red' : 'orange';                
                    const [barOneIdx, barTwoIdx] = anims[i];                    
                    if(barOneIdx === -1)
                        return;                        
                    this.colorSort(color, arrBars, barOneIdx, barTwoIdx);       
                } else {                    
                    this.val++;                   
                    const[barIdx, newHeight] = anims[i];                                                            
                    this.heightAnimSort(arrBars, barIdx, newHeight);
                }   
                if(this.val === anims.length || (this.val + 2) === anims.length) {
                    this.finishedColorSort(arrBars, 0.25);
                    this.revertAfterFinishedColorSort(arrBars);
                }                                
            }, i * this.state.animSpeedMS * (this.state.numberOfArrayBars/100))            
        }
    }

    heapSort() {
        const anims = Sorting_Algorithms.heapSort(this.state.array);                         
        this.val = 0;        
        let idxToChangeColor = 0;
        const maxAnimArrIter = 4; // Eighth value is the last value of the animation   
        for(let i = 0; i < anims.length; i++) {                  
            // Loop back to restart the animations
            if(idxToChangeColor >= maxAnimArrIter)
                idxToChangeColor = 0;
                    
            // Last two items is the height
            const isColorChange = i % maxAnimArrIter === idxToChangeColor &&
                                                        idxToChangeColor < maxAnimArrIter - 2;
            idxToChangeColor++;
            const arrBars = document.getElementsByClassName('array-bar');            
            setTimeout(() => {                
                if(isColorChange) {                                        
                    this.val++;                                             
                    const color = i % maxAnimArrIter === 0 ? 'red' : 'orange';                
                    const [barOneIdx, barTwoIdx] = anims[i];                    
                    this.colorSort(color, arrBars, barOneIdx, barTwoIdx);       
                } else {                    
                    this.val++;                   
                    const[barIdx, newHeight] = anims[i];                                        
                    this.heightAnimSort(arrBars, barIdx, newHeight);
                }   
                if(this.val === anims.length || (this.val + 2) === anims.length) {
                    this.finishedColorSort(arrBars, 0.25);
                    this.revertAfterFinishedColorSort(arrBars);
                }                                
            }, i * this.state.animSpeedMS * (this.state.numberOfArrayBars/100))            
        }
    }

    bubbleSort() {
        const anims = Sorting_Algorithms.bubbleSort(this.state.array);                         
        this.val = 0;        
        let idxToChangeColor = 0;
        const maxAnimArrIter = 4; // Fourth value is the last value of the animation   
        for(let i = 0; i < anims.length; i++) {
            // Loop back to restart the animations
            if(idxToChangeColor >= maxAnimArrIter)
                idxToChangeColor = 0;          
                
            // Last two items is the height  
            const isColorChange =  i % maxAnimArrIter === idxToChangeColor &&
                                                        idxToChangeColor < maxAnimArrIter - 2;
            idxToChangeColor++;             
            const arrBars = document.getElementsByClassName('array-bar');            
            setTimeout(() => {                
                if(isColorChange) {                                        
                    this.val++;                                             
                    const color = i % maxAnimArrIter === 0 ? 'red' : 'orange';                
                    const [barOneIdx, barTwoIdx] = anims[i];
                    this.colorSort(color, arrBars, barOneIdx, barTwoIdx);       
                } else {                    
                    this.val++;                   
                    const[barIdx, newHeight] = anims[i];                    
                    if(barIdx === -1) {     
                        return;
                    }
                    this.heightAnimSort(arrBars, barIdx, newHeight);         
                }   
                if(this.val === anims.length || (this.val + 2) === anims.length) {
                    this.finishedColorSort(arrBars, 1);
                    this.revertAfterFinishedColorSort(arrBars);
                }                                
            }, i * this.state.animSpeedMS * (this.state.numberOfArrayBars/100))
        }
    }


    render() {
        const {array} = this.state;

        return (            
            <div className="title">
                <br/>
                Sorting Visualizer By: Angelo Estoque

                <div className="array-container">
                    <div className="userInputs">
                        <div className = "slideContainer">
                            Array Count
                            <input 
                                type="range" 
                                min="10"
                                max="200" 
                                defaultValue="100"
                                step="2"
                                className="slider"
                                id="arrayRange"
                                onInput={() => this.setArrayBarCount()}
                            />
                            Animation Speed
                            <input 
                                type="range" 
                                // Reverse the min-max
                                // Animation is faster the smaller the value
                                min="-20"
                                max="-1" 
                                defaultValue="-5"
                                step="1"
                                className="slider"
                                id="animSpeed"
                                onInput={() => this.setAnimSpeed()}
                            />
                        </div>
                        {/* Button div wrapper */}
                        <div className="buttonContainer">
                            <div>
                                <button className="newArrBtn" onClick={() => this.resetArray()}>Generate New Array</button>
                            </div>
                            <button onClick={() => this.mergeSort()}>Merge Sort</button>
                            <button onClick={() => this.quickSort()}>Quick Sort</button>
                            <button onClick={() => this.heapSort()}>Heap Sort</button>
                            <button onClick={() => this.bubbleSort()}>Bubble Sort</button>                        
                        </div>
                    </div>
                    {array.map((val, idx) => (
                        <div className="barContainer">
                        <div 
                            className="array-bar" 
                            key={idx}
                            style={{
                                    height: `${val}px`,
                                    width: `${600/this.state.numberOfArrayBars}px`
                                    }}
                        ></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

function randIntFromInterVals(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// function arraysEqual(arr1, arr2) {    
//     if(arr1.length !== arr2.length)
//         return false;
       
//     for(let i = 0; i < arr1.length; i++) {
//         if(arr1[i] !== arr2[i])
//             return false;
//     }

//     return true;
// }