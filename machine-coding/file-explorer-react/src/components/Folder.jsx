import { useState } from "react";
import useTraverseTree from "../hooks/use-traverse-tree";
import { FolderPlus, FilePlus, Edit, Trash2, File } from "lucide-react";

export default function Folder({
	handleInsertNode = () => {},
	handleUpdateNode = () => {},
	handleDeleteNode = () => {},

	explorer,
}) {
	const [expand, setExpand] = useState(false);
	const [showUpdateInput, setShowUpdateInput] = useState({
		visible: false,
	});
	const [showInput, setShowInput] = useState({
		visible: false,
		isFolder: null,
	});

	const handleNewFolder = (e, isFolder) => {
		e.stopPropagation();
		setExpand(true);
		setShowInput({
			visible: true,
			isFolder,
		});
	};

	const handleUpdateClick = (e) => {
		e.stopPropagation();
		setShowUpdateInput({
			visible: true,
		});
	};

	const onAddFolder = (e) => {
		if (e.keyCode === 13 && e.target.value) {
			handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
			setShowInput({ ...showInput, visible: false });
		}
	};

	const onDeleteItem = (e) => {
		e.stopPropagation();
		handleDeleteNode(explorer.id);
	};
	const handleUpdate = (e) => {
		if (e.keyCode === 13 && e.target.value) {
			const tree = handleUpdateNode(explorer.id, e.target.value);
			setShowUpdateInput({ visible: false });
		}
	};

	if (!explorer) return null;

	if (explorer.isFolder) {
		return (
			<div className='folder-container'>
				<div className='folder' onClick={() => setExpand((curr) => !curr)}>
					<span>
						{showUpdateInput.visible ? (
							<input
								placeholder={explorer.name}
								onClick={(e) => e.stopPropagation()}
								autoFocus
								type='text'
								onKeyDown={handleUpdate}
								name='name'
								className='updateContainer__input'
								onBlur={() => setShowUpdateInput({ visible: false })}
							/>
						) : (
							explorer.name
						)}
					</span>
					<div className='folder-actions'>
						<button
							onClick={(e) => handleNewFolder(e, true)}
							data-tooltip='New Folder'
						>
							<FolderPlus size={18} />
						</button>
						<button
							onClick={(e) => handleNewFolder(e, false)}
							data-tooltip='New File'
						>
							<FilePlus size={18} />
						</button>
						<button onClick={(e) => handleUpdateClick(e)} data-tooltip='Rename'>
							<Edit size={18} />
						</button>
						<button onClick={(e) => onDeleteItem(e)} data-tooltip='Delete'>
							<Trash2 size={18} />
						</button>
					</div>
				</div>
				{expand && (
					<div className='folder-content'>
						{showInput.visible && (
							<div className='inputContainer'>
								<span>{showInput.isFolder ? "📁" : "📄"}</span>
								<input
									autoFocus
									type='text'
									onKeyDown={onAddFolder}
									name='heading'
									className='inputContainer__input'
									onBlur={() =>
										setShowInput({ isFolder: null, visible: false })
									}
								/>
							</div>
						)}
						{explorer?.items.map((item) => (
							<Folder
								handleInsertNode={handleInsertNode}
								handleUpdateNode={handleUpdateNode}
								handleDeleteNode={handleDeleteNode}
								explorer={item}
								key={item?.id || "item"}
							/>
						))}
					</div>
				)}
			</div>
		);
	} else {
		return (
			<div className='file'>
				<span>
					{showUpdateInput.visible ? (
						<input
							placeholder={explorer.name}
							onClick={(e) => e.stopPropagation()}
							autoFocus
							type='text'
							onKeyDown={handleUpdate}
							name='name'
							className='updateContainer__input'
							onBlur={() => setShowUpdateInput({ visible: false })}
						/>
					) : (
						explorer.name
					)}
				</span>
				<div className='file-actions'>
					<button onClick={(e) => handleUpdateClick(e)} data-tooltip='Rename'>
						<Edit size={18} />
					</button>
					<button onClick={(e) => onDeleteItem(e)} data-tooltip='Delete'>
						<Trash2 size={18} />
					</button>
				</div>
			</div>
		);
	}
}
