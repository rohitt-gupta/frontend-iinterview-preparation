import { useState } from "react";
import "./App.css";
import { explorer } from "./data/folderData";
import Folder from "./components/Folder";

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  return (
    <main>
      <Folder explorer={explorerData} />
    </main>
  );
}
