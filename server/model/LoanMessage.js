var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var loanMessageSchema = new Schema(
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
    loanname:{
      type: String,
      trim: true
    },
    loanvalue: {
      type: Number,
      required: true,
      trim: true
    },
    duration: {
      type: Number,
      trim: true
    }
  },
  { timestamps: true }
);

var LoanMessage = mongoose.model("loanMessage", loanMessageSchema);

module.exports = LoanMessage;
