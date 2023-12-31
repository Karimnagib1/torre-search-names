import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Auth from "../features/Auth/Auth.js";
import Search from "../features/Search/Search";
import FavoritesList from "../features/Favorites/Favorites";
import { extractTokenFromCookie } from "../utils/extractToken";
import { useDispatch, useSelector } from "react-redux";
import { extractPayloadFromJWT } from "../utils/jwtPayloadParser";
import { authUser, selectIsAuthenticated } from "../features/Auth/UserSlice";
import AlertMessage from "../features/AlertMessage/AlertMessage";

function App() {
  const dispatch = useDispatch();

  // Check if the user is authenticated
  const token = extractTokenFromCookie();
  if (token) {
    const payload = extractPayloadFromJWT(token);
    dispatch(authUser(payload));
  }
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" exact element={<Search />} />
            <Route
              path="/favorites"
              exact
              element={
                isAuthenticated ? <FavoritesList /> : <Navigate to="/auth" />
              }
            />

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
          <AlertMessage />
        </div>
      </Router>
    </>
  );
}

export default App;
