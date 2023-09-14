const router = require("express").Router();
const productsModel = require("../models/productsModel");

//add products
router.post("/", async (req, res) => {
    const products = req.body;
    const productsDB = await productsModel.insertMany(products);
    res.send(productsDB);
});

//get all products list
router.get("/", async (req, res) => {
    const productsDB = await productsModel.find({});
    res.send(productsDB);
});

//get product by its id
router.get("/:id", async (req, res) => {
    const _id = req.params.id;
    const productByID = await productsModel.find({ _id });
    res.send(productByID);
});

//get list of products by its category_id
router.get("/category/:category_id", async (req, res) => {
    const category_id = req.params.category_id;
    const productByCategory_id = await productsModel.find({ category_id });
    res.send(productByCategory_id);
});

//delete product by ID
router.delete("/:id", async (req, res) => {
    const _id = req.params.id;
    const deleted = await productsModel.deleteOne({ _id });
    res.send(deleted);
})

//dletet all products 
router.delete("/", async (req, res) => {
    const deleted = await productsModel.deleteMany();
    res.send(deleted);
})


module.exports = router;