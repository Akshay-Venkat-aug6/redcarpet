var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var loanSchema = new Schema(
  {
    agentid: {
      type: Schema.Types.ObjectId,
      trim: true
    },
    userid: {
      type: Schema.Types.ObjectId,
      trim: true
    },
    principleAmount:{
      type: Number,
      trim: true
    },
    rate: {
      type: Number,
      trim: true
    },
    duration:{
      type:Number,
      trim: true
    },
    EMI:{
      type: Number,
      trim: true
    },
    InterestAmount: {
      type: Number,
      trim: true
    },
    TotalAmountPayable: {
      type: Number,
      trim: true
    },
    status:{
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      trim: true
    },
    applicationDate:{
      type: Date,
      trim: true
    },
    approvedDate:{
      type: Date,
      trim: true
    }
  },
  { timestamps: true }
);

var Loan = mongoose.model("loan", loanSchema);

module.exports = Loan;
