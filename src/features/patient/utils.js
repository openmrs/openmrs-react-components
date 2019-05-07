import dateFns from 'date-fns';

export const formatAge = (birthday) => {
  const totalAgeInMonths = dateFns.differenceInCalendarMonths(new Date(), new Date(birthday));
  let ageInYears = parseInt( totalAgeInMonths / 12 );
  let ageInMonths = parseInt( totalAgeInMonths % 12 );

  if (ageInYears < 2 && ageInMonths < 2){
    ageInMonths = `${ageInMonths} month,`;
  } else if (ageInYears > 1 || ageInMonths === 0){
    ageInMonths = ''; 
  } else {
    ageInMonths = `${ageInMonths} months,`; 
  }

  if (ageInYears === 0) {
    ageInYears = '';
  } else if (ageInYears < 2){
    ageInYears = `${ageInYears} year,`;
  } else {
    ageInYears = `${ageInYears} years,`; 
  }
  
  return {
    ageInYears,
    ageInMonths,
    totalAgeInMonths
  };
};
