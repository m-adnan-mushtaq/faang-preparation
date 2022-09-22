/* STACKS AND QUEUES ARE VERY POPULAR DATA STRUCTURES AND HAVE VERSTAILE IMPORTANCE
main thing is that stack is implemented via "LIFO" => last in firs out
and queue has main principle of "FIFO" => first in first out data structure
 */
//--------------- STACKS-----------------
// stack have main major function pop() and push() and peak() which will insert & delete and return top element respectively
class Stack {
    #stack
    constructor(arr) {
        this.#stack = arr || []
    }
    isEmpty() {
        return this.#stack.length === 0
    }
    pop() {
        if (this.isEmpty()) throw "stack is empty!"
        return this.#stack.pop()
    }
    push(elm) {
        this.#stack.push(elm)
    }
    get bufferArr() {
        return this.#stack
    }
    peak() {
        if (this.isEmpty()) throw "stack is empty!"
        // return last element
        return this.#stack[this.#stack.length - 1]
    }

}
let s1 = new Stack()
function searchStack(stack, elm) {
    // search if element exists or not
    let elms = stack.bufferArr
    let bufferS = new Stack(elms)
    while (!bufferS.isEmpty()) {
        if (elm == bufferS.pop()) return true
    }
    return false
}
function accessNthNode(stack,n) {
    // return the nth node from stack
    let bufferStack=new Stack([...stack.bufferArr])
    if(n<=0) return
    if(n>bufferStack.bufferArr.length) throw "out of range"
    while (--n!==0) {
        bufferStack.pop()
    }
    return bufferStack.pop()
}
/*
try {
    s1.push(2)
    s1.push(5)
    s1.push(4)
    s1.push(10)
    s1.push(18)
    // console.log(accessNthNode(s1,2));
    // console.log(accessNthNode(s1,3));
    // console.log(accessNthNode(s1,13));
    
    // console.log(searchStack(s1,9));
    // console.log(s1.pop());

} catch (error) {
    console.log(error);
}
*/
//-----------  QUEUES--------------
const _queue_holder=new WeakMap()
class Queue{
    constructor(queue){
        _queue_holder.set(this,queue||[])
    }
    isEmpty(){
        return _queue_holder.get(this).length===0
    }
    get bufferQueue(){
        return _queue_holder.get(this)
    }
    enqueue(elm){
        // first in first out insert the element
        let prevQueue=_queue_holder.get(this)
        prevQueue.push(elm)
        _queue_holder.set(this,prevQueue)
    }
    dequeue(){
        if (this.isEmpty()) throw "queue is empty!"
        // remvoes the first element
        let prevQueue=_queue_holder.get(this)
        let returnVal=prevQueue.shift()
        _queue_holder.set(this,prevQueue)
        return returnVal
    }
    get peak(){
        // returns first element
        return _queue_holder.get(this)[0]
    }
}

function searchQueue(queue,elm) {
    // start from the top and look up
    let tempQ=new Queue([...queue.bufferQueue])
    while (!tempQ.isEmpty()) {
        if (elm===tempQ.dequeue()) {
            return true
        }
    }
    return false

}
function accessNthQueue(queue,n) {
    let tempQ=new Queue(queue.bufferQueue)
    let size=tempQ.bufferQueue.length
    if(n<=0) return
    if(n>size) throw "out of range"
    while (--n!==0) {
        tempQ.dequeue()
    }
    return tempQ.dequeue()
}
/*
try {
    let row1=new Queue()
    row1.enqueue('ali')
    row1.enqueue('ayeza')
    row1.enqueue('tehlil')
    row1.enqueue('qandeel')
    row1.enqueue('arlsan')
    // console.log(accessNthQueue(row1,2));
    // console.log(accessNthQueue(row1,3));
    console.log(accessNthQueue(row1,5));
    console.log(accessNthQueue(row1,6));
    // console.log(searchQueue(row1,'ali'));
    // console.log(searchQueue(row1,'adnan'));
    // console.log(row1.bufferQueue);
    // console.log(row1.dequeue());
    // console.log(row1.dequeue());
    // console.log(row1.dequeue());
    // console.log(row1.dequeue());
    // console.log('first will first out => ',row1.peak);
} catch (error) {
    console.log(error);
}
*/




