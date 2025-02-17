/* eslint-disable max-classes-per-file */

class QueueNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

export class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    enqueue(value) {
        const newNode = new QueueNode(value);
        if (!this.tail) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }
}

const test = new Queue();
test.enqueue(5);
test.enqueue(6);
// test.enqueue(7);
console.log(JSON.stringify(test, null, 2));
