// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.scss";
import AsideLeft from "./components/dashboards/general/asideLeft/asideLeft";
import DashboardPatient from "./components/dashboards/patient/dashboardPatient";
import Landing from "./components/landing/landing";
import PostDoctor from "./components/dashboards/doctor/PostDoctor/PostDoctor";
import AsideRight from "./components/dashboards/general/AsideRight/AsideRight";

function App() {
  // const [count, setCount] = useState(0)
  return (
    <>
      {/* <Landing/> */}
      {/* <DashboardPatient/> */}
      <PostDoctor></PostDoctor>
      {/* <AsideRight></AsideRight> */}
      {/* <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
