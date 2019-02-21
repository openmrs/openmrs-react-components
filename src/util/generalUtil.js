
const util = {

  // converts an array of key-value pairs to a single object with those properties
  arrayToObjectReducer: (acc, item) => {
    var key = Object.keys(item)[0];
    acc[key] = item[key];
    return acc;
  },

  areEqualArrays(array1, array2) {
    let equal =false;
    let json1 = null;
    let json2 = null;
    if ( array1 === null && array2 === null) {
      equal = true;
    }
    if (array1 !== null ) {
      json1 = JSON.stringify(array1);
    }
    if (array2 !== null ) {
      json2 = JSON.stringify(array2);
    }
    if (json1 === json2) {
      equal = true;
    }
    return equal;
  }

};

export default util;
