import Node from "./Node.js";

export default class {
  constructor(arr) {
    this.arr = Array.from(new Set(arr)).sort((a, b) => (a < b ? -1 : 0));
    this.root = this.#buildTree(this.arr, 0, this.arr.length - 1);
  }

  #buildTree(arr, start, end) {
    if (start > end) {
      return null;
    }

    let middle = Math.floor((start + end) / 2);
    let root = new Node(arr[middle]);

    root.left = this.#buildTree(arr, start, middle - 1);
    root.right = this.#buildTree(arr, middle + 1, end);
    return root;
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        // eslint-disable-next-line prettier/prettier
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value, root = this.root) {
    if (root === null) {
      return new Node(value);
    }

    if (root.data === value) {
      return root;
    }

    if (value < root.data) {
      root.left = this.insert(value, root.left);
    } else if (value > root.data) {
      root.right = this.insert(value, root.right);
    }

    return root;
  }

  delete(value, node = this.root) {
    if (node === null) {
      return node;
    }

    if (value > node.data) {
      node.right = this.delete(value, node.right);
    } else if (value < node.data) {
      node.left = this.delete(value, node.left);
    } else {
      if (node.left === null && node.right === null) {
        return null;
      } else if (node.left === null && node.right) {
        node = node.right;
      } else if (node.left && node.right === null) {
        node = node.left;
      } else {
        let next = getNext(node);
        node.data = next.data;
        node.right = this.delete(next.data, node.right);
      }
    }

    function getNext(node) {
      node = node.right;
      while (node !== null && node.left !== null) {
        node = node.left;
      }
      return node;
    }

    return node;
  }

  find(value, root = this.root) {
    while (root !== null && root.data !== value) {
      if (value > root.data) {
        root = root.right;
      } else {
        root = root.left;
      }
    }
    if (root.data === value) {
      return root;
    }
  }

  //iteration or recurision
  levelOrder(callback, root = this.root) {
    //iterative approach from https://www.youtube.com/watch?v=86g8jAQug04 :
    //if callback is empty
    if (!callback) {
      throw new Error("No Callback given");
    }
    //if the root is empty
    if (root === null) {
      return;
    }
    let queue = [];
    queue.push(root);
    while (queue.length > 0) {
      let current = queue[0];
      callback(current);
      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
      //remove the current node from the queue
      queue.shift();
    }
  }
}
