import dateFns from 'date-fns';

export const formatAge = (birthday) => {
  const totalAgeInMonths = dateFns.differenceInMonths(new Date(), new Date(birthday));
  let age = '';
  let ageInYears = parseInt( totalAgeInMonths / 12 );
  let ageInMonths = parseInt( totalAgeInMonths % 12 );

  if (ageInYears < 2){
    ageInMonths = `${ageInMonths} month(s)`;
  } else {
    ageInMonths = ''; 
  }

  if (ageInYears === 0) {
    ageInYears = '';
  } else if (ageInYears < 2){
    ageInYears = `${ageInYears} year,`;
  } else if (ageInMonths){
    // Check if there is month so trailing comma can be added
    ageInYears = `${ageInYears} years,`; 
  } else {
    ageInYears = `${ageInYears} years`; 
  }

  age = `${ageInYears} ${ageInMonths}`;
  
  return {
    age,
    totalAgeInMonths
  };
};
