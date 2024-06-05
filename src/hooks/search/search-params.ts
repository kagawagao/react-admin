import { parse, ParseOptions } from 'query-string';
import { useLocation } from 'react-router';

const useSearchParams = (options?: ParseOptions) => {
  const location = useLocation();

  const { search } = location;

  const params = parse(search, options);

  return params;
};

export default useSearchParams;
