import { Tree } from "./tree.js";
import { prettyPrint } from "./pretty-print.js";

console.log(
    "1. Create a binary search tree from an array of random numbers < 100."
);
const randomArray = Array.from({ length: 25 }, () =>
    Math.floor(Math.random() * 100)
);
const testTree = new Tree(randomArray);
console.log(`\nNew Binary Search Tree:`)
console.log(testTree);
prettyPrint(testTree.root);
