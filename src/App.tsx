import { useState } from "react";
import "./App.css";
import { Visualizer } from "./components/Visualizer";
import { FileInput } from "./components/FileInput";
import { VStack } from "@chakra-ui/react";

function App() {
  const [matchData, setMatchData] = useState([]);
  const [stats, setStats] = useState({});
  return (
    <VStack w={"100%"} px={0} py={0} justifyContent={"center"} className="dark">
      {matchData?.length > 0 ? (
        <Visualizer data={matchData} stats={stats} />
      ) : (
        <FileInput setter={setMatchData} setStatsData={setStats} />
      )}
    </VStack>
  );
}

export default App;
