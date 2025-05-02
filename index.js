import Tree from "./Tree.js";

let test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

test.prettyPrint(test.root);
test.insert(28);
test.prettyPrint(test.root);
