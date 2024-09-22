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

	function deleteNode(tree, nodeId) {
		if (tree.id === nodeId) {
			return null;
		}

		if (tree.isFolder) {
			const updatedItems = tree.items.filter((item) => {
				const result = deleteNode(item, nodeId);
				return result !== null;
			});

			// If items array changed, return a new object with updated items
			if (updatedItems.length !== tree.items.length) {
				return { ...tree, items: updatedItems };
			}
		} else {
			console.log("tree", tree);
		}

		// If we didn't find the node to delete, return the original tree/item
		return tree;
	}

	return { insertNodes, updateNode, deleteNode };
};

export default useTraverseTree;
