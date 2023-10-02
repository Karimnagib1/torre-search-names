import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import Auth from "../features/Auth/Auth.js";
import NavBar from "../components/NavBar/NavBar.js";
import Search from "../features/Search/Search";

function App() {
  return (
    <>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" exact element={<Search />} />

            <Route path="/auth" exact element={<Auth />} />
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
        </div>
      </Router>
    </>
  );
}

export default App;
