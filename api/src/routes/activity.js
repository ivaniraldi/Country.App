const express = require("express");
const router = express.Router();
const { createActivity, getActivites } = require("../controllers/activity")
const { Activity, Country } = require('../db')


router.post("/", createActivity)
router.get('/', getActivites)
module.exports = router  