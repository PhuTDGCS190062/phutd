
const express = require("express");
const foodModel = require("../models/food");

const router = express.Router();


/////////////////////////////////////////////////////////

router.get("/", async (req, res) => {
    const foods = await foodModel.find({});

    try {
        //console.log(foods);
        res.send(foods);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/:id/view", async (req, res) => {
    res.send("View " + req.params.id);
});

router.get("/:id/edit", async (req, res) => {
    res.send("Edit " + req.params.id);
});



router.post("/", async (req, res) => {
    const food = new foodModel(req.body);

    try {
        console.log(req.body);
        await  food.save();
        res.send(food);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch("/:id", async (req, res) => {

    try {
        console.log(req.params, req.body);
        const food = await  foodModel.findByIdAndUpdate(req.params.id, req.body);
        await  foodModel.save();
        res.send(food);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/:id", async (req, res) => {

    try {
        console.log(req.params);
        const food = await  foodModel.findByIdAndDelete(req.params.id);
        if (!food) res.status(404).send("NO item !");
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
});


//////////////////////////////////////////
module.exports = router;