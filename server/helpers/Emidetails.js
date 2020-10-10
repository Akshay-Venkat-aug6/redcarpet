const emiDetails = (rate, amount, duration) => {
  const month = 12 * +duration;
  const rs = +rate / 100;
  const r  = rs / 12;
  const amounts = +amount * r * Math.pow((1 + r), month);
  const divider = (Math.pow((1 + r), month) - 1);
  const EMI  = amounts/divider;
  const TotalAmountPayable = EMI * month;
  const principleAmount = +amount;
  const InterestAmount = TotalAmountPayable - +principleAmount;
  
  let loanDetails = {
    EMI: parseInt(EMI),
    InterestAmount: parseInt(InterestAmount),
    principleAmount: parseInt(principleAmount),
    TotalAmountPayable: parseInt(TotalAmountPayable),
    duration: +duration,
    rate: +rate
  };

  return loanDetails
};

module.exports = {
  emiDetails
}