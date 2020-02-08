const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const Team = require("../models/Team");

router.get("/", (req, res, next) => {
  Team.find()
    .select("-__v")
    .exec()
    .then(entries => {
      res.status(200).json(entries);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  Team.findOne({ teamName: req.body.teamName })
    .then(team => {
      if (team) {
        req.flash('nameError', 'Team name is already taken');
        res.redirect('/');
        delete res.session.error; // remove from further requests
            } else {
        const newTeam = new Team({
          _id: new mongoose.Types.ObjectId(),
          teamName: req.body.teamName,
          captainName: req.body.captainName,
          firstMemName: req.body.firstMemName,
          secondMemName: req.body.secondMemName,
          captainSurname: req.body.captainSurname,
          firstMemSurname: req.body.firstMemSurname,
          secondMemSurname: req.body.secondMemSurname,
          captainGrade: req.body.captainGrade,
          firstMemGrade: req.body.firstMemGrade,
          secondMemGrade: req.body.secondMemGrade,
          captainMail: req.body.captainMail,
          firstMemMail: req.body.firstMemMail,
          secondMemMail: req.body.secondMemMail,
          captainDepartment: req.body.captainDepartment,
          firstMemDepartment: req.body.firstMemDepartment,
          secondMemDepartment: req.body.secondMemDepartment,
          codeForcesHandler: req.body.codeForcesHandler,
          favProgrammingLanguage: req.body.favProgrammingLanguage,
          favIDE: req.body.favIDE,
          lvlOfKnowledge: req.body.lvlOfKnowledge,
          motivation: req.body.motivation
        });
        newTeam
          .save()
          .then(result => {
            res.redirect("/success");
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
      }
    })
    .catch(err => {
      error: err;
    });
});

// router.delete("/:entryId", (req, res, next) => {
//   const subject = req.params.entryId;
//   Team.remove({ subject: subject })
//     .exec()
//     .then(result => {
//       res.status(200).json({
//         result: result,
//         message: "Team deleted"
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// });
// router.patch("/:actionId", (req, res, next) => {

//     const id = req.params.actionId;
//     Action.updateOne({_id: id}, {$set: req.body}).exec().then(result => {
//         res.status(200).json({
//             message: "Action updated",
//             action: req.body.action

//         })
//     }).catch(err => {
//         res.status(500).json({
//             error: err
//         })
//     })
// })

module.exports = router;
