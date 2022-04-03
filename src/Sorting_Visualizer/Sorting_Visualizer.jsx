import React from "react";
import './Sorting_Visualizer.css';
import * as Sorting_Algorithms from '../Sorting_Algorithm/Sorting_Algorithm';


export class Sorting_Visualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 200; i++){
            array.push(randIntFromInterVals(5, 700));
        }
        this.setState({array});
    }

    testSort() {
        for(let i = 0; i<100; i++) {
            const arr = [];
            const length = randIntFromInterVals(1, 1000);
            for(let i = 0; i < length; i++) {
                arr.push(randIntFromInterVals(-1000, 1000));
            }
            const jsSortedArr = arr.slice().sort((a, b) => a -b);
            const mergeSortArr = Sorting_Algorithms.mergeSort(array.slice());
            console.log(arraysEqual(jsSortedArr, mergeSortArr));
        }
    }


    mergeSort() {
        const sortedArr = Sorting_Algorithms.mergeSort(this.state.array);
    }

    quickSort() {

    }

    heapSort() {

    }

    bubbleSort() {
        
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
    // Check length is equal
    if(arr1.length !== arr2.length)
        return false;
        
    // Iterate through arrays making sure each element is equal
    // Break if elements are not equal
    for(let i = 0; i < arr1.length; i++) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    // Elements are equal
    return true;
}