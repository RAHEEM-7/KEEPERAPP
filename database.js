const mongoose = require("mongoose");
require('dotenv').config();
const passportLocalMongoose = require("passport-local-mongoose");
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const noteSchema = new mongoose.Schema({
    username: String,
    password: String,
    notes:[{
      title: String,
      content: String
    }]
});
noteSchema.plugin(passportLocalMongoose);
const Note = mongoose.model("Note", noteSchema);

module.exports = {
  Note: Note
};