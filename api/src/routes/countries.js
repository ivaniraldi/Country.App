const express = require("express");
const router = express.Router();
const { getCountries, getCountriesId } = require("../controllers/countries")


router.get("/", getCountries);
router.get("/:id", getCountriesId);

module.exports =  router 
