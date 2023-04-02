export const mergeSortSequence = (arr) => {
  const swapSequence = [];

  if (arr.length <= 1) return arr;

  const auxArr = arr.slice();
  mergeSortHelper(arr, 0, arr.length - 1, auxArr, swapSequence);

  return swapSequence;
};

function mergeSortHelper(arr, lo, hi, auxArr, swapSequence) {
  if (lo === hi) return;
  const mid = Math.floor((lo + hi) / 2);
  mergeSortHelper(auxArr, lo, mid, arr, swapSequence);
  mergeSortHelper(auxArr, mid + 1, hi, arr, swapSequence);
  merge(arr, lo, mid, hi, auxArr, swapSequence);
}

function merge(arr, lo, mid, hi, auxArr, swapSequence) {
  let i = lo;
  let j = mid + 1;
  let k = lo; 
 
  while (i <= mid && j <= hi) {  
    swapSequence.push([i, j]);
    swapSequence.push([i, j]);
    if (auxArr[i] <= auxArr[j]) {
      swapSequence.push([k, auxArr[i]]);
      arr[k++] = auxArr[i++];
    } else {
      swapSequence.push([k, auxArr[j]]);
      arr[k++] = auxArr[j++];
    }
  }

  // j is finished, push the rest of i
  while (i <= mid) {
    swapSequence.push([i, i]);
    swapSequence.push([i, i]);
    swapSequence.push([k, auxArr[i]]);
    arr[k++] = auxArr[i++];
  }

  // i is finished, push the rest of j
  while (j <= hi) {
    swapSequence.push([j, j]);
    swapSequence.push([j, j]);
    swapSequence.push([k, auxArr[j]]);
    arr[k++] = auxArr[j++];
  }
}
