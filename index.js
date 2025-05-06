import Tree from "./Tree.js";

let test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

test.prettyPrint(test.root);
test.insert(28); //correct
test.prettyPrint(test.root);
test.delete(23); //incorrect, deleting 23 as well
test.prettyPrint(test.root);
// console.log(test.find(28));
// test.levelOrder((e) => console.log(e));
// test.levelOrder((e) => (e = e * e));
// test.prettyPrint(test.root);
