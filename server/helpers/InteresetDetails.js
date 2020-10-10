const moment = require('moment');
const Emidetails = require('./Emidetails');

const monthsList = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
let instereseMonth = [];

const getMonthID = (month) => {
  var id ;
  monthsList.map( (months, key) => {
    if(months === month){
      id = key
    }
  });
  return id
}

const checkLastMonth = async () => {
  const totalLenghtofInterestMonth = instereseMonth.length;
  let months;
  let year;
  if(totalLenghtofInterestMonth === 0){
    months = moment().format("MMM").toUpperCase();
    year = moment().format('YYYY')
  }
  else{
    let month = instereseMonth[totalLenghtofInterestMonth - 1].month;
    const monthId = await getMonthID(month);
    monthsList.map((monthView, key) => {
      if(key === monthId){
        if(key === 11){
          months = monthsList[0];
          year = +instereseMonth[totalLenghtofInterestMonth - 1].year + 1
        }
        else{
          months = monthsList[key + 1];
          year = instereseMonth[totalLenghtofInterestMonth - 1].year
        }
      }
    })
  }
  let dates = {
    month: months,
    year: year
  }
  return dates
}

const monthArray = async (duration) => {
  try {
    const months = duration * 12;
    for(var i = 0; i < months; i++){
      const lastMonth = await checkLastMonth();
      instereseMonth.push({id: i+1, month: lastMonth.month, year: lastMonth.year})
    }
    return instereseMonth
  } catch (error) {
    return error.message
  }
};

let interest ;
let principle ;
let Endingbalance;
let emi ;
let InitialAmount ;
let emiArray = [];

const LoanDetails = (EMI, principleAmount, rate) => {
  let rs = +rate /100;
  let r = rs/12;
  emi = EMI;
  InitialAmount = principleAmount;
  interest = principleAmount * r ;
  principle = EMI - interest;
  Endingbalance = principleAmount - principle;
  let emiData = {
    InitialAmount: Math.round(InitialAmount),
    emi: Math.round(emi),
    interest: Math.round(interest),
    principle: Math.round(principle),
    Endingbalance: Math.round(Endingbalance)
  }
  emiArray.push(emiData);
  return Endingbalance
}


let EMIDetails = [];
const InterestDetails = async(loanDetails) => {
  EMIDetails = []
  let { EMI, InterestAmount, principleAmount, TotalAmountPayable, duration, rate } = loanDetails
  instereseMonth = []
  const listMonth = await monthArray(duration);
  for(var i = 1; i <= instereseMonth.length; i++){
    const remainingAmount = await LoanDetails(EMI, principleAmount, rate);
    principleAmount = remainingAmount;
    if(i === instereseMonth.length){
      emiArray[i-1].Endingbalance = 0
    }
  };
  listMonth.map( (month, key) => {
    emiArray.map((emi, id) => {
      if(key === id){
        let emidetails = {
          id: month.id,
          month: month.month,
          year: month.year,
          details: emi
        };
        EMIDetails.push(emidetails)
      }
    })
  });
  return EMIDetails
}

module.exports = {
  InterestDetails
}