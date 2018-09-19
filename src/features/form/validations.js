const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined ;

const maxValue = max => value =>
  value && value > max ? `Must be less than ${max + 1}` : undefined ;

const abnormalMaxValue = max => value =>
  value && value > max ? `Abnormal value` : undefined ;

const abnormalMinValue = min => value => (value && value < min ? `Abnormal value` : undefined);

export default {
  minValue,
  maxValue,
  abnormalMaxValue,
  abnormalMinValue
};
