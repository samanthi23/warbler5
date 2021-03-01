const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/warbler", {
 // took something out here not sure what
 // use mongoclient: true if mongoose 4 and below
  keepAlive: true
});

module.exports.User = require("./user");
module.exports.Message = require("./message");
