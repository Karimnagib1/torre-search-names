const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  postAddFavoriteSearch,
  getFavoriteSearches,
} = require("../controllers/favoriteSearches.js");

// @route POST api/favoriteSearches
// @desc Add favorite search
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postAddFavoriteSearch
);

// @route GET api/favoriteSearches
// @desc Get favorite searches
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getFavoriteSearches
);

module.exports = router;
