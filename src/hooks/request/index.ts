import { useCallback, useEffect, useRef } from 'react';
import useSafeState from '../state';

const DEFAULT_CACHE_TIME = 5 * 60 * 1000;

const DEFAULT_STALE_TIME = 30 * 1000;

interface UseRequestOptions {
  defaultLoading?: boolean;
  manual?: boolean;
  deps?: any[];
  /**
   * 缓存 key
   */
  cacheKey?: string;
  /**
   * 缓存有效期，在缓存有效期内，会先返回缓存数据，并静默获取最新数据，单位：毫秒
   */
  cacheTime?: number;
  /**
   * 数据有效期，在有效期内不会重新发起请求，单位毫秒
   */
  staleTime?: number;
}

interface CacheData<T = any> {
  lastFetch: number;
  data: T;
}

const globalCache = new Map<string, CacheData>();

export function useRequest<T = any>(fn: () => Promise<T>, options: UseRequestOptions = {}) {
  const { deps = [] } = options;
  const optionsRef = useRef(options);
  const requestRef = useRef(fn);
  const [data, setData] = useSafeState<T>();
  const [loading, setLoading] = useSafeState(optionsRef.current.defaultLoading ?? !optionsRef.current.manual);
  const [error, setError] = useSafeState<Error>();
  const firstCalledRef = useRef(false);

  const request = useCallback(
    (force?: boolean) => {
      const { cacheKey, cacheTime = DEFAULT_CACHE_TIME, staleTime = DEFAULT_STALE_TIME } = optionsRef.current;
      firstCalledRef.current = true;
      setError(undefined);
      setLoading(true);
      if (cacheKey && !force) {
        const cacheData = globalCache.get(cacheKey);
        // 缓存有效，则直接返回缓存数据
        if (cacheData && cacheData.lastFetch + cacheTime > Date.now()) {
          setData(cacheData.data);
          setLoading(false);
          // 有效期内不再发起请求
          if (cacheData.lastFetch + staleTime > Date.now()) {
            return;
          }
        }
      }

      requestRef
        .current()
        .then((res) => {
          setData(res);
          if (cacheKey) {
            globalCache.set(cacheKey, {
              data: res,
              lastFetch: Date.now(),
            });
          }
        })
        .catch((err: any) => {
          setError(new Error(err.message || err.msg));
        })
        .finally(() => setLoading(false));
    },
    [setData, setError, setLoading],
  );

  useEffect(() => {
    requestRef.current = fn;
  });

  useEffect(() => {
    optionsRef.current = options;
  });

  useEffect(() => {
    if (firstCalledRef.current || !optionsRef.current.manual) {
      request();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request, ...deps]);

  return { data, loading, error, request };
}
