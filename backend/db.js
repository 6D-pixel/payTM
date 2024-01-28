const db = require("mongoose");

db.connect(
  "MONGODB_URI"//add connection string
).then(() => console.log("Connected!"));

const userSchema = new db.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
});

const accountSchema = new db.Schema({
  userId: { type: db.Schema.Types.ObjectId, ref: "User", required: true },
  balance: { type: Number, required: true },
});

const User = db.model("User", userSchema);
const Account = db.model("Account", accountSchema);
module.exports = { User, Account };
