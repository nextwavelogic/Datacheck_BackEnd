const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectDetailSchema = new Schema(
  {
    checkInTime: { type: Date, required: true },
    checkOutTime: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const ProjectDetail = mongoose.model('ProjectDetail', projectDetailSchema);

module.exports = ProjectDetail;
