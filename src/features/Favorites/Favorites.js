import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites, selectFavorites } from "./FavoritesSlice";
import "./Favorites.css";
import NavBar from "../../components/NavBar/NavBar";
const FavoritesList = () => {
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFavorites());
  }, [dispatch]);

  return (
    <>
      <NavBar path="favorites" />
      <div className="favorites">
        {favorites.length === 0 && <h2>You have no favorites yet!</h2>}
        {favorites.length > 0 && (
          <div className="favorites-container">
            {favorites.map((favorite) => {
              return (
                <div
                  className="favorites-content"
                  key={favorite._id}
                  onClick={() =>
                    window.open(
                      `https://torre.ai/${favorite.username}`,
                      "_blank"
                    )
                  }
                >
                  <div className="image-container">
                    <img
                      src={favorite.imageUrl || "person-icon.png"}
                      alt="person"
                    />
                  </div>
                  <div className="content-container">
                    <h3 className="name">{favorite.name}</h3>
                    <p className="job-title">{favorite.professionalHeadline}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default FavoritesList;
