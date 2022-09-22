/* sorting is a funndamental and crucial step to learn any data structures b/c here you actuall struturre your data with different alogirthims and techniques

  there are numerous ways of sorting even one alogorithim has several ways of implementing it so let's start
1 👉------------- BUBBLE SORT ALOG -----👈
 bubble sort is  a very basic and  non optimized way here time complexit is 🕖 O(n^2) becasue the idea is that
 you pick one element and compare it with the current iteration length of array and swap it every other element
 in javacript array are mutable so if you call swapper it will actually swap at runtime mutating actual array
*/

let numsArr = [190, 56, 92, 23, 200, 192]

function bubbleSortv1(arr) {

    for (let i = 0, len = arr.length; i < len; i++) {

        // no take curret element and compare it with current iteration length of array and swap it
        for (let j = 0; j < i; j++) {
            if (arr[i] < arr[j]) {
                swapHelper(arr, i, j)
            }
        }
    }
    return arr

}


// another way of implementing sorting is the bubble  the largest element of array and sort the array for  "i" iteration to "n-i" iteration
function bubbleSortv2(arr) {
    for (let i = 0, len = arr.length; i < len; i++) {
        for (let j = 0; j < arr.length - i; j++) {
            //if l>r then swap it
            if (arr[j] > arr[j + 1]) {
                swapHelper(arr, j, j + 1)
            }
        }
    }
    return arr
}




/* 2nd method of sorting is the  👉 SELECTION SORT 👈✅
SELECTION SORT IS a little bit much faster or optimized but in worst case scenerio it's time complexity is also 🕖 O(n^2)
IDEA --> 
 here we scan in every iteration the smallest element of remaing array  for "i" iteration of array "i-1"
 so after each iteration of i length of array is sorted and we continue to the end of array
*/

function selectionSort(arr) { // O(n^2)
    let min, len = arr.length;
    for (let i = 0; i < len; i++) {
        min = i
        // here scan the smallest element of array
        for (let j = i + 1; j < len; j++) {
            if (arr[min] > arr[j]) {
                min = j
            }
        }
        if (i != min) {
            swapHelper(arr, min, i)
        }
    }
    return arr
}
function selectionSortReverse(arr) {
    let max, len = arr.length;
    for (let i = 0; i < len; i++) {
        max = i
        // here scan the largest element of array
        for (let j = i + 1; j < len; j++) {
            if (arr[max] < arr[j]) {
                max = j
            }
        }
        if (i != max) {
            swapHelper(arr, max, i)
        }
    }
    return arr
}


function swapHelper(arr, index1, index2) {
    let temp = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = temp
}


let names = ['Kaleem', 'Iqra', 'Adnan', 'Zohaib', 'Saleem', 'Farhan', 'Tehlil', 'qandeel']
// console.log(bubbleSortv1(names));
// console.log(bubbleSortv2(numsArr));
// console.log(selectionSort(numsArr));
// console.log(selectionSort(names.join(' ').toLowerCase().split(' ')));

/**
 let's write some more efficient alogo's
  3️⃣---- INSERTION SORT O(n^2)
but may in worst case scenario it can be 🕖 O(n^2)
  // so the main theme is that we pick one key start from the 2nd element (1-index)
  and sort the array to that index and we end with sorted array
 */

function insertionSort(arr) {

    // now pick a key
    let key, i, j, len = arr.length
    for (i = 0; i < len; i++) {
        key = arr[i]
        // pick a key and insert in the it's right position
        for (j = i - 1; j >= 0 && arr[j] > key; j--) {
            // if it contains bigger elm than key then sort it
            arr[j + 1] = arr[j]
        }
        arr[j + 1] = key
    }
    return arr
}

function insertionSortReverse(arr) {
    // now pick a key
    let key, i, j, len = arr.length
    for (i = 0; i < len; i++) {
        key = arr[i]
        // pick a key and insert in the it's right position
        for (j = i - 1; j >= 0 && arr[j] < key; j--) {
            // if it contains bigger elm than key then sort it
            arr[j + 1] = arr[j]
        }
        arr[j + 1] = key
    }
    return arr
}
// console.log(insertionSort([8,5,4]))
// console.log(insertionSortReverse(numsArr))
// console.log(selectionSortReverse(numsArr))

/**
 4️⃣👉 QUICK SORT ALGO a better approach time complexiy 🕖 of O(n(log(n)))
 // quick sort is a divide and conquer alogorithim 
 call recusively itself and to the special index also called  o partition point
 this partition point does all magic itself it return a special index on behalf of some alogrithim
 // PARTITION FUNCTION EXPLAINED!
 SO we pick the pi as a last elment of array and take two pointer
 i and j i = l-1 and j = l 
 now we compare the pi element with j element
 for loop j = l to j =  r-1
 if array[j]< pi then  do nothing just increment the pointer i++; and swap i and j index elements
 after loop we simple swap i+1 with the pi element or right most element and return  index which is i+1
 */

function partition(arr, l, r) {
    let pi = arr[r], i = l - 1, j;
    for (j = l; j <= r - 1; j++) {
        if (arr[j] < pi) {
            i++;
            swapHelper(arr, i, j)
        }
    }
    swapHelper(arr, i + 1, r)
    return i + 1
}

function partitionRevrse(arr, l, r) {
    let pi = arr[r], i = l - 1, j;
    for (j = l; j <= r - 1; j++) {
        if (arr[j] > pi) {
            i++;
            swapHelper(arr, i, j)
        }
    }
    swapHelper(arr, i + 1, r)
    return i + 1
}
function quickSort(arr, l, r) {
    if (l >= r) return

    // let p = partitionRevrse(arr, l, r)
    let p = partition(arr, l, r)
    quickSort(arr, l, p - 1)
    quickSort(arr, p + 1, r)
    return arr

}



