const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSigninModel = require("../models/usersigninModle");



//Signin
//validate if username alrady present
//validate if password matches
//store the user details
router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const isUserExist = await userSigninModel.findOne({ email });
    if (isUserExist) {
        res.status(400).send({ message: "email alrady exists" });
        return;
    }
    if (
        !/^(?=.*[0-9])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[@!#%&]).{8,}$/g.test(
            password
        )
    ) {
        res.status(400).send({ message: "Password pattern doesnot match" });
        return;
    }
    const salt = await bcrypt.genSalt(10); //bcrypt.genSalt(no. of rounds)
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await userSigninModel.insertMany([{ email, password: hashedPassword }]);
    res.send(result);
});

//Login
//user email existance is checked 
//if user exists hasshed password is checked 
//then jwt token is released
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const isUserExist = await userSigninModel.findOne({ email });
    console.log(isUserExist)
    if (!isUserExist) {
        res.status(400).send({ message: "Invalid credentials" });
        return;
    }
    const isPasswordMatch = await bcrypt.compare(password, isUserExist.password);
    if (!isPasswordMatch) {
        res.status(400).send({ message: "Invalid credentials" });
        return;
    }

    const token = jwt.sign({ email }, "MYSECRATE");
    res.send({ message: "Sucessfull Login", token: token });
});





module.exports = router;