
import { format } from "date-fns";

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

const maxDateValue = (maxDate, reference = "today's") => value => {
  if (!value || typeof dateToInt(value) !== 'number') {
    return undefined;
  }
  if (value && (dateToInt(format(value, "YYYY-MM-DD"))) > (dateToInt(format(maxDate, "YYYY-MM-DD")))) {
    return reference === "today's" ? `Date should be earlier or equal to ${reference} date` : reference;
  } else {
    return undefined;
  }
};

const minDateValue = (minDate, reference = "today's") => value => {
  if (!value || typeof dateToInt(value) !== 'number') {
    return undefined;
  }
  return value && (dateToInt(format(value, "YYYY-MM-DD")) < dateToInt(format(minDate, "YYYY-MM-DD"))) ? `Date should be later or equal to ${reference} date` : undefined;
};

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
  minDateValue,
  generateAbsoluteRangeValidators,
  generateAbnormalAndCriticalWarningFunctions,
  isRequired
};
