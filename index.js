import { Tree } from "./tree.js";
import { prettyPrint } from "./pretty-print.js";

console.log(
    `\n1. Create a binary search tree from an array of random numbers < 100.`
);
const randomArray = Array.from(
    { length: 25 },
    () => 1 + Math.floor(Math.random() * 100)
);
const testTree = new Tree(randomArray);
console.log(`\nNew Binary Search Tree:`);
console.log(testTree);
prettyPrint(testTree.root);

console.log(`\n2. Confirm that the tree is balanced by calling isBalanced.`);
console.log(`${testTree.isBalanced()}`);

console.log(`\n3. Print out all elements in level, pre, post, and in order.`);
const leverOrderArr = [];
testTree.levelOrder((node) => leverOrderArr.push(node.value));
console.log(`Level Order: ${leverOrderArr}`);
const preOrderArr = [];
testTree.preOrder((node) => preOrderArr.push(node.value));
console.log(`Pre Order: ${preOrderArr}`);
const postOrderArr = [];
testTree.postOrder((node) => postOrderArr.push(node.value));
console.log(`Post Order: ${postOrderArr}`);
const inOrderArr = [];
testTree.inOrder((node) => inOrderArr.push(node.value));
console.log(`In Order: ${inOrderArr}`);
