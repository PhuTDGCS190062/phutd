
const express = require("express");
const accountModel = require("../models/account");

const router = express.Router();


/////////////////////////////////////////////////////////

router.get("/", async (req, res) => {
    const accounts = await accountModel.find({});

    try {
        // console.log(accounts);
        // res.send(accounts);
        res.render("accounts", { accounts : accounts });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/create", async (req, res) => {
    res.render("account-create" );
});

router.get("/view/:id", async (req, res) => {
    res.send("View " + req.params.id);
});

router.get("/edit/:id", async (req, res) => {
    res.send("Edit " + req.params.id);
});



router.post("/", async (req, res) => {
    const account = new accountModel(req.body);

    try {
        console.log(req.body);
        await  account.save();
        res.send(account);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch("/:id", async (req, res) => {

    try {
        console.log(req.params, req.body);
        const account = await  accountModel.findByIdAndUpdate(req.params.id, req.body);
        await  accountModel.save();
        res.send(account);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/:id", async (req, res) => {

    try {
        console.log(req.params);
        const account = await  accountModel.findByIdAndDelete(req.params.id);
        if (!account) res.status(404).send("NO item !");
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
});


//////////////////////////////////////////
module.exports = router;