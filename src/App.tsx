import { useState } from "react";
import "./App.css";
import { Visualizer } from "./components/Visualizer";
import { FileInput } from "./components/FileInput";

function App() {
  const [matchData, setMatchData] = useState([]);
  return <>{matchData?.length > 0 ? <Visualizer /> : <FileInput />}</>;
}

export default App;