function sortArray(arr) {
    return quickSort(arr, 0, arr.length - 1)
}

// console.log(sortArray([5,4,2,1]))
// console.log(sortArray(numsArr))

//now a  quick alogirthim based on quick sort partiion 
/*💥✅ ------------ QUICK SELECT ALGORITHIIM-------------------
idea is find the smalles/largest element of any array given
for exampele [9,19,10]
find the 2nd smallest element should return 10
*/
function quickSelect(arr, l, r, k) {
    if (l >= r) return
    let p = partition(arr, l, r)
    if (p == k - 1)
        return arr[k]
    else if (p > k - 1)
        return quickSelect(arr, l, p - 1, k)
    else
        return quickSelect(arr, p + 1, r, k)
}
let arr = [13, 19, 21, 10]
// console.log(quickSelect(arr, 0, arr.length - 1, 1))



/**
 5️⃣👉 MERGE SORT ALGO a better approach time complexiy of 🕖 O(n(log(n)))
  merge sort is also based on divide & conquery alogirthim it splits the array into the length of 1 becaue length 1 array is sorted already
  main logic is the merger function which merges two arrays into the a single array by comparing both left and right array elemetns into one sorted array
 */

function mergeSort(arr) {
    if(arr.length<2) return arr
    let mid=Math.floor((arr.length/2))
    // call merger function recursively for lArr,rArr
    let lArr=arr.slice(0,mid)
    let rArr=arr.slice(mid)
    return merger(mergeSort(lArr),mergeSort(rArr))
}
function merger(lArr,rArr,sortedArr=[]) {
    let leftIndex=0,rightIndex=0;lLength=lArr.length,rLength=rArr.length
    while (leftIndex<lLength && rightIndex<rLength) {
        if(lArr[leftIndex]<rArr[rightIndex]){
            sortedArr.push(lArr[leftIndex])
            leftIndex++;
        }else{
            sortedArr.push(rArr[rightIndex])
            rightIndex++;
        }
    }
    // fill the remains arra
    return sortedArr.concat(lArr.slice(leftIndex)).concat(rArr.slice(rightIndex))
}

// console.log(mergeSort([4,9,2]))
// console.log(mergeSort(numsArr))

/* 6️⃣ count sort array is a bit amazing and unique alogrithim 🕖 time complexity of O(k+n)
and fastest algo but valid only for teh limited no of ranges if range is two large then space complexity is very very bad
so the idea is that we have supppose an array of duplicated numbers unsorted [4,4,4,9,9,9,3,3,2,1]
so we count all occureance and and those who'se numbers are not present we suppose 0 occurance
then we fill sorted array accordingly to those occurances with the help of an array who stores the sum of before element occurance
*/


function countSort(arr) {
    // let's store the occurance of each element
    var hash={},answerArr=[]
    for (let i = 0,len=arr.length; i <len; i++) {
        // if hash does not contains that element before store the count 1 othersie increment the count
        if (!hash[arr[i]]) {
            hash[arr[i]]=1
        }else{
            hash[arr[i]]++;

        }
    }

    //📚👉 we are not performing any type of  comparing all the magic is happening due to a native js fetaure that js store object properties in a sorted order
    for (const key in hash) {
        // for every key push
        for (let i = 0; i < hash[key] ;i++) {
            answerArr.push(parseInt(key))
        }
    }
    return answerArr
}
let cArr=[4,4,4,9,9,9,3,3,1,10]
cArr=[6,1,23,2,3,1,2,2,3,3,1,23,23,4,2,3]
// console.log(countSort(cArr));
// console.log(countSort(numsArr));

/**
 🟢--------- JAVASCRIPT BUILT IN SORT-------------------
 js array has also a method of .sort() which sort numbers and strings alphabetically
 it is effecient but not valid for numbers b/c js convert these numbers into letters and sort the alphabetically
 so [12,1,9] ==>  [1,12,9] which is ❌⚠🚸‼
 but world's not ended we can numbers and strings in asec and desc order
 by providing a comparator function like this (a,b)=>a-b  "asec" (a,b)=>b-a "desc"
*/ 
const ascHelper=(a,b)=>a-b
const descHelper=(a,b)=>b-a

// console.log(numsArr.sort(ascHelper)); 
// console.log(numsArr.sort(descHelper));

//Q implement a word counter list which store the word occurence in the  descending sorted form

function wordCounter(string) {
    // replace any dot
    string=string.replace(/[.]/ig,"")
    let wordsArr=string.split(' ')
    // now first store the occurance
    var occDict={}
    for (let i = 0,len=wordsArr.length; i < len; i++) {
        if (!occDict[wordsArr[i]]) {
            occDict[wordsArr[i]]=1
        }else{
            
            occDict[wordsArr[i]]++;
        }
    }

    // create an array of key, value  pairs and sort them
    var pairArr=[]
    for (const key in occDict) {
        if (key=='') {
            continue
        }
        pairArr.push([key,occDict[key]])
    }
    pairArr=pairArr.sort((a,b)=>{
         return b[1]-a[1]
    })
    occDict={}
    // now return the object
    for (let i = 0,len=pairArr.length; i < len; i++) {
        let current=pairArr[i]
        occDict[current[0]]=current[1]
    }
    return occDict
}
let sentence='practice makes perfect. get perfect by practice. just  practice.'
sentence='i ad love what i love that i what ad i ad'
// console.log(wordCounter(sentence))
