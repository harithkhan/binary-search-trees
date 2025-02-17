import { Tree } from "./tree.js";
import { prettyPrint } from "./pretty-print.js";

const testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const testTree = new Tree(testArr);
console.log(JSON.stringify(testTree, null, 2));
prettyPrint(testTree.root);

function addValueByOne(node) {
    const nodeToAdd = node;
    nodeToAdd.value += 1;
}

testTree.preOrder(addValueByOne);
console.log(JSON.stringify(testTree, null, 2));
prettyPrint(testTree.root);
