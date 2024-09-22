import { useState } from "react";
import "./App.css";
import { explorer } from "./data/folderData";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/use-traverse-tree";

export default function App() {
	const [explorerData, setExplorerData] = useState(explorer);
	const { insertNodes, deleteNode, updateNode } = useTraverseTree();

	const handleInsertNode = (folderId, item, isFolder) => {
		const finalTree = insertNodes(explorerData, folderId, item, isFolder);
		setExplorerData(finalTree);
	};

	const handleUpdateNode = (folderId, updatedName) => {
		const finalTree = updateNode(explorerData, folderId, updatedName);
		setExplorerData(finalTree);
	};
	const handleDeleteNode = (folderId) => {
		const updatedTree = deleteNode(explorerData, -1, folderId);
		setExplorerData(updatedTree);
	};
	return (
		<main>
			<Folder
				handleInsertNode={handleInsertNode}
				handleUpdateNode={handleUpdateNode}
				handleDeleteNode={handleDeleteNode}
				explorer={explorerData}
			/>
		</main>
	);
}
