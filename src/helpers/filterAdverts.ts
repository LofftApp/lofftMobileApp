import {
  Advert,
  FilterParams,
  AdvertFeaturesParams,
} from 'reduxFeatures/adverts/types';

export const filterAdverts = (
  stateAdverts: Advert[],
  filterParams: FilterParams,
  textInputParams: string,
  filterActivated: boolean,
) => {
  if (filterActivated) {
    const {advertChars, maxPrice, minPrice} = filterParams;
    const advertParams = advertChars[0].map(
      (el: AdvertFeaturesParams) => el.value,
    );

    let filteredFlats = stateAdverts;

    if (advertParams.length > 0) {
      filteredFlats = filteredFlats.filter(advert =>
        advert.flat.features?.some(feature =>
          advertParams.includes(feature.name),
        ),
      );
    }

    filteredFlats = filteredFlats.filter(
      el => el.price >= minPrice && el.price <= maxPrice,
    );

    filteredFlats = filteredFlats.filter(advert =>
      advert.flat.district?.includes(textInputParams),
    );
    return filteredFlats;
  }

  return stateAdverts;
};
