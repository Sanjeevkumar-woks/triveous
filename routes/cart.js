const router = require("express").Router();
const cartItemsModel = require("../models/cartModel");


router.get("/", async (req, res) => {
    const cartList = await cartItemsModel.find({});
    res.send(cartList);
});


//Add iteam to cart increment quantity decrement and delete iteams
router.put("/", async (req, res) => {
    const product = req.body;
    const { type } = req.query;

    const itemExist = await cartItemsModel.findOne({ _id: product._id });
    if (itemExist) {
        if (type === "decrement" && itemExist.quantity <= 1) {
            console.log("delete");
            await cartItemsModel.deleteOne({ _id: product._id });
        } else {
            await cartItemsModel.updateOne(
                { _id: product._id },
                { $inc: { quantity: type === "increment" ? +1 : -1 } }
            );
        }
    } else {
        const result = await cartItemsModel.insertMany([{ ...product, quantity: 1 }]);
        console.log(result);
    }
    const allCart = await cartItemsModel.find({});
    res.send(allCart);
});


//delete cart by ID
router.delete("/:_id", async (req, res) => {
    const _id=req.params._id
    const result = await cartItemsModel.deleteOne({ _id });
    const allCart = await cartItemsModel.find({});
    res.send(allCart);
})

module.exports = router