import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

function App() {

  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                  <Home />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
