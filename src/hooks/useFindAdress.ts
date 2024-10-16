import {useState, useEffect} from 'react';
import {findAddress} from 'api/mapbox/findAddress';

const useFindAddress = (address: string) => {
  const [query, setQuery] = useState([]);
  const [addresses, setAddresses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    if (!address) {
      setAddresses([]);
      return;
    }

    const fetchAddress = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await findAddress(address);
        setQuery(result);
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

  return {addresses, query, isLoading, error};
};

export {useFindAddress};
