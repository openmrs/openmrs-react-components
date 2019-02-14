
const minValue = min => value => 
  value && value < min ? `Must be at least ${min}` : undefined;

const maxValue = max => value =>
  value && value > max ? `Must be less than ${max + 1}` : undefined ;

const abnormalMaxValue = max => value =>
  value && value > max ? `Abnormal value` : undefined ;

const abnormalMinValue = min => value => (value && value < min ? `Abnormal value` : undefined);

const criticalMaxValue = max => value =>
  value && value > max ? `Critical value` : undefined ;

const criticalMinValue = min => value => (value && value < min ? `Critical value` : undefined);

const isRequired = value => value ? undefined : 'Required';

const dateToInt = dateStr => new Date(dateStr).getTime();

const maxDateValue = maxDate => value =>
  value && (dateToInt(value)) > dateToInt(maxDate) ? `Date should be earlier or equal to today's date` : undefined;

const generateAbsoluteRangeValidators = concept => {
  const {
    hiAbsolute,	
    lowAbsolute,
  } = concept;
  let hiAbsoluteRange, lowAbsoluteRange;

  if (hiAbsolute || lowAbsolute) {
    hiAbsoluteRange = hiAbsolute ? maxValue(hiAbsolute) : undefined;
    lowAbsoluteRange = hiAbsolute ? minValue(lowAbsolute) : undefined;
    return [hiAbsoluteRange, lowAbsoluteRange].filter(Boolean);
  } else {
    return [];
  }
};

const generateAbnormalAndCriticalWarningFunctions = concept => {
  const {
    hiNormal,	
    hiCritical,
    lowCritical,	
    lowNormal,
  } = concept;
  let hiNormalRange, lowNormalRange, hiCriticalRange, lowCriticalRange;
  
  if (hiNormal || hiCritical || lowCritical || lowNormal) {
    hiNormalRange = hiNormal ? abnormalMaxValue(hiNormal) : undefined;
    lowNormalRange = lowNormal ? abnormalMinValue(lowNormal) : undefined;
    hiCriticalRange = hiCritical ? criticalMaxValue(hiCritical) : undefined;
    lowCriticalRange = lowCritical ? criticalMinValue(lowCritical) : undefined;
    return [hiCriticalRange, hiNormalRange, lowCriticalRange, lowNormalRange].filter(Boolean);
  } else {
    return [];
  }
};

export default {
  minValue,
  maxValue,
  abnormalMaxValue,
  abnormalMinValue,
  criticalMinValue,
  criticalMaxValue,
  maxDateValue,
  generateAbsoluteRangeValidators,
  generateAbnormalAndCriticalWarningFunctions,
  isRequired
};
