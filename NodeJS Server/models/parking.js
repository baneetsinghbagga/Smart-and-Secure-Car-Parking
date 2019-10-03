const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParkingSchema = new Schema({
  pid: {
    type: String,
    required: true
  },
  slots:[{
  slotId: {
    type: Number
  },
  carNo: {
    type: String
  },
  mobileNo: {
    type: String
  }}]
});

module.exports = Parking = mongoose.model("parkings", ParkingSchema);
