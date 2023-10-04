const FavoriteSearch = require("../models/FavoriteSearch");

exports.postAddFavoriteSearch = (req, res, next) => {
  // Check is the user already has this favorite search
  FavoriteSearch.findOne({ userId: req.user._id, username: req.body.username })
    .then((favoriteSearch) => {
      if (favoriteSearch) {
        const error = new Error("Favorite search already exists!");
        error.statusCode = 400;
        console.log("here");
        throw error;
      }
      return;
    })
    .then(() => {
      // Create new favorite search
      const favoriteSearch = new FavoriteSearch({
        userId: req.user._id,
        name: req.body.name,
        username: req.body.username,
        imageUrl: req.body.imageUrl,
        professionalHeadline: req.body.professionalHeadline,
      });
      return favoriteSearch.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "Favorite search added successfully!",
        favoriteSearch: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getFavoriteSearches = (req, res, next) => {
  FavoriteSearch.find({ userId: req.user._id })
    .then((favoriteSearches) => {
      res.status(200).json({
        message: "Favorite searches fetched successfully!",
        favoriteSearches: favoriteSearches,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
