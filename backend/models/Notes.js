const mongoose = require("mongoose");
// eslint-disable-next-line no-undef
const NotesSchema = new Schema({
  name: {
    title: String,
    required: true,
  },
  description: {
    type: String,
    default: "General",
  },
  tag: {
    type: String,
    default: "General",
  },
});

module.exports = mongoose.model("notes", NotesSchema);
