const router = require("express").Router();
const categoryModel = require("../models/categoryModel");

//add categories
router.post("/", async (req, res) => {
    const categories = req.body;
    console.log(categories);
    const categoryDB = await categoryModel.insertMany(categories);
    res.send(categoryDB);
})

//get categories list
router.get("/", async (req, res) => {
    const categories = await categoryModel.find({});
    res.send(categories);
})

module.exports = router;
