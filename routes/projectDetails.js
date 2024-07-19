const router = require('express').Router();
let ProjectDetail = require('../model/ProjectDetail');

router.route('/add').post((req, res) => {
  const { checkInTime, checkOutTime } = req.body;

  const newProjectDetail = new ProjectDetail({
    checkInTime,
    checkOutTime,
  });

  newProjectDetail
    .save()
    .then(() => res.json('Project detail added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
