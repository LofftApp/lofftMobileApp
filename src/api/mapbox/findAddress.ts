import {MAPBOX_API_KEY} from '@env';

export const findAddress = async (address: any) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${MAPBOX_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();
  const addresses = data.features.map((address: any) => {
    return address.place_name;
  });
  return addresses.slice(0, 5);
};
