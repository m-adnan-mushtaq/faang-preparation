/* LFU "least frequently used " is a caching alogrithim!
the main idea is that we implement this using double linked list
so each node has key and value and we keep track of each node freqCount
so whenever an node is get and put it's freqCount is incremented
and when cache is full node with least frequency is deleted 
and if two nodes has same least frequency then we remove the node
with least recently used!
 */

class Node {
    constructor(key, value) {
        this.data = value
        this.key = key
        this.freqCount = 1
        this.next = null
        this.pev = null
    }
}

class DoubleLinkedList {
    constructor() {
        this.head = new Node('Dummy Head', null)
        this.tail = new Node('Dummy Tail', null)
        this.head.next = this.tail
        this.tail.prev = this.head
        this.size = 0
    }
    insertAtHead(node) {
        // insert after dummy node so in future we can remove it easily
        let temp = this.head.next
        node.next = temp
        temp.prev = node
        this.head.next = node
        node.prev = this.head
        this.size++
    }
    removeAtTail() {
        // remove before dummy tail
        let oldTail = this.tail.prev
        this.tail.prev = oldTail.prev
        oldTail.prev.next = this.tail
        this.size--
        return oldTail
    }
    removeNode(node) {
        node.next.prev = node.prev
        node.prev.next = node.next
        this.size--;
        return node
    }
    traverseForward=function () {
    
        let temp=this.head
        let str=''
        while (temp) {
            str +=`${temp.data} --> `
            temp=temp.next
        }
        console.log(str);
    }
}

//---------------- LET'S IMPLEMENT MAIN LFU CACHE-----------------
function LFUCache(capacity) {
    this.keys = {} // to keep track inserted nodes keys for retrevial in O(1) time
    this.freq = {} // to keep track frequencies so in future we can remove of node in O(1) time
    this.minFreq = 0
    this.capacity = capacity
    this.size=0
}
LFUCache.prototype.put = function (key, value) {
    // so check for key if it already exists
    let node = this.keys[key]
    // so insert without deleting
    if (node == undefined) {
        // check if frequency of 1 has node or not
        node = new Node(key, value)
        this.keys[key]=node
        if (this.size != this.capacity) {

            if (this.freq[1] == undefined) {
                // mean minium frequency 1 is empty and insert new list
                this.freq[1] = new DoubleLinkedList()

            }
            this.freq[1].insertAtHead(node)
            this.size++;
        } else {
            // mean delete the node from tail and insert new node at head
            let oldTail = this.freq[this.minFreq].removeAtTail()
            delete this.keys[oldTail.key]
            
            //but the new node that is inserted has frequency of one
            if (this.freq[1] == undefined) {
                // mean minium frequency 1 is empty and insert new list
                this.freq[1] = new DoubleLinkedList()

            }
            this.freq[1].insertAtHead(node)
        }
        this.minFreq = 1

    }
    else{
        //mean node is already present replace the node and increase it's freqcount and insert into it's relevant frequency list
        let oldFreqCount=node.freqCount
        node.data=value
        node.freqCount
        node.freqCount++;
        this.freq[oldFreqCount].removeNode(node)
        // now insert in it's relative frequency
        if (this.freq[node.freqCount]==undefined) {
            this.freq[node.freqCount]=new DoubleLinkedList()
        }
        this.freq[node.freqCount].insertAtHead(node)

        // if deleting node was the node that have frequency of minimum and if it was the single node with that minimum frequency
        if (oldFreqCount==this.minFreq && this.freq[oldFreqCount].size==0) {
            this.minFreq++;
        }
    }   
}

LFUCache.prototype.get=function (key) {
    
    let node=this.keys[key]
    if(node==undefined){
        return -1
    }
    let oldFreqCount=node.freqCount
    node.freqCount
    node.freqCount++;
    this.freq[oldFreqCount].removeNode(node)
    // now insert in it's relative frequency
    if (this.freq[node.freqCount]==undefined) {
        this.freq[node.freqCount]=new DoubleLinkedList()
    }
    this.freq[node.freqCount].insertAtHead(node)

    // if deleting node was the node that have frequency of minimum and if it was the single node with that minimum frequency
    if (oldFreqCount==this.minFreq && this.freq[oldFreqCount].size==0) {
        this.minFreq++;
    }
    return node.data
}


try {
    let cache1=new LFUCache(5)
    cache1.put(1,1)
    cache1.put(2,2)
    cache1.put(3,3)
    cache1.put(4,4)
    cache1.put(5,5)
    console.log(cache1.get(1));
    console.log(cache1.get(1));
    console.log(cache1.get(1));
    cache1.put(6,6)
    cache1.get(6)
    console.log('minimum frequncy',cache1.minFreq);
    console.log(Object.keys(cache1.freq));
    cache1.freq['2'].traverseForward()
    cache1.freq['1'].traverseForward()
    cache1.freq['4'].traverseForward()
    console.log(cache1.size);


} catch (error) {
    console.log('Error => ',error);
}