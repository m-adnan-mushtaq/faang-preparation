/* 👉🌵 SINGLE LINKED LIST------------------
linked list is a very popular data-structure
manually used in twitter reply where nested reply goes on with no boundage
//so the drawback of single linked list is that we can't  traverse in backward direction that problem is solved by double linked list
 */

class Node{
    constructor(data){
        this.data=data;
        this.next=null
    }
}

function SingleLinkedList() {
    this.head=null
    this.size=0
}

//--------------- INSERTION AND DELETION AT HEAD-----------
SingleLinkedList.prototype.insertAtHead=function (data) {
    // initate the new node
    let newNode=new Node(data)
    if(this.head!=null){
        // then new node is new head
        newNode.next=this.head
    }
    this.head=newNode
    this.size++;
    return this.head
}
SingleLinkedList.prototype.deleteAtHead=function () {
    if(this.size===0) throw Error("List is Empty")
    this.head=this.head.next
    this.size--;
}


//----------- PRINIT ALL NODES IN LIST---------------
SingleLinkedList.prototype.printNodes=function () {
    if(this.size==0) throw Error("List is Empty!")
    let temp=this.head
    let str=''
    while (temp) {
        str += ` ${temp.data} -->`
        temp=temp.next
    }
    console.log(str);
}
//-------------------- INSERTION AT END AND DELTEION AT END
SingleLinkedList.prototype.insertAtEnd=function (data) {
    let newNode=new Node(data)
    let temp=this.head
    if(temp==null)  {this.head=newNode; this.size++; return;}
    while (temp.next) {
        temp=temp.next
    }
    temp.next=newNode
    this.size++;
}
SingleLinkedList.prototype.deleteAtEnd=function () {
    let temp=this.head
    if(temp==null)  {this.head=null; this.size--; return;}
    let prevNode;
    while (temp.next) {
        prevNode=temp
        temp=temp.next
    }
    prevNode.next=null
    this.size--;
}
SingleLinkedList.prototype.search=function (key) {
    if(this.size==0) return false
    let temp=this.head
    while (temp) {
        if (temp.data==key) {
            return true
        }
        temp=temp.next
    }
    return false
}
SingleLinkedList.prototype.deleteByValue=function (val) {
    // so we have to find that val
    if(this.size==0) throw Error("List is Empty")
    let currentHead=this.head
    if(currentHead.data==val){
        this.head=currentHead.next
        this.size--
        return
    }
    let prevNode;
    while(currentHead.next){
        if (currentHead.data==val) {
            break
        }
        prevNode=currentHead
        currentHead=currentHead.next
    }
    prevNode.next=currentHead.next
    this.size--;
}
function reverseList(list) {
    let node={...list.head}
    let prev=null
    while (node) {
        let temp=node.next
        node.next=prev
        prev=node
        if(!temp) break;
        node=temp
    }
    console.log(node.data);
    return list
}

try {
    let list1=new SingleLinkedList()
    list1.insertAtHead(11)
    list1.insertAtHead(22)
    list1.insertAtHead(33)
    // list1.deleteAtHead()
    list1.insertAtHead(44)
    list1.insertAtEnd('-1-1')
    list1.deleteAtEnd()
    // console.log(list1.search(11))
    // console.log(list1.search(44))
    // console.log(list1.search(09))
    // list1.deleteByValue(11)
    // list1.deleteByValue(44)
    // list1.deleteByValue(33)
    // list1.deleteByValue(22)
    list1.printNodes()
    list1=reverseList(list1)
    console.log(typeof list1);
    list1.printNodes()
    // console.log(JSON.stringify(list1,null,2));
} catch (error) {
    console.log(error.message)
}
