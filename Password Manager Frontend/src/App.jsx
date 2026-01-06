import "./App.css";
import NavBar from "./components/NavBar";
import Manager from "./components/Manager";
import Bottom from "./components/Bottom";

function App() {
  return (
    <>
      <NavBar />
      <div className="bg">
        <Manager />
      </div>
      <Bottom />
    </>
  );
}

export default App;
