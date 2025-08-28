import { useEffect, useState } from "react";
import GitObject from "../gitApi/GitObjectStructure/GitObject.js";
import CommandPrompt from "./components/CommandPrompt.js";
import GitGraph from "./components/GitGraph.js";
import "./styles.css"
import { ReactFlowProvider } from "reactflow";
export default function App() {
  
  return (
    
      <GitGraph></GitGraph>
    
  );
};
