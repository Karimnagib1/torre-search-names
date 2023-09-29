import "./App.css";

import Login from "../features/Login/Login.js";
import Signup from "../features/Signup/Signup.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <div className="app">
          <main>
            {/* <Products /> */}
            <Routes>
              <Route path="/" exact element={<Login />} />
              <Route path="/signup" exact element={<Signup />} />

              <Route path="/login" exact element={<Login />} />
              <Route
                path="*"
                element={
                  <h1
                    style={{
                      paddingTop: 5 + "%",
                      height: 75 + "vh",
                      textAlign: "center",
                    }}
                  >
                    404 Not Found!
                  </h1>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;
