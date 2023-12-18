const mongoose = require("mongoose");

const addtaskSchema = new mongoose.Schema({
    tasks : {type: String}
})

const taskModel = mongoose.model("tasks",addtaskSchema);

module.exports = taskModel;