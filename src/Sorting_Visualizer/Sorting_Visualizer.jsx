import React from "react";
import './Sorting_Visualizer.css';
import * as Sorting_Algorithms from '../Sorting_Algorithm/Sorting_Algorithm';

const ANIM_SPEED_MS = 5;
const NUMBER_OF_ARRAY_BARS = 100;

export class Sorting_Visualizer extends React.Component {
    constructor(props) {
        super(props);
        this.val = 0;
        this.state = {
            array: [],                        
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++){
            array.push(randIntFromInterVals(5, 700));                        
        }        
        this.setState({array});

        const arrBars = document.getElementsByClassName('array-bar');        
        for(let i = 0; i < arrBars.length; i++) {            
            arrBars[i].style.backgroundColor = 'orange';
        }
    }

    testSort() {
        for(let i = 0; i<100; i++) {
            const arr = [];
            const length = randIntFromInterVals(1, 1000);
            for(let i = 0; i < length; i++) {
                arr.push(randIntFromInterVals(-1000, 1000));
            }
            const jsSortedArr = arr.slice().sort((a, b) => a - b);
            const mergeSortArr = Sorting_Algorithms.bubbleSort(arr.slice());
            console.log(arraysEqual(jsSortedArr, mergeSortArr));
        }
    }

    colorSort(color, arrBars, barOneIdx, barTwoIdx) {
        const barOneStyle = arrBars[barOneIdx].style;
        const barTwoStyle = arrBars[barTwoIdx].style;
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;                
    }

    finishedColorSort(arrBars){
        for(let j = 0; j < arrBars.length; j++) {
            setTimeout(() => {
                arrBars[j].style.backgroundColor = 'green';                            
            }, j * ANIM_SPEED_MS)
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
                }, k * ANIM_SPEED_MS)
            }
        }, 1500);
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
                    this.finishedColorSort(arrBars);
                    this.revertAfterFinishedColorSort(arrBars);
                }
            }, i * ANIM_SPEED_MS)
        }      
    }

    quickSort() {

    }

    heapSort() {

    }

    bubbleSort() {
        const anims = Sorting_Algorithms.bubbleSort(this.state.array);                         
        this.val = 0;        
        for(let i = 0; i < anims.length; i++) {            
            const isColorChange = (i % 4 === 0) || (i % 4 === 1);
            const arrBars = document.getElementsByClassName('array-bar');            
            setTimeout(() => {                
                if(isColorChange) {                                        
                    this.val++;                                             
                    const color = i % 4 === 0 ? 'red' : 'orange';                
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
                    this.finishedColorSort(arrBars);
                    this.revertAfterFinishedColorSort(arrBars);
                }                                
            }, i * ANIM_SPEED_MS)
        }
    }


    render() {
        const {array} = this.state;

        return (
            <div className="array-container">
                {array.map((val, idx) => (
                    <div 
                        className="array-bar" 
                        key={idx}
                        style={{height: `${val}px`}}
                    ></div>
                ))}
                {/* Button div wrapper */}
                <div>
                    <button onClick={() => this.resetArray()}>Generate New Array</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.quickSort()}>Quick Sort</button>
                    <button onClick={() => this.heapSort()}>Heap Sort</button>
                    <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <button onClick={() => this.testSort()}>Test Sort</button>
                </div>
            </div>
        );
    }
}

function randIntFromInterVals(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysEqual(arr1, arr2) {    
    if(arr1.length !== arr2.length)
        return false;
       
    for(let i = 0; i < arr1.length; i++) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
}