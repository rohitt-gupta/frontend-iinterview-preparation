import { nanoid } from "nanoid";

const useTraverseTree = () => {
	function insertNodes(tree, folderId, item, isFolder) {
		if (tree.id === folderId && tree.isFolder) {
			tree.items.unshift({
				id: nanoid(),
				name: item,
				isFolder,
				items: [],
			});
			return tree;
		}

		let nesteditems = tree.items.map((obj) => {
			return insertNodes(obj, folderId, item, isFolder);
		});

		return { ...tree, items: nesteditems };
	}

	function updateNode(tree, folderId, updatedName) {
		if (tree.id === folderId) {
			tree.name = updatedName;
			return tree;
		}

		let nextNode = tree.items.map((obj) =>
			updateNode(obj, folderId, updatedName)
		);
		return { ...tree, items: nextNode };
	}

	function deleteNode(tree, prevNode, nodeId) {
		// console.log(tree,nodeId);
		if (tree.id === nodeId) {
			// console.log(tree);
			const index = prevNode.items.findIndex((item) => {
				return item.id === nodeId;
			});
			// console.log(index);
			prevNode.items.splice(index, 1);
			// console.log(tree);
			return tree;
		}

		tree.items.map((ob) => {
			return deleteNode(ob, tree, nodeId);
		});

		return { ...tree };
	}

	return { insertNodes, updateNode, deleteNode };
};

export default useTraverseTree;
