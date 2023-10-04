import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "../features/Auth/Auth.js";
import Search from "../features/Search/Search";
import FavoritesList from "../features/Favorites/Favorites";
import { extractTokenFromCookie } from "../utils/extractToken";
import { useDispatch } from "react-redux";
import { extractPayloadFromJWT } from "../utils/jwtPayloadParser";
import { authUser } from "../features/Auth/UserSlice";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  // Check if the user is authenticated
  const token = extractTokenFromCookie();
  if (token) {
    const payload = extractPayloadFromJWT(token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    dispatch(authUser(payload));
  }

  return (
    <>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" exact element={<Search />} />
            <Route path="/favorites" exact element={<FavoritesList />} />

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
