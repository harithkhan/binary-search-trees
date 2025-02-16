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
const testArr2 = [1, 2, 3, 4, 5, 6, 9, 8, 7];
const testTree = new Tree(testArr2);
console.log(JSON.stringify(testTree, null, 2));
prettyPrint(testTree.root);
