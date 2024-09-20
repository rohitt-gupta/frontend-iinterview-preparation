import { useState } from "react";

export default function Folder({ explorer }) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleAddNew = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  if (explorer.isFolder) {
    return (
      <div style={{ marginBottom: "5px" }}>
        <div className="folder" onClick={() => setExpand((curr) => !curr)}>
          <span>📁 {explorer.name}</span>
          <div>
            <button onClick={(e) => handleAddNew(e, true)}>Folder +</button>
            <button onClick={(e) => handleAddNew(e, false)}>File +</button>
          </div>
        </div>
        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                autoFocus
                type="text"
                name="heading"
                className="inputContainer__input"
                onBlur={() => setShowInput({ isFolder: null, visible: false })}
              />
            </div>
          )}
          {explorer.items.map((item) => {
            return <Folder explorer={item} key={item.id} />;
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <span className="file">📄{explorer.name}</span>
      </div>
    );
  }
}
