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

	function deleteNode(tree, itemId) {
		if (tree.isFolder && tree.id === itemId) {
			tree.items = [];
			return tree;
		}
		if (!tree.isFolder && tree.id === itemId) {
			return null;
		}
		let nextNode = tree.items.map((obj) =>
			deleteNode(obj, folderId, updatedName)
		);
		return { ...tree, items: nextNode };
	}

	return { insertNodes, updateNode, deleteNode };
};

export default useTraverseTree;
