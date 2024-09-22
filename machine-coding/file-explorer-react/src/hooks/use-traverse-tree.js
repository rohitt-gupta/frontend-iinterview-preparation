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

		if (tree.items && tree.items.length > 0) {
			tree.items = tree.items.map((childNode) => deleteNode(childNode, nodeId));
			tree.items = tree.items.filter(Boolean);
		}

		return { ...tree };
	}

	return { insertNodes, updateNode, deleteNode };
};

export default useTraverseTree;
