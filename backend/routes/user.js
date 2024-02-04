const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res
      .status(411)
      .json({ message: "Email already taken / Incorrect inputs" });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken/Incorrect inputs",
    });
  }

  //create user
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const userId = user._id;
  //create Account
  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign({ userId }, JWT_SECRET);
  res.status(200).json({ message: "user created successfully", token: token });
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ message: "Error while logging in" });
  }
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (user) {
    const userId = user._id;
    const token = jwt.sign({ userId }, JWT_SECRET);
    return res.status(200).json({ token: token });
  }
  res.status(411).json({
    message: "Error while logging in",
  });
});

const updateBodySchema = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});
router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBodySchema.safeParse(req.body);
  if (!success) {
    res.send(411).json({ message: "Error while updating information" });
  }
  await User.updateOne(req.body, {
    id: req.userId,
  });
  res.status(200).json({ message: "Updated Successfully" });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const user = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });
  res.json({
    user: user.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
