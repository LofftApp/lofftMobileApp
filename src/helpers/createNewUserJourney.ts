export const createNewUserJourney = (screens: Record<number, string>) => {
  return Object.keys(screens).reduce((acc, key) => {
    acc[Number(key)] = false;
    return acc;
  }, {} as Record<number, boolean>);
};
