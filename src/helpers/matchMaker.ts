
export const matchMaker = (array1, array2) => {
  const match = [];
  const noMatch = [];

  array1.forEach(obj1 => {
    const obj2 = array2.find(item => item.name === obj1.name); // Find corresponding object in array2
    if (!obj2) {
      noMatch.push(obj1); // If object not found in array2, push it to noMatch array
    } else {
      // Compare key-value pairs
      let isMatch = true;
      for (const key in obj1) {
        if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
          if (obj1[key] !== obj2[key]) {
            isMatch = false; // If any value is different, set isMatch to false
            break;
          }
        }
      }
      if (isMatch) {
        match.push(obj1); // If all key-value pairs are the same, push it to match array
      } else {
        noMatch.push(obj1); // If not all key-value pairs are the same, push it to noMatch array
      }
    }
  });

  return [match, noMatch]
}
