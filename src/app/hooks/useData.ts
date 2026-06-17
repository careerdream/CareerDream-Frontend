import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const cache: Record<string, CacheItem<any>> = {};
const pendingRequests: Record<string, Promise<any>> = {};
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

export function useData<T>(endpoint: string, extractData?: (res: any) => T, skip = false) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (skip || !endpoint) return;

    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Check local memory cache
        if (cache[endpoint] && Date.now() - cache[endpoint].timestamp < CACHE_TTL) {
          setData(cache[endpoint].data);
          setLoading(false);
          return;
        }

        // Deduplicate ongoing requests
        if (!pendingRequests[endpoint]) {
          pendingRequests[endpoint] = api.get(endpoint);
        }

        const res = await pendingRequests[endpoint];
        const finalData = extractData ? extractData(res) : (Array.isArray(res) ? res : res?.data || []);

        // Update cache
        cache[endpoint] = { data: finalData, timestamp: Date.now() };

        if (isMounted) {
          setData(finalData);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err);
          setData(null);
        }
      } finally {
        if (isMounted) setLoading(false);
        delete pendingRequests[endpoint]; // Clean up promise
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [endpoint, skip]); // Re-run if endpoint changes

  return { data, loading, error };
}
