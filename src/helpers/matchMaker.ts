export const matchMaker = (array1:any, array2:any) => {
  const matchedArray = []
  const noMatchArray =  []

  for (let i = 0; i < array1.length; i++) {
    for (let x = 0; x < array2.length; x++) {
      if (array1[x]["name"] === array2[i]["name"]) {
        matchedArray.push(array1[x])
      } else {
        noMatchArray.push(array1[x])
      }
    }
  }

  return [matchedArray, noMatchArray]
}
