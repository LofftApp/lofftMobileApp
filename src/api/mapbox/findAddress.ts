import {MAPBOX_API_KEY} from '@env';

const mapData = (data: any) => {
  return data.features.map((address: any) => {
    const addr = address?.place_name;
    let district = null;
    if (address && address?.context) {
      district = address?.context[1]?.text;
    }
    return {address: addr, district};
  });
};

export const findAddress = async (address: any) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${MAPBOX_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();
  const addresses = mapData(data);
  return addresses.slice(0, 5);
};
