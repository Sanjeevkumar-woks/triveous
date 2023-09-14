const router = require("express").Router();
const ordersModel = require("../models/orderModel");
const { v4: uuid4 } = require("uuid");


//place an order
router.post("/",async(req,res)=>{
    const order=req.body;
    const oredrstatus=await ordersModel.insertMany([{...order,email:order.email,_id:uuid4()}]);
    console.log(oredrstatus)
    res.send({"msg":"order succesfull",oredrID:oredrstatus[0]._id});
})


//get order by id
router.get("/:id",async(req,res)=>{
    const _id=req.params.id;
    const orderdetails=await ordersModel.findOne({_id});
    if(!orderdetails){
        res.send({error:"invalid orderId"});
    }
    res.send(orderdetails);
})

//oreder history of user
router.get("/history",async(req,res)=>{
    const email=req.header("email");
    console.log(req.header);
    const orderdetails=await ordersModel.findOne({email});
    if(!orderdetails){
        res.send({error:"invalid query"});
    }
    res.send(orderdetails);
})


module.exports=router;