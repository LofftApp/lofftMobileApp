export const advertPartition = (adverts: any[]) => {
  const active = adverts
    .filter(advert => advert.status === 'open')
    .sort((a, b) => b.matchScore - a.matchScore);
  const inactive = adverts
    .filter(advert => advert.status !== 'open')
    .sort((a, b) => b.matchScore - a.matchScore);
  return [active, inactive];
};