//---------- QUESTIONS------------------
//👉 Q: Implement a stack using only queues?
// so functionality will be of stack  but behind the scene it will a queue
function StackviaQueue() {
    this.inbox=new Queue()
}
StackviaQueue.prototype.pop=function () {
    // remove the last element of queue and return it
    let tempStack=new Queue()
    let size=this.inbox.bufferQueue.length-1
    let counter=0
    while (++counter<=size) {
        tempStack.enqueue(this.inbox.dequeue())
    }
    // and remove first element from this.inbox
    let popped=this.inbox.dequeue()
    this.inbox=tempStack
    return popped
}
StackviaQueue.prototype.push=function (val) {
    // remove the last element of queue and return it
   this.inbox.enqueue(val)
}
StackviaQueue.prototype.peak=function () {
    // i have to return the last element inserted 
    let tempStack=new Queue([...this.inbox.bufferQueue])
    let size=tempStack.bufferQueue.length-1
    let counter=0
    while (++counter<=size) {
       tempStack.dequeue()
    }
    // and remove first element from this.inbox
    return tempStack.dequeue()
}


// let s2=new StackviaQueue()
// s2.push(2)
// s2.push(3)
// s2.push(4)
// s2.push(9)
// console.log(s2.inbox.bufferQueue);
// console.log(s2.peak());
// // console.log(s2.pop());


//---------IMPLEMENT QUEUE VIA STACK-----------------
function QueueViaStack() {
    this.inbox=new Stack()
    this.outbox=new Stack()
}
QueueViaStack.prototype.enqueue=function (val) {
    // insert the element at the first of stack
    this.inbox.push(val)
    
}
QueueViaStack.prototype.dequeue=function () {
    // remove the first element of stack and return it
    if (this.outbox.isEmpty()) {
        while(!this.inbox.isEmpty()){
            this.outbox.push(this.inbox.pop())
        }
    }
    return this.outbox.pop()
}
QueueViaStack.prototype.peak=function () {
    // return the first elemnt inserted
    let size=this.inbox.bufferArr.length
    let tempStack=new Stack([...this.inbox.bufferArr])
    if (this.outbox.isEmpty()) {
        while(size--!==0){
            this.outbox.push(tempStack.pop())
        }
    }
    return this.outbox.peak()
   
}
// let q2=new QueueViaStack()
// q2.enqueue(2)
// q2.enqueue(3)
// q2.dequeue()
// q2.dequeue()
// console.log(q2.peak());

//------------class sorting stacks--------------------
function sortedStack(size) {
    this.mainStack=new Stack()
    this.asecStack=new Stack()
    // initate the main stack with some random values
    for (let i = 0; i < size; i++) {
        this.mainStack.push(Math.floor(Math.random()*100))
    }
    // now sort in asecnding order
    while (!this.mainStack.isEmpty()) {
        let temp=this.mainStack.pop()
        // 👉🟢for descending order just change the sign > to <
        while (!this.asecStack.isEmpty() && this.asecStack.peak()>temp) {
            this.mainStack.push(this.asecStack.pop())
        }
        this.asecStack.push(temp)
    }
}
let s3=new sortedStack(11)
// console.log(s3.asecStack.bufferArr);

function parenthesisValidator(string) {
    let pStack=new Stack()
    for (let i = 0,len=string.length; i < len; i++) {
        let current=string.charAt(i)
        if (current==="(") {
            pStack.push(current)
        }else{
            if (pStack.isEmpty()) {
                return false
            }
            pStack.pop()
        }
    } 
    return pStack.isEmpty()
}
// console.log(parenthesisValidator('(()))'));
// console.log(parenthesisValidator('(())()'));