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
let leverOrderArr = [];
testTree.levelOrder((node) => leverOrderArr.push(node.value));
console.log(`Level Order: ${leverOrderArr}`);
let preOrderArr = [];
testTree.preOrder((node) => preOrderArr.push(node.value));
console.log(`Pre Order: ${preOrderArr}`);
let postOrderArr = [];
testTree.postOrder((node) => postOrderArr.push(node.value));
console.log(`Post Order: ${postOrderArr}`);
let inOrderArr = [];
testTree.inOrder((node) => inOrderArr.push(node.value));
console.log(`In Order: ${inOrderArr}`);

console.log(`\n4. Unbalance the tree by adding several numbers > 100.`);
testTree.insert(101);
testTree.insert(102);
testTree.insert(103);
testTree.insert(104);
testTree.insert(105);
testTree.insert(106);
prettyPrint(testTree.root);

console.log(`\n5. Confirm that the tree is unbalanced by calling isBalanced.`);
console.log(`${testTree.isBalanced()}`);

console.log(`\n6. Balance the tree by calling rebalance.`);
testTree.rebalance();

console.log(`\n7. Confirm that the tree is balanced by calling isBalanced.`);
console.log(`${testTree.isBalanced()}`);
prettyPrint(testTree.root);

console.log(`\n8. Print out all elements in level, pre, post, and in order.`);
leverOrderArr = [];
testTree.levelOrder((node) => leverOrderArr.push(node.value));
console.log(`Level Order: ${leverOrderArr}`);
preOrderArr = [];
testTree.preOrder((node) => preOrderArr.push(node.value));
console.log(`Pre Order: ${preOrderArr}`);
postOrderArr = [];
testTree.postOrder((node) => postOrderArr.push(node.value));
console.log(`Post Order: ${postOrderArr}`);
inOrderArr = [];
testTree.inOrder((node) => inOrderArr.push(node.value));
console.log(`In Order: ${inOrderArr}`);
