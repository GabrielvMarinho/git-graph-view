import GitGraph from "./components/GitGraph.js";
import "./styles.css"
export default function App() {
  return (
      <>
        <a href='https://github.com/GabrielvMarinho/git-graph-view/' className='repositoryButton'>Click here for the public repository!</a>
        <GitGraph></GitGraph>
      </>
  );
};
