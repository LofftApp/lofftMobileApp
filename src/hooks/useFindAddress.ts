import {useState, useEffect} from 'react';
import {findAddress} from 'api/mapbox/findAddress';

const useFindAddress = (address: string) => {
  const [addressesWithDistrict, setAddressesWithDistrict] = useState([]);
  const [addresses, setAddresses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!address) {
      setAddresses([]);
      return;
    }

    const fetchAddress = async () => {
      setIsLoading(true);
      setError('');

      try {
        const result = await findAddress(address);
        setAddressesWithDistrict(result);
        const addressList = result.map((data: {address: string}) => {
          return data.address;
        });
        setAddresses(addressList);
      } catch (err) {
        setError('Failed to fetch addresses');
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      fetchAddress();
    }, 1000);

    return () => clearTimeout(debounce);
  }, [address]);

  return {addresses, addressesWithDistrict, isLoading, error, setError};
};

export {useFindAddress};
