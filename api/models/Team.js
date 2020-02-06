const mongoose = require("mongoose");   

const teamSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    teamName: {type: String, required: true},
    captainMemName: {type: String, required: true},
    firstMemName: {type: String, required: true},
    secondMemName: {type: String, required: true},
    captainMemSurname: {type: String, required: true},
    firstMemSurname: {type: String, required: true},
    secondMemSurname: {type: String, required: true},
    captainGrade: {type: String, required: true},
    firstMemGrade: {type: String, required: true},
    secondMemGrade: {type: String, required: true},
    captainMail: {type: String, required: true},
    firstMemMail: {type: String, required: true},
    secondMemMail: {type: String, required: true},
    captainDepartment: {type: String, required: true},
    firstMemDepartment: {type: String, required: true},
    secondMemDepartment: {type: String, required: true},
    codeForcesHandler: {type: String, required: true}
})

module.exports = mongoose.model("Team",  teamSchema)
