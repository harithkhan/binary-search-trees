import { Node } from "./node.js";

function buildTree(arr) {
    const uniqueSet = new Set(arr);
    const uniqueArr = [...uniqueSet];
    uniqueArr.sort((a, b) => a - b);
    if (uniqueArr.length === 0) return null;
    const middleIndex = Math.floor((0 + uniqueArr.length - 1) / 2);
    const middleNode = new Node(uniqueArr[middleIndex]);
    const leftArr = uniqueArr.slice(0, middleIndex);
    const rightArr = uniqueArr.slice(middleIndex + 1);
    middleNode.left = leftArr.length === 0 ? null : buildTree(leftArr);
    middleNode.right = rightArr.length === 0 ? null : buildTree(rightArr);
    return middleNode;
}

export class Tree {
    constructor(arr = []) {
        this.array = arr;
        this.root = buildTree(arr);
    }

    insert(value) {
        let current = this.root;
        while (value !== current.value) {
            if (value < current.value) {
                if (!current.left) {
                    current.left = new Node(value);
                    return;
                }
                current = current.left;
            } else if (value > current.value) {
                if (!current.right) {
                    current.right = new Node(value);
                    return;
                }
                current = current.right;
            } else return;
        }
    }

    deleteItem(value) {
        let current = this.root;
        while (value !== current.value) {
            if (value < current.value) {
                if (current.left && current.left.value === value) {
                    if (!current.left.left && !current.left.right) {
                        current.left = null;
                        return;
                    }
                }
                if (current.right && current.right.value === value) {
                    if (!current.right.left && !current.right.right) {
                        current.right = null;
                        return;
                    }
                }
                current = current.left;
            } else if (value > current.value) {
                if (current.left && current.left.value === value) {
                    if (!current.left.left && !current.left.right) {
                        current.left = null;
                        return;
                    }
                }
                if (current.right && current.right.value === value) {
                    if (!current.right.left && !current.right.right) {
                        current.right = null;
                        return;
                    }
                }
                current = current.right;
            } else return;
        }
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

const testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const testTree = new Tree(testArr);
testTree.insert(2);
testTree.insert(21);
testTree.insert(25);
// testTree.deleteItem(25);
console.log(JSON.stringify(testTree, null, 2));
prettyPrint(testTree.root);
