const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { User, Account } = require("../db");
const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
})
const router = express.Router();

router.use("/signup", async (req, res) => {
    const success = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname

    })

    const userID = user._id;
    await Account.create({
        userId: userID,
        balance: 1 + Math.random() * 10000
    })
    const token = jwt.sign({
        userID
    }, JWT_SECRET);

    res.json({
        message: "User Created successfully",
        token: token
    })
})

const signinUser = zod.object({
    username: zod.string().email(),
    password: zod.string()
});
router.use("/signin", async (req, res) => {
    const { success } = signinUser.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateUser = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional()
});
router.put("/update", async (req, res) => {
    const { success } = updateUser.safeParse(req.body);

    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        });
    }

    await User.updateOne({
        _id: req.userID
    }, req.body);

    res.json({
        message: "Updated Successfully"
    })
});


router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        },
        {
            lastname: {
                "$regex": filter
            }
        }

        ]
    })


    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstname,
            lastName: user.lastname,
            _id: user._id
        }))
    })
})
module.exports = router;