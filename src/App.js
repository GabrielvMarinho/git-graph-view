import { useEffect, useState } from "react";
import GitObject from "../gitApi/GitObjectStructure/GitObject.js";
import CommandPrompt from "./components/CommandPrompt.js";
import GitGraph from "./components/GitGraph.js";
import "./styles.css"
export default function App() {
  const [gitObject, setGitObject] = new useState(new GitObject())
  const [commandHappened, setCommandHappened] = new useState(false)

  useEffect(()=>{
    console.log(gitObject)
  }, [commandHappened])
  return (
    <>
      <CommandPrompt commandHappened={setCommandHappened}></CommandPrompt>
      <GitGraph graph={graph}></GitGraph>
    </>
  );
};
