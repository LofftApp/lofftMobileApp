export const matchMaker = (array1: any[], array2: any[]) => {
  const match: any[] = [];
  const noMatch: any[] = [];

  array1.forEach((obj1: any) => {
    const obj2 = array2.find((item: any) => item.name === obj1.name);
    if (!obj2) {
      noMatch.push(obj1);
    } else {
      let isMatch = true;
      for (const key in obj1) {
        if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
          if (obj1[key] !== obj2[key]) {
            isMatch = false;
            break;
          }
        }
      }
      if (isMatch) {
        match.push(obj1);
      } else {
        noMatch.push(obj1);
      }
    }
  });

  return [match, noMatch];
};
