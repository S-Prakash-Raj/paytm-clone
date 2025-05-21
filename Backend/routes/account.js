const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware');
const { Account, User } = require('../db');

const mongoose = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {

    const accountBalance = await Account.findOne({
        userId: req.userId
    })
    console.log("Decoded:accountBal", accountBalance);

    res.json({
        balance: accountBalance.balance
    })
})

router.use("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    console.log("session")

    session.startTransaction();
    const { amount, to } = req.body;
    console.log("amount", req.userId)

    const account = await Account.findOne({
        userId: req.userId
    }).session(session);
    console.log("amount", account)

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }
    console.log("account")



    const toaccount = await Account.findOne({
        userId: to
    }).session(session);


    if (!toaccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid To Account"
        })
    }
    console.log("tra")
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session)
    await Account.updateOne({ userId: to }, { $inc: { balance: +amount } }).session(session)


    await session.commitTransaction();
    res.json({
        message: "Transfer Successful"
    })

})


module.exports = router;