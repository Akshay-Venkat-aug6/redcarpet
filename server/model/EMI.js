var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var emiSchema = new Schema(
  {
    agentid: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true
    },
    userid: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true
    },
    loanid: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true
    },
    emiDetails: {
      type: Array,
      trim: true
    }
  },
  { timestamps: true }
);

var EMI = mongoose.model("emi", emiSchema);

module.exports = EMI;
