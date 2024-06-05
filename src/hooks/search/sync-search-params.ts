import { useEffect, useState } from 'react';
import useSearchParams from './search-params';
import { stringify, ParseOptions, StringifyOptions } from 'query-string';
import { useHistory, useLocation } from 'react-router';

interface UseSyncParamsOptions {
  parse: ParseOptions;
  stringify: StringifyOptions;
}

function useSyncSearchParams<T extends Record<string, any>>(initialParams?: T, options?: UseSyncParamsOptions) {
  const history = useHistory();
  const { pathname } = useLocation();
  const searchParams = useSearchParams(options?.parse);
  const [params, setParams] = useState<T>({
    ...initialParams,
    ...(searchParams as unknown as T),
  });

  useEffect(() => {
    history.replace({
      pathname,
      search: stringify(params, options?.stringify),
    });
  }, [params, options, history, pathname]);

  return [searchParams as T, setParams] as const;
}

export default useSyncSearchParams;
