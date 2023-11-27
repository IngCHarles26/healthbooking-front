import "./App.scss";
import React,{Suspense} from "react";
import { RouterProvider } from "react-router-dom";

import router from './routes/index'

import Landing from "./components/landing/landing";


function App() {
  return (
    <Suspense fallback={<Landing/>}>
      <RouterProvider router={router}/>
    </Suspense>
  );
}

export default App;
