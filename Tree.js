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
}
