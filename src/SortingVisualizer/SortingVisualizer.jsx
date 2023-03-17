import React from "react";
import { mergeSortSequence } from "../SortingAlgorithms/MergeSort";
import "./SortingVisualizer.css";

const MAIN_COLOR = "red";

const SWAP_COLOR = "yellow";

const SPEED = 5;

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min) + 1);
}

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.randomizeArray();
  }

  randomizeArray() {
    const array = [];

    // Each bar has a width of 2px and margin of 1px on each side making them 4px wide
    // -200 to allow for 100px of space on each side of graph area
    for (let i = 0; i < (window.screen.width - 200) / 4; i++) {
      // Multiply screen height by 0.7 to make sure graph area fits on screen without scrolling vertically
      array.push(randInt(1, window.screen.height * 0.7));
    }
    this.setState({ array });
  }

  // O(n log n) time
  // O(n) space
  // Sorts Large Arrays quickly
  // Stable Sort
  mergeSort = () => {
    const swapSequence = mergeSortSequence(this.state.array);

    for (let i = 0; i < swapSequence.length; i++) {
      const barsArray = document.getElementsByClassName('bar');
      const changeColor = i % 3 !== 2;

      if (changeColor) {
        const [firstBarIdx, secBarIdx] = swapSequence[i];
        const firstBarStyle = barsArray[firstBarIdx].style;
        const secBarStyle = barsArray[secBarIdx].style;
        const color = i % 3 === 0 ? SWAP_COLOR : MAIN_COLOR;

        setTimeout(() => {
          firstBarStyle.backgroundColor = color;
          secBarStyle.backgroundColor = color;
        }, i * SPEED);
      } else {
        setTimeout(() => {
          const [firstBarIdx, newHeight] = swapSequence[i];
          const firstBarStyle = barsArray[firstBarIdx].style;
          firstBarStyle.height = `${newHeight}px`;
        }, i * SPEED);
      }
    }
  };

  quickSort = () => {};
 
  heapSort = () => {};

  bubbleSort = () => {};

  render() {
    const { array } = this.state;

    return (
      <div className="bars">
        {array.map((value, idx) => (
          <div
            className="bar"
            key={idx}
            style={{
              backgroundColor: MAIN_COLOR,
              height: `${value}px`,
            }}
          ></div>
        ))}

        <div className="sort-buttons">
          <button
            className="btn rand-btn"
            onClick={() => this.randomizeArray()}
          > 
            <i className="fa-solid fa-shuffle"></i>
          </button>
          <button className="btn" onClick={() => this.mergeSort()}>
            Merge Sort
          </button>
          <button className="btn" onClick={() => this.quickSort()}>
            Quick Sort
          </button>
          <button className="btn" onClick={() => this.heapSort()}>
            Heap Sort
          </button>
          <button className="btn" onClick={() => this.bubbleSort()}>
            Bubble Sort
          </button>
        </div>
      </div>
    );
  }
}
