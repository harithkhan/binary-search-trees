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

    static #checkIfValueIsLeftOfCurrent(value, node) {
        const current = node;
        if (current.left && current.left.value === value) {
            if (!current.left.left && !current.left.right) {
                current.left = null;
                return;
            }
            if (current.left.left && !current.left.right) {
                current.left = current.left.left;
                return;
            }
            if (!current.left.left && current.left.right) {
                current.left = current.left.right;
                return;
            }
            if (current.left.left && current.left.right) {
                const oldLeft = current.left.left;
                let reference = current.left.right;
                let nextReference = reference.left;
                while (reference && nextReference) {
                    reference = nextReference;
                    nextReference = reference.left;
                }
                current.left = reference;
                current.left.left = oldLeft;
            }
        }
    }

    static #checkIfValueIsRightOfCurrent(value, node) {
        const current = node;
        if (current.right && current.right.value === value) {
            if (!current.right.left && !current.right.right) {
                current.right = null;
                return;
            }
            if (current.right.left && !current.right.right) {
                current.right = current.right.left;
                return;
            }
            if (!current.right.left && current.right.right) {
                current.right = current.right.right;
                return;
            }
            if (current.right.left && current.right.right) {
                const oldLeft = current.right.left;
                let reference = current.right.right;
                let nextReference = reference.left;
                while (reference && nextReference) {
                    reference = nextReference;
                    nextReference = reference.left;
                }
                current.right = reference;
                current.right.left = oldLeft;
            }
        }
    }

    static #checkIfRootShouldBeDeleted(value, node) {
        const current = node;
        if (value === current.value) {
            if (current.left && !current.right) {
                this.root = current.left;
                return;
            }
            if (!current.left && current.right) {
                this.root = current.right;
                return;
            }
            if (current.left && current.right) {
                const oldLeft = current.left;
                const oldRight = current.right;
                let reference = current.right;
                let nextReference = reference.left;
                while (reference && nextReference) {
                    reference = nextReference;
                    nextReference = reference.left;
                }
                this.root = reference;
                this.root.left = oldLeft;
                let referenceRight = this.root.right;
                while (referenceRight && referenceRight.right) {
                    referenceRight = referenceRight.right;
                }
                oldRight.left = null;
                referenceRight.right = oldRight;
            }
        }
    }

    deleteItem(value) {
        let current = this.root;
        Tree.#checkIfRootShouldBeDeleted(value, current);
        while (current && value !== current.value) {
            if (value < current.value) {
                Tree.#checkIfValueIsLeftOfCurrent(value, current);
                Tree.#checkIfValueIsRightOfCurrent(value, current);
                current = current.left;
            } else if (value > current.value) {
                Tree.#checkIfValueIsLeftOfCurrent(value, current);
                Tree.#checkIfValueIsRightOfCurrent(value, current);
                current = current.right;
            } else return;
        }
    }

    find(value) {
        let current = this.root;
        while (value !== current.value) {
            if (value < current.value) {
                current = current.left;
            }
            if (value > current.value) {
                current = current.right;
            }
        }
        return current;
    }

    static #serveQueue(queue, callBack) {
        callBack(queue[0]);
        queue.shift();
    }

    static #queueChildren(currentNode, queue) {
        if (currentNode && currentNode.left) {
            queue.push(currentNode.left);
        }
        if (currentNode && currentNode.right) {
            queue.push(currentNode.right);
        }
    }

    static #levelOrderRecursive(queue, callBack) {
        if (!queue[0]) return;
        const current = queue[0];
        Tree.#serveQueue(queue, callBack);
        Tree.#queueChildren(current, queue);
        Tree.#levelOrderRecursive(queue, callBack);
    }

    levelOrder(callBack) {
        if (typeof callBack !== "function") {
            throw new Error("Callback not provided or is not a function");
        }
        if (!this.root) return;
        const queue = [];
        queue.push(this.root);
        Tree.#levelOrderRecursive(queue, callBack);
    }

    static #inOrderRecursive(currentNode, callBack) {
        const current = currentNode;
        if (!current) return;
        Tree.#inOrderRecursive(current.left, callBack);
        callBack(current);
        Tree.#inOrderRecursive(current.right, callBack);
    }

    inOrder(callBack) {
        if (typeof callBack !== "function") {
            throw new Error("Callback not provided or is not a function");
        }
        if (!this.root) return;
        const current = this.root;
        Tree.#inOrderRecursive(current, callBack);
    }

    static #preOrderRecursive(currentNode, callBack) {
        const current = currentNode;
        if (!current) return;
        callBack(current);
        Tree.#preOrderRecursive(current.left, callBack);
        Tree.#preOrderRecursive(current.right, callBack);
    }

    preOrder(callBack) {
        if (typeof callBack !== "function") {
            throw new Error("Callback not provided or is not a function");
        }
        if (!this.root) return;
        const current = this.root;
        Tree.#preOrderRecursive(current, callBack);
    }

    static #postOrderRecursive(currentNode, callBack) {
        const current = currentNode;
        if (!current) return;
        Tree.#postOrderRecursive(current.left, callBack);
        Tree.#postOrderRecursive(current.right, callBack);
        callBack(current);
    }

    postOrder(callBack) {
        if (typeof callBack !== "function") {
            throw new Error("Callback not provided or is not a function");
        }
        if (!this.root) return;
        const current = this.root;
        Tree.#postOrderRecursive(current, callBack);
    }

    height(node) {
        if (!node) {
            return -1;
        }
        return 1 + Math.max(this.height(node.left), this.height(node.right));
    }

    findParent(node, rootNode) {
        if (!rootNode) {
            return null;
        }
        if (node === rootNode.left || node === rootNode.right) {
            return rootNode;
        }
        const leftSearch = this.findParent(node, rootNode.left);
        if (leftSearch) return leftSearch;
        return this.findParent(node, rootNode.right);
    }

    depth(node) {
        const rootNode = this.root;

    }
}
