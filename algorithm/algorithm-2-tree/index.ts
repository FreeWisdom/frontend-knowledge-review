/**
 * 二叉树
 */
class BinaryTree {
  public value: number;
  public left?: BinaryTree;
  public right?: BinaryTree;
  constructor(value: number, left?: BinaryTree, right?: BinaryTree) {
    this.value = value;
    this.left = left;
    this.right = right;
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

// console.log(JSON.stringify(node1, null, 2));

// {
//     "value": 1,
//     "left": {
//         "value": 2,
//         "left": {
//             "value": 4
//         }
//     },
//     "right": {
//         "value": 3,
//         "left": {
//         "value": 5,
//         "left": {
//             "value": 7
//         },
//         "right": {
//             "value": 8
//         }
//         },
//         "right": {
//         "value": 6
//         }
//     }
// }

/**
 * * 广度优先遍历
 * @param root
 */
// 广度优先遍历，写法 1：层序遍历，用队列先进先出
// 区别：可以在循环中获取节点是属于哪一层的
// 时间复杂度是 O(n)，每个节点访问切只访问一次，所以是 O(n)
function bfs1(root: BinaryTree) {
  const queue = new Array<BinaryTree>();
  queue.push(root);
  let level = 1;

  while (queue.length) {
    const sz = queue.length;
    console.log("llllll-1", level);
    level++;
    for (let index = 0; index < sz; index++) {
      // ts中“!”非空断言不可能是空
      const curr = queue.shift()!;
      console.log("curr", curr.value);
      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
    }
  }
}

// 广度优先遍历，写法 2：层序遍历，用队列先进先出
// 区别：无法在循环中获取节点是属于哪一层的
// 时间复杂度是 O(n)，每个节点访问切只访问一次，所以是 O(n)
function bfs2(root: BinaryTree) {
  const queue = new Array<BinaryTree>();
  queue.push(root);
  let level = 1;

  while (queue.length) {
    console.log("llllll-2", level);
    level++;

    // ts中“!”非空断言不可能是空
    const curr = queue.shift()!;
    console.log("curr2", curr.value);
    if (curr.left) queue.push(curr.left);
    if (curr.right) queue.push(curr.right);
  }
}

/**
 * * 深度优先遍历
 * @param root
 */
// 深度优先遍历-前序遍历-时间复杂度是 O(n)
function preOrder(root?: BinaryTree) {
  if (!root) return;
  console.log("r", root.value);
  preOrder(root.left);
  preOrder(root.right);
}
// 深度优先遍历-中序遍历
function inOrder(root?: BinaryTree) {
  if (!root) return;
  inOrder(root.left);
  console.log("r", root.value);
  inOrder(root.right);
}
// 深度优先遍历-后序遍历
function postOrder(root?: BinaryTree) {
  if (!root) return;
  postOrder(root.left);
  postOrder(root.right);
  console.log("r", root.value);
}
// 深度优先遍历-通用写法，可以在前中后分别写逻辑
// 应用场景：抽象语法树，在进入节点出去节点分别做事情
function traverse(root?: BinaryTree) {
  if (!root) return;
  // 前序位置
  traverse(root.left);
  // 中序位置
  traverse(root.right);
  // 后序位置
}
postOrder(node1);

/**
 * 多叉树
 */
class MutiTree {
  public value: number;
  public children: Array<MutiTree>;
  constructor(value: number, children: Array<MutiTree> = []) {
    this.value = value;
    this.children = children;
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

// console.log(JSON.stringify(mNode1, null, 2));
// {
//     "value": 1,
//     "children": [
//       {
//         "value": 2,
//         "children": [
//           {
//             "value": 4,
//             "children": []
//           }
//         ]
//       },
//       {
//         "value": 3,
//         "children": [
//           {
//             "value": 5,
//             "children": [
//               {
//                 "value": 7,
//                 "children": []
//               },
//               {
//                 "value": 8,
//                 "children": []
//               }
//             ]
//           },
//           {
//             "value": 6,
//             "children": []
//           }
//         ]
//       }
//     ]
// }
