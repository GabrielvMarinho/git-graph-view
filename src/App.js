import CommandPrompt from "./components/CommandPrompt.js";
import GitGraph from "./components/GitGraph.js";
import "./styles.css"
export default function App() {
  return (
    <>
      <CommandPrompt></CommandPrompt>
      <GitGraph></GitGraph>
    </>
  );
};
