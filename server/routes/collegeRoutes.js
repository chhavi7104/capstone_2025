const express = require("express");
const { getColleges, getCollegeById, compareColleges,predictColleges} = require("../controllers/collegeController");

const router = express.Router();

// GET /api/colleges
router.get("/", getColleges);
router.get("/compare", compareColleges);
router.get("/predict", predictColleges);

// GET /api/colleges/:id
router.get("/:id", getCollegeById);

module.exports = router;
