// for each message we have a User that it refers to

const mongoose = require("mongoose");
const User = require("./user");
// every message to have a reference to the user who created it
// halfway done with backend signup and login complete

// message Schema
// different messages for different users
// mongoose.Schema ({}) is an Object right here

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    // required: true, we don't want any empty messages
    maxLength: 160
  },
  // make a reference to every User for that message 
  user: {
    type: mongoose.Schema.Types.ObjectId, // unique identifier for some User
    ref: "User" // what we named our Model user.js must be captialized! User not user here
  }
});

// make a pre-remove hook here
// we are dealing with an async function so we have wrap everything into a try / catch
messageSchema.pre("remove", async function(next) {
  try {
    // find a user
    let user = await User.findById(this.user); // this not JavaScript's arrow function
    // remove the id of the message from their messages list
    user.messages.remove(this.id);
    // save that user
    await user.save();
    // return next
    return next();
  } catch (err) {
    return next(err);
  }
});

const Message = mongoose.model("Message", messageSchema); // pass in messageSchema
// be sure to export out Message

module.exports = Message;
