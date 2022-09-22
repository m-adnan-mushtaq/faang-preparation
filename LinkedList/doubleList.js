/*   ------------DOUBLE LINKED LIST----------
unlike single linked list double linked list has also a prev pointer
which simply points to the previous node
and reverse traversel is also possible
 */

class Node{
    constructor(data){
        this.data=data
        this.next=null
        this.prev=null
    }
}

function DoubleList() {
    this.head=null
    this.tail=null
    this.size=0
}
DoubleList.prototype.isEmpty=function () {
    return this.size===0
}
DoubleList.prototype.traverseForward=function () {
    if (this.isEmpty()) return

    let temp=this.head
    let str=''
    while (temp) {
        str +=`${temp.data} --> `
        temp=temp.next
    }
    console.log(str);
}
DoubleList.prototype.traverseBackward=function () {
    if (this.isEmpty()) return
    let temp=this.tail
    let str=''
    while (temp) {
        str +=`<--  ${temp.data} `
        temp=temp.prev
    }
    console.log(str);
}

//----------- INSERTION AT HEAD & TAIL--------------------------
DoubleList.prototype.insertAtHead=function (data) {
    let newNode=new Node(data)
    // so if list is empty
    if (this.head==null) {
        this.head=newNode
        this.tail=this.head
    }else{
        let temp=this.head
        temp.prev=newNode
        this.head=newNode
        this.head.next=temp
    }
    this.size++
}
DoubleList.prototype.insertAtTail=function (data) {
    let newNode=new Node(data)
    // so if list is empty
    if (this.tail==null) {
        this.tail=newNode
    }else{
        let temp=this.tail
        temp.next=newNode
        this.tail=newNode
        this.tail.prev=temp
    }
    this.size++
}

//---------- DELETION AT HEAD & TAIL-----------------------
DoubleList.prototype.deleteAtHead=function(){
    // if fisrt node is empty
    if(this.head===this.tail){
        this.head=null
        this.tail=null
    }else{
        this.head=this.head.next
        this.head.prev=null
    }
    this.size--;
    
}
DoubleList.prototype.deleteAtTail=function(){
    // if fisrt node is empty
    if(this.tail===this.head){
        this.head=null
        this.tail=null
    }else{
        this.tail=this.tail.prev
        this.tail.next=null
    }
    this.size--;
}
DoubleList.prototype.findStartingHead=function (key) {
    // start form head and traverse to node until it is found
    let temp=this.head
    while(temp.next){
        if (temp.data==key) {
            return true
        }
        temp=temp.next
    }
    return false
}
DoubleList.prototype.findStartingTail=function (key) {
    // start form head and traverse to node until it is found
    let temp=this.tail
    while(temp.prev){
        if (temp.data==key) {
            return true
        }
        temp=temp.prev
    }
    return false
}
DoubleList.prototype.deleteByValue=function (key) {
    // codidtion
    // if node is at head or tail or in somwhere middle
   if (this.head==this.tail) {
        this.head=null
        this.tail=null
   }
    let temp=this.head
    let prev=null
    while (temp.next) {
        if(temp.data==key){
            break;
        }
        prev=temp
        temp=temp.next
    }
    // so if node is the head
    if(!temp.prev){
        temp.next.prev=prev
        this.head=temp.next
    }
    else if(!temp.next){
        //it means  it is the tail node
        prev.next=temp.next
        this.tail=prev

    }else{
        prev.next=temp.next
        temp.next.prev=prev
    }

    this.size--;
}

// delete duplicates in double linked list
function deleteDuplicates(list) {
    // track the occurance of list nodes 
    var hashmap={}
    let cHead=list.head
    while (cHead) {
        if (hashmap[cHead.data]) {
            list.deleteByValue(cHead.data)
        }else{
            hashmap[cHead.data]=true
        }
        cHead=cHead.next
    }
    return list
}
try {
    let list1=new  DoubleList()
    list1.insertAtHead(20)
    list1.insertAtHead(30)
    list1.insertAtHead(40)
    list1.insertAtHead(50)
    list1.insertAtHead(20)
    list1.insertAtHead(30)
    list1=deleteDuplicates(list1)
    // list1.insertAtHead(60)
    // list1.insertAtTail(10)
    // list1.deleteAtHead()
    // list1.deleteAtTail()
    // list1.deleteByValue(50)
    // list1.deleteByValue(60)
    // list1.deleteByValue(10)
    list1.traverseForward()
    list1.traverseBackward()
    // console.log(list1.findStartingHead(30))
    // console.log(list1.findStartingTail(20))
    
} catch (error) {
    console.log(error);
}