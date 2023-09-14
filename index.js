const express = require('express');
const app = express();
const dotenv = require("dotenv").config();
const cors = require('cors');
const PORT = process.env.PORT;
//const { swaggerServe, swaggerSetup } = require('./config/swagger')  


//Database connection
const connectDB = require('./config/db');
connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/category", require("./routes/category"));
app.use("/api/products", require("./routes/products"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/order", require("./routes/orders"));
app.use("/api/user", require("./routes/user"));
//app.use("/api-docs", swaggerServe, swaggerSetup); 

app.get("/", (req, res) => {
    res.send("hi sanjeev well done!!!")
})

app.listen(PORT, () => console.log("server is running succesfully"));