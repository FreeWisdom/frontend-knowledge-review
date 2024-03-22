/**
 * 二叉树
 */
class BinaryTree {
    public value: number
    public left?: BinaryTree
    public right?: BinaryTree
    constructor(value: number, left?: BinaryTree, right?: BinaryTree) {
        this.value = value
        this.left = left
        this.right = right
    }
}

const node4 = new BinaryTree(4);
const node2 = new BinaryTree(2, node4);

const node7 = new BinaryTree(7);
const node8 = new BinaryTree(8);

const node5 = new BinaryTree(5, node7, node8);
const node6 = new BinaryTree(6);

const node3 = new BinaryTree(3, node5, node6);

const node1 = new BinaryTree(1, node2, node3);

console.log(JSON.stringify(node1, null, 2));

/**
 * 多叉树
 */
class MutiTree {
    public value: number
    public children: Array<MutiTree>
    constructor(value: number, children: Array<MutiTree> = []) {
        this.value = value
        this.children = children
    }
}

const mNode4 = new MutiTree(4);
const mNode2 = new MutiTree(2, [mNode4]);

const mNode7 = new MutiTree(7);
const mNode8 = new MutiTree(8);

const mNode5 = new MutiTree(5, [mNode7, mNode8]);
const mNode6 = new MutiTree(6);

const mNode3 = new MutiTree(3, [mNode5, mNode6]);

const mNode1 = new MutiTree(1, [mNode2, mNode3]);

console.log(JSON.stringify(mNode1, null, 2));
